package guru.springframework.spring6restmvc.repositories;

import guru.springframework.spring6restmvc.entities.User;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
class UserRepositoryTest {

    @Autowired
    UserRepository userRepository;

    @Test
    void testSaveUser() {
        User user = userRepository.save(User.builder()
                        .username("New Name")
                .build());

        assertThat(user.getUserId()).isNotNull();

    }
}