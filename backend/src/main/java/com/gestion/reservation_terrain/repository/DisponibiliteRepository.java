package com.gestion.reservation_terrain.repository;

import com.gestion.reservation_terrain.model.Disponibilite;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;
@Repository
public interface DisponibiliteRepository extends JpaRepository<Disponibilite, UUID> {
}
