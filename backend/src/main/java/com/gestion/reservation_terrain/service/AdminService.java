package com.gestion.reservation_terrain.service;

import com.gestion.reservation_terrain.model.Admin;
import com.gestion.reservation_terrain.repository.AdminRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
public class AdminService {
    private final AdminRepository adminRepository;

    public AdminService(AdminRepository adminRepository) {
        this.adminRepository = adminRepository;
    }

    public Iterable<Admin> getAdmins(){
        return adminRepository.findAll();
    }

    public Optional<Admin> getAdmin(UUID uuid){
        return adminRepository.findById(uuid);
    }

    public Admin saveAdmin(Admin admin){
        return adminRepository.save(admin);
    }

    public void deleteAdmin(Admin admin){
        adminRepository.delete(admin);
    }

    public void deleteAdmin(UUID uuid){
        adminRepository.deleteById(uuid);
    }
}
