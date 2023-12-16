package com.gestion.reservation_terrain.model;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;

@Entity
@DiscriminatorValue("client")
public class Client extends User{
    public Client(String nom, String prenom, String email, String telephone, String password) {
        super(nom, prenom, email, telephone, password);
    }

    public Client() {
    }
}
