package guru.springframework.spring6restmvc.mappers;

import guru.springframework.spring6restmvc.entities.Plant;
import guru.springframework.spring6restmvc.entities.User;
import guru.springframework.spring6restmvc.model.UserDto;
import java.util.LinkedHashSet;
import java.util.Set;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-11-07T14:23:10+0100",
    comments = "version: 1.5.2.Final, compiler: javac, environment: Java 17.0.7 (Oracle Corporation)"
)
@Component
public class UserMapperImpl implements UserMapper {

    @Override
    public User UserDtoToUser(UserDto userDto) {
        if ( userDto == null ) {
            return null;
        }

        User.UserBuilder user = User.builder();

        user.userId( userDto.getUserId() );
        user.username( userDto.getUsername() );
        user.email( userDto.getEmail() );
        user.hashedpassword( userDto.getHashedpassword() );
        user.admin( userDto.getAdmin() );
        user.fullName( userDto.getFullName() );
        user.createDate( userDto.getCreateDate() );
        Set<Plant> set = userDto.getPlants();
        if ( set != null ) {
            user.plants( new LinkedHashSet<Plant>( set ) );
        }

        return user.build();
    }

    @Override
    public UserDto UserToUserDto(User user) {
        if ( user == null ) {
            return null;
        }

        UserDto.UserDtoBuilder userDto = UserDto.builder();

        userDto.userId( user.getUserId() );
        userDto.username( user.getUsername() );
        userDto.email( user.getEmail() );
        userDto.hashedpassword( user.getHashedpassword() );
        userDto.admin( user.getAdmin() );
        userDto.fullName( user.getFullName() );
        userDto.createDate( user.getCreateDate() );
        Set<Plant> set = user.getPlants();
        if ( set != null ) {
            userDto.plants( new LinkedHashSet<Plant>( set ) );
        }

        return userDto.build();
    }
}
