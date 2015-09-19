Side-by-side comparisons of Johnny-Five code vs IOTDB
usage of it.

Note that J5 is doing all the hard work of working 
with Arduino! IOTDB's contribution is making it _semantic_.

== IOTQL

Do

    npm install -g iotql

Then (e.g.)

    iotql --no-connect --load iotql.button_led.iotql
