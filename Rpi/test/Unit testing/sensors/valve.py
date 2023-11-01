import RPi.GPIO as GPIO
from time import sleep
from Rpi.constants.pin_assignment import valve_output_pin


def setup_sensors():
    pass
    GPIO.setmode(GPIO.BCM)
    GPIO.setup(valve_output_pin, GPIO.OUT)


def run_sensors():
    while True:
        GPIO.output(17, GPIO.HIGH)
        sleep(5)
        GPIO.output(17, GPIO.LOW)


if __name__ == '__main__':
    setup_sensors()
    run_sensors()
