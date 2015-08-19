/*
 *  FirmataOn.js
 *
 *  David Janes
 *  IOTDB
 *  2014-04-30
 */

"use strict";

var iotdb = require("iotdb")

exports.Model = iotdb.make_model('FirmataOn')
    .product("http://www.seeedstudio.com/depot/Grove-Red-LED-p-1142.html")
    .product("http://www.seeedstudio.com/depot/Grove-Blue-LED-p-1139.html")
    .product("http://www.seeedstudio.com/depot/Grove-Green-LED-p-1144.html")
    .product("http://www.seeedstudio.com/depot/Grove-Relay-p-769.html")
    .product("http://www.seeedstudio.com/depot/Grove-Vibration-Motor-p-839.html")
    .product("http://www.seeedstudio.com/depot/Grove-Buzzer-p-768.html")
    .description("turn something on")
    .help("make sure to set initd.pin")
    .io(iotdb.boolean.on)
    .make();

/*
    .driver_identity(":firmata")
    .driver_setup(function(paramd) {
        paramd.initd.pins = "on:mode=digital-output"
    })
    .make()
    ;
 */
exports.binding = {
    model: exports.Model,
    bridge: require('../FirmataBridge').Bridge,
    discover: false,
    connectd: {
        initialize: function(paramd) {
            paramd.device = new paramd.five.Led({
                pin: 13,
                board: paramd.board,
            });
        },

        data_out: function (paramd) {
            if (paramd.cookd.on !== undefined) {
                if (paramd.cookd.on) {
                    paramd.rawd.Led = [ "on" ];
                } else {
                    paramd.rawd.Led = [ "off" ];
                }
            }
        },
    },
};

/*
board.on("ready", function() {
  var led = new five.Led(13);
  led.blink(500);
});
*/

iotdb.connect("FirmataOn", {
    pin: 13,
});
