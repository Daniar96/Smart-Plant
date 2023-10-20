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
chan1 = AnalogIn (ads, ADS.P1)
chan2 = AnalogIn (ads, ADS.P2)


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


# Min and max constants used for calibration of the humidity sensor after measuring different circumstances.
min_voltage_const_humid = 0.955 # When the sensor is held in water, this number is the average
max_voltage_const_humid = 2.505 # When the sensor is held in the air, this number is the average


def calculateHumid():
    difference_min_max = max_voltage_const_humid - min_voltage_const_humid
    check = ((chan1.voltage - max_voltage_const_humid)/ difference_min_max) * -100
    if(check >= 100):
        return 100
    if(check <= 0):
        return 0
    else:
        return ((chan1.voltage - max_voltage_const_humid)/ difference_min_max) * -100


def calculateTemp():
    temperature = ((chan2.voltage / 3.3) * 10000) / (1 - (chan2.voltage / 3.3))
    temperature = 1 / ((1 / 298.15) + (1 / 3950) * math.log(temperature / 10000))
    return temperature - 273.15


while True:
    print ("channel 0:", "{:> 5} \ t {:> 5.3f}". format (chan0.value, chan0.voltage))
    print("Light level: ")
    print(calculateLight())
    print ("channel 1:", "{:> 5} \ t {:> 5.3f}". format (chan1.value, chan1.voltage))
    print("Moisture level: ")
    print(calculateHumid())
    print ("channel 2:", "{:> 5} \ t {:> 5.3f}". format (chan2.value, chan2.voltage))
    print("Temperature: ",'%.2f' %  calculateTemp(),"degC")
    print("---------------------------------------------------")
    time.sleep(1)
