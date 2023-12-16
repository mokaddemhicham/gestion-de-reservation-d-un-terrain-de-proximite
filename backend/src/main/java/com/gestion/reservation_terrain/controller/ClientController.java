package com.gestion.reservation_terrain.controller;

import com.gestion.reservation_terrain.model.Client;
import com.gestion.reservation_terrain.service.ClientService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import java.util.UUID;

@Tag(name = "Client Controller", description = "Gestion des clients")
@RestController
@RequestMapping(path = "/clients")
public class ClientController {
    private final ClientService clientService;
    @Autowired
    public ClientController(ClientService clientService) {
        this.clientService = clientService;
    }

    @GetMapping(path = "")
    public Iterable<Client> getClients(){
        return clientService.getClients();
    }

    @GetMapping(path = "/{uuid}")
    public Optional<Client> getClient(@PathVariable UUID uuid){
        return clientService.getClient(uuid);
    }

    @PostMapping(path = "/save")
    public Client saveClient(@RequestBody Client client){
        return clientService.saveClient(client);
    }

    @PutMapping(path = "/update")
    public Client updateClient(@RequestBody Client client){
        return clientService.saveClient(client);
    }

    @DeleteMapping(path = "/delete/{uuid}")
    public void deleteClient(@PathVariable UUID uuid){
        clientService.deleteClient(uuid);
    }
}
