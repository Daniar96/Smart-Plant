max_watering_duration = 20
# Min and max constants used for calibration of the humidity sensor after measuring different circumstances.
min_voltage_const_light = 0.004  # When the sensor is held against a flashlight, this number is maximum I measured
max_voltage_const_light = 3.3  # When the sensor is held in deep dark, in a hand, in a dark room, this number is the maximum I measured
# Min and max constants used for calibration of the humidity sensor after measuring different circumstances.
min_voltage_const_humid = 0.955  # When the sensor is held in water, this number is the average
max_voltage_const_humid = 2.505  # When the sensor is held in the air, this number is the average
max_water_level = 5000
water_released_per_second = 10