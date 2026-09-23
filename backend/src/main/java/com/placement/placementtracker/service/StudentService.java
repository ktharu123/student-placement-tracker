package com.placement.placementtracker.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.placement.placementtracker.entity.Student;
import com.placement.placementtracker.repository.StudentRepository;

@Service
public class StudentService {

    @Autowired
    private StudentRepository studentRepository;

    public Student registerStudent(Student student) {
        return studentRepository.save(student);
    }

    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    public Student getStudentById(Long id) {
        return studentRepository.findById(id).orElse(null);
    }

    public void deleteStudent(Long id) {
        studentRepository.deleteById(id);
    }

    public Student loginStudent(String email, String password) {

        Optional<Student> student =
                studentRepository.findByEmail(email);

        if (student.isPresent()
                && student.get().getPassword().equals(password)) {

            return student.get();
        }

        return null;
    }

    public Student updateStudent(Long id, Student student) {

        Student existingStudent =
                studentRepository.findById(id).orElse(null);

        if (existingStudent == null) {
            return null;
        }

        existingStudent.setName(student.getName());
        existingStudent.setEmail(student.getEmail());
        existingStudent.setPassword(student.getPassword());
        existingStudent.setPhone(student.getPhone());
        existingStudent.setCgpa(student.getCgpa());
        existingStudent.setBranch(student.getBranch());

        return studentRepository.save(existingStudent);
    }
}