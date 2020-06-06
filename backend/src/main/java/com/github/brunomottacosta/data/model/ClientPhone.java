package com.github.brunomottacosta.data.model;

import com.github.brunomottacosta.data.enumeration.PhoneType;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

// Lombok
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = {"number"}, callSuper = false)
// Jpa
@Entity
@Table(name = "phones")
public class ClientPhone {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Size(min = 10, max = 11)
    private String number;

    @NotNull
    @Enumerated(EnumType.STRING)
    private PhoneType type;

}
