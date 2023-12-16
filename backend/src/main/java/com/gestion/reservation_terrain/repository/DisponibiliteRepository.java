package com.gestion.reservation_terrain.repository;

import com.gestion.reservation_terrain.model.Disponibilite;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;
@Repository
public interface DisponibiliteRepository extends CrudRepository<Disponibilite, UUID> {
}
