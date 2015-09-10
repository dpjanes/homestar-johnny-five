/*
 *  JohnnyFivePiezo.js
 *
 *  David Janes
 *  IOTDB
 *  2015-09-08
 *
 *  Note the "iot:clear-value" means we can keep
 *  writing to "frequency" over and over again
 */

"use strict";

var iotdb = require("iotdb")

exports.Model = iotdb.make_model('JohnnyFivePiezo')
    .action("off", { "iot:purpose": "iot-purpose:on.false" })
    .o("frequency", iotdb.number.frequency.property("iot:clear-value", true))
    .o("duration", iotdb.number.duration)
    .make();

exports.binding = {
    model: exports.Model,
    bridge: require('../JohnnyFiveBridge').Bridge,
    discover: false,
    initd: {
        component: "Piezo",
        pin: 13,
    },
    connectd: {
        data_out: function (paramd) {
            if (paramd.cookd.duration) {
                paramd.scratchd.duration = paramd.cookd.duration * 1000;
            }

            if (paramd.cookd.off) {
                paramd.rawd.noTone = 1;
            } else if (paramd.cookd.frequency !== undefined) {
                if (paramd.scratchd.duration === undefined) {
                    paramd.scratchd.duration = 1000;
                }

                paramd.rawd.Piezo = [ "frequency", paramd.cookd.frequency, paramd.scratchd.duration ];
            }
        },
    },
};
