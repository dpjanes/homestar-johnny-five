/*
 *  How to use this module in IOTDB / HomeStar
 *  This is the best way to do this
 */

"use strict";

const iotdb = require('iotdb');
iotdb.use("homestar-johnny-five");

const things = iotdb.connect('JohnnyFiveLED', {
    pin: 2
});
things.on("istate", function(thing) {
    console.log("+", "istate", thing.thing_id(), "\n ", thing.state("istate"));
});
things.on("meta", function(thing) {
    console.log("+", "meta", thing.thing_id(), "\n ", thing.state("meta"));
});
things.on("thing", function(thing) {
    console.log("+", "discovered", thing.thing_id(), "\n ", thing.state("meta"));
});



let count = 0;
setInterval(function() {
    things.set(':on', count++ % 2)
}, 1000); 
