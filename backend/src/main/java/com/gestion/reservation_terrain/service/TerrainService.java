package com.gestion.reservation_terrain.service;

import com.gestion.reservation_terrain.model.Terrain;
import com.gestion.reservation_terrain.repository.TerrainRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
public class TerrainService {
    private final TerrainRepository terrainRepository;

    @Autowired
    public TerrainService(TerrainRepository terrainRepository) {
        this.terrainRepository = terrainRepository;
    }

    public Optional<Terrain> getTerrain(UUID uuid){
        return terrainRepository.findById(uuid);
    }

    public boolean isTerrainAvailable(String dayName, int heure, UUID terrainUuid){
        return terrainRepository.isTerrainAvailable(dayName, heure, terrainUuid) != 0;
    }
}
