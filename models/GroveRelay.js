/*
 *  GroveRelay.js
 *
 *  David Janes
 *  IOTDB
 *  2015-09-10
 *
 *  Turn Relay On (or Off).
 */

"use strict";

var iotdb = require("iotdb")

exports.Model = iotdb.make_model('GroveRelay')
    .io(iotdb.boolean.on)
    .make();

exports.binding = {
    model: exports.Model,
    bridge: require('../JohnnyFiveBridge').Bridge,
    discover: false,
    initd: {
        component: "Pin",
        pin: 13,
        type: "digital",
        model: 1,   // output
    },
    connectd: {
        data_out: function (paramd) {
            if (paramd.cookd.on !== undefined) {
                if (paramd.cookd.on) {
                    paramd.rawd.Pin.push([ "write", 1 ]);
                } else {
                    paramd.rawd.Pin.push([ "write", 0 ]);
                }
            }
        },
    },
};
