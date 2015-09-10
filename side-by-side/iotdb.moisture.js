/**
 *  iotdb.moisture.js
 *
 *  Demonstrate Grove Moisture Sensor using IOTDB
 *
 *  Original:
 *  http://johnny-five.io/examples/grove-moisture-edison/
 */

var iotdb = require('iotdb');

var moisture = iotdb.connect("GroveMoistureSensor", {
    pin: "A0",
});
var relay = iotdb.connect("GroveRelay", {
    pin: 6,
});
relay.set(":duration", 5.0);

moisture.on(":sensor.water", function(thing, attribute, value) {
    relay.set(":on", (value < 0.2));
});
