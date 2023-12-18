package com.gestion.reservation_terrain.service;

import com.gestion.reservation_terrain.model.Paiement;
import com.gestion.reservation_terrain.model.Reservation;
import com.gestion.reservation_terrain.model.Terrain;
import com.gestion.reservation_terrain.model.User;
import com.gestion.reservation_terrain.repository.ReservationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.text.SimpleDateFormat;
import java.util.Optional;
import java.util.UUID;

@Service
public class ReservationService {
    private final ReservationRepository reservationRepository;

    private final TerrainService terrainService;
    @Autowired
    public ReservationService(ReservationRepository reservationRepository, TerrainService terrainService) {
        this.reservationRepository = reservationRepository;
        this.terrainService = terrainService;
    }

    public Iterable<Reservation> getReservations(){
        return reservationRepository.findAll();
    }

    public Optional<Reservation> getReservation(UUID uuid){
        return reservationRepository.findById(uuid);
    }

    public boolean checkTerrainIfReserved(Terrain terrain, Date date, Integer heure){
        return reservationRepository.existsByTerrainAndDateAndHeure(terrain, date, heure);
    }

    public boolean checkReservation(Terrain terrain, Integer heure, Date date){
        boolean reserved = checkTerrainIfReserved(terrain, date, heure);
        if (reserved){
            return false;
        }else{
            java.util.Date utilDate = new java.util.Date(date.getTime());
            // Use SimpleDateFormat to get the day name
            SimpleDateFormat sdf = new SimpleDateFormat("EEEE"); // "EEEE" for the full day name
            String dayName = sdf.format(utilDate);

            return terrainService.isTerrainAvailable(dayName, heure, terrain.getUuid());

        }
    }


}
