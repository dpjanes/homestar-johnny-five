/*
 *  index.js
 *
 *  David Janes
 *  IOTDB.org
 *  2015-02-28
 *
 *  Copyright [2013-2015] [David P. Janes]
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

"use strict";

exports.Bridge = require('./JohnnyFiveBridge').Bridge;
exports.bindings = [
    // output models
    require('./models/JohnnyFiveLED').binding,
    require('./models/JohnnyFiveOn').binding,

    // input models
    require('./models/JohnnyFiveButton').binding,
    require('./models/JohnnyFiveSensor').binding,
    require('./models/JohnnyFiveSensorUnit').binding,
    require('./models/JohnnyFiveSensorPercent').binding,

    // Grove input models
    require('./models/GroveMoistureSensor').binding,
    /*
    require('models/JohnnyFiveChainableLED'),
    require('models/JohnnyFiveDHT11'),
    require('models/JohnnyFiveGroveThermistor'),
    require('models/JohnnyFiveInputBoolean'),
    require('models/JohnnyFiveInputUnit'),
    require('models/JohnnyFiveLightDimmer'),
    require('models/JohnnyFiveLightSensor'),
    require('models/JohnnyFiveLightSimple'),
    require('models/JohnnyFiveMotionSensor'),
    require('models/JohnnyFiveNeoPixel'),
    require('models/JohnnyFiveOutput'),
    require('models/JohnnyFiveSoundSensor'),
    require('models/JohnnyFiveSwitch'),
    require('models/JohnnyFiveThreeAxisCompass'),
    */
];

exports.iotdb = require("iotdb");
exports.wrap = function(name, initd) {
    return exports.iotdb.make_wrap(name, exports.bindings, initd);
};
