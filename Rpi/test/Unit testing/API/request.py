import time
import requests
from Rpi.constants import path


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
    temperature = 31.12345
    humidity = 50
    uv_measurement = 70.1
    water_tank = 75.1234

    t = f"{temperature:.2f}"
    h = f"{humidity:.2f}"
    uv = f"{uv_measurement:.2f}"
    water = f"{water_tank:.2f}"

    print(f"Humidity= {t}%")
    print(f"Temperature= {h}°C")
    print(f"UV= {uv}°%")
    print(f"Water level= {water}°%")

    data = {"temperature": t, "humidity": h, "uv": uv, "water_tank": water_tank}

    headers = {
        "Content-Type": "application/json"
    }

    request_url = path.URL + plant_id
    try:
        r = requests.post(url=request_url, headers=headers, json=data, cookies=constants.credentials, verify=False)
        response = r.status_code
        print(response)
    except Exception as e:
        print(e)
    time.sleep(20)


if __name__ == "__main__":
    plant_id = getPlantID()
    send_measurements(plant_id)
