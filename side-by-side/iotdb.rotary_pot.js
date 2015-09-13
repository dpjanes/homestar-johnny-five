/**
 *  iotdb.rotary_pot.js
 *
 *  Demonstrate Grove Rotatary Pot with IOTDB
 *
 *  Original:
 *  http://johnny-five.io/examples/grove-rotary-potentiometer-edison/
 */

var iotdb = require('iotdb');

var pot = iotdb.connect("JohnnyFiveSensorUnit", {
    pin: "A0",
});
var led = iotdb.connect("JohnnyFiveLED", {
    pin: 6,
});

pot.on(":sensor", function(thing, attribute, value) {
    led.set(":brightness", value);
});
