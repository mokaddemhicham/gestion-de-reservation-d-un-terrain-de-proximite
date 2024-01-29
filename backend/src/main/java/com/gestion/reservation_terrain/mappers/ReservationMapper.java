package com.gestion.reservation_terrain.mappers;

import com.gestion.reservation_terrain.dto.ReservationDto;
import com.gestion.reservation_terrain.model.Reservation;
import com.gestion.reservation_terrain.service.ClientService;
import com.gestion.reservation_terrain.service.TerrainService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ReservationMapper {
    private final ClientService clientService;
    private final TerrainService terrainService;

    @Autowired
    public ReservationMapper(ClientService clientService, TerrainService terrainService) {
        this.clientService = clientService;
        this.terrainService = terrainService;
    }

    public Reservation fromReservationDto(ReservationDto reservationDto){
        Reservation reservation = new Reservation();
        reservation.setUser(clientService.getClient(reservationDto.getUser()));
        reservation.setEtat(reservationDto.getEtat());
        reservation.setDate(reservationDto.getDate());
        reservation.setHeure(reservationDto.getHeure());
        reservation.setPaiement(reservationDto.getPaiement());
        reservation.setUuid(reservationDto.getUuid());
        if (terrainService.getTerrain(reservationDto.getTerrain()).isPresent()){
            reservation.setTerrain(terrainService.getTerrain(reservationDto.getTerrain()).get());
        }else{
            reservation.setTerrain(null);
        }
        return reservation;
    }
}
