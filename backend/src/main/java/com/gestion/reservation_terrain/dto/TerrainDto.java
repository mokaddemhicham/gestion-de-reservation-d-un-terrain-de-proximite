package com.gestion.reservation_terrain.dto;

import lombok.Data;

import java.util.UUID;

@Data
public class TerrainDto {
    private UUID uuid;
    private String nom;
    private String taille;
    private String type;
    private String addresse;
    private String localisation;
    private Float prix;
    private String description;
    private String image;
    private String proprietaire;
}
