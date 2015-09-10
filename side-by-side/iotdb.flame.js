/**
 *  iotdb.flame.js
 *
 *  Demonstrate Grove Flame Sensor using IOTDB
 *
 *  Original:
 *  http://johnny-five.io/examples/grove-flame-sensor-edison/
 */

var iotdb = require('iotdb');

var flame = iotdb.connect("GroveFlameSensor", {
    pin: 4,
});
var alarm = iotdb.connect("JohnnyFivePiezo", {
    pin: 6,
});
alarm.set(":duration", 5.0);

flame.on(":sensor.fire", function(thing, attribute, value) {
    if (value) {
        alarm.set(":frequency", 440);
    }
});
