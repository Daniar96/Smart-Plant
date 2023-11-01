import time
import board
import busio
import adafruit_ads1x15.ads1115 as ADS
from adafruit_ads1x15.analog_in import AnalogIn
import math



# Start the I2C bus
i2c = busio.I2C(board.SCL, board.SDA)


# Start the Analog to Digital object using the I2C bus
ads = ADS.ADS1115(i2c)


# Create single-ended input on channels
chan0 = AnalogIn (ads, ADS.P0)

# Min and max constants used for calibration of the humidity sensor after measuring different circumstances.
min_voltage_const_light = 0.004 # When the sensor is held against a flashlight, this number is maximum I measured
max_voltage_const_light = 3.3 # When the sensor is held in deep dark, in a hand, in a dark room, this number is the maximum I measured


def calculateLight():
    difference_min_max = max_voltage_const_light - min_voltage_const_light
    check = ((chan0.voltage - max_voltage_const_light)/ difference_min_max) * -100
    if(check >= 100):
        return 100
    if(check <= 0):
        return 0
    else:
        return ((chan0.voltage - max_voltage_const_light)/ difference_min_max) * -100




while True:
    print ("channel 0:", "{:> 5} \ t {:> 5.3f}". format (chan0.value, chan0.voltage))
    print("Light level: ")
    print(calculateLight())
    print("---------------------------------------------------")
    time.sleep(1)

