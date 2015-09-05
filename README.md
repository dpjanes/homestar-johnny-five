# homestar-firmata

IOTDB / HomeStar Controller for Arduino / JohnnyFive devices

<img src="https://github.com/dpjanes/iotdb-homestar/blob/master/docs/HomeStar.png" align="right" />

# Installation

Install Home☆Star first. 
See: https://github.com/dpjanes/iotdb-homestar#installation

Then

    $ homestar install homestar-firmata

# Quick Start

XXX

	$ npm install -g homestar ## with 'sudo' if error
	$ homestar setup
	$ homestar install homestar-firmata
	$ node
	>>> iotdb = require('iotdb')
	>>> iot = iotdb.iot()
	>>> things = iot.connect("WeMoSocket")
	>>> things.set(":on", false)

# Technical
## How does it interface with Johnny-Five

All the data referenced in this section refers
to the "binding", which you can find in the
of the model.js files.

## Example Binding

We'll use this as a reference

    exports.binding = {
        model: exports.Model,
        bridge: require('../JohnnyFiveBridge').Bridge,
        discover: false,
        initd: {
            pin: 13,
            type: "digital",
            model: 1,   // output
        },
        connectd: {
            component: "Pin",

            data_out: function (paramd) {
                if (paramd.cookd.on !== undefined) {
                    if (paramd.cookd.on) {
                        paramd.rawd.Pin = [ "write", 1 ];
                    } else {
                        paramd.rawd.Pin = [ "write", 0 ];
                    }
                }
            },
        },
    };

### Board

* The "Board" is automatically created, doing the 
"best thing" for the current environment. For example,
if you are on a Mac it will look to the serial port.
If you're on an Edison, it will create an Edison parameter.
* Right now we are only supporting a single board.
* We may change / enhance this, but it won't break stuff
already written

### Component Connection

The 



