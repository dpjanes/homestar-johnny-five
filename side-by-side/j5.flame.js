/**
 *  j5.flame.js
 *
 *  Demonstrate Grove Flame Sensor
 *
 *  Original:
 *  http://johnny-five.io/examples/grove-flame-sensor-edison/
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

  // Plug the Flame Detector Sensor into D4
  var flame = new five.Sensor.Digital(4);

  // Plug the Piezo module into the
  // Grove Shield's D6 jack.
  var alarm = new five.Piezo(6);

  flame.on("change", function() {
    if (this.value) {
      if (!alarm.isPlaying) {
        alarm.frequency(five.Piezo.Notes.d5, 5000);
      }
    }
  });
});
