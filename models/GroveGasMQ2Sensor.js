/*
 *  GroveGasMQ2Sensor.js
 *
 *  David Janes
 *  IOTDB
 *  2015-09-05
 */

"use strict";

var iotdb = require("iotdb")

exports.Model = iotdb.make_model('GroveGasMQ2Sensor')
    .facet(":sensor.chemical")
    .i(iotdb.sensor.number.chemical)
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
                paramd.cookd.chemical = paramd.rawd.value;
            }
        },
    },
};
