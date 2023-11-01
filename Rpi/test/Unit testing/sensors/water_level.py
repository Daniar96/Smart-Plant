import RPi.GPIO as GPIO
import time
from Rpi.constants.pin_assignment import water_level_input_pin

# Set the GPIO mode
GPIO.setmode(GPIO.BCM)

# Set the GPIO pin

GPIO.setup(water_level_input_pin, GPIO.OUT)

try:
    while True:
        # Read the sensor value
        sensor_value = GPIO.input(water_level_input_pin)

        # Print the sensor value
        print("Sensor value:", sensor_value)

        # You can add your logic here based on the sensor value
        # For instance, you might want to check if the water level is above or below a certain threshold

        time.sleep(1)  # Wait for a second before reading the sensor again

except KeyboardInterrupt:
    GPIO.cleanup()  # Clean up