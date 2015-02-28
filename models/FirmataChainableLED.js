/*
 *  FirmataChainableLED.js
 *
 *  David Janes
 *  IOTDB
 *  2014-04-30
 */

"use strict";

var iotdb = require("iotdb")

exports.Model = iotdb.make_model('FirmataChainableLED')
    .product("http://www.seeedstudio.com/depot/Grove-Chainable-RGB-LED-p-850.html")
    .facet(":device.lighting")
    .attribute(
        iotdb.make_color(":color")
            .control()
        )
    .make();

/*
    .
    .driver_identity(":firmata")
    .driver_setup(function(paramd) {
        paramd.initd.n = 1;
        paramd.initd.extension = "cled";
        paramd.initd.pins = "rgb:pin=7,mode=sysex-output-int8";
    })
    .driver_in(function(paramd) {
        // paramd.libs.log(paramd.driverd)
    })
    .driver_out(function(paramd) {
        if (paramd.thingd.color !== undefined) {
            var c = new paramd.libs.Color(paramd.thingd.color)
            paramd.driverd.rgb = [ c.r * 255, c.g * 255, c.b * 255 ]
        }
    })
 */
