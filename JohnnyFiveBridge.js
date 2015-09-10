/*
 *  JohnnyFiveBridge.js
 *
 *  David Janes
 *  IOTDB.org
 *  2015-08-19
 *
 *  Copyright [2013-2015] [David P. Janes]
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

"use strict";

var iotdb = require('iotdb');
var _ = iotdb._;
var bunyan = iotdb.bunyan;

var five = require('johnny-five');

try {
    var io_edison = require("galileo-io");
} catch (x) {
};

var logger = bunyan.createLogger({
    name: 'homestar-johnny-five',
    module: 'JohnnyFiveBridge',
});

/**
 *  See {iotdb.bridge.Bridge#Bridge} for documentation.
 *  <p>
 *  @param {object|undefined} native
 *  only used for instances, should be 
 */
var JohnnyFiveBridge = function (initd, native) {
    var self = this;

    self.initd = _.defaults(initd,
        iotdb.keystore().get("bridges/JohnnyFiveBridge/initd"), {
            poll: 30,
            component: "Pin",
        }
    );
    self.native = native;   // the thing that does the work - keep this name

    if (self.native) {
        self.queue = _.queue("JohnnyFiveBridge");
        self.native.__number = 1;
        self.connectd = {};
        self.fived = {};
        self.scratchd = {};
    }
};

JohnnyFiveBridge.prototype = new iotdb.Bridge();

JohnnyFiveBridge.prototype.name = function () {
    return "JohnnyFiveBridge";
};

/* --- lifecycle --- */

/**
 *  See {iotdb.bridge.Bridge#discover} for documentation.
 */
JohnnyFiveBridge.prototype.discover = function () {
    var self = this;

    logger.info({
        method: "discover"
    }, "called");

    /*
     *  This is the core bit of discovery. As you find new
     *  thimgs, make a new JohnnyFiveBridge and call 'discovered'.
     *  The first argument should be self.initd, the second
     *  the thing that you do work with
     */
    self._firmata(function(error, board) {
        self.discovered(new JohnnyFiveBridge(self.initd, board));
    });
};

/**
 *  See {iotdb.bridge.Bridge#connect} for documentation.
 */
JohnnyFiveBridge.prototype.connect = function (connectd) {
    var self = this;
    if (!self.native) {
        return;
    }

    self._validate_connect(connectd);

    self.connectd = _.defaults(connectd, {
        connect: null,
        data_in: function() {},
        data_out: function() {},
    }, self.connectd);

    self._setup_connections();
    self._setup_polling();
    self.pull();
};

JohnnyFiveBridge.prototype._setup_connections = function () {
    var self = this;

    var component_names = self.initd.component;
    if (!_.is.Array(component_names)) {
        component_names = [ component_names ];
    }

    component_names.map(function(component_name) {
        var component_constructor = five[component_name];
        if (!component_constructor) {
            logger.error({
                method: "connect",
                component_name: component_name,
                cause: "programmer error",
            }, "'five' does not have a component called this");
            return;
        }
        var connect_paramd = _.defaults(self.initd, {
            board: self.native,
        });
        var connect_object = new component_constructor(connect_paramd);
        self.fived[component_name] = connect_object;

        var old_emitter = connect_object.emit
        connect_object.emit = function() {
            var event = this;

            old_emitter.apply(old_emitter, arguments);

            var rawd = {
                "event": arguments[0], 
            };

            // scrub to get the Shape, a bit of a hack
            var keys = Object.getOwnPropertyNames(event);
            keys.map(function(key) {
                var value = event[key];
                if (_.is.Number(value)) {
                    rawd[key] = value;
                } else if (_.is.String(value)) {
                    rawd[key] = value;
                } else if (_.is.Array(value)) {
                    rawd[key] = value;
                } else {
                }
            });

            var paramd = {
                rawd: rawd,
                cookd: {},
                scratchd: self.scratchd,
            };

            self.connectd.data_in(paramd);
            if (!_.is.Empty(paramd.cookd)) {
                self.pulled(paramd.cookd);
            }
        }
    });
};

