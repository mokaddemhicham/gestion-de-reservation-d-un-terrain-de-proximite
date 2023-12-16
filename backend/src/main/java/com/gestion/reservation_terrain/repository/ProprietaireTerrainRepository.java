package com.gestion.reservation_terrain.repository;

import com.gestion.reservation_terrain.model.ProprietaireTerrain;
import org.springframework.data.repository.CrudRepository;

import java.util.UUID;

public interface ProprietaireTerrainRepository extends CrudRepository<ProprietaireTerrain, UUID> {
}
