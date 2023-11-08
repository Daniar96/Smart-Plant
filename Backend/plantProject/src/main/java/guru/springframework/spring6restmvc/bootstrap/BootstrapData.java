package guru.springframework.spring6restmvc.bootstrap;


import guru.springframework.spring6restmvc.entities.*;
import guru.springframework.spring6restmvc.repositories.MeasurementRepository;
import guru.springframework.spring6restmvc.repositories.NotificationRepository;
import guru.springframework.spring6restmvc.repositories.PlantRepository;
import guru.springframework.spring6restmvc.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.HashSet;
import java.util.UUID;

/**
 * Created by jt, Spring Framework Guru.
 */
@Component
@RequiredArgsConstructor
public class BootstrapData implements CommandLineRunner {
    private final PlantRepository plantRepository;
    private final UserRepository userRepository;
    private final NotificationRepository notificationRepository;
    private final MeasurementRepository measurementRepository;

    Plant plant1;
    Plant plant2;
    Plant plant3;

    Notification notification1;
    Notification notification2;
    Notification notification3;

    User user1;
    User user2;
    User user3;
    User user4;

    BCryptPasswordEncoder bCrypt;

    @Override
    public void run(String... args) throws Exception {
        bCrypt = new BCryptPasswordEncoder();

        loadPlantData();
        loadUserData();
        loadMeasurement();
        loadNotifications();
    }



    private void loadPlantData() {

        if (plantRepository.count() == 0){
            plant1 = Plant.builder()
                    .plantName("Catus")
                    .age(10)
                    .mode(Boolean.FALSE)
                    .build();

            plant2 = Plant.builder()
                    .plantName("Fiddle Leaf Fig")
                    .age(13)
                    .mode(Boolean.FALSE)
                    .build();

            plant3 = Plant.builder()
                    .plantName("Spider Plant")
                    .mode(Boolean.FALSE)
                    .age(2)
                    .build();

            plantRepository.save(plant1);
            plantRepository.save(plant2);
            plantRepository.save(plant3);
        }
    }

    private void loadUserData() {
        if (userRepository.count() == 0) {
             user1 = User.builder()
                    .username("tico")
                    .email("tico@gmail.com")
                    .fullName("Timon beld")
                    .admin(Boolean.FALSE)
                    .createDate(LocalDateTime.now())
                    .hashedpassword(bCrypt.encode("123"))
                    .plants(new HashSet<>(Arrays.asList(plant1, plant2, plant3)))
                    .build();
             user2 = User.builder()
                    .email("kazi@gmail.com")
                    .username("Kazi")
                    .fullName("Kazi Rifat Hasan")
                    .admin(Boolean.FALSE)
                    .createDate(LocalDateTime.now())
                    .hashedpassword(bCrypt.encode("123"))
                    .plants(new HashSet<>(Arrays.asList(plant1)))
                    .build();
             user3 = User.builder()
                    .email("Nikita@gmail.com")
                    .username("nikita")
                    .fullName("Elon musk")
                    .admin(Boolean.TRUE)
                    .createDate(LocalDateTime.now())
                    .hashedpassword(bCrypt.encode("123"))
                    .plants(new HashSet<>(Arrays.asList(plant2)))
                    .build();

             user4 = User.builder()
                    .email("Pieter@gmail.com")
                    .username("Pieter")
                    .admin(Boolean.TRUE)
                    .createDate(LocalDateTime.now())
                    .plants(new HashSet<>(Arrays.asList(plant3, plant2)))
                    .hashedpassword(bCrypt.encode("I smoke"))
                    .build();

            userRepository.save(user1);
            userRepository.save(user2);
            userRepository.save(user3);
            userRepository.save(user4);
        }
    }

    private void loadNotifications() {

        if (notificationRepository.count() == 0){
            notification1 = Notification.builder()
                    .title("Plant needs Water!")
                    .body("Your plant needs water. Please give it some!")
                    .user(user1)
                    .status(Status.OPEN)
                    .build();
            notification2 = Notification.builder()
                    .title("Fill waterTank!")
                    .body("The water tank is empty.Please fill it.")
                    .user(user1)
                    .status(Status.OPEN)
                    .build();
            notification3 = Notification.builder()
                    .title("Plant needs Water!")
                    .body("Your plant will need water. please give it.")
                    .user(user1)
                    .status(Status.READ)
                    .build();
            notificationRepository.save(notification1);
            notificationRepository.save(notification2);
            notificationRepository.save(notification3);
        }
    }

    private void loadMeasurement() {
        if (measurementRepository.count() == 0) {
            Measurement measurement1 = Measurement.builder()
                    .measurementId(UUID.randomUUID())
                    .uv(5F)
                    .humidity(6F)
                    .temp(7f)
                    .water(10f)
                    .plant(plant1)
                    .build();
            Measurement measurement2 = Measurement.builder()
                    .uv(5F)
                    .humidity(7F)
                    .temp(5f)
                    .plant(plant2)
                    .build();
            Measurement measurement3 = Measurement.builder()
                    .measurementId(UUID.randomUUID())
                    .date(LocalDateTime.now())
                    .plant(plant2)
                    .uv(7F)
                    .humidity(9F)
                    .temp(3f)
                    .build();

            Measurement measurement4 = Measurement.builder()
                    .measurementId(UUID.randomUUID())
                    .plant(plant2)
                    .uv(2F)
                    .humidity(8F)
                    .temp(5f)
                    .build();

            Measurement measurement5 = Measurement.builder()
                    .measurementId(UUID.randomUUID())
                    .plant(plant2)
                    .uv(6F)
                    .humidity(5F)
                    .temp(6f)
                    .build();

            Measurement measurement6 = Measurement.builder()
                    .measurementId(UUID.randomUUID())
                    .plant(plant2)
                    .uv(7F)
                    .humidity(6F)
                    .temp(7f)
                    .build();
            Measurement measurement7 = Measurement.builder()
                    .measurementId(UUID.randomUUID())
                    .uv(9F)
                    .humidity(6F)
                    .temp(7f)
                    .plant(plant1)
                    .build();
            Measurement measurement8 = Measurement.builder()
                    .measurementId(UUID.randomUUID())
                    .uv(5F)
                    .humidity(3F)
                    .temp(3f)
                    .plant(plant1)
                    .build();
            Measurement measurement9 = Measurement.builder()
                    .measurementId(UUID.randomUUID())
                    .uv(7F)
                    .humidity(6F)
                    .temp(9f)
                    .plant(plant1)
                    .build();

            Measurement measurement10 = Measurement.builder()
                    .measurementId(UUID.randomUUID())
                    .uv(4F)
                    .humidity(7F)
                    .temp(5f)
                    .plant(plant3)
                    .build();
            Measurement measurement11 = Measurement.builder()
                    .measurementId(UUID.randomUUID())
                    .uv(7F)
                    .humidity(6F)
                    .temp(9f)
                    .plant(plant3)
                    .build();
            Measurement measurement12 = Measurement.builder()
                    .measurementId(UUID.randomUUID())
                    .uv(6F)
                    .humidity(4F)
                    .temp(3f)
                    .plant(plant3)
                    .build();



            measurementRepository.save(measurement1);
            measurementRepository.save(measurement2);
            measurementRepository.save(measurement3);
            measurementRepository.save(measurement4);
            measurementRepository.save(measurement5);
            measurementRepository.save(measurement6);
            measurementRepository.save(measurement7);
            measurementRepository.save(measurement8);
            measurementRepository.save(measurement9);
            measurementRepository.save(measurement10);
            measurementRepository.save(measurement11);
            measurementRepository.save(measurement12);


        }
    }
}
