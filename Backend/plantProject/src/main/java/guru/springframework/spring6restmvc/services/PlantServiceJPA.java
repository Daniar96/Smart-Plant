package guru.springframework.spring6restmvc.services;

import guru.springframework.spring6restmvc.entities.Measurement;
import guru.springframework.spring6restmvc.mappers.PlantMapper;
import guru.springframework.spring6restmvc.model.PlantDto;
import guru.springframework.spring6restmvc.repositories.PlantRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicReference;
import java.util.stream.Collectors;

/**
 * Created by jt, Spring Framework Guru.
 */
@Service
@Primary
@RequiredArgsConstructor
public class PlantServiceJPA implements PlantService {
    private final PlantRepository PlantRepository;
    private final PlantMapper plantMapper;

    @Override
    public List<PlantDto> listAllPlants() {
        return PlantRepository.findAll()
                .stream()
                .map(plantMapper::plantToPlantDto)
                .collect(Collectors.toList());
    }

    @Override
    public Optional<PlantDto> getPlantById(UUID id) {
        return Optional.ofNullable(plantMapper.plantToPlantDto(PlantRepository.findById(id)
                .orElse(null)));
    }

    @Override
    public PlantDto saveNewPlant(PlantDto plant) {
        return plantMapper.plantToPlantDto(PlantRepository.save(plantMapper.plantDtoToPlant(plant)));
    }

    @Override
    public Optional<PlantDto> updatePlantById(UUID plantId, PlantDto plant) {
        AtomicReference<Optional<PlantDto>> atomicReference = new AtomicReference<>();

        PlantRepository.findById(plantId).ifPresentOrElse(foundPlant -> {
            foundPlant.setPlantName(plant.getPlantName());
            atomicReference.set(Optional.of(plantMapper
                    .plantToPlantDto(PlantRepository.save(foundPlant))));
        }, () -> {
            atomicReference.set(Optional.empty());
        });
        return atomicReference.get();
    }

    @Override
    public Boolean deletePlantById(UUID plantId) {
        if (PlantRepository.existsById(plantId)) {
            PlantRepository.deleteById(plantId);
            return true;
        }
        return false;
    }

    @Override
    public Optional<PlantDto> patchPlantById(UUID plantId, PlantDto plant) {
        AtomicReference<Optional<PlantDto>> atomicReference = new AtomicReference<>();

        PlantRepository.findById(plantId).ifPresentOrElse(foundPlant -> {
            if (StringUtils.hasText(plant.getPlantName())){
                foundPlant.setPlantName(plant.getPlantName());
            }
            atomicReference.set(Optional.of(plantMapper
                    .plantToPlantDto(PlantRepository.save(foundPlant))));
        }, () -> {
            atomicReference.set(Optional.empty());
        });
        return atomicReference.get();
    }

    @Override
    public Optional<Measurement> getPlantMeasurement(UUID measurementId) {
        return Optional.empty();
    }
}
