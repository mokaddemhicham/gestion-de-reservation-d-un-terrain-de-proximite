package com.gestion.reservation_terrain.service;

import com.gestion.reservation_terrain.model.*;
import com.gestion.reservation_terrain.repository.ReservationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.text.SimpleDateFormat;
import java.util.*;

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

    public String getDayName(Date date){
        java.util.Date utilDate = new java.util.Date(date.getTime());
        // Use SimpleDateFormat to get the day name
        SimpleDateFormat sdf = new SimpleDateFormat("EEEE"); // "EEEE" for the full day name
        return sdf.format(utilDate);
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

    public Reservation saveReservation(Reservation reservation){
        if (checkReservation(reservation.getTerrain(), reservation.getHeure(), reservation.getDate())){
            reservation.setEtat("Comfirme");
            return reservationRepository.save(reservation);
        }else{
            return null;
        }
    }

    public Iterable<Reservation> getReservationsByDateAndTerrain(Date date, Terrain terrain){
        return reservationRepository.findAllByDateAndTerrain(date, terrain);
    }

    public Map<Integer, Boolean> getHeuresAvailables(Terrain terrain, Date date){
        String dayName = getDayName(date);
        Optional<Disponibilite> optionalDisponibilite =  terrainService.getDisponibiliteByTerrainAndJour(terrain, dayName);
        Map<Integer, Boolean> heuresAvailables = new HashMap<>();
        if (optionalDisponibilite.isPresent()) {
            Disponibilite disponibilite = optionalDisponibilite.get();
            Integer heureDebut = disponibilite.getHeureDebut();
            Integer heureFin = disponibilite.getHeureFin();
            Iterable<Reservation> reservations = getReservationsByDateAndTerrain(date, terrain);
            List<Integer> heuresReservees = new ArrayList<>();
            for (Reservation reservation : reservations){
                heuresReservees.add(reservation.getHeure());
            }
            for(Integer heure = heureDebut; heure <= heureFin; heure++){
                if (heuresReservees.contains(heure)){
                    heuresAvailables.put(heure, false);
                }else{
                    heuresAvailables.put(heure, true);
                }
            }
        }
        return heuresAvailables;
    }

    public Boolean isDayAvailable(UUID terrainUuid, Date date){
        Optional<Terrain> optionalTerrain = terrainService.getTerrain(terrainUuid);
        if(optionalTerrain.isPresent()){
            Terrain terrain = optionalTerrain.get();
            Iterable<Reservation> reservations = getReservationsByDateAndTerrain(date, terrain);

        }
        return true;
    }

}
