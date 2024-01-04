package com.gestion.reservation_terrain.controller;

import com.gestion.reservation_terrain.model.Terrain;
import com.gestion.reservation_terrain.service.ReservationService;
import com.gestion.reservation_terrain.service.TerrainService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.sql.Date;
import java.util.Map;
import java.util.UUID;

@Tag(name = "Terrain Controller", description = "Gestion des terrains")
@RestController
@RequestMapping(path = "/terrain")
public class TerrainController {
    private final TerrainService terrainService;
    private final ReservationService reservationService;

    @Autowired
    public TerrainController(TerrainService terrainService, ReservationService reservationService) {
        this.terrainService = terrainService;
        this.reservationService = reservationService;
    }

    @GetMapping(path = "/heures-available")
    public Map<Integer, Boolean> getHeuresAvailable(@RequestParam Date date, @RequestParam UUID terrainId){
        return reservationService.getHeuresAvailables(terrainService.getTerrain(terrainId).get(), date);
    }

    @PostMapping(path = "/add")
    public Terrain addTerrain(@RequestBody Terrain terrain){
        return terrainService.saveTerrain(terrain);
    }
}
