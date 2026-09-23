package com.placement.placementtracker.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.placement.placementtracker.entity.Admin;
import com.placement.placementtracker.repository.AdminRepository;

@Service
public class AdminService {

    @Autowired
    private AdminRepository adminRepository;

    public Admin registerAdmin(Admin admin) {
        return adminRepository.save(admin);
    }

    public List<Admin> getAllAdmins() {
        return adminRepository.findAll();
    }

    public void deleteAdmin(Long id) {
        adminRepository.deleteById(id);
    }

    public Admin loginAdmin(String email, String password) {

        Optional<Admin> admin = adminRepository.findByEmail(email);

        if (admin.isPresent() && admin.get().getPassword().equals(password)) {
            return admin.get();
        }

        return null;
    }
}