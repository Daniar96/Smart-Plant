import http.server
import http.server
import socketserver
from Rpi.constants import path
import json


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
            print(json_data)
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
    with socketserver.TCPServer((path.pi_public_ip, path.PORT), MyHandler) as httpd:
        print("serving at port", path.PORT)
        print(httpd.server_address, httpd)
        httpd.serve_forever()
def pr():
    while True:
        print("hehe ")
if __name__ == '__main__':
    run_http_client()
