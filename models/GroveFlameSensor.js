/*
 *  GroveFlameSensor.js
 *
 *  David Janes
 *  IOTDB
 *  2015-09-10
 *
 *  Grove Flame Sensor (which basically is 
 *  an on / off button, but we hide that)
 *
 *  http://www.seeedstudio.com/wiki/Grove_-_Flame_Sensor
 */

"use strict";

var iotdb = require("iotdb")

exports.binding = {
    model: require('./GroveFlameSensor.json'),
    bridge: require('../JohnnyFiveBridge').Bridge,
    discover: false,
    initd: {
        component: "Button",
        pin: "2",
    },
    connectd: {
        data_in: function (paramd) {
            if (paramd.rawd.event === "up") {
                paramd.cookd.fire = false;
            } else if (paramd.rawd.event === "down") {
                paramd.cookd.fire = true;
            }
        },
    },
};
