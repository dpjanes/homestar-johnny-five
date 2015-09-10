/**
 *  iotdb.flame.js
 *
 *  Demonstrate Grove MQ2 Gas Sensor using IOTDB
 *
 *  Original:
 *  http://johnny-five.io/examples/grove-gas-mq2-edison/
 */

var iotdb = require('iotdb');

var flame = iotdb.connect("GroveGasMQ2Sensor", {
    pin: 4,
});
var alarm = iotdb.connect("JohnnyFivePiezo", {
    pin: 6,
});
alarm.set(":duration", 5.0);

flame.on(":sensor.chemical", function(thing, attribute, value) {
    if (value > 600) {
        alarm.set(":frequency", 440);
    }
});
