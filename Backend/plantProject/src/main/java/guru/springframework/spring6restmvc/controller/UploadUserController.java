package guru.springframework.spring6restmvc.controller;

import guru.springframework.spring6restmvc.model.UserDto;
import guru.springframework.spring6restmvc.services.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@AllArgsConstructor
@CrossOrigin
@RestController
@RequestMapping("/user")
public class UploadUserController {

    private final UserService userService;

    @PostMapping
    public ResponseEntity handlePost(@RequestBody UserDto user){

        UserDto savedUser = userService.saveNewUser(user);

        HttpHeaders headers = new HttpHeaders();
        headers.add("Location", "/api//user/" + savedUser.getUserId().toString());

        return new ResponseEntity(headers, HttpStatus.CREATED);
    }
}
