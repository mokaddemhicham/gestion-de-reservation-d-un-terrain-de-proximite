package com.gestion.reservation_terrain.repository;

import com.gestion.reservation_terrain.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface UserRepository extends JpaRepository<User, UUID> {
    public Iterable<User> findByNomContaining(String nom);
}
