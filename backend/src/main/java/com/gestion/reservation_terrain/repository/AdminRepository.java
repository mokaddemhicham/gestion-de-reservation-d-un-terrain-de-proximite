package com.gestion.reservation_terrain.repository;

import com.gestion.reservation_terrain.model.Admin;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface AdminRepository extends JpaRepository<Admin, UUID> {
}
