package com.placement.placementtracker.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.placement.placementtracker.entity.Company;

public interface CompanyRepository extends JpaRepository<Company, Long> {

}