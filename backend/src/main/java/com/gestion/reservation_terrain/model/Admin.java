package com.gestion.reservation_terrain.model;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import lombok.Data;

@Entity
@DiscriminatorValue("admin")
public class Admin extends User{
    public Admin(String nom, String prenom, String email, String telephone, String password) {
        super(nom, prenom, email, telephone, password);
    }

    public Admin() {
    }
}
