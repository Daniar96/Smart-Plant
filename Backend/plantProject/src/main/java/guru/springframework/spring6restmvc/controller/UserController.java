package guru.springframework.spring6restmvc.controller;

import guru.springframework.spring6restmvc.model.UserDto;
import guru.springframework.spring6restmvc.services.UserService;
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
@RequestMapping("/api/user")
public class UserController {

    private final UserService userService;

    @GetMapping
    public List<UserDto> listPlants(){
        return userService.listAllUsers();
    }

    @GetMapping(value = "{userId}")
    public Optional<UserDto> getUserById(@PathVariable("userId") UUID userId){
        return userService.getUserById(userId);
    }

    @PostMapping
    public ResponseEntity handlePost(@RequestBody UserDto user){

        UserDto savedUser = userService.saveNewUser(user);

        HttpHeaders headers = new HttpHeaders();
        headers.add("Location", "/api/v1/user/" + savedUser.getUserId().toString());

        return new ResponseEntity(headers, HttpStatus.CREATED);
    }

    @PatchMapping("{userId}")
    public ResponseEntity updateUserPatchById(@PathVariable("userId") UUID userId, @RequestBody UserDto user){

        userService.patchUserById(userId, user);
        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }

    @DeleteMapping("{userId}")
    public ResponseEntity deleteById(@PathVariable("userId") UUID userId){

        userService.deleteUserById(userId);
        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }

    @PutMapping("{userId}")
    public ResponseEntity updateById(@PathVariable("userId")UUID userId, @RequestBody UserDto user){

        userService.updateUserById(userId, user);

        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }
}
