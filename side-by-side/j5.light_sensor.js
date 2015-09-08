/**
 *  j5.light_sensor.js
 *
 *  Demonstrate Grove Light Sensor
 *
 *  Original:
 *  http://johnny-five.io/examples/grove-light-sensor-edison/
 */

var five = require("johnny-five");
var boardd = {
    repl: false,
};
try {
    boardd.io = new require("edison-io")();
}
catch (x) {
}
var board = new five.Board(boardd);

board.on("ready", function() {

  // Plug the Grove TSL2561 Light sensor module
  // into an I2C jack
  var light = new five.Light({
    controller: "TSL2561"
  });

  light.on("change", function() {
    console.log("Ambient Light Level: ", this.level);
  });
});
