package com.gestion.reservation_terrain.controller;

import com.gestion.reservation_terrain.dto.TerrainDto;
import com.gestion.reservation_terrain.mappers.TerrainMapper;
import com.gestion.reservation_terrain.model.Disponibilite;
import com.gestion.reservation_terrain.model.Service;
import com.gestion.reservation_terrain.model.Terrain;
import com.gestion.reservation_terrain.service.ReservationService;
import com.gestion.reservation_terrain.service.TerrainService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.sql.Date;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Tag(name = "Terrain Controller", description = "Gestion des terrains")
@RestController
@RequestMapping(path = "/api/v1/terrains")
public class TerrainController {
    private final TerrainService terrainService;
    private final ReservationService reservationService;
    private final FileUploadController fileUploadController;
    private final TerrainMapper terrainMapper;

    @Autowired
    public TerrainController(TerrainService terrainService, ReservationService reservationService, FileUploadController fileUploadController, TerrainMapper terrainMapper) {
        this.terrainService = terrainService;
        this.reservationService = reservationService;
        this.fileUploadController = fileUploadController;
        this.terrainMapper = terrainMapper;
    }

    @GetMapping("")
    public ResponseEntity<Iterable<Terrain>> getAllTerrains(){
        return ResponseEntity.ok(terrainService.getTerrains());
    }

    @GetMapping("/{uuid}")
    public Terrain getTerrain(@PathVariable("uuid") UUID uuid){
        if(terrainService.getTerrain(uuid).isPresent()){
            return terrainService.getTerrain(uuid).get();
        }else{
            return null;
        }
    }

    @GetMapping(path = "/heures-available")
    public Map<Integer, Boolean> getHeuresAvailable(@RequestParam Date date, @RequestParam UUID terrainId){
        return reservationService.getHeuresAvailables(terrainService.getTerrain(terrainId).get(), date);
    }

    @PostMapping(path = "/add", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<Terrain> addTerrain(@RequestPart("terrain") TerrainDto terrainDto,
                                             @RequestPart("image") MultipartFile image){
        try{
            Terrain terrain = terrainMapper.map(terrainDto);;

            // Upload the image and get the file path
            ResponseEntity<String> uploadResponse = fileUploadController.uploadFile(image);
            terrain.setImage(image.getOriginalFilename());
            terrain = terrainService.saveTerrain(terrain);
            return ResponseEntity.ok().body(terrain);
        }catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @PutMapping(value = "/update/{uuid}", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<Terrain> updateTerrain(@RequestPart("terrain") TerrainDto terrainDto,
                                                 @RequestPart(value = "image", required = false) MultipartFile image,
                                                 @PathVariable("uuid") UUID uuid){
        try{
            Terrain terrain = terrainMapper.map(terrainDto);
            if (image != null && !image.isEmpty()){
                // Upload the image and get the file path
                ResponseEntity<String> uploadResponse = fileUploadController.uploadFile(image);
                terrain.setImage(image.getOriginalFilename());
            }else{
                terrain.setImage(terrainDto.getImage());
            }
            terrain.setUuid(uuid);

            terrain = terrainService.saveTerrain(terrain);
            return ResponseEntity.ok().body(terrain);
        }catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @DeleteMapping("/delete/{uuid}")
    public void deleteTerrain(@PathVariable("uuid") UUID uuid){
        terrainService.deleteTerrain(uuid);
    }

    @GetMapping("/{uuid}/services")
    public ResponseEntity<Iterable<Service>> getServicesByTerrain(@PathVariable("uuid") UUID uuid){
        return ResponseEntity.ok().body(terrainService.getServicesByTerrain(uuid));
    }

    @GetMapping("/{uuid}/disponibilites")
    public ResponseEntity<Iterable<Disponibilite>> getDisponibilitesByTerrain(@PathVariable("uuid") UUID uuid){
        return ResponseEntity.ok().body(terrainService.getDisponibilitesByTerrain(uuid));
    }

    @PostMapping("/{uuid}/services/add")
    public ResponseEntity<Service> addService(@PathVariable("uuid") UUID uuid, @RequestBody Service service){
        return ResponseEntity.ok().body(terrainService.saveService(uuid, service));
    }
}
