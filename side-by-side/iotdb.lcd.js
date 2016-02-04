/**
 *  iotdb.lcd.js
 *
 *  Demonstrate Grove MQ2 RGB LCD being controlled 
 *  by a Rotatary Pot using IOTDB
 *
 *  Original:
 *  http://johnny-five.io/examples/grove-lcd-rgb-edison/
 */

var iotdb = require('iotdb');

var pot = iotdb.connect("JohnnyFiveSensorUnit", {
    pin: "A0",
});
var lcd = iotdb.connect("GroveRGBLCD");
var color = new iotdb._.color.Color();

pot.on(":sensor", function(thing, attribute, value) {
    var hex = color.set_hsl(value, 1, 0.5).get_hex();

    lcd.set(":color", hex);
    lcd.set(":message.text", hex);
});
