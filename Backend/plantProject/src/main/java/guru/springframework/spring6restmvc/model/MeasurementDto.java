package guru.springframework.spring6restmvc.model;

import guru.springframework.spring6restmvc.entities.Plant;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Builder
public class MeasurementDto {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private UUID measurementId;

    private LocalDateTime date;

    private Float temp;

    private Float humidity;

    private Float uv;

    private Plant plant;

    private Float water;

}
