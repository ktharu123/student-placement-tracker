package com.placement.placementtracker.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.placement.placementtracker.entity.Application;

public interface ApplicationRepository extends JpaRepository<Application, Long> {

    List<Application> findByStudentId(Long studentId);

    boolean existsByStudentIdAndCompanyId(Long studentId, Long companyId);

}