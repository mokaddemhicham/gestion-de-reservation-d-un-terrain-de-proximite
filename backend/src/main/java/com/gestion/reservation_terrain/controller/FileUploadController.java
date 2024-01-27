package com.gestion.reservation_terrain.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;

@RestController
@RequestMapping("/api/files")
public class FileUploadController {
    @Value("${upload.dir}")
    private String UPLOAD_FOLDER;

    @PostMapping("/upload")
    public ResponseEntity<String> uploadFile(@RequestParam("file") MultipartFile file) {
        try {
            // Check if the upload folder exists, create if not
            Path uploadFolderPath = Path.of(System.getProperty("user.dir") + UPLOAD_FOLDER);
            Files.createDirectories(uploadFolderPath);

            // Copy the file to the upload folder
            Path targetPath = uploadFolderPath.resolve(file.getOriginalFilename());
            Files.copy(file.getInputStream(), targetPath, StandardCopyOption.REPLACE_EXISTING);

            return ResponseEntity.ok(targetPath.toString());
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Failed to upload file");
        }
    }
}
