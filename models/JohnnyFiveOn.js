/*
 *  JohnnyFiveOn.js
 *
 *  David Janes
 *  IOTDB
 *  2015-09-05
 *
 *  Turn something On (or Off).
 */

"use strict";

var iotdb = require("iotdb")

exports.binding = {
    model: require('./JohnnyFiveOn.json'),
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
                paramd.rawd.Pin.push([ "write", paramd.cookd.on ? 1 : 0 ]);
            }
        },
    },
};
