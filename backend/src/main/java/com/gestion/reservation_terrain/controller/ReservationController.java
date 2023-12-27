package com.gestion.reservation_terrain.controller;

import com.gestion.reservation_terrain.model.Reservation;
import com.gestion.reservation_terrain.service.ReservationService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import java.util.UUID;

@Tag(name = "Reservation Controller", description = "Gestion des reservations de terrains")
@RestController
@RequestMapping(path = "/reservations")
public class ReservationController {
    private final ReservationService reservationService;

    @Autowired
    public ReservationController(ReservationService reservationService) {
        this.reservationService = reservationService;
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
    public Reservation reserver(@RequestBody Reservation reservation){
        return reservationService.saveReservation(reservation);
    }

}
