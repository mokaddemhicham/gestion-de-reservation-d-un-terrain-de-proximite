package com.gestion.reservation_terrain.controller;

import com.gestion.reservation_terrain.model.Disponibilite;
import com.gestion.reservation_terrain.repository.DisponibiliteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.UUID;

@RestController
@RequestMapping("/dispo")
public class DisponibilityController {
    @Autowired
    DisponibiliteRepository disponibiliteRepository;

    @GetMapping("/dispos")
    private ArrayList<Disponibilite> getAllDisponibilites(){
        return (ArrayList<Disponibilite>) disponibiliteRepository.findAll();
    }

    @PostMapping("/insert")
    private Disponibilite saveDisponibilite(@RequestBody Disponibilite disponibilite){
        return disponibiliteRepository.save(disponibilite);
    }
    @GetMapping("/{idDispo}")
    private Disponibilite getDisponibilite(@PathVariable("idDispo") UUID idDispo){
        return disponibiliteRepository.findById(idDispo).get();
    }
    @PutMapping("/update")
    private Disponibilite updaateDisponibilite(@RequestBody Disponibilite disponibilite){
        return disponibiliteRepository.save(disponibilite);
    }
    @DeleteMapping("/delete/{dispoId}")
    private void deleteDisponibilite(@PathVariable("dispoId")UUID dispoId){
        System.out.println(dispoId);
        disponibiliteRepository.deleteById(dispoId);
    }
}
