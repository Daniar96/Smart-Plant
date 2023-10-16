package guru.springframework.spring6restmvc.controller;

import guru.springframework.spring6restmvc.entities.Measurement;
import guru.springframework.spring6restmvc.services.PlantService;
import guru.springframework.spring6restmvc.model.PlantDto;
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
@RequestMapping("/api/plant")
public class PlantController {

    private final PlantService plantService;

    @GetMapping
    public List<PlantDto> listPlants(){
        return plantService.listAllPlants();
    }

    @GetMapping(value = "{plantId}")
    public Optional<PlantDto> getPlantById(@PathVariable("plantId") UUID plantId){
        return plantService.getPlantById(plantId);
    }

    @GetMapping(value = "/measurement/{measurementId}")
    public Optional<Measurement> getMeasurementByPlant(@PathVariable("measurementId") UUID measurementId){
        return plantService.getPlantMeasurement(measurementId);
    }

    @PostMapping
    public ResponseEntity handlePost(@RequestBody PlantDto plant){

        PlantDto savedPlant = plantService.saveNewPlant(plant);

        HttpHeaders headers = new HttpHeaders();
        headers.add("Location", "/api/v1/plant/" + savedPlant.getPlantId().toString());

        return new ResponseEntity(headers, HttpStatus.CREATED);
    }

    @PatchMapping("{plantId}")
    public ResponseEntity updateBeerPatchById(@PathVariable("plantId") UUID plantId, @RequestBody PlantDto plant){

        plantService.patchPlantById(plantId, plant);

        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }

    @DeleteMapping("{plantId}")
    public ResponseEntity deleteById(@PathVariable("plantId") UUID plantId){

        plantService.deletePlantById(plantId);

        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }

    @PutMapping("{plantId}")
    public ResponseEntity updateById(@PathVariable("plantId")UUID plantId, @RequestBody PlantDto plant){

        plantService.updatePlantById(plantId, plant);

        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }
}
