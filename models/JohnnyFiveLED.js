/*
 *  JohnnyFiveLED.js
 *
 *  David Janes
 *  IOTDB
 *  2014-04-30
 *
 *  IOTDB wrapper for the Johnny Five LED command
 */

"use strict";

var iotdb = require("iotdb")

exports.Model = iotdb.make_model('JohnnyFiveLED')
    .product("http://www.seeedstudio.com/depot/Grove-Red-LED-p-1142.html")
    .product("http://www.seeedstudio.com/depot/Grove-Blue-LED-p-1139.html")
    .product("http://www.seeedstudio.com/depot/Grove-Green-LED-p-1144.html")
    .product("http://www.seeedstudio.com/depot/Grove-Relay-p-769.html")
    .product("http://www.seeedstudio.com/depot/Grove-Vibration-Motor-p-839.html")
    .product("http://www.seeedstudio.com/depot/Grove-Buzzer-p-768.html")
    .description("turn something on")
    .help("make sure to set initd.pin")
    .io(iotdb.boolean.on)
    .make();

exports.binding = {
    model: exports.Model,
    bridge: require('../JohnnyFiveBridge').Bridge,
    discover: false,
    connectd: {
        connect: "Led",

        data_out: function (paramd) {
            if (paramd.cookd.on !== undefined) {
                if (paramd.cookd.on) {
                    paramd.rawd.Led = "on";
                } else {
                    paramd.rawd.Led = "off";
                }
            }
        },
    },
};
