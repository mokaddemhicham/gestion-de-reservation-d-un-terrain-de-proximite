package com.gestion.reservation_terrain.mappers;

import com.gestion.reservation_terrain.dto.PageableDto;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

@Service
public class PageableMapper<T>{
    public PageableDto<T> fromPageable(Page<T> page){
        PageableDto<T> pageableDto = new PageableDto<T>();
        pageableDto.setCurrentPage(page.getNumber());
        pageableDto.setPages(new int[page.getTotalPages()]);
        pageableDto.setContent(page.getContent());
        return pageableDto;
    }
}
