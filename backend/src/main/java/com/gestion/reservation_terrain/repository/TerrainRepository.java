package com.gestion.reservation_terrain.repository;

import com.gestion.reservation_terrain.model.Disponibilite;
import com.gestion.reservation_terrain.model.Service;
import com.gestion.reservation_terrain.model.Terrain;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.UUID;
@Repository
public interface TerrainRepository extends JpaRepository<Terrain, UUID> {

    @Query(value = "SELECT COUNT(*) > 0 " +
            "FROM terrain t " +
            "JOIN terrain_disponibilite td ON t.uuid = td.uuid_terrain " +
            "JOIN disponibilite d ON d.uuid = td.uuid_disponibilite " +
            "WHERE d.jour = :dayName " +
            "  AND d.heure_debut <= :heure " +
            "  AND d.heure_fin > :heure " +
            "  AND t.uuid = :terrainUuid", nativeQuery = true)
    Integer isTerrainAvailable(@Param("dayName") String dayName,
                               @Param("heure") int heure,
                               @Param("terrainUuid") UUID terrainUuid);
    @Query("select t.services from Terrain t where t.uuid = :uuid")
    public Iterable<Service> findAllServicesByTerrainUuid(@Param("uuid") UUID uuid);

    @Query("select t.disponibilites from Terrain t where t.uuid = :uuid")
    public Iterable<Disponibilite> findAllDisponibilitesByTerrainUuid(@Param("uuid") UUID uuid);

    @Query(value = "select *  from terrain", nativeQuery = true)
    public Page<Terrain> findAllTerrains(Pageable pageable);

}