JohnnyFiveBridge.prototype._setup_polling = function () {
    var self = this;
    if (!self.initd.poll) {
        return;
    }

    var timer = setInterval(function () {
        if (!self.native) {
            clearInterval(timer);
            return;
        }

        self.pull();
    }, self.initd.poll * 1000);
};

JohnnyFiveBridge.prototype._forget = function () {
    var self = this;
    if (!self.native) {
        return;
    }

    logger.info({
        method: "_forget"
    }, "called");

    self.native = null;
    self.pulled();
};

/**
 *  See {iotdb.bridge.Bridge#disconnect} for documentation.
 */
JohnnyFiveBridge.prototype.disconnect = function () {
    var self = this;
    if (!self.native || !self.native) {
        return;
    }

    self._forget();
};

/* --- data --- */

/**
 *  See {iotdb.bridge.Bridge#push} for documentation.
 */
JohnnyFiveBridge.prototype.push = function (pushd, done) {
    var self = this;
    if (!self.native) {
        done(new Error("not connected"));
        return;
    }

    self._validate_push(pushd);

    logger.info({
        method: "push",
        pushd: pushd
    }, "push");

    var paramd = {
        rawd: {},
        cookd: pushd,
        scratchd: self.scratchd,
    };
    self.connectd.data_out(paramd);

    _.mapObject(paramd.rawd, function(paramss, key_object_name) {
        var key_object = self.fived[key_object_name];
        if (!key_object) {
            logger.error({
                method: "push",
                key_object_name: key_object_name,
                cause: "programmer error - this needs to be set up at connection time",
            }, "key_object_name not found or initialized");
            return;
        }

        if (!_.is.Array(paramss)) {
            paramss = [ paramss ];
        }

        if (!_.is.Array(paramss[0])) {
            paramss = [ paramss ];
        }

        var qitem = {
            id: key_object_name,
            run: function () {
                paramss.map(function(params) {
                    var key_function_name = _.first(params);
                    params.splice(0, 1);
                    var key_function = key_object[key_function_name];

                    key_function.apply(key_object, params);
                });

                self.queue.finished(qitem);
            },
            coda: function() {
                done();
            },
        };
        self.queue.add(qitem);
    });
};

/**
 *  See {iotdb.bridge.Bridge#pull} for documentation.
 */
JohnnyFiveBridge.prototype.pull = function () {
    var self = this;
    if (!self.native) {
        return;
    }

};

/* --- state --- */

/**
 *  See {iotdb.bridge.Bridge#meta} for documentation.
 */
JohnnyFiveBridge.prototype.meta = function () {
    var self = this;
    if (!self.native) {
        return;
    }

    return {
        "iot:thing-id": _.id.thing_urn.unique("JohnnyFive", self.native.id, self.initd.pin || 0),
        "schema:name": self.native.name || "JohnnyFive",

        // "iot:thing-number": self.initd.number,
        // "iot:device-id": _.id.thing_urn.unique("JohnnyFive", self.native.uuid),
        // "schema:manufacturer": "",
        // "schema:model": "",
    };
};

/**
 *  See {iotdb.bridge.Bridge#reachable} for documentation.
 */
JohnnyFiveBridge.prototype.reachable = function () {
    return this.native !== null;
};

/**
 *  See {iotdb.bridge.Bridge#configure} for documentation.
 */
JohnnyFiveBridge.prototype.configure = function (app) {};

/* -- internals -- */
var __singleton;
var __pendings;

/**
 *  If you need a singleton to access the library
 */
JohnnyFiveBridge.prototype._firmata = function (done) {
    var self = this;

    if (__singleton) {
        done(null, __singleton);
    } else if (__pendings) {
        __pendings.push(done);
    } else {
        __pendings = [];

        var boardd = {
            repl: false,
        };

        if (io_edison) {
            logger.info({
                method: "_firmat"
            }, "using 'galileo-io' - assuming on an Edison or Galileo");
            boardd.io = new io_edison();
        }

        var board = new five.Board(boardd);
        board.on("ready", function() {
            __singleton = board;

            __pendings.map(function(_pending) {
                _pending(null, __singleton);
            });

            done(null, __singleton);
        });
        board.on("error", function() {
            console.log("J5.ERROR", arguments);
        });
    }
};

/*
 *  API
 */
exports.Bridge = JohnnyFiveBridge;
