/**
 *  j5.gas_mq2.js
 *
 *  Demonstrate Grove MQ2 Gas Sensor
 *
 *  Original:
 *  http://johnny-five.io/examples/grove-gas-mq2-edison/
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

  // Plug the MQ2 Gas (Combustible Gas/Smoke)
  // module into the Grove Shield's A0 jack
  var gas = new five.Sensor("A0");

  // Plug the Piezo module into the
  // Grove Shield's D6 jack.
  var alarm = new five.Piezo(6);

  gas.scale(0, 100).on("change", function() {
    if (this.value > 60) {
      if (!alarm.isPlaying) {
        alarm.frequency(five.Piezo.Notes.d5, 5000);
      }
    }
  });
});
