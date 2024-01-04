package com.gestion.reservation_terrain.service;

import com.gestion.reservation_terrain.model.Disponibilite;
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

    public Iterable<Terrain> getTerrains(){
        return terrainRepository.findAll();
    }
    public Optional<Terrain> getTerrain(UUID uuid){
        return terrainRepository.findById(uuid);
    }

    public boolean isTerrainAvailable(String dayName, int heure, UUID terrainUuid){
        return terrainRepository.isTerrainAvailable(dayName, heure, terrainUuid) != 0;
    }

    public Optional<Disponibilite> getDisponibiliteByTerrainAndJour(Terrain terrain, String jour){
        Iterable<Disponibilite> disponibilites = terrain.getDisponibilites();
        for (Disponibilite disponibilite : disponibilites){
            if (disponibilite.getJour().equals(jour)){
                return Optional.of(disponibilite);
            }
        }
        return Optional.empty();
    }

    public Terrain saveTerrain(Terrain terrain){
        return terrainRepository.save(terrain);
    }



}
