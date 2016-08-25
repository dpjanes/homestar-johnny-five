/*
 *  JohnnyFiveButton.js
 *
 *  David Janes
 *  IOTDB
 *  2015-09-05
 *
 *  Buttons can be on/off
 */

"use strict";

var iotdb = require("iotdb")

exports.binding = {
	model: require("./johnny-five-button.json"),
    bridge: require('../JohnnyFiveBridge').Bridge,
    discover: false,
    initd: {
        component: "Button",
        pin: "2",
    },
    connectd: {
        data_in: function (paramd) {
            if (paramd.rawd.event === "up") {
                paramd.cookd.on = false;
            } else if (paramd.rawd.event === "down") {
                paramd.cookd.on = true;
            }
        },
    },
};
