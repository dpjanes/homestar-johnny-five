/**
 *  iotdb.gas_mq2.js
 *
 *  Demonstrate Grove MQ2 Gas Sensor using IOTDB
 *
 *  Original:
 *  http://johnny-five.io/examples/grove-gas-mq2-edison/
 */

var iotdb = require('iotdb');

var gas = iotdb.connect("GroveGasMQ2Sensor", {
    pin: 4,
});
var alarm = iotdb.connect("JohnnyFivePiezo", {
    pin: 6,
});
alarm.set(":duration", 5.0);

gas.on(":sensor.chemical", function(thing, attribute, value) {
    if (value > 0.6) {
        alarm.set(":frequency", 440);
    }
});
