import threading
import http.server
import http.server
import socketserver
import RPi.GPIO as GPIO
import time
from Rpi.constants import path
from Rpi.constants.pin_assignment import valve_output_pin, water_level_input_pin
import json

max_watering_duration = 20


class MyHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        
        try:
            content_length = int(self.headers['Content-Length'])
            # if content_length < 8:
            #     self.send_response(200, "No data was provided, watering the plant for" + str(default_watering_duration))
            #     return

            body = self.rfile.read(content_length)
            json_data = json.loads(body)
            # process the JSON data as needed

            # if time in json_data:
            #     self.send_response(200, "No data was provided, watering the plant for" + str(default_watering_duration))
            #     return
            release_water(min(max_watering_duration, json_data["duration"]))
            self.send_response(200)
            self.end_headers()
            return
        except:
            self.send_response(400)
            self.end_headers()
            return

    def do_POST(self):
        # Handle POST requests here
        pass


def run_http_client():
    # with socketserver.TCPServer(("", path.PORT), MyHandler) as httpd:
    #     print("serving at port", path.PORT)
    #     httpd.serve_forever()
    # with socketserver.TCPServer(("localhost", path.PORT), MyHandler) as httpd:
    with socketserver.TCPServer((path.pi_public_ip, path.PORT), MyHandler) as httpd:
        print("serving at port", path.PORT)
        print(httpd.server_address, httpd)
        httpd.serve_forever()


def release_water(seconds):
    GPIO.output(valve_output_pin, GPIO.HIGH)
    time.sleep(seconds)
    GPIO.output(valve_output_pin, GPIO.LOW)
    return


def setup_sensors():
# Set the GPIO mode
    GPIO.setmode(GPIO.BCM)

    # Set the GPIO pin

    GPIO.setup(water_level_input_pin, GPIO.OUT)
    GPIO.setmode(GPIO.BCM)
    GPIO.setup(valve_output_pin, GPIO.OUT)


def run_sensors():
    while True:
        # Read the sensor value
        sensor_value = GPIO.input(water_level_input_pin)

        # Print the sensor value
        print("Sensor value:", sensor_value)

        # You can add your logic here based on the sensor value
        # For instance, you might want to check if the water level is above or below a certain threshold

        time.sleep(1)  # Wait for a second before reading the sensor again


if __name__ == '__main__':
    setup_sensors()
    # Start the HTTP client in a separate thread
    http_thread = threading.Thread(target=run_http_client)
    http_thread.start()

    run_sensors()

    http_thread.join()
    # Run sensors in a meantime
    run_sensors()
    # GPIO.cleanup()
