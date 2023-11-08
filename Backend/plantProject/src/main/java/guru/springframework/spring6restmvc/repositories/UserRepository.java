package guru.springframework.spring6restmvc.repositories;

import guru.springframework.spring6restmvc.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

/**
 * Created by jt, Spring Framework Guru.
 */
public interface UserRepository extends JpaRepository<User, UUID> {
    User findByUsername(String username);
}
