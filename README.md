# Student Placement Tracker

A full-stack web application for managing student placement activities, company eligibility, job applications, and placement status.

## Project Overview

The Student Placement Tracker provides separate workflows for students and placement administrators.

Students can register, manage their profiles, check eligible companies, apply for placement opportunities, and track their application status.

Administrators can manage students, companies, applications, and placement statistics through an admin dashboard.

## Features

### Student

- Student registration and login
- Student profile management
- Update student details
- View eligible companies
- CGPA and branch-based eligibility checking
- Apply for companies
- Duplicate application prevention
- View applied companies
- Track application status
- View placement statistics

### Admin

- Admin login
- Admin dashboard
- View total students
- View total companies
- View total applications
- Add companies
- Update companies
- Delete companies
- View students
- Delete students
- View applications
- Update application status

### Application Status

- APPLIED
- SHORTLISTED
- SELECTED
- REJECTED

## Technology Stack

### Frontend

- React
- JavaScript
- HTML
- CSS
- Vite

### Backend

- Java 21
- Spring Boot 4.1.1
- Spring Web
- Spring Data JPA
- Hibernate
- Maven

### Database

- MySQL 8.0

### Tools

- Eclipse
- VS Code
- Postman
- Git
- GitHub

## System Architecture

```text
React Frontend
      |
      | REST API
      |
Spring Boot Backend
      |
      +-- Controller Layer
      |
      +-- Service Layer
      |
      +-- Repository Layer
      |
      +-- JPA / Hibernate
      |
    MySQL