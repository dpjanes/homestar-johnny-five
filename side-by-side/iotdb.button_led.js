/**
 *  button_led_iotdb.js
 *
 *  Demonstrate connecting a Button to a LED using IOTDB
 *
 *  Original:
 *  http://johnny-five.io/examples/grove-button-edison/
 */

var iotdb = require('iotdb');

var button = iotdb.connect("JohnnyFiveButton", {
    pin: 4,
});
var led = iotdb.connect("JohnnyFiveLED", {
    pin: 6,
});

button.on(":on", function(thing, attribute, value) {
    led.set(":on", value);
});
