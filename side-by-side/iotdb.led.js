/**
 *  iotdb.led.js
 *
 *  Demonstrate Grove LED with IOTDB.
 *  Notice how blinking is an effect, rather
 *  than a thing on it's own
 *
 *  Original:
 *  http://johnny-five.io/examples/grove-led-edison/
 */

var iotdb = require('iotdb');

var led = iotdb.connect("JohnnyFiveLED", {
    pin: 6,
});

led.set(":effect.blink", 0.5);
led.set(":on", true);

// just for fun, turn it off after 10 seconds
setTimeout(function() {
    led.set(":on", false);
}, 10 * 1000);
