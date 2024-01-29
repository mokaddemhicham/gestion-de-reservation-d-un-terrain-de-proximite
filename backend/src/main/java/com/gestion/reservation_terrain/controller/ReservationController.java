package com.gestion.reservation_terrain.controller;

import com.gestion.reservation_terrain.dto.ReservationDto;
import com.gestion.reservation_terrain.mappers.ReservationMapper;
import com.gestion.reservation_terrain.model.Paiement;
import com.gestion.reservation_terrain.dto.MonthlyReservationDTO;
import com.gestion.reservation_terrain.model.Reservation;
import com.gestion.reservation_terrain.service.ReservationService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Tag(name = "Reservation Controller", description = "Gestion des reservations de terrains")
@RestController
@RequestMapping(path = "/api/v1/reservations")
public class ReservationController {
    private final ReservationService reservationService;
    private final ReservationMapper reservationMapper;

    @Autowired
    public ReservationController(ReservationService reservationService, ReservationMapper reservationMapper) {
        this.reservationService = reservationService;
        this.reservationMapper = reservationMapper;
    }

    @GetMapping(path = "")
    private Iterable<Reservation> getReservations(){
        return reservationService.getReservations();
    }
    @GetMapping(path = "/{uuid}")
    public Optional<Reservation> getReservation(@PathVariable UUID uuid){
        return reservationService.getReservation(uuid);
    }

    @PostMapping(path = "/add")
    public Reservation reserver(@RequestBody ReservationDto reservationDto){
        Reservation reservation = reservationMapper.fromReservationDto(reservationDto);
        return reservationService.saveReservation(reservation);
    }

    @PutMapping(path = "/update/{uuid}")
    public Reservation updateReservation(@PathVariable("uuid") UUID uuid, @RequestBody Paiement paiement){
        return reservationService.updateReservation(uuid, paiement);
    }
    @DeleteMapping(path = "/delete/{uuid}")
    public void deleteReservation(@PathVariable UUID uuid){
        reservationService.deleteReservation(uuid);
    }
    @GetMapping(path="/reservationCount")
    public long getReservationCount(){
        return reservationService.getReservationCount();
    }
    @GetMapping(path="/monthlyReservations")
    public List<MonthlyReservationDTO> getMonthlyReservations(){
        return reservationService.getMonthlyReservations();
    }
    @GetMapping(path="/proprietaire/{idProprietaire}")
    public List<Reservation> getReservationsByProprietaire(@PathVariable UUID idProprietaire){
        return reservationService.getReservationsByProprietaire(idProprietaire);
    }
}
