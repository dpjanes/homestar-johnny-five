/*
 *  JohnnyFiveSensorPercent.js
 *
 *  David Janes
 *  IOTDB
 *  2015-09-05
 */

"use strict";

var iotdb = require("iotdb")

exports.Model = iotdb.make_model('JohnnyFiveSensorPercent')
    .i("value", iotdb.sensor.percent)
    .make();

exports.binding = {
    model: exports.Model,
    bridge: require('../JohnnyFiveBridge').Bridge,
    discover: false,
    initd: {
        component: "Sensor",
        pin: "A0",
    },
    connectd: {
        data_in: function (paramd) {
            if (paramd.rawd.value !== undefined) {
                paramd.cookd.value = paramd.rawd.value / 102.40;
            }
        },
    },
};
