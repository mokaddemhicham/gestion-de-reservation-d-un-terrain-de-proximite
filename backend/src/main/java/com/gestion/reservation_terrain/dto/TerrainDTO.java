package com.gestion.reservation_terrain.dto;

import com.gestion.reservation_terrain.model.Disponibilite;
import com.gestion.reservation_terrain.model.Terrain;

import java.util.UUID;

public class TerrainDTO {
    private Terrain terrain;
    private UUID ownerId;
    private Disponibilite disponibilite;
    public Terrain getTerrain() {
        return terrain;
    }

    public void setTerrain(Terrain terrain) {
        this.terrain = terrain;
    }

    public UUID getOwnerId() {
        return ownerId;
    }

    public void setOwnerId(UUID ownerId) {
        this.ownerId = ownerId;
    }

    public Disponibilite getDisponibilite() {
        return disponibilite;
    }

    public void setDisponibilite(Disponibilite disponibilite) {
        this.disponibilite = disponibilite;
    }
}
