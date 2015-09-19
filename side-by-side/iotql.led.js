CONNECT MODEL JohnnyFiveLED WITH pin = 6, meta:name = "The LED";

SET
    state:effect.blink = 0.5,
    state:on = true
WHERE
    meta:name = "The LED";
