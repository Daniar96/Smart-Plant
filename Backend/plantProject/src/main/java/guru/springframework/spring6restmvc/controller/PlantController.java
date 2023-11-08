package guru.springframework.spring6restmvc.controller;

import guru.springframework.spring6restmvc.entities.User;
import guru.springframework.spring6restmvc.model.PlantDto;
import guru.springframework.spring6restmvc.services.CheckAuth;
import guru.springframework.spring6restmvc.services.PlantService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@AllArgsConstructor
@CrossOrigin
@RestController
@RequestMapping("/api/plant")
public class PlantController {

    private final PlantService plantService;
    private final CheckAuth checkAuth;

    @GetMapping
    public List<PlantDto> listPlantsOfLogginUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null) {
            Optional<User> user = checkAuth.authenticationForUser(authentication);
            if (user.isEmpty()){
                return new ArrayList<>();
            }
            User user1 = user.get();

            if (user1.getUserId().equals(UUID.fromString("a7355e4c-0000-0000-0000-ec00b8309ae9"))) {
                return new ArrayList<>();
            }
            return plantService.getPlantsByUserId(user1);
        }
        return new ArrayList<>();
    }

    @GetMapping("/listAllPlants")
    public List<PlantDto> listAllPlants(){
        return plantService.listAllPlants();
    }

    @GetMapping(value = "{plantId}")
    public Optional<PlantDto> getPlantById(@PathVariable("plantId") UUID plantId){
        return plantService.getPlantById(plantId);
    }

    @PostMapping
    public ResponseEntity handlePost(@RequestBody PlantDto plant){

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null) {
            Optional<User> userOptional = checkAuth.authenticationForUser(authentication);
            if (userOptional.isEmpty()) {
                return (ResponseEntity<UUID>) ResponseEntity.status(HttpStatus.CONFLICT);
            }
            else {
                User user = userOptional.get();

                PlantDto savedPlant = plantService.saveNewPlant(user, plant);

                HttpHeaders headers = new HttpHeaders();
                headers.add("Location", "/api/v1/plant/" + savedPlant.getPlantId().toString());

                return new ResponseEntity(headers, HttpStatus.CREATED);
            }

        }
        return (ResponseEntity<UUID>) ResponseEntity.status(HttpStatus.CONFLICT);
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
