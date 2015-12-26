/*
 *  GroveRGBLCD.js
 *
 *  David Janes
 *  IOTDB
 *  2015-09-10
 *
 *  Turn Relay On (or Off).
 */

"use strict";

var iotdb = require("iotdb")

exports.binding = {
    model: require('./GroveRGBLCD.json'),
    bridge: require('../JohnnyFiveBridge').Bridge,
    discover: false,
    initd: {
        component: "LCD",
        controller: "JHD1313M1",
    },
    connectd: {
        data_out: function (paramd) {
            if (paramd.cookd.color !== undefined) {
                var color = new iotdb._.Color(paramd.cookd.color);
                paramd.rawd.LCD.push([ "bgColor", color.r * 0xFF, color.g * 0xFF, color.b * 0xFF, ]);
            }
            if (paramd.cookd.text !== undefined) {
                paramd.rawd.LCD.push([ "clear", ]);
                paramd.rawd.LCD.push([ "print", paramd.cookd.text ]);
            }
        },
    },
};
