package com.gestion.reservation_terrain.dto;

import com.gestion.reservation_terrain.model.User;
import lombok.*;

import java.util.UUID;

@Data
@Getter
@Setter
public class UserDto  {
    private UUID uuid;
    private String nom;
    private String prenom;
    private String email;
    private String telephone;
    private String role;
    private String cin;
    private  String adresse;



    public UserDto() {

    }
}
