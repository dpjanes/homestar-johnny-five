/*
 *  GroveGasMQ2Sensor.js
 *
 *  David Janes
 *  IOTDB
 *  2015-09-05
 */

"use strict";

var iotdb = require("iotdb")

exports.binding = {
	model: require("./grove-gas-mq2-sensor.json"),
    bridge: require('../JohnnyFiveBridge').Bridge,
    discover: false,
    initd: {
        component: "Sensor",
        pin: "A0",
    },
    connectd: {
        data_in: function (paramd) {
            if ((paramd.rawd.value !== undefined) && (paramd.rawd.event === "change")) {
                paramd.cookd.chemical = paramd.rawd.value / 102.4;
            }
        },
    },
};
