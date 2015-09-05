/*
 *  NOTE: prefer to do the way 'model.js' works
 *  Connect to a Denon AVR at a named host
 */

"use strict";

var JohnnyFiveBridge = require('../JohnnyFiveBridge').Bridge;

var bridge = new JohnnyFiveBridge({
    component: "Sensor",
    pin: "A0",
});
bridge.discovered = function (bridge) {
    console.log("+ got one", bridge.meta());
    bridge.pulled = function (state) {
        console.log("+ state-change", state);
    };
    bridge.connect({
        data_in: function(paramd) {
            console.log(paramd.rawd.value);
        },
    });
};
bridge.discover();
