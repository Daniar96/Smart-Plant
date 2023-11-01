import time
import board
import busio
import adafruit_ads1x15.ads1115 as ADS
from adafruit_ads1x15.analog_in import AnalogIn
import math
import time
import requests
from Rpi.constants import path



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




def getPlantID():
    request_url = path.URL + "getPlant"
    headers = {
        "Content-Type": "application/json"
    }

    try:
        r = requests.get(url=request_url, cookies=path.credentials, headers=headers, verify=False)
        response = r.json()
        print(response)
        return response
    except Exception as e:
        print(e)


def send_measurements(plant_id):
    # while True:
    temperature = calculateTemp()
    humidity = calculateHumid()
    uv_measurement = calculateLight()
    # water_tank = 75.1234

    t = f"{temperature:.2f}"
    h = f"{humidity:.2f}"
    uv = f"{uv_measurement:.2f}"
    # water = f"{water_tank:.2f}"

    print(f"Humidity= {h}%")
    print(f"Temperature= {t}°C")
    print(f"UV= {uv}°%")
    # print(f"Water level= {water}°%")

    # data = {"temperature": t, "humidity": h, "uv": uv, "water_tank": water_tank}
    data = {"humidity": h, "uv": uv, "temp": t}

    headers = {
        "Content-Type": "application/json"
    }

    request_url = path.URL + plant_id
    try:
        r = requests.post(url=request_url, headers=headers, json=data, cookies=path.credentials, verify=False)
        response = r.status_code
        print(response)
    except Exception as e:
        print(e)
    time.sleep(20)


if __name__ == "__main__":
    plant_id = getPlantID()
    send_measurements(plant_id)


