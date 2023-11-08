package guru.springframework.spring6restmvc.services;

import guru.springframework.spring6restmvc.entities.Measurement;
import guru.springframework.spring6restmvc.entities.Plant;
import guru.springframework.spring6restmvc.entities.User;
import guru.springframework.spring6restmvc.model.PlantDto;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface PlantService {
    List<PlantDto> listAllPlants();

    Optional<PlantDto> getPlantById(UUID plantId);

    PlantDto saveNewPlant(User user, PlantDto plant);

    Optional<PlantDto> updatePlantById(UUID plantId, PlantDto plant);

    Boolean deletePlantById(UUID plantId);

    Optional<PlantDto> patchPlantById(UUID plantId, PlantDto plant);

    List<PlantDto> getPlantsByUserId(User user);

    Optional<Measurement> getPlantMeasurement(UUID measurementId);

    UUID getFirstInRepository();

    List<User> getPlantUsers(Plant plant);
}
