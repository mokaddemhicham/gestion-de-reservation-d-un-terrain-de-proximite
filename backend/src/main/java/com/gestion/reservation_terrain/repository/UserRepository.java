package com.gestion.reservation_terrain.repository;

import com.gestion.reservation_terrain.dto.UserDto;
import com.gestion.reservation_terrain.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface UserRepository extends JpaRepository<User, UUID> {

    @Query("SELECT u, TYPE(u) FROM User u")
    List<Object[]> findAllUsersWithDiscriminator();

    public Iterable<User> findByNomContaining(String nom);
    public User findByEmailAndPassword(String email, String password);
    public String query= "SELECT u.uuid, u.nom, u.prenom, u.email, u.cin, u.telephone, TYPE(u) FROM User u";
    @Query(value = query, nativeQuery = true)
    Iterable<User> findAllWithDiscriminator();
}
