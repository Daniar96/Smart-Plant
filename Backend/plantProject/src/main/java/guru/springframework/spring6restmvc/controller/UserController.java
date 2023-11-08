package guru.springframework.spring6restmvc.controller;

import guru.springframework.spring6restmvc.model.UserDto;
import guru.springframework.spring6restmvc.services.CheckAuth;
import guru.springframework.spring6restmvc.services.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@AllArgsConstructor
@CrossOrigin
@RestController
@RequestMapping("/api/user")
public class UserController {

    private final CheckAuth checkAuth;
    private final UserService userService;

    @GetMapping
    public ResponseEntity<UUID> getCurrentId(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null) {
           UUID uuid = checkAuth.authentication(authentication);
            if (uuid.equals(UUID.fromString("a7355e4c-0000-0000-0000-ec00b8309ae9"))){
                return (ResponseEntity<UUID>) ResponseEntity.status(HttpStatus.CONFLICT);
            }
            else {
                return ResponseEntity.ok(uuid);
            }
        }
        return (ResponseEntity<UUID>) ResponseEntity.status(HttpStatus.UNAUTHORIZED);
    }

    @GetMapping(value = "{userId}")
    public Optional<UserDto> getUserById(@PathVariable("userId") UUID userId){
        return userService.getUserById(userId);
    }

    @GetMapping("/listAll")
    public List<UserDto> listUsers(){
        return userService.listAllUsers();
    }

    @PatchMapping()
    public ResponseEntity patchUser(@RequestBody UserDto user){

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null) {
            UUID uuid = checkAuth.authentication(authentication);
            if (uuid.equals(UUID.fromString("a7355e4c-0000-0000-0000-ec00b8309ae9"))){
                return (ResponseEntity) ResponseEntity.status(HttpStatus.CONFLICT);
            }

            userService.patchUserById(uuid, user);
            return new ResponseEntity(HttpStatus.NO_CONTENT);
        }
        else {
            return (ResponseEntity) ResponseEntity.status(HttpStatus.CONFLICT);
        }
    }

    @PatchMapping("{userId}")
    public ResponseEntity PatchUserById(@PathVariable("userId") UUID userId, @RequestBody UserDto user){

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
