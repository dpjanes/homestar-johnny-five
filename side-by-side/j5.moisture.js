/**
 *  j5.moisture.js
 *
 *  Demonstrate Grove Moisture Sensor
 *
 *  Original:
 *  http://johnny-five.io/examples/grove-moisture-edison/
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

  // Plug the Moisture module into the
  // Grove Shield's A0 jack
  var moisture = new five.Sensor("A0");

  // Plug the Relay module into the
  // Grove Shield's D6 jack.
  var relay = new five.Relay(6);

  moisture.scale(0, 100).on("change", function() {
    // 0 - Dry
    // 50 - Wet
    if (this.value < 20) {
      if (!relay.isOn) {
        // Turn on the water pump!
        relay.on();
      }
    } else {
      relay.off();
    }
  });
});
