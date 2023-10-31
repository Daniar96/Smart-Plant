import threading
import http.server
import http.server
import socketserver
# import RPi.GPIO as GPIO
import time
import path
import json

# Constants

valve_output_pin = 17
max_watering_duration = 15


class MyHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        # default_watering_duration = 10

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
            return

    def do_POST(self):
        # Handle POST requests here
        pass


def run_http_client():
    # with socketserver.TCPServer(("", path.PORT), MyHandler) as httpd:
    #     print("serving at port", path.PORT)
    #     httpd.serve_forever()
    with socketserver.TCPServer(("localhost", path.PORT), MyHandler) as httpd:
        print("serving at port", path.PORT)
        print(httpd.server_address, httpd)
        httpd.serve_forever()


def release_water(seconds):
    print("releasing water for" + str(seconds))
    pass
    # GPIO.output(valve_output_pin, GPIO.HIGH)
    # time.sleep(seconds)
    # GPIO.output(valve_output_pin, GPIO.LOW)


def setup_sensors():
    pass
    # GPIO.setmode(GPIO.BCM)
    # GPIO.setup(valve_output_pin, GPIO.OUT)


def run_sensors():
    while True:
        time.sleep(10)
        print("sensors running")


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
