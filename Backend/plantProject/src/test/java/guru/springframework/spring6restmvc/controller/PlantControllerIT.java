package guru.springframework.spring6restmvc.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import guru.springframework.spring6restmvc.entities.Plant;
import guru.springframework.spring6restmvc.mappers.PlantMapper;
import guru.springframework.spring6restmvc.model.PlantDto;
import guru.springframework.spring6restmvc.repositories.PlantRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.context.WebApplicationContext;

import java.util.*;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.patch;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
class PlantControllerIT {

    public static String PLANT_PATH_ID = "/api/plant";
    @Autowired
    PlantController plantController;

    @Autowired
    PlantRepository plantRepository;

    @Autowired
    PlantMapper plantMapper;

    @Autowired
    ObjectMapper objectMapper;

    @Autowired
    WebApplicationContext wac;

    MockMvc mockMvc;

    @BeforeEach
    void setUp() {
        mockMvc = MockMvcBuilders.webAppContextSetup(wac).build();
    }

    @Test
    void testPatchPlantBadName() throws Exception {
        Plant plant = plantRepository.findAll().get(0);

        Map<String, Object> plantMap = new HashMap<>();
        plantMap.put("plantName", "New Name 1234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890");

        mockMvc.perform(patch(PLANT_PATH_ID, plant.getPlantId())
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(plantMap)))
                .andExpect(status().isBadRequest());
    }

    @Test
    void testDeleteByIDNotFound() {
        assertThrows(ChangeSetPersister.NotFoundException.class, () -> {
            plantController.deleteById(UUID.randomUUID());
        });
    }

    @Rollback
    @Transactional
    @Test
    void deleteByIdFound() {
        Plant plant = plantRepository.findAll().get(0);

        ResponseEntity responseEntity = plantController.deleteById(plant.getPlantId());
        assertThat(responseEntity.getStatusCode()).isEqualTo(HttpStatusCode.valueOf(204));

        assertThat(plantRepository.findById(plant.getPlantId()).isEmpty());
    }

    @Test
    void testUpdateNotFound() {
        assertThrows(ChangeSetPersister.NotFoundException.class, () -> {
            plantController.updateById(UUID.randomUUID(), PlantDto.builder().build());
        });
    }

    @Rollback
    @Transactional
    @Test
    void updateExistingPlant() {
        Plant plant = plantRepository.findAll().get(0);
        PlantDto plantDto = plantMapper.plantToPlantDto(plant);
        plantDto.setPlantId(null);
        final String plantName = "UPDATED";
        plantDto.setPlantName(plantName);

        ResponseEntity responseEntity = plantController.updateById(plant.getPlantId(), plantDto);
        assertThat(responseEntity.getStatusCode()).isEqualTo(HttpStatusCode.valueOf(204));

        Plant updatedPlant = plantRepository.findById(plant.getPlantId()).get();
        assertThat(updatedPlant.getPlantName()).isEqualTo(plantName);
    }

    @Rollback
    @Transactional
    @Test
    void saveNewPlantTest() {
        PlantDto plantDto = PlantDto.builder()
                .plantName("New Plant")
                .build();

        ResponseEntity responseEntity = plantController.handlePost(plantDto);

        assertThat(responseEntity.getStatusCode()).isEqualTo(HttpStatusCode.valueOf(201));
        assertThat(responseEntity.getHeaders().getLocation()).isNotNull();

        String[] locationUUID = responseEntity.getHeaders().getLocation().getPath().split("/");
        UUID savedUUID = UUID.fromString(locationUUID[4]);

        Plant plant = plantRepository.findById(savedUUID).get();
        assertThat(plant).isNotNull();
    }

    @Test
    void testPlantIdNotFound() {
        assertThrows(ChangeSetPersister.NotFoundException.class, () -> {
            plantController.getPlantById(UUID.randomUUID());
        });
    }

    @Test
    void testGetById() {
        Plant plant = plantRepository.findAll().get(0);

        Optional<PlantDto> dto = plantController.getPlantById(plant.getPlantId());

        assertThat(dto).isNotNull();
    }

    @Test
    void testListPlants() {
        List<PlantDto> dtos = plantController.listAllPlants();

        assertThat(dtos.size()).isEqualTo(3);
    }

    @Rollback
    @Transactional
    @Test
    void testEmptyList() {
        plantRepository.deleteAll();
        List<PlantDto> dtos = plantController.listAllPlants();
        assertThat(dtos.size()).isEqualTo(0);
    }
}







