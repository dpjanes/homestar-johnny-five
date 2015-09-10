/*
 *  How to use this module in IOTDB / HomeStar
 *  This is the best way to do this
 *  Note: to work, this package must have been installed by 'homestar install' 
 */

"use strict";

var iotdb = require('iotdb');
var iot = iotdb.iot();

var things = iot.connect('JohnnyFivePiezo', {
    pin: 3
});
things.on("istate", function(thing) {
    console.log("+", "istate", thing.thing_id(), "\n ", thing.state("istate"));
});
things.on("ostate", function(thing) {
    console.log("+", "ostate", thing.thing_id(), "\n ", thing.state("istate"));
});
things.on("meta", function(thing) {
    console.log("+", "meta", thing.thing_id(), "\n ", thing.state("meta"));
});
things.on("thing", function(thing) {
    console.log("+", "discovered", thing.thing_id(), "\n ", thing.state("meta"));
});

things.set(':frequency', 440);
