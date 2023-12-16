package com.gestion.reservation_terrain.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.CascadeType;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@DiscriminatorValue("proprietaireTerrain")
public class ProprietaireTerrain extends User {

    private String cin;
    private String adresse;
    @OneToMany(
            cascade = CascadeType.ALL,
            mappedBy = "proprietaire",
            orphanRemoval = true
    )
    @JsonIgnore
    private List<Terrain> terrains = new ArrayList<>();

    public ProprietaireTerrain(String nom, String prenom, String email, String telephone, String password, String cin, String adresse) {
        super(nom, prenom, email, telephone, password);
        this.cin = cin;
        this.adresse = adresse;
    }

    public ProprietaireTerrain() {
    }

    public void addTerrain(Terrain terrain){
        terrains.add(terrain);
        terrain.setProprietaire(this);
    }

    public void removeTerrain(Terrain terrain){
        terrains.remove(terrain);
        terrain.setProprietaire(null);
    }
}
