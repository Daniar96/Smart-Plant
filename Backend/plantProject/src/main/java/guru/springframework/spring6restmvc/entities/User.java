package guru.springframework.spring6restmvc.entities;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

/**
 * Created by jt, Spring Framework Guru.
 */
@Getter
@Setter
@Builder
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class User {
    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(name = "UUID", strategy = "org.hibernate.id.UUIDGenerator")
    @JdbcTypeCode(SqlTypes.CHAR)
    @Column(length = 36, columnDefinition = "varchar(36)", updatable = false, nullable = false)
    private UUID userId;
    private String username;
    private String email;

    private String hashedpassword;

    private Boolean admin;

    @CreationTimestamp
    private LocalDateTime createDate;

    @Builder.Default
    @ManyToMany
    @JoinTable(name = "UserToPlant",
            joinColumns = @JoinColumn(name = "plantId"),
            inverseJoinColumns = @JoinColumn(name = "userId"))
    private Set<Plant> plants = new HashSet<>();

}
