/*
 *  JohnnyFiveSoundSensor.js
 *
 *  David Janes
 *  IOTDB
 *  2014-05-01
 */

"use strict";

var iotdb = require("iotdb")

exports.Model = iotdb.make_model('JohnnyFiveSoundSensor')
    .product("http://www.seeedstudio.com/depot/Grove-Sound-Sensor-p-752.html")
    .help("make sure to set initd.pin")
    .facet(":device.sensor.sound")
    .attribute(
        iotdb.make_unit(":sensor.sound")
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
