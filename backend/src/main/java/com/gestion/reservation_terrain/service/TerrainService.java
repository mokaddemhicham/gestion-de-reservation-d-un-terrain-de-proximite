package com.gestion.reservation_terrain.service;

import com.gestion.reservation_terrain.model.Disponibilite;
import com.gestion.reservation_terrain.model.Terrain;
import com.gestion.reservation_terrain.repository.ServiceRepository;
import com.gestion.reservation_terrain.repository.TerrainRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class TerrainService {
    private final TerrainRepository terrainRepository;
    private final ServiceRepository serviceRepository;

    @Autowired
    public TerrainService(TerrainRepository terrainRepository, ServiceRepository serviceRepository) {
        this.terrainRepository = terrainRepository;
        this.serviceRepository = serviceRepository;
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

    public void deleteTerrain(UUID uuid){
        terrainRepository.deleteById(uuid);
    }

    public Iterable<com.gestion.reservation_terrain.model.Service> getServicesByTerrain(UUID uuid){
        return terrainRepository.findAllServicesByTerrainUuid(uuid);
    }

    public Iterable<Disponibilite> getDisponibilitesByTerrain(UUID uuid){
        return terrainRepository.findAllDisponibilitesByTerrainUuid(uuid);
    }

    public com.gestion.reservation_terrain.model.Service saveService(UUID uuid, com.gestion.reservation_terrain.model.Service service){
        Optional<Terrain> optionalTerrain = getTerrain(uuid);
        if (optionalTerrain.isPresent()){
            Terrain terrain = optionalTerrain.get();
            terrain.addService(service);
            return service;
        }
        return null;
    }


    public Long getTerrainCount() {
        return terrainRepository.count();
    }
}
