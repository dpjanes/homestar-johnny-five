# homestar-firmata

IOTDB / HomeStar Controller for Arduino / Firmata devices

# Quick Start

XXX

	$ npm install -g homestar ## with 'sudo' if error
	$ npm install iotdb
	$ homestar install homestar-firmata
	$ node
	>>> iotdb = require('iotdb')
	>>> iot = iotdb.iot()
	>>> things = iot.connect("WeMoSocket")
	>>> things.set(":on", false)

