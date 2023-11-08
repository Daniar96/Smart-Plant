package guru.springframework.spring6restmvc.controller;

import guru.springframework.spring6restmvc.entities.Plant;
import guru.springframework.spring6restmvc.mappers.PlantMapper;
import guru.springframework.spring6restmvc.model.MeasurementDto;
import guru.springframework.spring6restmvc.model.PlantDto;
import guru.springframework.spring6restmvc.services.MeasurementService;
import guru.springframework.spring6restmvc.services.PlantService;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@AllArgsConstructor
@CrossOrigin
@RestController
@RequestMapping("/api/measurement")
public class MeasurementController {

    private final MeasurementService measurementService;
    private final PlantService plantService;

    private final PlantMapper plantMapper;


    @GetMapping
    public List<MeasurementDto> listMeasurements(){

        return measurementService.listAllMeasurements();
    }

    @GetMapping(value = "{plantId}")
    public Page<MeasurementDto> getMeasurementByPlant(@PathVariable("plantId") UUID plantId, @RequestParam(required = false) Integer pageNumber, @RequestParam(required = false) Integer pageSize){
        Optional<PlantDto> plantOptional = plantService.getPlantById(plantId);
        if (plantOptional.isEmpty()){
            return null;
        }
        Plant plant = plantMapper.plantDtoToPlant(plantOptional.get());

        return measurementService.listAllMeasurementsByPlant(plant, pageNumber, pageSize);
    }
    @GetMapping(value = "getById/{measurementId}")
    public Optional<MeasurementDto> getMeasurementById(@PathVariable("measurementId") UUID measurementId){
        return measurementService.getMeasurementById(measurementId);
    }


    @PatchMapping("{measurementId}")
    public ResponseEntity patchMeasurementById(@PathVariable("measurementId") UUID measurementId, @RequestBody MeasurementDto plant){

        measurementService.patchMeasurementById(measurementId, plant);

        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }

    @DeleteMapping("{measurementId}")
    public ResponseEntity deleteById(@PathVariable("measurementId") UUID measurementId){

        measurementService.deleteMeasurementById(measurementId);

        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }

}
