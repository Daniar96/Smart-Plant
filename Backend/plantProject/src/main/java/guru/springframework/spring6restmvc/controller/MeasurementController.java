package guru.springframework.spring6restmvc.controller;

import guru.springframework.spring6restmvc.services.MeasurementService;
import guru.springframework.spring6restmvc.model.MeasurementDto;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpHeaders;
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

    @GetMapping
    public List<MeasurementDto> listPlants(){
        return measurementService.listAllMeasurements();
    }

    @GetMapping(value = "{measurementId}")
    public Optional<MeasurementDto> getPlantById(@PathVariable("measurementId") UUID measurementId){
        return measurementService.getMeasurementById(measurementId);
    }

    @PostMapping
    public ResponseEntity handlePost(@RequestBody MeasurementDto plant){

        MeasurementDto savedPlant = measurementService.saveNewMeasurement(plant);

        HttpHeaders headers = new HttpHeaders();
        headers.add("Location", "/api/v1/plant/" + savedPlant.getMeasurementId().toString());

        return new ResponseEntity(headers, HttpStatus.CREATED);
    }

    @PatchMapping("{measurementId}")
    public ResponseEntity updateBeerPatchById(@PathVariable("measurementId") UUID measurementId, @RequestBody MeasurementDto plant){

        measurementService.patchMeasurementById(measurementId, plant);

        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }

    @DeleteMapping("{measurementId}")
    public ResponseEntity deleteById(@PathVariable("measurementId") UUID measurementId){

        measurementService.deleteMeasurementById(measurementId);

        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }

}
