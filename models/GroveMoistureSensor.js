/*
 *  GroveMoistureSensor.js
 *
 *  David Janes
 *  IOTDB
 *  2015-09-05
 */

"use strict";

var iotdb = require("iotdb")

exports.Model = iotdb.make_model('GroveMoistureSensor')
    .facet(":sensor.water")
    .i(iotdb.sensor.number.water)
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
            if ((paramd.rawd.value !== undefined) && (paramd.rawd.event === "change")) {
                paramd.cookd.water = paramd.rawd.value;
            }
        },
    },
};
