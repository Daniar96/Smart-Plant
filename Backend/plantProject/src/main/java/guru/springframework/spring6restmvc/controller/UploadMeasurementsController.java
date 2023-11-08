package guru.springframework.spring6restmvc.controller;

import guru.springframework.spring6restmvc.entities.Plant;
import guru.springframework.spring6restmvc.mappers.PlantMapper;
import guru.springframework.spring6restmvc.model.MeasurementDto;
import guru.springframework.spring6restmvc.model.PlantDto;
import guru.springframework.spring6restmvc.services.MeasurementService;
import guru.springframework.spring6restmvc.services.PlantService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import java.util.UUID;

@AllArgsConstructor
@CrossOrigin
@RestController
@RequestMapping("/measurement")
public class UploadMeasurementsController {

    private final MeasurementService measurementService;

    private final PlantService plantService;

    private final PlantMapper plantMapper;

    @GetMapping("/getPlant")
    public ResponseEntity<UUID> getPiId(){

        UUID plantUUID = plantService.getFirstInRepository();
        if (plantUUID.equals(UUID.fromString("a7355e4c-0000-0000-0000-ec00b8309ae9"))){
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }

        return ResponseEntity.status(HttpStatus.OK).body(plantUUID);
    }

    @PostMapping(value = "{plantId}")
    public ResponseEntity handlePost(@PathVariable UUID plantId, @RequestBody MeasurementDto measurement){

        Optional<PlantDto> plantOptional = plantService.getPlantById(plantId);
        if (plantOptional.isEmpty()){
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }
        Plant plant = plantMapper.plantDtoToPlant(plantOptional.get());

        MeasurementDto savedMeasurement = measurementService.saveNewMeasurement(plant, measurement);
        if (savedMeasurement == null){
            return new ResponseEntity(HttpStatus.CONFLICT);
        }

        HttpHeaders headers = new HttpHeaders();
        headers.add("Location", "/api/measurement/" + measurement.getMeasurementId());

        return new ResponseEntity(headers, HttpStatus.CREATED);
    }


}