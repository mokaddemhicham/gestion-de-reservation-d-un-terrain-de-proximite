package com.gestion.reservation_terrain.service;

import com.gestion.reservation_terrain.model.ProprietaireTerrain;
import com.gestion.reservation_terrain.repository.ProprietaireTerrainRepository;
import com.gestion.reservation_terrain.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
public class ProprietaireTerrainService extends UserService{
    private final ProprietaireTerrainRepository proprietaireTerrainRepository;
    @Autowired
    public ProprietaireTerrainService(UserRepository userRepository, ProprietaireTerrainRepository proprietaireTerrainRepository) {
        super(userRepository);
        this.proprietaireTerrainRepository = proprietaireTerrainRepository;
    }

    public Iterable<ProprietaireTerrain> getProprietaireTerrains(){
        return proprietaireTerrainRepository.findAll();
    }

    public Optional<ProprietaireTerrain> getProprietaireTerrain(UUID uuid){
        return proprietaireTerrainRepository.findById(uuid);
    }

    public ProprietaireTerrain saveProprietaireTerrain(ProprietaireTerrain proprietaireTerrain){
        return proprietaireTerrainRepository.save(proprietaireTerrain);
    }

    public void deleteProprietaireTerrain(ProprietaireTerrain proprietaireTerrain){
        proprietaireTerrainRepository.delete(proprietaireTerrain);
    }

    public void deleteProprietaireTerrain(UUID uuid){
        proprietaireTerrainRepository.deleteById(uuid);
    }


}
