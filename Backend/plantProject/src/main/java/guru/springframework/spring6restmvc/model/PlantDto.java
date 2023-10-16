package guru.springframework.spring6restmvc.model;

import guru.springframework.spring6restmvc.entities.Measurement;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.Builder;
import lombok.Data;

import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Builder
@Data
public class PlantDto {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID plantId;
    private String plantName;

    private Set<Measurement> measurements;

}
