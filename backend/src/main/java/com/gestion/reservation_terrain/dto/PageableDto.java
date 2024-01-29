package com.gestion.reservation_terrain.dto;

import lombok.Data;

import java.util.List;

@Data
public class PageableDto<T> {
    private int[] pages;
    private int currentPage;
    private List<T> content;
}
