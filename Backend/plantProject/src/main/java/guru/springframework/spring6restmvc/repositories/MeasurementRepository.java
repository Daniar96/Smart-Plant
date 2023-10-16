package guru.springframework.spring6restmvc.repositories;

import guru.springframework.spring6restmvc.entities.Measurement;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface MeasurementRepository extends JpaRepository<Measurement, UUID> {

}
