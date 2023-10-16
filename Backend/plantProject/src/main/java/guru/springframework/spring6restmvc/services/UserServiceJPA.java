package guru.springframework.spring6restmvc.services;

import guru.springframework.spring6restmvc.entities.Plant;
import guru.springframework.spring6restmvc.entities.User;
import guru.springframework.spring6restmvc.mappers.UserMapper;
import guru.springframework.spring6restmvc.model.UserDto;
import guru.springframework.spring6restmvc.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicReference;
import java.util.stream.Collectors;

/**
 * Created by jt, Spring Framework Guru.
 */
@Service
@Primary
@RequiredArgsConstructor
public class UserServiceJPA implements UserService {
    private final UserRepository UserRepository;
    private final UserMapper UserMapper;

    @Override
    public Optional<UserDto> getUserById(UUID uuid) {
        return Optional.ofNullable(UserMapper
                .UserToUserDto(UserRepository.findById(uuid).orElse(null)));
    }

    @Override
    public List<UserDto> listAllUsers() {
        return UserRepository.findAll().stream()
                .map(user -> {
                    UserDto userDto = UserMapper.UserToUserDto(user);
                    userDto.setPlants(null);
                    return userDto;
                })
                .collect(Collectors.toList());



    }

    @Override
    public UserDto saveNewUser(UserDto User) {
        return UserMapper.UserToUserDto(UserRepository
                .save(UserMapper.UserDtoToUser(User)));
    }

    @Override
    public Optional<UserDto> updateUserById(UUID userId, UserDto User) {
        AtomicReference<Optional<UserDto>> atomicReference = new AtomicReference<>();

        UserRepository.findById(userId).ifPresentOrElse(foundUser -> {
            foundUser.setUsername(User.getUsername());
            atomicReference.set(Optional.of(UserMapper
                    .UserToUserDto(UserRepository.save(foundUser))));
        }, () -> {
            atomicReference.set(Optional.empty());
        });

        return atomicReference.get();
    }

    @Override
    public Boolean deleteUserById(UUID userId) {
        if(UserRepository.existsById(userId)){
            UserRepository.deleteById(userId);
            return true;
        }
        return false;
    }

    @Override
    public Optional<UserDto> patchUserById(UUID userId, UserDto User) {
        AtomicReference<Optional<UserDto>> atomicReference = new AtomicReference<>();


        UserRepository.findById(userId).ifPresentOrElse(foundUser -> {
            if (StringUtils.hasText(User.getUsername())){
                foundUser.setUsername(User.getUsername());
            }
            if (StringUtils.hasText(User.getEmail())){
                foundUser.setEmail(User.getEmail());
            }
            atomicReference.set(Optional.of(UserMapper
                    .UserToUserDto(UserRepository.save(foundUser))));
        }, () -> {
            atomicReference.set(Optional.empty());
        });

        return atomicReference.get();
    }
}
