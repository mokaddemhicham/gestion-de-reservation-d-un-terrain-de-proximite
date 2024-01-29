package com.gestion.reservation_terrain.service;

import com.gestion.reservation_terrain.model.Disponibilite;
import com.gestion.reservation_terrain.repository.DisponibiliteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
public class DisponibiliteService {
    public final DisponibiliteRepository disponibiliteRepository;

    @Autowired
    public DisponibiliteService(DisponibiliteRepository disponibiliteRepository) {
        this.disponibiliteRepository = disponibiliteRepository;
    }

    public Disponibilite checkIfDisponibiliteExist(Disponibilite disponibilite){

        return disponibiliteRepository.findByJourAndHeureDebutAndHeureFin(
                disponibilite.getJour(), disponibilite.getHeureDebut(),
                disponibilite.getHeureFin()
        );
    }

    public Optional<Disponibilite> findById(UUID uuid){
        return disponibiliteRepository.findById(uuid);
    }

    public void delete(Disponibilite disponibilite) {
        disponibiliteRepository.delete(disponibilite);
    }

    public Disponibilite save(Disponibilite disponibilite){
        return disponibiliteRepository.save(disponibilite);
    }
}
