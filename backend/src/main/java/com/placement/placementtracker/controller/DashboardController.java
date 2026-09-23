package com.placement.placementtracker.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.placement.placementtracker.service.DashboardService;

@RestController
public class DashboardController {

    @Autowired
    private DashboardService dashboardService;

    @GetMapping("/dashboard")
    public Map<String, Long> getDashboard() {

        Map<String, Long> dashboard = new HashMap<>();

        dashboard.put("totalStudents",
                dashboardService.getTotalStudents());

        dashboard.put("totalCompanies",
                dashboardService.getTotalCompanies());

        dashboard.put("totalApplications",
                dashboardService.getTotalApplications());

        return dashboard;
    }
}