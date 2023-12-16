package com.gestion.reservation_terrain.controller;

import com.gestion.reservation_terrain.model.Admin;
import com.gestion.reservation_terrain.service.AdminService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import java.util.UUID;


@Tag(name = "Admin Controller", description = "Gère les admins du système")
@RestController
@RequestMapping(path = "/admins")
public class AdminController {
    private final AdminService adminService;
    @Autowired
    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    @GetMapping(path = "")
    public Iterable<Admin> getAdmins(){
        return adminService.getAdmins();
    }

    @GetMapping(path = "/{uuid}")
    public Optional<Admin> getAdmin(@PathVariable UUID uuid){
        return adminService.getAdmin(uuid);
    }

    @PostMapping(path = "/save")
    public Admin saveAdmin(@RequestBody Admin admin){
        return adminService.saveAdmin(admin);
    }

    @PutMapping(path = "/update")
    public Admin updateAdmin(@RequestBody Admin admin){
        return adminService.saveAdmin(admin);
    }

    @DeleteMapping(path = "/delete/{uuid}")
    public void deleteAdmin(@PathVariable UUID uuid){
        adminService.deleteAdmin(uuid);
    }
}
