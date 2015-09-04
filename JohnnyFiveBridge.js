/*
 *  FirmataBridge.js
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

var logger = bunyan.createLogger({
    name: 'homestar-firmata',
    module: 'FirmataBridge',
});

/**
 *  See {iotdb.bridge.Bridge#Bridge} for documentation.
 *  <p>
 *  @param {object|undefined} native
 *  only used for instances, should be 
 */
var FirmataBridge = function (initd, native) {
    var self = this;

    self.initd = _.defaults(initd,
        iotdb.keystore().get("bridges/FirmataBridge/initd"), {
            poll: 30
        }
    );
    self.native = native;   // the thing that does the work - keep this name

    if (self.native) {
        self.queue = _.queue("FirmataBridge");
        self.native.__number = 1;
        self.connectd = {};
        self.fived = {};
        self.scratchd = {};
    }
};

FirmataBridge.prototype = new iotdb.Bridge();

FirmataBridge.prototype.name = function () {
    return "FirmataBridge";
};

/* --- lifecycle --- */

/**
 *  See {iotdb.bridge.Bridge#discover} for documentation.
 */
FirmataBridge.prototype.discover = function () {
    var self = this;

    logger.info({
        method: "discover"
    }, "called");

    /*
     *  This is the core bit of discovery. As you find new
     *  thimgs, make a new FirmataBridge and call 'discovered'.
     *  The first argument should be self.initd, the second
     *  the thing that you do work with
     */
    self._firmata(function(error, board) {
        self.discovered(new FirmataBridge(self.initd, board));
    });
};

/**
 *  See {iotdb.bridge.Bridge#connect} for documentation.
 */
FirmataBridge.prototype.connect = function (connectd) {
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

FirmataBridge.prototype._setup_connections = function () {
    var self = this;

    if (!self.connectd.connect) {
        logger.error({
            method: "connect",
            cause: "programmer error - this needs to be set up at connection time",
        }, "the 'connectd.connect' parameter must be present");
    }

    var connect_names = self.connectd.connect;
    if (!_.is.Array(connect_names)) {
        connect_names = [ connect_names ];
    }

    connect_names.map(function(connect_name) {
        var connect_constructor = five[connect_name];
        if (!connect_constructor) {
            logger.error({
                method: "connect",
                connect_constructor: connect_constructor,
                cause: "programmer error",
            }, "the connect_constructor is not in 'five'");
            return;
        }
        var connect_paramd = _.defaults(self.initd, {
            board: self.native,
        });
        var connect_object = new connect_constructor(connect_paramd);
        self.fived[connect_name] = connect_object;

        connect_object.on("change", function() {
            var event = this;

            var rawd = {
                "event": "change",
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
        });
    });
};

FirmataBridge.prototype._setup_polling = function () {
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

FirmataBridge.prototype._forget = function () {
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
FirmataBridge.prototype.disconnect = function () {
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
FirmataBridge.prototype.push = function (pushd, done) {
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

    _.mapObject(paramd.rawd, function(params, key_object_name) {
        var key_object = self.fived[key_object_name];
        if (!key_object) {
            logger.error({
                method: "push",
                key_object_name: key_object_name,
                cause: "programmer error - this needs to be set up at connection time",
            }, "key_object_name not found or initialized");
            return;
        }

        if (!_.is.Array(params)) {
            params = [ params ];
        }

        var key_function_name = _.first(params);
        params.splice(0, 1);
        var key_function = key_object[key_function_name];

        var qitem = {
            id: key_object_name,
            run: function () {
                key_function.apply(key_object, params);

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
FirmataBridge.prototype.pull = function () {
    var self = this;
    if (!self.native) {
        return;
    }

};

/* --- state --- */

/**
 *  See {iotdb.bridge.Bridge#meta} for documentation.
 */
FirmataBridge.prototype.meta = function () {
    var self = this;
    if (!self.native) {
        return;
    }

    return {
        "iot:thing-id": _.id.thing_urn.unique("Firmata", self.native.id, self.native.__number),
        "schema:name": self.native.name || "Firmata",

        // "iot:thing-number": self.initd.number,
        // "iot:device-id": _.id.thing_urn.unique("Firmata", self.native.uuid),
        // "schema:manufacturer": "",
        // "schema:model": "",
    };
};

/**
 *  See {iotdb.bridge.Bridge#reachable} for documentation.
 */
FirmataBridge.prototype.reachable = function () {
    return this.native !== null;
};

/**
 *  See {iotdb.bridge.Bridge#configure} for documentation.
 */
FirmataBridge.prototype.configure = function (app) {};

/* -- internals -- */
var __singleton;

/**
 *  If you need a singleton to access the library
 */
FirmataBridge.prototype._firmata = function (done) {
    var self = this;

    if (__singleton) {
        done(null, __singleton);
    } else {
        var board = new five.Board();
        board.on("ready", function() {
            __singleton = board;
            done(null, __singleton);
        });
    }
};

/*
 *  API
 */
exports.Bridge = FirmataBridge;
