package guru.springframework.spring6restmvc.mappers;

import guru.springframework.spring6restmvc.entities.Measurement;
import guru.springframework.spring6restmvc.entities.Plant;
import guru.springframework.spring6restmvc.model.MeasurementDto;
import guru.springframework.spring6restmvc.model.PlantDto;
import org.mapstruct.Mapper;

@Mapper
public interface MeasurementMapper {
    Measurement measurementDtoToMeasurement(MeasurementDto measurementDto);

    MeasurementDto measurementToMeasurementDto(Measurement measurement);
}
