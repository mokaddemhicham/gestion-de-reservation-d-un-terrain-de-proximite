package com.gestion.reservation_terrain.dto;

import com.gestion.reservation_terrain.model.Paiement;
import lombok.Data;

import java.sql.Date;
import java.util.UUID;

@Data
public class ReservationDto {
    private UUID uuid;
    private Date date;
    private Integer heure;
    private String etat;
    private UUID user;
    private UUID terrain;
    private Paiement paiement;
}
