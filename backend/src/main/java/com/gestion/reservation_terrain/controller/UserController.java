package com.gestion.reservation_terrain.controller;

import com.gestion.reservation_terrain.dto.SignInRequest;
import com.gestion.reservation_terrain.dto.UserDto;
import com.gestion.reservation_terrain.mappers.UserMapper;
import com.gestion.reservation_terrain.model.Client;
import com.gestion.reservation_terrain.model.ProprietaireTerrain;
import com.gestion.reservation_terrain.model.User;
import com.gestion.reservation_terrain.service.ClientService;
import com.gestion.reservation_terrain.service.ProprietaireTerrainService;
import com.gestion.reservation_terrain.service.UserService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
@CrossOrigin(origins = "http://localhost:4200")
@Tag(name = "User Controller", description = "Gestion des utilisateurs")
@RequestMapping(path = "/users")
@RestController
public class UserController {
    private final UserService userService;
    private final ClientService clientService;
    private final ProprietaireTerrainService proprietaireTerrainService;

    public UserController(UserService userService, ClientService clientService, ProprietaireTerrainService proprietaireTerrainService) {
        this.userService = userService;
        this.clientService = clientService;
        this.proprietaireTerrainService = proprietaireTerrainService;
    }

    /*@GetMapping(path = "")
    public Iterable<User> getUsers(){
        return userService.getUsers();
    }*/
    /*@GetMapping("")
    public List<Object[]> getAllUsersWithDiscriminator() {
        return userService.getAllUsersWithDiscriminator();
    }*/

    @GetMapping(path = "")
    public Iterable<UserDto> getUsers(){
        List<Client> clients = (List<Client>) clientService.getClients();
        List<ProprietaireTerrain> proprietaireTerrains = (List<ProprietaireTerrain>) proprietaireTerrainService.getProprietaireTerrains();
        for(ProprietaireTerrain proprietaireTerrain: proprietaireTerrains){
            System.out.println("address: "+proprietaireTerrain.getAdresse());
        }
        List<UserDto> userDtos = new ArrayList<>();
        for (Client user: clients) {
            UserDto userDto = UserMapper.toUserDto(user);
            System.out.println("address: "+userDto.getAdresse());
            userDtos.add(userDto);
        }
        for (ProprietaireTerrain user: proprietaireTerrains) {
            UserDto userDto = UserMapper.toUserDto(user);
            System.out.println("address: "+userDto.getAdresse());
            userDtos.add(userDto);
        }
        return userDtos;
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

    @PostMapping(path = "/signin")
    public User getUserByEmailAndPassword(@RequestBody SignInRequest request){
        System.out.println("email: "+request.getEmail());
        return userService.getUserByEmailAndPassword(request.getEmail(), request.getPassword());
    }

}
