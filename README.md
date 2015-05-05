# homestar-firmata

IOTDB / HomeStar Controller for Arduino / Firmata devices

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

