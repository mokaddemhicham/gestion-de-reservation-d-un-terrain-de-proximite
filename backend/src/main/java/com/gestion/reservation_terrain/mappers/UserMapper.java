package com.gestion.reservation_terrain.mappers;

import com.gestion.reservation_terrain.dto.UserDto;
import com.gestion.reservation_terrain.model.User;

public class UserMapper {
    public static UserDto toUserDto(User user) {
        UserDto userDto = new UserDto();
        userDto.setUuid(user.getUuid());
        userDto.setNom(user.getNom());
        userDto.setPrenom(user.getPrenom());
        userDto.setEmail(user.getEmail());
        userDto.setTelephone(user.getTelephone());
        userDto.setRole(user.getRole());
        userDto.setCin(user.getCin());
        userDto.setAdresse(user.getAdresse());
        return userDto;
    }
}
