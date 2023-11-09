import board
import busio
import adafruit_ads1x15.ads1115 as ADS
from adafruit_ads1x15.analog_in import AnalogIn
import math
import requests
import RPi.GPIO as GPIO
import threading
import http.server
import http.server
import socketserver
from time import sleep
import json

from constants import path
from constants.pin_assignment import valve_output_pin, water_level_input_pin
from constants.properties import *

# Constants
max_watering_duration = 20
# Min and max constants used for calibration of the humidity sensor after measuring different circumstances.
min_voltage_const_light = 0.004  # When the sensor is held against a flashlight, this number is maximum I measured
max_voltage_const_light = 3.3  # When the sensor is held in deep dark, in a hand, in a dark room, this number is the maximum I measured
# Min and max constants used for calibration of the humidity sensor after measuring different circumstances.
min_voltage_const_humid = 0.955  # When the sensor is held in water, this number is the average
max_voltage_const_humid = 2.505  # When the sensor is held in the air, this number is the average


def calculateLight(channel):
    difference_min_max = max_voltage_const_light - min_voltage_const_light
    check = ((channel.voltage - max_voltage_const_light) / difference_min_max) * -100
    if (check >= 100):
        return 100
    if (check <= 0):
        return 0
    else:
        return ((channel.voltage - max_voltage_const_light) / difference_min_max) * -100


def calculateHumid(channel):
    difference_min_max = max_voltage_const_humid - min_voltage_const_humid
    check = ((channel.voltage - max_voltage_const_humid) / difference_min_max) * -100
    if (check >= 100):
        return 100
    if (check <= 0):
        return 0
    else:
        return ((channel.voltage - max_voltage_const_humid) / difference_min_max) * -100


def calculateTemp(channel):
    temperature = ((channel.voltage / 3.3) * 10000) / (1 - (channel.voltage / 3.3))
    temperature = 1 / ((1 / 298.15) + (1 / 3950) * math.log(temperature / 10000))
    return temperature - 273.15


def calculateWater():
    global current_water_level
    sensor_value = GPIO.input(water_level_input_pin)
    print(f"Water level sensor outputs:{sensor_value}")
    print(f"Current water level: {current_water_level}")

    water_lock.acquire()
    if sensor_value == 1:
        current_water_level = max_water_level
        water_percentage = 100
    else:
        water_percentage = (current_water_level / max_water_level) * 100

    water_lock.release()
    return water_percentage
    # water_lock.acquire()
    # sensor_value = GPIO.input(water_level_input_pin)
    # water_lock.release()
    # return sensor_value


def release_water(seconds):
    global current_water_level
    water_lock.acquire()
    print(f"current_water_level changed from {current_water_level} to :")
    current_water_level = max(0, current_water_level - (seconds * water_released_per_second))
    print(current_water_level)
    water_lock.release()
    GPIO.output(valve_output_pin, GPIO.HIGH)
    sleep(seconds)
    GPIO.output(valve_output_pin, GPIO.LOW)
    return
    # water_lock.acquire()
    # GPIO.output(valve_output_pin, GPIO.HIGH)
    # sleep(seconds)
    # GPIO.output(valve_output_pin, GPIO.LOW)
    # water_lock.release()
    # return


def setup_sensors():
    # Start the I2C bus
    i2c = busio.I2C(board.SCL, board.SDA)

    # Start the Analog to Digital object using the I2C bus
    ads = ADS.ADS1115(i2c)

    # Create single-ended input on channels
    chan0 = AnalogIn(ads, ADS.P2)
    chan1 = AnalogIn(ads, ADS.P1)
    chan2 = AnalogIn(ads, ADS.P0)

    # Set the GPIO mode
    GPIO.setmode(GPIO.BCM)

    # Set the GPIO pin

    GPIO.setup(water_level_input_pin, GPIO.OUT)
    GPIO.setmode(GPIO.BCM)
    GPIO.setup(valve_output_pin, GPIO.OUT)
    GPIO.output(valve_output_pin, GPIO.LOW)
    return chan0, chan1, chan2


def send_measurements(plant_id, temp_chan, humid_chan, light_chan):
    while True:
        temperature = calculateTemp(temp_chan)
        humidity = calculateHumid(humid_chan)
        uv_measurement = calculateLight(light_chan)
        water_tank = calculateWater()

        t = f"{temperature:.2f}"
        h = f"{humidity:.2f}"
        uv = f"{uv_measurement:.2f}"
        water = f"{water_tank:.2f}"

        print(f"Humidity= {h}%")
        print(f"Temperature= {t}°C")
        print(f"UV= {uv}°%")
        print(f"Water level= {water}°%")

        data = {"temp": t, "humidity": h, "uv": uv, "water": water}
        # data = {"humidity": h, "uv": uv, "temp": t}

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
            pass
        # ---------------------------------------------------------
        sleep(8)


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


class MyHandler(http.server.SimpleHTTPRequestHandler):

    def do_POST(self):
        try:
            content_length = int(self.headers['Content-Length'])
            body = self.rfile.read(content_length)
            json_data = json.loads(body)
            print(json_data)
            # process the JSON data as needed
            duration = float(json_data["duration"])
            release_water(min(max_watering_duration, duration))
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')  # Allow requests from all origins
            self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
            self.send_header('Access-Control-Allow-Headers', 'Content-Type')
            self.end_headers()
            json_data = {"duration": min(max_watering_duration, duration)}
            self.wfile.write(str(json_data).encode('utf-8'))
            return
        except Exception as e:
            print(e)
            print()
            self.send_response(400)
            self.send_header('Access-Control-Allow-Origin', '*')  # Allow requests from all origins
            self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
            self.send_header('Access-Control-Allow-Headers', 'Content-Type')
            self.end_headers()
            return


def run_http_client():
    socketserver.TCPServer.allow_reuse_address = True
    with socketserver.TCPServer((path.pi_public_ip, path.PORT), MyHandler) as httpd:
        print("serving at port", path.PORT)
        print(httpd.server_address, httpd)
        httpd.serve_forever()


def start_server():
    try:
        run_http_client()
    except KeyboardInterrupt:
        pass


if __name__ == "__main__":
    water_lock = threading.Lock()
    current_water_level = 0

    plant_id = getPlantID()
    temp_chan, humid_chan, light_chan = setup_sensors()

    # Start the HTTP server in a separate thread
    http_thread = threading.Thread(target=start_server)
    http_thread.start()

    send_measurements(plant_id, temp_chan, humid_chan, light_chan)

    # Perform cleanup after threads finish
    http_thread.join()
    GPIO.cleanup()  # Clean up GPIO
    print("Shutdown")
