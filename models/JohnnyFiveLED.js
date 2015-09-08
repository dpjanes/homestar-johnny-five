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

exports.Model = iotdb.make_model('JohnnyFiveLED')
    .description("control with Johnny-Five.LED")
    .io(iotdb.boolean.on)
    .make();

exports.binding = {
    model: exports.Model,
    bridge: require('../JohnnyFiveBridge').Bridge,
    discover: false,
    initd: {
        component: "Led",
        pin: 13,
    },
    connectd: {
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
