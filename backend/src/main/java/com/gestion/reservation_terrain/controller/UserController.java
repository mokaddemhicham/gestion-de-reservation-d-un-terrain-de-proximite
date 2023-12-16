package com.gestion.reservation_terrain.controller;

import com.gestion.reservation_terrain.model.User;
import com.gestion.reservation_terrain.service.UserService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import java.util.UUID;

@Tag(name = "User Controller", description = "Gestion des utilisateurs")
@RequestMapping(path = "/users")
@RestController
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping(path = "")
    public Iterable<User> getUsers(){
        return userService.getUsers();
    }

    @GetMapping(path = "/{uuid}")
    public Optional<User> getUser(@PathVariable UUID uuid){
        return userService.getUser(uuid);
    }

    @DeleteMapping(path = "/delete/{uuid}")
    public void deleteUser(@PathVariable UUID uuid){
        userService.deleteUser(uuid);
    }

    @GetMapping(path = "/search")
    public Iterable<User> getUsersByName(@RequestParam String nom){
        return userService.getUsersByName(nom);
    }

}
