package com.placement.placementtracker.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.placement.placementtracker.entity.Company;
import com.placement.placementtracker.entity.Student;
import com.placement.placementtracker.repository.CompanyRepository;

@Service
public class CompanyService {

    @Autowired
    private CompanyRepository companyRepository;

    public Company addCompany(Company company) {
        return companyRepository.save(company);
    }

    public List<Company> getAllCompanies() {
        return companyRepository.findAll();
    }

    public void deleteCompany(Long id) {
        companyRepository.deleteById(id);
    }

    public Company updateCompany(Long id, Company company) {

        Company existingCompany =
                companyRepository.findById(id).orElse(null);

        if (existingCompany == null) {
            return null;
        }

        existingCompany.setName(company.getName());
        existingCompany.setLocation(company.getLocation());
        existingCompany.setJobRole(company.getJobRole());
        existingCompany.setMinimumCgpa(company.getMinimumCgpa());
        existingCompany.setEligibleBranch(company.getEligibleBranch());
        existingCompany.setSalary(company.getSalary());

        return companyRepository.save(existingCompany);
    }

    public boolean checkEligibility(Long companyId, Student student) {

        Company company =
                companyRepository.findById(companyId).orElse(null);

        if (company == null) {
            return false;
        }

        boolean cgpaEligible =
                student.getCgpa() >= company.getMinimumCgpa();

        boolean branchEligible =
                student.getBranch()
                        .equalsIgnoreCase(company.getEligibleBranch());

        return cgpaEligible && branchEligible;
    }

    public List<Company> getEligibleCompanies(Student student) {

        List<Company> companies = companyRepository.findAll();

        List<Company> eligibleCompanies = new ArrayList<>();

        for (Company company : companies) {

            boolean cgpaEligible =
                    student.getCgpa() >= company.getMinimumCgpa();

            boolean branchEligible =
                    student.getBranch()
                            .equalsIgnoreCase(company.getEligibleBranch());

            if (cgpaEligible && branchEligible) {
                eligibleCompanies.add(company);
            }
        }

        return eligibleCompanies;
    }
}