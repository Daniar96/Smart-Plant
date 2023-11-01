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
chan2 = AnalogIn (ads, ADS.P2)


def calculateTemp():
    temperature = ((chan2.voltage / 3.3) * 10000) / (1 - (chan2.voltage / 3.3))
    temperature = 1 / ((1 / 298.15) + (1 / 3950) * math.log(temperature / 10000))
    return temperature - 273.15


while True:
    print ("channel 2:", "{:> 5} \ t {:> 5.3f}". format (chan2.value, chan2.voltage))
    print("Temperature: ",'%.2f' %  calculateTemp(),"degC")
    print("---------------------------------------------------")
    time.sleep(1)

