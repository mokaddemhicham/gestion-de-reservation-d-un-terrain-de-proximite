package com.gestion.reservation_terrain.repository;

import com.gestion.reservation_terrain.model.Reservation;
import com.gestion.reservation_terrain.model.Terrain;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.sql.Date;
import java.util.List;
import java.util.UUID;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, UUID> {
    boolean existsByTerrainAndDateAndHeure(Terrain terrain, Date date, Integer heure);

    Iterable<Reservation> findAllByDateAndTerrain(Date date, Terrain terrain);

    List<Reservation> findAllByTerrainAndDateGreaterThanEqual(Terrain terrain, Date date);
    @Query(value = "SELECT MONTHNAME(date) AS month, COUNT(*) AS numberOfReservations FROM reservation GROUP BY MONTH(date)", nativeQuery = true)
    List<Object[]> countMonthlyReservations();
    @Query("SELECT r FROM Reservation r JOIN Terrain t ON r.terrain.uuid = t.uuid WHERE t.proprietaire.uuid = :idProprietaire")
    List<Reservation> getReservationsByProprietaire(@Param("idProprietaire") UUID idProprietaire);
}
