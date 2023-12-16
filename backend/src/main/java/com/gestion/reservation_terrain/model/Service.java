package com.gestion.reservation_terrain.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.DynamicUpdate;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Data
@Entity
@Table(name = "service")
@DynamicUpdate
public class Service {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID uuid;

    private String libelle;
    private String icon;

    @ManyToMany(
            mappedBy = "services",
            cascade = {
                    CascadeType.PERSIST,
                    CascadeType.MERGE
            }
    )
    @JsonIgnore
    private List<Terrain> terrains = new ArrayList<>();

    public void addTerrain(Terrain terrain){
        terrains.add(terrain);
        terrain.getServices().add(this);
    }

    public void removeTerrain(Terrain terrain){
        terrains.remove(terrain);
        terrain.getServices().remove(this);
    }
}
