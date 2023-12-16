package com.gestion.reservation_terrain.repository;

import com.gestion.reservation_terrain.model.Admin;
import org.springframework.data.repository.CrudRepository;

import java.util.UUID;

public interface AdminRepository extends CrudRepository<Admin, UUID> {
}
