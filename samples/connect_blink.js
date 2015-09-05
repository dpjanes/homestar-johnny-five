/*
 *  NOTE: prefer to do the way 'model.js' works
 *  Connect to a Denon AVR at a named host
 */

"use strict";

var JohnnyFiveBridge = require('../JohnnyFiveBridge').Bridge;

var bridge = new JohnnyFiveBridge({
    component: "Led",
    pin: 2,
});
bridge.discovered = function (bridge) {
    console.log("+ got one", bridge.meta());
    bridge.pulled = function (state) {
        console.log("+ state-change", state);
    };
    bridge.connect({
        data_out: function(paramd) {
            if (paramd.cookd.on !== undefined) {
                if (paramd.cookd.on) {
                    paramd.rawd.Led = "on";
                } else {
                    paramd.rawd.Led = "off";
                }
            }
        },
    });

    var count = 0;
    setInterval(function() {
        bridge.push({
            on: ++count % 2,
        }, function() {});
    }, 1000); 
};
bridge.discover();
