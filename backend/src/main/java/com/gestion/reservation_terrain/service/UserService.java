package com.gestion.reservation_terrain.service;

import com.gestion.reservation_terrain.model.User;
import com.gestion.reservation_terrain.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
public class UserService {

    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository){
        this.userRepository = userRepository;
    }

    public Iterable<User> getUsers(){
        return userRepository.findAll();
    }

    public Optional<User> getUser(UUID uuid){
        return userRepository.findById(uuid);
    }

    public void deleteUser(User user){
        userRepository.delete(user);
    }

    public void deleteUser(UUID uuid){
        userRepository.deleteById(uuid);
    }

    public Iterable<User> getUsersByName(String nom){
        return userRepository.findByNomContaining(nom);
    }
}
