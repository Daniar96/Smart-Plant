package guru.springframework.spring6restmvc.mappers;
import guru.springframework.spring6restmvc.model.UserDto;
import guru.springframework.spring6restmvc.entities.User;
import org.mapstruct.Mapper;

/**
 * Created by jt, Spring Framework Guru.
 */
@Mapper
public interface UserMapper {

    User UserDtoToUser(UserDto userDto);

    UserDto UserToUserDto(User user);

}
