package guru.springframework.spring6restmvc.repositories;

import guru.springframework.spring6restmvc.entities.Plant;
import jakarta.validation.ConstraintViolationException;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.math.BigDecimal;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;

@DataJpaTest
class PlantRepositoryTest {

    @Autowired
    PlantRepository plantRepository;

    @Test
    void testSavePlantNameTooLong() {

        assertThrows(ConstraintViolationException.class, () -> {
            Plant savedPlant = plantRepository.save(Plant.builder()
                    .plantName("My Plant 0123345678901233456789012334567890123345678901233456789012334567890123345678901233456789")
                    .age(10)
                    .build());

            plantRepository.flush();
        });
    }

    @Test
    void testSavePlant() {
        Plant savedPlant = plantRepository.save(Plant.builder()
                .plantName("My Plant 0123345678901233456789012334567890123345678901233456789012334567890123345678901233456789")
                .age(10)
                .build());

        plantRepository.flush();

        assertThat(savedPlant).isNotNull();
        assertThat(savedPlant.getPlantId()).isNotNull();
    }
}