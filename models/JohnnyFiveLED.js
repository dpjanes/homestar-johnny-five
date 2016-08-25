/*
 *  JohnnyFiveLED.js
 *
 *  David Janes
 *  IOTDB
 *  2015-09-05
 *
 *  IOTDB wrapper for the Johnny Five LED command.
 *  We only deal with the "on/off" part for now
 *  but we'll expand this in the future.
 */

"use strict";

var iotdb = require("iotdb")

exports.binding = {
	model: require("./johnny-five-led.json"),
    bridge: require('../JohnnyFiveBridge').Bridge,
    discover: false,
    initd: {
        component: "Led",
        pin: 13,
    },
    connectd: {
        data_out: function (paramd) {
            if (paramd.cookd.blink !== undefined) {
                paramd.scratchd.blink  = paramd.cookd.blink * 1000;
            }

            if (paramd.cookd.brightness !== undefined) {
                paramd.cookd.on = (paramd.cookd.brightness > 0);
            }

            if (paramd.cookd.on !== undefined) {
                if (paramd.cookd.on) {
                    if (paramd.scratchd.blink) {
                        paramd.rawd.Led.push([ "blink", paramd.scratchd.blink ]);
                    } else {
                        paramd.rawd.Led.push([ "on" ]);
                    }
                } else {
                    paramd.rawd.Led.push([ "off" ]);
                    paramd.rawd.Led.push([ "stop" ]);
                }
            }

            if ((paramd.cookd.brightness !== undefined) && (paramd.cookd.brightness > 0)) {
                paramd.rawd.Led.push([ "brightness", paramd.cookd.brightness * 255 ]);
            }
        },
    },
};
