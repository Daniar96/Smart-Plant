package guru.springframework.spring6restmvc.mappers;

import guru.springframework.spring6restmvc.entities.Measurement;
import guru.springframework.spring6restmvc.entities.Plant;
import guru.springframework.spring6restmvc.entities.User;
import guru.springframework.spring6restmvc.model.PlantDto;
import java.util.LinkedHashSet;
import java.util.Set;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-11-07T14:23:10+0100",
    comments = "version: 1.5.2.Final, compiler: javac, environment: Java 17.0.7 (Oracle Corporation)"
)
@Component
public class PlantMapperImpl implements PlantMapper {

    @Override
    public Plant plantDtoToPlant(PlantDto plantDto) {
        if ( plantDto == null ) {
            return null;
        }

        Plant.PlantBuilder plant = Plant.builder();

        plant.plantId( plantDto.getPlantId() );
        plant.age( plantDto.getAge() );
        plant.lastWater( plantDto.getLastWater() );
        plant.threshold( plantDto.getThreshold() );
        plant.location( plantDto.getLocation() );
        plant.mode( plantDto.getMode() );
        plant.plantName( plantDto.getPlantName() );
        Set<Measurement> set = plantDto.getMeasurements();
        if ( set != null ) {
            plant.measurements( new LinkedHashSet<Measurement>( set ) );
        }
        Set<User> set1 = plantDto.getUsers();
        if ( set1 != null ) {
            plant.users( new LinkedHashSet<User>( set1 ) );
        }

        return plant.build();
    }

    @Override
    public PlantDto plantToPlantDto(Plant plant) {
        if ( plant == null ) {
            return null;
        }

        PlantDto.PlantDtoBuilder plantDto = PlantDto.builder();

        plantDto.plantId( plant.getPlantId() );
        plantDto.plantName( plant.getPlantName() );
        plantDto.age( plant.getAge() );
        plantDto.lastWater( plant.getLastWater() );
        plantDto.threshold( plant.getThreshold() );
        plantDto.mode( plant.getMode() );
        plantDto.location( plant.getLocation() );
        Set<Measurement> set = plant.getMeasurements();
        if ( set != null ) {
            plantDto.measurements( new LinkedHashSet<Measurement>( set ) );
        }
        Set<User> set1 = plant.getUsers();
        if ( set1 != null ) {
            plantDto.users( new LinkedHashSet<User>( set1 ) );
        }

        return plantDto.build();
    }
}
