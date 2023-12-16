package com.gestion.reservation_terrain.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.DynamicUpdate;

import java.sql.Date;
import java.util.UUID;

@Data
@Entity
@Table(name = "reservation")
@DynamicUpdate
public class Reservation {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID uuid;

    private Integer heure;

    private Date date;

    private String etat;

    @ManyToOne
    @JoinColumn(name = "uuid_user")
    @JsonIgnore
    private User user;

    @ManyToOne
    @JoinColumn(name = "uuid_terrain")
    @JsonIgnore
    private Terrain terrain;

    @OneToOne(
            mappedBy = "reservation",
            cascade = CascadeType.ALL,
            fetch = FetchType.LAZY
    )
    @PrimaryKeyJoinColumn
    @JsonIgnore
    private Paiement paiement;

}
