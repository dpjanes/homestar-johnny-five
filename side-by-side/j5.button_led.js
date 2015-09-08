/**
 *  j5.button_led.js
 *
 *  Demonstrate connecting a Button to a LED using Johnny Five
 *
 *  Original:
 *  http://johnny-five.io/examples/grove-button-edison/
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

  // Plug the Button module into the
  // Grove Shield's D4 jack
  var button = new five.Button(4);

  // Plug the LED module into the
  // Grove Shield's D6 jack. See
  // grove-led for more information.
  var led = new five.Led(6);

  // The following will turn the Led
  // on and off as the button is
  // pressed and released.
  button.on("press", function() {
    led.on();
  });

  button.on("release", function() {
    led.off();
  });
});
