/*
 *  JohnnyFiveLightSensor.js
 *
 *  David Janes
 *  IOTDB
 *  2014-05-01
 */

"use strict";

var iotdb = require("iotdb")

exports.Model = iotdb.make_model('JohnnyFiveLightSensor')
    .product("http://www.seeedstudio.com/depot/Grove-Light-Sensor-p-746.html")
    .facet(":device.sensor.light")
    .help("make sure to set initd.pin")
    .attribute(
        iotdb.make_unit(":sensor.light")
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
