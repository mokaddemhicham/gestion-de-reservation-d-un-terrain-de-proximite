package com.gestion.reservation_terrain.model;

import jakarta.persistence.*;
import lombok.Data;

import java.sql.Date;
import java.util.UUID;

@Data
@Entity
@Table(name = "paiement")
public class Paiement {
    @Id
    private UUID uuid;

    private Float montant;
    private Date datePaiement;
    private String numeroCarte;
    private Date dateExpiration;
    private String codeVerification;
    private String titulaireCarte;
    private String typeCarte;

    @OneToOne(fetch = FetchType.LAZY)
    @MapsId
    @JoinColumn(name = "uuid")
    private Reservation reservation;

}
