package com.gestion.reservation_terrain.controller;

import com.gestion.reservation_terrain.model.ProprietaireTerrain;
import com.gestion.reservation_terrain.service.ProprietaireTerrainService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import java.util.UUID;

@Tag(name = "ProprietaireTerrain Controller", description = "Gestion des propriétaires de terrains")
@RestController
@RequestMapping(path = "/proprietaire-terrains")
public class ProprietaireTerrainController{
    private final ProprietaireTerrainService proprietaireTerrainService;
    @Autowired
    public ProprietaireTerrainController(ProprietaireTerrainService proprietaireTerrainService) {
        this.proprietaireTerrainService = proprietaireTerrainService;
    }

    @GetMapping(path = "")
    public Iterable<ProprietaireTerrain> getProprietaireTerrains(){
        return proprietaireTerrainService.getProprietaireTerrains();
    }

    @GetMapping(path = "/{uuid}")
    public Optional<ProprietaireTerrain> getProprietaireTerrain(@PathVariable UUID uuid){
        return proprietaireTerrainService.getProprietaireTerrain(uuid);
    }

    @PostMapping(path = "/save")
    public ProprietaireTerrain saveProprietaireTerrain(@RequestBody ProprietaireTerrain proprietaireTerrain){
        return proprietaireTerrainService.saveProprietaireTerrain(proprietaireTerrain);
    }

    @PutMapping(path = "/update")
    public ProprietaireTerrain updateProprietaireTerrain(@RequestBody ProprietaireTerrain proprietaireTerrain){
        return proprietaireTerrainService.saveProprietaireTerrain(proprietaireTerrain);
    }

    @DeleteMapping(path = "/delete/{uuid}")
    public void deleteProprietaireTerrain(@PathVariable UUID uuid){
        proprietaireTerrainService.deleteProprietaireTerrain(uuid);
    }

}
