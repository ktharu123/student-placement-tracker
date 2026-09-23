package com.placement.placementtracker.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.placement.placementtracker.entity.Application;
import com.placement.placementtracker.entity.Company;
import com.placement.placementtracker.entity.Student;
import com.placement.placementtracker.repository.ApplicationRepository;
import com.placement.placementtracker.repository.CompanyRepository;
import com.placement.placementtracker.repository.StudentRepository;

@Service
public class ApplicationService {

    @Autowired
    private ApplicationRepository applicationRepository;

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private CompanyRepository companyRepository;

    public Application applyForCompany(Application application) {

        Optional<Student> student =
                studentRepository.findById(application.getStudentId());

        if (student.isEmpty()) {
            throw new IllegalArgumentException("Student not found");
        }

        Optional<Company> company =
                companyRepository.findById(application.getCompanyId());

        if (company.isEmpty()) {
            throw new IllegalArgumentException("Company not found");
        }

        boolean alreadyApplied =
                applicationRepository.existsByStudentIdAndCompanyId(
                        application.getStudentId(),
                        application.getCompanyId()
                );

        if (alreadyApplied) {
            throw new IllegalArgumentException(
                    "You have already applied for this company"
            );
        }

        Student existingStudent = student.get();
        Company existingCompany = company.get();

        boolean cgpaEligible =
                existingStudent.getCgpa() >= existingCompany.getMinimumCgpa();

        boolean branchEligible =
                existingStudent.getBranch()
                        .equalsIgnoreCase(existingCompany.getEligibleBranch());

        if (!cgpaEligible || !branchEligible) {
            throw new IllegalArgumentException(
                    "Student is not eligible for this company"
            );
        }

        application.setStatus("APPLIED");

        return applicationRepository.save(application);
    }

    public List<Application> getAllApplications() {
        return applicationRepository.findAll();
    }

    public List<Application> getApplicationsByStudent(Long studentId) {
        return applicationRepository.findByStudentId(studentId);
    }

    public void deleteApplication(Long id) {
        applicationRepository.deleteById(id);
    }

    public Application updateStatus(Long id, String status) {

        Optional<Application> application =
                applicationRepository.findById(id);

        if (application.isPresent()) {

            Application existingApplication = application.get();

            existingApplication.setStatus(status);

            return applicationRepository.save(existingApplication);
        }

        return null;
    }
}