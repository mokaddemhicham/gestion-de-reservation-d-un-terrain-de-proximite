package com.gestion.reservation_terrain.repository;

import com.gestion.reservation_terrain.model.Terrain;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;
@Repository
public interface TerrainRepository extends CrudRepository<Terrain, UUID> {
}
