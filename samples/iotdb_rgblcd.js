/*
 *  How to use this module in IOTDB / HomeStar
 *  This is the best way to do this
 *
 *  You'll need a Grove RGB LCD plugged into the I2C port
 */

"use strict";

const iotdb = require('iotdb');
iotdb.use("homestar-johnny-five");

const things = iotdb.connect('GroveRGBLCD', {});
things.on("meta", function(thing) {
    console.log("+", "meta", thing.thing_id(), "\n ", thing.state("meta"));
});
things.on("thing", function(thing) {
    console.log("+", "discovered", thing.thing_id(), "\n ", thing.state("meta"));
});

const colors = [ "red", "green", "blue", "white" ];

let count = 0;
setInterval(function() {
    things.set(':message.text', "Count: " + count);
    things.set(':color', colors[count % colors.length])
    count++;
}, 1000); 
