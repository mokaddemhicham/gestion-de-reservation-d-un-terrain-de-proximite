package com.gestion.reservation_terrain.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import lombok.ToString;
import org.hibernate.annotations.DynamicUpdate;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Data
@Entity
@Table(name = "terrain")
@DynamicUpdate
@ToString
public class Terrain {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID uuid;

    private String nom;
    private String taille;
    private String type;
    private String addresse;
    private String localisation;
    private Float prix;
    private String description;
    private String image;

    @OneToMany(
            cascade = CascadeType.ALL,
            mappedBy = "terrain",
            orphanRemoval = true
    )
    @JsonIgnore
    private List<Reservation> reservations = new ArrayList<>();

    @ManyToMany(
            fetch = FetchType.LAZY,
            cascade = {
                    CascadeType.PERSIST,
                    CascadeType.MERGE
            }
    )
    @JoinTable(
            name = "terrain_disponibilite",
            joinColumns = @JoinColumn(name = "uuid_terrain"),
            inverseJoinColumns = @JoinColumn(name = "uuid_disponibilite")
    )
    private List<Disponibilite> disponibilites = new ArrayList<>();

    @ManyToMany(
            fetch = FetchType.LAZY,
            cascade = {
                    CascadeType.PERSIST,
                    CascadeType.MERGE
            }
    )
    @JoinTable(
            name = "terrain_service",
            joinColumns = @JoinColumn(name = "uuid_terrain"),
            inverseJoinColumns = @JoinColumn(name = "uuid_service")
    )
    private List<Service> services = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name = "proprietaire")
    private ProprietaireTerrain proprietaire;

    // Méthode pour ajouter un service au terrain
    public void addService(Service service) {
        services.add(service);
        service.getTerrains().add(this);
    }

    // Méthode pour supprimer un service du terrain
    public void removeService(Service service) {
        services.remove(service);
        service.getTerrains().remove(this);
    }
}
