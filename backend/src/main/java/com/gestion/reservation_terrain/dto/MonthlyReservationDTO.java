package com.gestion.reservation_terrain.dto;

import lombok.Data;

@Data
public class MonthlyReservationDTO {
    private String month;
    private Long numberOfReservations;
}
