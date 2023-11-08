package guru.springframework.spring6restmvc.repositories;

import guru.springframework.spring6restmvc.entities.Notification;
import guru.springframework.spring6restmvc.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface NotificationRepository extends JpaRepository<Notification, UUID> {
    List<Notification> findAllByUser(User user);
    List<Notification> findAllByUserOrderByDateDesc(User user);
}
