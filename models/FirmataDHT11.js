/*
 *  FirmataDHT11.js
 *
 *  David Janes
 *  IOTDB
 *  2014-04-30
 *
 *  Arduino DHT11 temperature sensor connected to Pin 2
 */

"use strict";

var iotdb = require("iotdb")

exports.Model = iotdb.make_model('FirmataDHT11')
    .product("http://www.seeedstudio.com/depot/Grove-TempHumi-Sensor-p-745.html")
    .facet(":device.sensor.humidity")
    .facet(":device.sensor.temperature")
    .attribute(
        iotdb.make_number(":sensor.humidity")
            .reading()
            .unit(":math.fraction.percent")
    )
    .attribute(
        iotdb.make_number(":sensor.temperature")
            .reading()
            .unit(":temperature.si.celsius")
    )
    .make();

/*
    .driver_identity(":firmata")
    .driver_setup(function(paramd) {
        paramd.initd.extension = "dht";
        paramd.initd.pins = "ht:pin=2,mode=sysex-input-float";
    })
    .driver_in(function(paramd) {
        if (paramd.driverd.ht !== undefined) {
            paramd.thingd.humidity = paramd.driverd.ht[0]
            paramd.thingd.temperature = paramd.driverd.ht[1]
        }
    })
    .driver_out(function(paramd) {
    })
    .make()
    ;

 */
