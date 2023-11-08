package guru.springframework.spring6restmvc.model;

import guru.springframework.spring6restmvc.entities.Status;
import guru.springframework.spring6restmvc.entities.User;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Builder
public class NotificationDTO {
    @Id
    @GeneratedValue(generator = "UUID")
    private UUID notificationId;

    private User user;

    private String title;
    private String body;
    private Status status;

    public LocalDateTime date;
}
