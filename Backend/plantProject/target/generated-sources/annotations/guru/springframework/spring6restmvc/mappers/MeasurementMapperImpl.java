package guru.springframework.spring6restmvc.mappers;

import guru.springframework.spring6restmvc.entities.Measurement;
import guru.springframework.spring6restmvc.model.MeasurementDto;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-10-16T14:33:22+0200",
    comments = "version: 1.5.2.Final, compiler: javac, environment: Java 17.0.7 (Oracle Corporation)"
)
@Component
public class MeasurementMapperImpl implements MeasurementMapper {

    @Override
    public Measurement measurementDtoToMeasurement(MeasurementDto measurementDto) {
        if ( measurementDto == null ) {
            return null;
        }

        Measurement.MeasurementBuilder measurement = Measurement.builder();

        measurement.measurementId( measurementDto.getMeasurementId() );
        measurement.date( measurementDto.getDate() );
        measurement.temp( measurementDto.getTemp() );
        measurement.humidity( measurementDto.getHumidity() );
        measurement.uv( measurementDto.getUv() );

        return measurement.build();
    }

    @Override
    public MeasurementDto measurementToMeasurementDto(Measurement measurement) {
        if ( measurement == null ) {
            return null;
        }

        MeasurementDto.MeasurementDtoBuilder measurementDto = MeasurementDto.builder();

        measurementDto.measurementId( measurement.getMeasurementId() );
        measurementDto.date( measurement.getDate() );
        measurementDto.temp( measurement.getTemp() );
        measurementDto.humidity( measurement.getHumidity() );
        measurementDto.uv( measurement.getUv() );

        return measurementDto.build();
    }
}
