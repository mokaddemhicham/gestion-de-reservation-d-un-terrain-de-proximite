package com.gestion.reservation_terrain.service;

import com.gestion.reservation_terrain.model.Client;
import com.gestion.reservation_terrain.repository.ClientRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
public class ClientService {
    private final ClientRepository clientRepository;

    public ClientService(ClientRepository clientRepository) {
        this.clientRepository = clientRepository;
    }

    public Iterable<Client> getClients(){
        return clientRepository.findAll();
    }

    public Optional<Client> getClient(UUID uuid){
        return clientRepository.findById(uuid);
    }

    public Client saveClient(Client client){
        return clientRepository.save(client);
    }

    public void deleteClient(Client client){
        clientRepository.delete(client);
    }

    public void deleteClient(UUID uuid){
        clientRepository.deleteById(uuid);
    }

    public Long getUserCount() {
        return clientRepository.count();
    }
}
