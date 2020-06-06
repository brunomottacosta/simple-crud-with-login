package com.github.brunomottacosta.data.model;

import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.Set;

// Lombok
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = {"id"}, callSuper = false)
// Jpa
@Entity
@Table(name = "clients")
public class Client extends Auditable<String> {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Size(min = 3, max = 100)
    private String name;

    @NotNull
    @Size(min = 11, max = 11)
    private String document;

    @NotNull
    @Size(min = 8, max = 8)
    private String cep;

    @NotNull
    @NotEmpty
    private String street;

    private String complement;

    @NotNull
    @NotEmpty
    private String neighborhood;

    @NotNull
    @NotEmpty
    private String city;

    @NotNull
    @Size(min = 2, max = 2)
    private String uf;

    // One To Many:
    // Using unidirectional relationship (JPA 2.X)

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn(name = "clientId", referencedColumnName = "id", nullable = false)
    private Set<ClientPhone> phones;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn(name = "clientId", referencedColumnName = "id", nullable = false)
    private Set<ClientEmail> emails;

}
