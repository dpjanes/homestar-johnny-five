/*
 *  JohnnyFiveThreeAxisCompass.js
 *
 *  David Janes
 *  IOTDB
 *  2014-04-30
 */

"use strict";

exports.Model = iotdb.make_model('JohnnyFiveThreeAxisCompass')
    .help("make sure to set paramd.initd.declination (in degrees) using http://magnetic-declination.com/")
    .product("http://www.seeedstudio.com/depot/Grove-3Axis-Digital-Compass-p-759.html")
    .facet(":device.sensor.spatial")
    .attribute(
        iotdb.make_number(":heading")
            .reading()
            .unit(":angle.si.degree")
    )
    .attribute(
        iotdb.make_number(":x")
            .reading()
            .vector("x/y/z")
    )
    .attribute(
        iotdb.make_number(":y")
            .reading()
            .vector("x/y/z")
    )
    .attribute(
        iotdb.make_number("z")
            .reading()
            .vector("x/y/z")
    )
    .make();

/*
    .driver_identity(":firmata")
    .driver_setup(function(paramd) {
        paramd.initd.extension = "tac";
        paramd.initd.pins = "xyz:pin=2,mode=sysex-input-float";
        paramd.initd.scale = 1.3        // only if you do new hardware
        paramd.initd.declination = 0    // in _degrees_
    })
    .driver_in(function(paramd) {
        var xyz = paramd.driverd.xyz
        if (xyz !== undefined) {
            var scale = paramd.initd.scale

            xyz[0] *= scale
            xyz[1] *= scale
            xyz[2] *= scale

            var heading = Math.atan2(xyz[1], xyz[0]) 
            heading *= 180.0 / Math.PI; 
            heading += paramd.initd.declination
            if (heading < 0) {
                heading += 360
            } else if (heading >= 360) {
                heading -= 360
            }

            paramd.thingd.heading = heading
            paramd.thingd.x = xyz[0]
            paramd.thingd.y = xyz[1]
            paramd.thingd.z = xyz[2]
        }
    })
    .make()
    ;

 */
