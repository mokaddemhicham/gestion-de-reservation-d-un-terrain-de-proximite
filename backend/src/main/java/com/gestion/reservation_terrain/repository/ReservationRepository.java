package com.gestion.reservation_terrain.repository;

import com.gestion.reservation_terrain.model.Reservation;
import com.gestion.reservation_terrain.model.Terrain;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.sql.Date;
import java.util.UUID;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, UUID> {
    boolean existsByTerrainAndDateAndHeure(Terrain terrain, Date date, Integer heure);
}
