package com.gestion.reservation_terrain.repository;

import com.gestion.reservation_terrain.model.ProprietaireTerrain;
import com.gestion.reservation_terrain.model.Terrain;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface ProprietaireTerrainRepository extends JpaRepository<ProprietaireTerrain, UUID> {

}
