package com.placement.placementtracker.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.placement.placementtracker.entity.Company;
import com.placement.placementtracker.entity.Student;
import com.placement.placementtracker.service.CompanyService;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class CompanyController {

    @Autowired
    private CompanyService companyService;

    @PostMapping("/companies")
    public Company addCompany(@RequestBody Company company) {
        return companyService.addCompany(company);
    }

    @GetMapping("/companies")
    public List<Company> getAllCompanies() {
        return companyService.getAllCompanies();
    }

    @DeleteMapping("/companies/{id}")
    public String deleteCompany(@PathVariable Long id) {
        companyService.deleteCompany(id);
        return "Company deleted successfully";
    }

    @PutMapping("/companies/{id}")
    public Company updateCompany(
            @PathVariable Long id,
            @RequestBody Company company) {

        return companyService.updateCompany(id, company);
    }

    @PostMapping("/companies/{companyId}/eligibility")
    public boolean checkEligibility(
            @PathVariable Long companyId,
            @RequestBody Student student) {

        return companyService.checkEligibility(companyId, student);
    }

    @PostMapping("/companies/eligible")
    public List<Company> getEligibleCompanies(
            @RequestBody Student student) {

        return companyService.getEligibleCompanies(student);
    }
}