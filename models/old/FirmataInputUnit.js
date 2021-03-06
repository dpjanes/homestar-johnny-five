/*
 *  JohnnyFiveInputUnit.js
 *
 *  David Janes
 *  IOTDB
 *  2014-04-30
 */

"use strict";

var iotdb = require("iotdb")

exports.Model = iotdb.make_model('JohnnyFiveInputUnit')
    .product("http://www.seeedstudio.com/depot/Grove-Rotary-Angle-Sensor-p-770.html")
    .facet(":device.control")
    .help("make sure to set initd.pin")
    .attribute(
        iotdb.make_unit(":value")
            .reading()
    )
    .make();

/*
    .driver_identity(":firmata")
    .driver_setup(function(paramd) {
        paramd.initd.pins = "value:mode=analog-input"
    })
    .make()
    ;
 */
