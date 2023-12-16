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
@Table(name = "disponibilite")
@DynamicUpdate
public class Disponibilite {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID uuid;

    private String jour;

    @Column(name = "heure_debut")
    private Integer heureDebut;

    @Column(name = "heure_fin")
    private Integer heureFin;

    @ManyToMany(
            mappedBy = "disponibilites",
            cascade = {
                    CascadeType.PERSIST,
                    CascadeType.MERGE
            }
    )
    @JsonIgnore
    private List<Terrain> terrains = new ArrayList<>();

}
