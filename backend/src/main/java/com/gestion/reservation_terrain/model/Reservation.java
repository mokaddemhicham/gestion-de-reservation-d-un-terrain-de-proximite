package com.gestion.reservation_terrain.model;

import jakarta.persistence.*;
import lombok.Data;

import java.sql.Date;
import java.util.UUID;

@Data
@Entity
@Table(name = "reservation")
public class Reservation {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID uuid;

    private Integer heure;

    private Date date;

    private String etat;

    @ManyToOne
    @JoinColumn(name = "uuid_user")
    private User user;

    @ManyToOne
    @JoinColumn(name = "uuid_terrain")
    private Terrain terrain;

    @OneToOne(
            mappedBy = "reservation",
            cascade = CascadeType.ALL,
            fetch = FetchType.LAZY
    )
    @PrimaryKeyJoinColumn
    private Paiement paiement;

}
