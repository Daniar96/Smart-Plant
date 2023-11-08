package guru.springframework.spring6restmvc.bootstrap;

import guru.springframework.spring6restmvc.repositories.MeasurementRepository;
import guru.springframework.spring6restmvc.repositories.NotificationRepository;
import guru.springframework.spring6restmvc.repositories.PlantRepository;
import guru.springframework.spring6restmvc.repositories.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
class BootstrapDataTest {

    @Autowired
    UserRepository userRepository;

    @Autowired
    PlantRepository plantRepository;

    @Autowired
    NotificationRepository notificationRepository;

    @Autowired
    MeasurementRepository measurementRepository;

    BootstrapData bootstrapData;

    @BeforeEach
    void setUp() {
        bootstrapData = new BootstrapData(plantRepository, userRepository, notificationRepository, measurementRepository);
    }

    @Test
    void Testrun() throws Exception {
        bootstrapData.run(null);

        assertThat(plantRepository.count()).isEqualTo(3);
        assertThat(userRepository.count()).isEqualTo(4);

    }
}





