package guru.springframework.spring6restmvc.services;

import guru.springframework.spring6restmvc.model.MeasurementDto;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface MeasurementService {
    List<MeasurementDto> listAllMeasurements();

    Optional<MeasurementDto> getMeasurementById(UUID measurementId);

    MeasurementDto saveNewMeasurement(MeasurementDto measurement);


    Boolean deleteMeasurementById(UUID measurementId);

    Optional<MeasurementDto> patchMeasurementById(UUID measurementId, MeasurementDto measurement);
}
