package guru.springframework.spring6restmvc.mappers;

import guru.springframework.spring6restmvc.model.PlantDto;
import guru.springframework.spring6restmvc.entities.Plant;
import org.mapstruct.Mapper;

/**
 * Created by jt, Spring Framework Guru.
 */
@Mapper
public interface PlantMapper {

    Plant plantDtoToPlant(PlantDto plantDto);

    PlantDto plantToPlantDto(Plant plant);

}
