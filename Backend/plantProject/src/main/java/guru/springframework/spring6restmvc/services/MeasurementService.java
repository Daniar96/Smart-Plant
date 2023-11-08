package guru.springframework.spring6restmvc.services;

import guru.springframework.spring6restmvc.entities.Plant;
import guru.springframework.spring6restmvc.entities.User;
import guru.springframework.spring6restmvc.model.MeasurementDto;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface MeasurementService {

    Page<MeasurementDto> listAllMeasurementsByPlant(Plant plant, Integer pageNumber, Integer pageSize);
    List<MeasurementDto> listAllMeasurements();

    Optional<MeasurementDto> getMeasurementById(UUID measurementId);

    MeasurementDto saveNewMeasurement(Plant plant, MeasurementDto measurement);


    Boolean deleteMeasurementById(UUID measurementId);

    Optional<MeasurementDto> patchMeasurementById(UUID measurementId, MeasurementDto measurement);

}
