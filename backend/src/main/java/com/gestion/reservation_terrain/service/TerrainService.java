package com.gestion.reservation_terrain.service;

import com.gestion.reservation_terrain.model.Disponibilite;
import com.gestion.reservation_terrain.model.Terrain;
import com.gestion.reservation_terrain.repository.DisponibiliteRepository;
import com.gestion.reservation_terrain.repository.ServiceRepository;
import com.gestion.reservation_terrain.repository.TerrainRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class TerrainService {
    private final TerrainRepository terrainRepository;
    private final ServiceRepository serviceRepository;

    private final DisponibiliteService disponibiliteService;

    @Autowired
    public TerrainService(TerrainRepository terrainRepository, ServiceRepository serviceRepository, DisponibiliteService disponibiliteService) {
        this.terrainRepository = terrainRepository;
        this.serviceRepository = serviceRepository;
        this.disponibiliteService = disponibiliteService;
    }

    public Iterable<Terrain> getTerrains(){
        return terrainRepository.findAll();
    }
    public Optional<Terrain> getTerrain(UUID uuid){
        return terrainRepository.findById(uuid);
    }

    public Page<Terrain> getAllTerrains(Pageable pageable){
        return terrainRepository.findAllTerrains(pageable);
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

    public List<com.gestion.reservation_terrain.model.Service> saveServices(UUID uuid, List<com.gestion.reservation_terrain.model.Service> services){
        Optional<Terrain> optionalTerrain = getTerrain(uuid);
        if (optionalTerrain.isPresent()){
            Terrain terrain = optionalTerrain.get();
            terrain.addServices(services);
            terrainRepository.save(terrain);
            return services;
        }
        return null;
    }

    public boolean deleteService(UUID terrainUuid, UUID serviceUuid){
        Optional<Terrain> optionalTerrain = getTerrain(terrainUuid);
        if (optionalTerrain.isPresent()){
            Optional<com.gestion.reservation_terrain.model.Service> optionalService = serviceRepository.findById(serviceUuid);
            Terrain terrain = optionalTerrain.get();
            optionalService.ifPresent(service -> {
                terrain.removeService(service);
                service.removeTerrain(terrain);
                terrainRepository.save(terrain);
//                serviceRepository.save(service);
            });
            return true;
        }
        return false;
    }

    public Iterable<com.gestion.reservation_terrain.model.Service> getAllServicesNotSelected(UUID uuid){
        List<com.gestion.reservation_terrain.model.Service> servicesTerrain =
                (List<com.gestion.reservation_terrain.model.Service>) this.getServicesByTerrain(uuid);
        List<com.gestion.reservation_terrain.model.Service> servicesNotSelected = new ArrayList<>();
        serviceRepository.findAll().forEach(service -> {
            if(!servicesTerrain.contains(service)){
                servicesNotSelected.add(service);
            }
        });
        return servicesNotSelected;
    }

    public Boolean saveDisponibilite(UUID uuid, Disponibilite disponibilite) {
        Optional<Terrain> optionalTerrain = getTerrain(uuid);
        if (optionalTerrain.isPresent()){
            Terrain terrain = optionalTerrain.get();
            Disponibilite d = disponibiliteService.checkIfDisponibiliteExist(disponibilite);
            if (d == null){
                terrain.addDisponibilite(disponibilite);
                terrainRepository.save(terrain);
            } else {
                terrain.addDisponibilite(d);
                terrainRepository.save(terrain);
            }
            return true;
        }
        return false;
    }

    public boolean deleteDisponibilite(UUID terrainUuid, UUID disponibiliteUuid){
        Optional<Terrain> optionalTerrain = getTerrain(terrainUuid);
        if (optionalTerrain.isPresent()){
            Optional<Disponibilite> optionalDisponibilite = disponibiliteService.findById(disponibiliteUuid);
            Terrain terrain = optionalTerrain.get();
            optionalDisponibilite.ifPresent(disponibilite -> {
                terrain.removeDisponibilite(disponibilite);
                terrainRepository.save(terrain);
                if (disponibilite.getTerrains().size() + 1 == 1) {
                    disponibiliteService.delete(disponibilite);
                }
            });
            return true;
        }
        return false;
    }

    public Boolean updateDisponibilite(UUID uuid, Disponibilite disponibilite) {
        Optional<Terrain> optionalTerrain = getTerrain(uuid);
        if (optionalTerrain.isPresent()) {
            Terrain terrain = optionalTerrain.get();
            Disponibilite d = disponibiliteService.checkIfDisponibiliteExist(disponibilite);
            if (d == null) {
                disponibilite.setUuid(null);
                terrain.addDisponibilite(disponibilite);
                terrainRepository.save(terrain);
            } else {
                terrain.addDisponibilite(d);
                terrainRepository.save(terrain);
            }
            return true;
        }
        return false;
    }
    public Long getTerrainCount() {
        return terrainRepository.count();
    }
}
