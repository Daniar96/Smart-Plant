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
chan1 = AnalogIn (ads, ADS.P1)


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





while True:
    print ("channel 1:", "{:> 5} \ t {:> 5.3f}". format (chan1.value, chan1.voltage))
    print("Moisture level: ")
    print(calculateHumid())
    print("---------------------------------------------------")
    time.sleep(1)

