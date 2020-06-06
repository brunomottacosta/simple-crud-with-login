package com.github.brunomottacosta.data.model;

import com.github.brunomottacosta.data.enumeration.Role;
import lombok.*;

import javax.persistence.*;

// Lombok
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = {"id", "username"}, callSuper = false)
// Jpa
@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long id;

    private String username;

    private String password;

    @Enumerated(EnumType.STRING)
    private Role role;

    private boolean enabled;

}
