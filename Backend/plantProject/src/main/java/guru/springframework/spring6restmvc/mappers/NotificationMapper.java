package guru.springframework.spring6restmvc.mappers;

import guru.springframework.spring6restmvc.entities.Notification;
import guru.springframework.spring6restmvc.model.NotificationDTO;
import org.mapstruct.Mapper;

@Mapper
public interface NotificationMapper {
    Notification NotificationDtoToNotification(NotificationDTO notificationDTO);

    NotificationDTO NotificationToNotificationDto(Notification notification);

}
