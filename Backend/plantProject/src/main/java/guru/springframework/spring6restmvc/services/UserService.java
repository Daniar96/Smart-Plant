package guru.springframework.spring6restmvc.services;

import guru.springframework.spring6restmvc.model.UserDto;

import java.util.List;
import java.util.Optional;
import java.util.UUID;


public interface UserService {
    Optional<UserDto> getUserById(UUID uuid);

    List<UserDto> listAllUsers();

    UserDto saveNewUser(UserDto user);

    Optional<UserDto> updateUserById(UUID userId, UserDto user);

    Optional<UserDto> patchUserById(UUID userId, UserDto user);

    Boolean deleteUserById(UUID userId);
}
