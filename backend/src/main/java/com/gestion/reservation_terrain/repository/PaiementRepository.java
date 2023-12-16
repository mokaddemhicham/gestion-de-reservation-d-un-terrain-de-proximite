package com.gestion.reservation_terrain.repository;

import com.gestion.reservation_terrain.model.Paiement;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface PaiementRepository extends CrudRepository<Paiement, UUID> {
}
