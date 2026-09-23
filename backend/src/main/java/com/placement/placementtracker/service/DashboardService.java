package com.placement.placementtracker.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.placement.placementtracker.repository.ApplicationRepository;
import com.placement.placementtracker.repository.CompanyRepository;
import com.placement.placementtracker.repository.StudentRepository;

@Service
public class DashboardService {

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private CompanyRepository companyRepository;

    @Autowired
    private ApplicationRepository applicationRepository;

    public long getTotalStudents() {
        return studentRepository.count();
    }

    public long getTotalCompanies() {
        return companyRepository.count();
    }

    public long getTotalApplications() {
        return applicationRepository.count();
    }
}