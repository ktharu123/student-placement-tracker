package com.placement.placementtracker.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.placement.placementtracker.entity.Application;
import com.placement.placementtracker.service.ApplicationService;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class ApplicationController {

    @Autowired
    private ApplicationService applicationService;

    @PostMapping("/applications")
    public ResponseEntity<?> applyForCompany(
            @RequestBody Application application) {

        try {

            Application savedApplication =
                    applicationService.applyForCompany(application);

            return ResponseEntity.ok(savedApplication);

        } catch (IllegalArgumentException e) {

            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(e.getMessage());
    }
    }

    @GetMapping("/applications")
    public List<Application> getAllApplications() {
        return applicationService.getAllApplications();
    }

    @GetMapping("/applications/student/{studentId}")
    public List<Application> getApplicationsByStudent(
            @PathVariable Long studentId) {

        return applicationService.getApplicationsByStudent(studentId);
    }

    @DeleteMapping("/applications/{id}")
    public String deleteApplication(@PathVariable Long id) {
        applicationService.deleteApplication(id);
        return "Application deleted successfully";
    }

    @PutMapping("/applications/{id}/status")
    public Application updateStatus(
            @PathVariable Long id,
            @RequestBody Application application) {

        return applicationService.updateStatus(
                id,
                application.getStatus()
        );
    }
}