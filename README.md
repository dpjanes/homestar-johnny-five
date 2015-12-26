# homestar-johnny-five

IOTDB / Home☆Star Module for [Arduino / JohnnyFive](http://johnny-five.io/) devices.

<img src="https://raw.githubusercontent.com/dpjanes/iotdb-homestar/master/docs/HomeStar.png" align="right" />

# Installation

[Install Home☆Star first](https://homestar.io/about/install).

Then:

    $ homestar install homestar-johnny-five


# Testing
## IOTDB

Blink an LED every two seconds

    var things = iot.connect('JohnnyFiveLED', {
        pin: 2
    });
    
    var count = 0;
    setInterval(function() {
        things.set(':on', count++ % 2)
    }, 1000);


## IoTQL

Turn on an LED

	CONNECT MODEL JohnnyFiveLED WITH pin = 2, meta:tag = "LED";
	SET state:on = true WHERE meta:tag = "LED";
	

# Technical
## How does it interface with Johnny-Five

All the data referenced in this section refers
to the "binding", which you can find in the
of the model.js files.

## Example Binding

We'll use this as a reference

    exports.binding = {
        model: require('./Something.json'),
        bridge: require('../JohnnyFiveBridge').Bridge,
        discover: false,
        initd: {
            component: "Pin",
            pin: 13,
            type: "digital",
            model: 1,   // output
        },
        connectd: {
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

### Component Creation

"binding.initd.component" determines which Johnny-Five
component is being created. For example, if you want to 
use the Johnny-Five [Pin](http://johnny-five.io/api/pin/)
component, this would be "Pin". All the other items
in "initd" are passed to the constructor. So for example,
this definition

    initd: {
        component: "Pin",
        pin: 13,
        type: "digital",
        model: 1,   // output
    }

ends up doing something like this

    component = new five.Pin({
        pin: 13,
        type: "digital",
        model: 1,
    })
