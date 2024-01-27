package com.gestion.reservation_terrain.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.gestion.reservation_terrain.model.Terrain;
import lombok.Data;
import lombok.ToString;
import org.springframework.web.multipart.MultipartFile;

import java.util.UUID;

@Data
@ToString
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
