/**
 *  j5.joystick.js
 *
 *  Demonstrate Grove Joystick
 *
 *  Original:
 *  http://johnny-five.io/examples/grove-joystick-edison/
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

  // Plug the Joystick module into the
  // Grove Shield's A0 jack. Use
  // the Joystick class to control.
  var joystick = new five.Joystick([ "A0", "A1" ]);

  // Observe change events from the Joystick!
  joystick.on("change", function() {
    console.log("Joystick");
    console.log("  x : ", this.x);
    console.log("  y : ", this.y);
    console.log("--------------------------------------");
  });
});
