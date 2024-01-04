package com.gestion.reservation_terrain;

import com.gestion.reservation_terrain.model.Client;
import com.gestion.reservation_terrain.model.Reservation;
import com.gestion.reservation_terrain.model.Terrain;
import com.gestion.reservation_terrain.repository.ReservationRepository;
import com.gestion.reservation_terrain.service.ClientService;
import com.gestion.reservation_terrain.service.TerrainService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.UUID;

@SpringBootApplication
public class ReservationTerrainApplication implements CommandLineRunner {
	private final TerrainService terrainService;
	private final ReservationRepository reservationRepository;
	private final ClientService clientService;

	@Autowired
	public ReservationTerrainApplication(TerrainService terrainService, ReservationRepository reservationRepository, ClientService clientService) {
		this.terrainService = terrainService;
        this.reservationRepository = reservationRepository;
        this.clientService = clientService;
    }

	public static void main(String[] args) {
		SpringApplication.run(ReservationTerrainApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
//		Reservation reservation = new Reservation();
//		reservation.setHeure(13);
//		reservation.setDate(new java.sql.Date(new java.util.Date().getTime()));
//		reservation.setEtat("Non Confirmé");
//		Terrain terrain = terrainService.getTerrain(UUID.fromString("00000000-0000-0000-0000-000000000000")).get();
//		Client client = clientService.getClient(UUID.fromString("02ba7822-aac1-4ca2-979b-4ca5623ae014")).get();
//		reservation.setTerrain(terrain);
//		reservation.setUser(client);
//		reservationRepository.save(reservation);
	}
}
