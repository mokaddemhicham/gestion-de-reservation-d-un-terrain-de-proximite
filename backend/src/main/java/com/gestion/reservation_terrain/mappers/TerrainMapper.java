package com.gestion.reservation_terrain.mappers;

import com.gestion.reservation_terrain.dto.TerrainDto;
import com.gestion.reservation_terrain.model.ProprietaireTerrain;
import com.gestion.reservation_terrain.model.Terrain;
import com.gestion.reservation_terrain.service.ProprietaireTerrainService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
public class TerrainMapper {
    private final ProprietaireTerrainService proprietaireTerrainService;

    @Autowired
    public TerrainMapper(ProprietaireTerrainService proprietaireTerrainService) {
        this.proprietaireTerrainService = proprietaireTerrainService;
    }

    public Terrain map(TerrainDto terrainDto) {
        System.out.println(terrainDto);
        Terrain terrain = new Terrain();
        terrain.setNom(terrainDto.getNom());
        terrain.setPrix(terrainDto.getPrix());
        terrain.setType(terrainDto.getType());
        terrain.setTaille(terrainDto.getTaille());
        terrain.setAddresse(terrainDto.getAddresse());
        terrain.setLocalisation(terrainDto.getLocalisation());
        terrain.setDescription(terrainDto.getDescription());

        Optional<ProprietaireTerrain> optionalProprietaireTerrain = proprietaireTerrainService.getProprietaireTerrain(
                UUID.fromString(terrainDto.getProprietaire())
        );

        ProprietaireTerrain proprietaireTerrain = null;

        if (optionalProprietaireTerrain.isPresent()){
            proprietaireTerrain = optionalProprietaireTerrain.get();
        }

        terrain.setProprietaire(proprietaireTerrain);
        return terrain;
    }
}
