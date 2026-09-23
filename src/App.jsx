import { useState } from "react";
import "./App.css";

const API = "http://localhost:8080";

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);

  const [loggedInStudent, setLoggedInStudent] = useState(null);
  const [loggedInAdmin, setLoggedInAdmin] = useState(null);

  const [activeStudentPage, setActiveStudentPage] = useState("home");
  const [activeAdminPage, setActiveAdminPage] = useState("dashboard");

  const [profile, setProfile] = useState(null);
  const [showEditProfile, setShowEditProfile] = useState(false);

  const [companies, setCompanies] = useState([]);
  const [applications, setApplications] = useState([]);
  const [applicationCompanies, setApplicationCompanies] = useState([]);
  const [students, setStudents] = useState([]);

  const [dashboard, setDashboard] = useState(null);

  const [showAddCompany, setShowAddCompany] = useState(false);
  const [showEditCompany, setShowEditCompany] = useState(false);
  const [editingCompanyId, setEditingCompanyId] = useState(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [registerName, setRegisterName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerPhone, setRegisterPhone] = useState("");
  const [registerCgpa, setRegisterCgpa] = useState("");
  const [registerBranch, setRegisterBranch] = useState("");

  const [profileName, setProfileName] = useState("");
  const [profileEmail, setProfileEmail] = useState("");
  const [profilePhone, setProfilePhone] = useState("");
  const [profileCgpa, setProfileCgpa] = useState("");
  const [profileBranch, setProfileBranch] = useState("");
  const [profilePassword, setProfilePassword] = useState("");

  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");

  const [companyName, setCompanyName] = useState("");
  const [companyLocation, setCompanyLocation] = useState("");
  const [jobRole, setJobRole] = useState("");
  const [minimumCgpa, setMinimumCgpa] = useState("");
  const [eligibleBranch, setEligibleBranch] = useState("");
  const [salary, setSalary] = useState("");

  const [message, setMessage] = useState("");

  // ================= STUDENT REGISTRATION =================

  const registerStudent = async () => {
    if (
      !registerName ||
      !registerEmail ||
      !registerPassword ||
      !registerPhone ||
      !registerCgpa ||
      !registerBranch
    ) {
      setMessage("Please fill all registration fields");
      return;
    }

    try {
      const response = await fetch(`${API}/students/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: registerName,
          email: registerEmail,
          password: registerPassword,
          phone: registerPhone,
          cgpa: Number(registerCgpa),
          branch: registerBranch,
        }),
      });

      if (response.ok) {
        setMessage("Registration successful. You can now login.");
        clearRegistrationForm();
        setShowRegister(false);
      } else {
        setMessage("Unable to register student");
      }
    } catch (error) {
      setMessage("Unable to connect to server");
    }
  };

  const clearRegistrationForm = () => {
    setRegisterName("");
    setRegisterEmail("");
    setRegisterPassword("");
    setRegisterPhone("");
    setRegisterCgpa("");
    setRegisterBranch("");
  };

  // ================= STUDENT LOGIN =================

  const loginStudent = async () => {
    if (!email || !password) {
      setMessage("Please enter email and password");
      return;
    }

    try {
      const response = await fetch(`${API}/students/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (response.ok) {
        const student = await response.json();

        setLoggedInStudent(student);
        setShowLogin(false);
        setEmail("");
        setPassword("");
        setMessage("");
        setActiveStudentPage("home");
      } else {
        setMessage("Invalid email or password");
      }
    } catch (error) {
      setMessage("Unable to connect to server");
    }
  };

  // ================= ADMIN LOGIN =================

  const loginAdmin = async () => {
    if (!adminEmail || !adminPassword) {
      setMessage("Please enter admin email and password");
      return;
    }

    try {
      const response = await fetch(`${API}/admins/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: adminEmail,
          password: adminPassword,
        }),
      });

      if (response.ok) {
        const admin = await response.json();

        setLoggedInAdmin(admin);
        setShowAdminLogin(false);
        setAdminEmail("");
        setAdminPassword("");
        setMessage("");
        setActiveAdminPage("dashboard");

        getDashboard();
      } else {
        setMessage("Invalid admin email or password");
      }
    } catch (error) {
      setMessage("Unable to connect to server");
    }
  };

  // ================= DASHBOARD =================

  const getDashboard = async () => {
    try {
      const response = await fetch(`${API}/dashboard`);

      if (response.ok) {
        const data = await response.json();
        setDashboard(data);
        setMessage("");
      } else {
        setMessage("Unable to load dashboard");
      }
    } catch (error) {
      setMessage("Unable to connect to server");
    }
  };

  // ================= PROFILE =================

  const getProfile = async () => {
    try {
      const response = await fetch(
        `${API}/students/${loggedInStudent.id}`
      );

      if (response.ok) {
        const student = await response.json();

        setProfile(student);
        setProfileName(student.name);
        setProfileEmail(student.email);
        setProfilePhone(student.phone);
        setProfileCgpa(student.cgpa);
        setProfileBranch(student.branch);
        setProfilePassword(student.password);
        setActiveStudentPage("profile");
        setMessage("");
      } else {
        setMessage("Unable to load profile");
      }
    } catch (error) {
      setMessage("Unable to connect to server");
    }
  };

  const openEditProfile = () => {
    if (!profile) {
      return;
    }

    setProfileName(profile.name);
    setProfileEmail(profile.email);
    setProfilePhone(profile.phone);
    setProfileCgpa(profile.cgpa);
    setProfileBranch(profile.branch);
    setProfilePassword(profile.password);

    setShowEditProfile(true);
    setMessage("");
  };

  const updateProfile = async () => {
    try {
      const response = await fetch(
        `${API}/students/${loggedInStudent.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: profileName,
            email: profileEmail,
            password: profilePassword,
            phone: profilePhone,
            cgpa: Number(profileCgpa),
            branch: profileBranch,
          }),
        }
      );

      if (response.ok) {
        const updatedStudent = await response.json();

        setLoggedInStudent(updatedStudent);
        setProfile(updatedStudent);
        setShowEditProfile(false);

        setMessage("Profile updated successfully");
      } else {
        setMessage("Unable to update profile");
      }
    } catch (error) {
      setMessage("Unable to connect to server");
    }
  };

  // ================= COMPANY =================

  const addCompany = async () => {
    if (
      !companyName ||
      !companyLocation ||
      !jobRole ||
      !minimumCgpa ||
      !eligibleBranch ||
      !salary
    ) {
      setMessage("Please fill all company fields");
      return;
    }

    try {
      const response = await fetch(`${API}/companies`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: companyName,
          location: companyLocation,
          jobRole,
          minimumCgpa: Number(minimumCgpa),
          eligibleBranch,
          salary: Number(salary),
        }),
      });

      if (response.ok) {
        setMessage("Company added successfully");

        clearCompanyForm();
        setShowAddCompany(false);

        getDashboard();
        getAllCompanies();
      } else {
        setMessage("Unable to add company");
      }
    } catch (error) {
      setMessage("Unable to connect to server");
    }
  };

  const getAllCompanies = async () => {
    try {
      const response = await fetch(`${API}/companies`);

      if (response.ok) {
        const data = await response.json();

        setCompanies(data);
        setActiveAdminPage("companies");
        setMessage("");
      } else {
        setMessage("Unable to load companies");
      }
    } catch (error) {
      setMessage("Unable to connect to server");
    }
  };

  const editCompany = (company) => {
    setEditingCompanyId(company.id);

    setCompanyName(company.name);
    setCompanyLocation(company.location);
    setJobRole(company.jobRole);
    setMinimumCgpa(company.minimumCgpa);
    setEligibleBranch(company.eligibleBranch);
    setSalary(company.salary);

    setShowEditCompany(true);
    setMessage("");
  };

  const updateCompany = async () => {
    try {
      const response = await fetch(
        `${API}/companies/${editingCompanyId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: companyName,
            location: companyLocation,
            jobRole,
            minimumCgpa: Number(minimumCgpa),
            eligibleBranch,
            salary: Number(salary),
          }),
        }
      );

      if (response.ok) {
        setMessage("Company updated successfully");

        clearCompanyForm();
        setShowEditCompany(false);
        setEditingCompanyId(null);

        getAllCompanies();
        getDashboard();
      } else {
        setMessage("Unable to update company");
      }
    } catch (error) {
      setMessage("Unable to connect to server");
    }
  };

  const deleteCompany = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this company?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const response = await fetch(`${API}/companies/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setMessage("Company deleted successfully");

        getAllCompanies();
        getDashboard();
      } else {
        setMessage("Unable to delete company");
      }
    } catch (error) {
      setMessage("Unable to connect to server");
    }
  };

  const clearCompanyForm = () => {
    setCompanyName("");
    setCompanyLocation("");
    setJobRole("");
    setMinimumCgpa("");
    setEligibleBranch("");
    setSalary("");
  };

  // ================= ELIGIBLE COMPANIES =================

  const getEligibleCompanies = async () => {
    try {
      const response = await fetch(`${API}/companies/eligible`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: loggedInStudent.name,
          email: loggedInStudent.email,
          password: loggedInStudent.password,
          phone: loggedInStudent.phone,
          cgpa: loggedInStudent.cgpa,
          branch: loggedInStudent.branch,
        }),
      });

      if (response.ok) {
        const data = await response.json();

        setCompanies(data);
        setActiveStudentPage("companies");
        setMessage("");
      } else {
        setMessage("Unable to load eligible companies");
      }
    } catch (error) {
      setMessage("Unable to connect to server");
    }
  };

  // ================= APPLY =================

  const applyForCompany = async (companyId) => {
    try {
      const response = await fetch(`${API}/applications`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          studentId: loggedInStudent.id,
          companyId,
        }),
      });

      if (response.ok) {
        setMessage("Application submitted successfully");
        getMyApplications();
      } else {
        const errorMessage = await response.text();
        setMessage(errorMessage);
      }
    } catch (error) {
      setMessage("Unable to connect to server");
    }
  };

  // ================= MY APPLICATIONS =================

  const getMyApplications = async () => {
    try {
      const applicationResponse = await fetch(
        `${API}/applications/student/${loggedInStudent.id}`
      );

      const companyResponse = await fetch(`${API}/companies`);

      if (applicationResponse.ok && companyResponse.ok) {
        const applicationData = await applicationResponse.json();
        const companyData = await companyResponse.json();

        setApplications(applicationData);
        setApplicationCompanies(companyData);
        setActiveStudentPage("applications");
        setMessage("");
      } else {
        setMessage("Unable to load applications");
      }
    } catch (error) {
      setMessage("Unable to connect to server");
    }
  };

  const getApplicationCount = (status) => {
    return applications.filter(
      (application) => application.status === status
    ).length;
  };

  // ================= ADMIN APPLICATIONS =================

  const getAllApplications = async () => {
    try {
      const applicationResponse = await fetch(
        `${API}/applications`
      );

      const companyResponse = await fetch(`${API}/companies`);

      if (applicationResponse.ok && companyResponse.ok) {
        const applicationData = await applicationResponse.json();
        const companyData = await companyResponse.json();

        setApplications(applicationData);
        setApplicationCompanies(companyData);
        setActiveAdminPage("applications");
        setMessage("");
      } else {
        setMessage("Unable to load applications");
      }
    } catch (error) {
      setMessage("Unable to connect to server");
    }
  };

  const updateApplicationStatus = async (
    applicationId,
    status
  ) => {
    try {
      const response = await fetch(
        `${API}/applications/${applicationId}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status,
          }),
        }
      );

      if (response.ok) {
        setMessage("Application status updated successfully");

        getAllApplications();
        getDashboard();
      } else {
        setMessage("Unable to update application status");
      }
    } catch (error) {
      setMessage("Unable to connect to server");
    }
  };

  const getCompanyById = (companyId) => {
    return applicationCompanies.find(
      (company) => company.id === companyId
    );
  };

  // ================= ADMIN STUDENTS =================

  const getAllStudents = async () => {
    try {
      const response = await fetch(`${API}/students`);

      if (response.ok) {
        const data = await response.json();

        setStudents(data);
        setActiveAdminPage("students");
        setMessage("");
      } else {
        setMessage("Unable to load students");
      }
    } catch (error) {
      setMessage("Unable to connect to server");
    }
  };

  const deleteStudent = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this student?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const response = await fetch(`${API}/students/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setMessage("Student deleted successfully");

        getAllStudents();
        getDashboard();
      } else {
        setMessage("Unable to delete student");
      }
    } catch (error) {
      setMessage("Unable to connect to server");
    }
  };

  // ================= LOGOUT =================

  const logoutStudent = () => {
    setLoggedInStudent(null);
    setProfile(null);
    setCompanies([]);
    setApplications([]);
    setApplicationCompanies([]);
    setEmail("");
    setPassword("");
    setMessage("");
    setActiveStudentPage("home");
  };

  const logoutAdmin = () => {
    setLoggedInAdmin(null);
    setDashboard(null);
    setCompanies([]);
    setApplications([]);
    setApplicationCompanies([]);
    setStudents([]);
    setAdminEmail("");
    setAdminPassword("");
    setMessage("");
    setActiveAdminPage("dashboard");
  };

  // ================= HOME =================

  const HomePage = () => (
    <div className="landing-page">
      <div className="landing-overlay">
        <nav className="landing-nav">
          <div className="brand">
            <div className="brand-icon">PT</div>
            <div>
              <h2>Placement Tracker</h2>
              <span>Career Management System</span>
            </div>
          </div>

          <div className="nav-actions">
            <button
              className="nav-btn"
              onClick={() => setShowLogin(true)}
            >
              Student Login
            </button>

            <button
              className="nav-btn primary"
              onClick={() => setShowRegister(true)}
            >
              Register
            </button>

            <button
              className="nav-btn admin-btn"
              onClick={() => setShowAdminLogin(true)}
            >
              Admin
            </button>
          </div>
        </nav>

        <div className="hero-section">
          <div className="hero-content">
            <span className="hero-tag">SMART PLACEMENT MANAGEMENT</span>

            <h1>
              Connect Students
              <br />
              With Their <span>Career</span>
            </h1>

            <p>
              A centralized platform to manage student profiles,
              company opportunities and placement applications.
            </p>

            <div className="hero-buttons">
              <button
                className="hero-primary"
                onClick={() => setShowLogin(true)}
              >
                Get Started →
              </button>

              <button
                className="hero-secondary"
                onClick={() => setShowRegister(true)}
              >
                Create Account
              </button>
            </div>
          </div>

          <div className="hero-card">
            <div className="floating-card">
              <div className="floating-icon">✓</div>
              <div>
                <strong>Placement Ready</strong>
                <p>Track your applications</p>
              </div>
            </div>

            <div className="floating-card second">
              <div className="floating-icon">★</div>
              <div>
                <strong>Find Opportunities</strong>
                <p>Discover eligible companies</p>
              </div>
            </div>
          </div>
        </div>

        <div className="feature-strip">
          <div>
            <strong>01</strong>
            <span>Student Profiles</span>
          </div>

          <div>
            <strong>02</strong>
            <span>Company Opportunities</span>
          </div>

          <div>
            <strong>03</strong>
            <span>Application Tracking</span>
          </div>

          <div>
            <strong>04</strong>
            <span>Placement Management</span>
          </div>
        </div>
      </div>
    </div>
  );

  // ================= LOGIN MODAL =================

  const StudentLoginModal = () => {
    if (!showLogin) {
      return null;
    }

    return (
      <div className="modal-overlay">
        <div className="modal-card">
          <button
            className="modal-close"
            onClick={() => {
              setShowLogin(false);
              setMessage("");
            }}
          >
            ×
          </button>

          <div className="modal-header">
            <div className="modal-icon">ST</div>
            <h2>Student Login</h2>
            <p>Access your placement dashboard</p>
          </div>

          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button className="full-btn" onClick={loginStudent}>
            Login
          </button>

          <p className="switch-text">
            Don't have an account?{" "}
            <button
              onClick={() => {
                setShowLogin(false);
                setShowRegister(true);
                setMessage("");
              }}
            >
              Register
            </button>
          </p>

          {message && <div className="form-message">{message}</div>}
        </div>
      </div>
    );
  };

  // ================= REGISTER MODAL =================

  const StudentRegisterModal = () => {
    if (!showRegister) {
      return null;
    }

    return (
      <div className="modal-overlay">
        <div className="modal-card large">
          <button
            className="modal-close"
            onClick={() => {
              setShowRegister(false);
              clearRegistrationForm();
              setMessage("");
            }}
          >
            ×
          </button>

          <div className="modal-header">
            <div className="modal-icon">+</div>
            <h2>Create Student Account</h2>
            <p>Register for placement opportunities</p>
          </div>

          <div className="form-grid">
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                placeholder="Enter full name"
                value={registerName}
                onChange={(e) =>
                  setRegisterName(e.target.value)
                }
              />
            </div>

            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                placeholder="Enter email"
                value={registerEmail}
                onChange={(e) =>
                  setRegisterEmail(e.target.value)
                }
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                placeholder="Create password"
                value={registerPassword}
                onChange={(e) =>
                  setRegisterPassword(e.target.value)
                }
              />
            </div>

            <div className="form-group">
              <label>Phone Number</label>
              <input
                type="text"
                placeholder="Enter phone number"
                value={registerPhone}
                onChange={(e) =>
                  setRegisterPhone(e.target.value)
                }
              />
            </div>

            <div className="form-group">
              <label>CGPA</label>
              <input
                type="number"
                step="0.1"
                placeholder="Example: 8.0"
                value={registerCgpa}
                onChange={(e) =>
                  setRegisterCgpa(e.target.value)
                }
              />
            </div>

            <div className="form-group">
              <label>Branch</label>
              <input
                type="text"
                placeholder="Example: ECE"
                value={registerBranch}
                onChange={(e) =>
                  setRegisterBranch(e.target.value)
                }
              />
            </div>
          </div>

          <button className="full-btn" onClick={registerStudent}>
            Create Account
          </button>

          {message && <div className="form-message">{message}</div>}
        </div>
      </div>
    );
  };

  // ================= ADMIN LOGIN MODAL =================

  const AdminLoginModal = () => {
    if (!showAdminLogin) {
      return null;
    }

    return (
      <div className="modal-overlay">
        <div className="modal-card">
          <button
            className="modal-close"
            onClick={() => {
              setShowAdminLogin(false);
              setMessage("");
            }}
          >
            ×
          </button>

          <div className="modal-header">
            <div className="modal-icon admin-icon">AD</div>
            <h2>Admin Login</h2>
            <p>Manage students and placement activities</p>
          </div>

          <div className="form-group">
            <label>Admin Email</label>
            <input
              type="email"
              placeholder="Enter admin email"
              value={adminEmail}
              onChange={(e) =>
                setAdminEmail(e.target.value)
              }
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter admin password"
              value={adminPassword}
              onChange={(e) =>
                setAdminPassword(e.target.value)
              }
            />
          </div>

          <button className="full-btn dark-btn" onClick={loginAdmin}>
            Admin Login
          </button>

          {message && <div className="form-message">{message}</div>}
        </div>
      </div>
    );
  };

  // ================= STUDENT DASHBOARD =================

  const StudentDashboard = () => (
    <div className="app-layout">
      <aside className="sidebar">
        <div className="sidebar-brand">
          <div className="brand-icon">PT</div>
          <div>
            <strong>Placement</strong>
            <span>Tracker</span>
          </div>
        </div>

        <div className="user-mini-card">
          <div className="avatar">
            {loggedInStudent.name
              ? loggedInStudent.name.charAt(0).toUpperCase()
              : "S"}
          </div>

          <div>
            <strong>{loggedInStudent.name}</strong>
            <span>Student</span>
          </div>
        </div>

        <div className="sidebar-menu">
          <button
            className={
              activeStudentPage === "home" ? "menu-item active" : "menu-item"
            }
            onClick={() => setActiveStudentPage("home")}
          >
            <span>⌂</span>
            Dashboard
          </button>

          <button
            className={
              activeStudentPage === "profile"
                ? "menu-item active"
                : "menu-item"
            }
            onClick={getProfile}
          >
            <span>◉</span>
            My Profile
          </button>

          <button
            className={
              activeStudentPage === "companies"
                ? "menu-item active"
                : "menu-item"
            }
            onClick={getEligibleCompanies}
          >
            <span>▣</span>
            Companies
          </button>

          <button
            className={
              activeStudentPage === "applications"
                ? "menu-item active"
                : "menu-item"
            }
            onClick={getMyApplications}
          >
            <span>✓</span>
            My Applications
          </button>
        </div>

        <button className="logout-btn" onClick={logoutStudent}>
          <span>↪</span>
          Logout
        </button>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div>
            <h1>
              {activeStudentPage === "home"
                ? "Student Dashboard"
                : activeStudentPage === "profile"
                  ? "My Profile"
                  : activeStudentPage === "companies"
                    ? "Eligible Companies"
                    : "My Applications"}
            </h1>

            <p>
              Welcome back, {loggedInStudent.name}
            </p>
          </div>

          <div className="topbar-profile">
            <div className="small-avatar">
              {loggedInStudent.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <strong>{loggedInStudent.name}</strong>
              <span>{loggedInStudent.branch}</span>
            </div>
          </div>
        </header>

        {message && (
          <div className="global-message">
            <span>✓</span>
            {message}
          </div>
        )}

        {activeStudentPage === "home" && (
          <>
            <section className="welcome-banner">
              <div>
                <span>STUDENT PORTAL</span>
                <h2>Build your career with confidence.</h2>
                <p>
                  Explore eligible companies, apply for opportunities
                  and track your placement journey.
                </p>
              </div>

              <div className="welcome-stat">
                <strong>{loggedInStudent.cgpa}</strong>
                <span>Current CGPA</span>
              </div>
            </section>

            <div className="stat-grid">
              <div className="stat-card">
                <div className="stat-icon blue">◎</div>
                <div>
                  <span>Branch</span>
                  <strong>{loggedInStudent.branch}</strong>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon green">✓</div>
                <div>
                  <span>Applications</span>
                  <strong>{applications.length}</strong>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon purple">★</div>
                <div>
                  <span>Selected</span>
                  <strong>
                    {getApplicationCount("SELECTED")}
                  </strong>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon orange">▣</div>
                <div>
                  <span>Eligible Jobs</span>
                  <strong>{companies.length}</strong>
                </div>
              </div>
            </div>

            <section className="quick-section">
              <div className="section-heading">
                <div>
                  <h2>Quick Actions</h2>
                  <p>Manage your placement activities</p>
                </div>
              </div>

              <div className="quick-grid">
                <button
                  className="quick-card"
                  onClick={getEligibleCompanies}
                >
                  <div className="quick-icon blue-bg">▣</div>
                  <h3>Find Companies</h3>
                  <p>View companies you are eligible for</p>
                  <span>Explore →</span>
                </button>

                <button
                  className="quick-card"
                  onClick={getMyApplications}
                >
                  <div className="quick-icon green-bg">✓</div>
                  <h3>Track Applications</h3>
                  <p>Check your current placement status</p>
                  <span>View Status →</span>
                </button>

                <button
                  className="quick-card"
                  onClick={getProfile}
                >
                  <div className="quick-icon purple-bg">◉</div>
                  <h3>Update Profile</h3>
                  <p>Keep your personal information updated</p>
                  <span>Open Profile →</span>
                </button>
              </div>
            </section>
          </>
        )}

        {activeStudentPage === "profile" && profile && (
          <section className="content-card">
            <div className="section-heading">
              <div>
                <h2>Personal Information</h2>
                <p>Your registered student details</p>
              </div>

              <button
                className="primary-action"
                onClick={openEditProfile}
              >
                Edit Profile
              </button>
            </div>

            <div className="profile-header">
              <div className="profile-avatar">
                {profile.name.charAt(0).toUpperCase()}
              </div>

              <div>
                <h2>{profile.name}</h2>
                <p>{profile.email}</p>
              </div>
            </div>

            <div className="details-grid">
              <div className="detail-box">
                <span>Full Name</span>
                <strong>{profile.name}</strong>
              </div>

              <div className="detail-box">
                <span>Email</span>
                <strong>{profile.email}</strong>
              </div>

              <div className="detail-box">
                <span>Phone</span>
                <strong>{profile.phone}</strong>
              </div>

              <div className="detail-box">
                <span>CGPA</span>
                <strong>{profile.cgpa}</strong>
              </div>

              <div className="detail-box">
                <span>Branch</span>
                <strong>{profile.branch}</strong>
              </div>

              <div className="detail-box">
                <span>Student ID</span>
                <strong>#{profile.id}</strong>
              </div>
            </div>
          </section>
        )}

        {showEditProfile && (
          <div className="modal-overlay">
            <div className="modal-card large">
              <button
                className="modal-close"
                onClick={() => setShowEditProfile(false)}
              >
                ×
              </button>

              <div className="modal-header">
                <div className="modal-icon">✎</div>
                <h2>Edit Profile</h2>
                <p>Update your student information</p>
              </div>

              <div className="form-grid">
                <div className="form-group">
                  <label>Name</label>
                  <input
                    value={profileName}
                    onChange={(e) =>
                      setProfileName(e.target.value)
                    }
                  />
                </div>

                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    value={profileEmail}
                    onChange={(e) =>
                      setProfileEmail(e.target.value)
                    }
                  />
                </div>

                <div className="form-group">
                  <label>Password</label>
                  <input
                    type="password"
                    value={profilePassword}
                    onChange={(e) =>
                      setProfilePassword(e.target.value)
                    }
                  />
                </div>

                <div className="form-group">
                  <label>Phone</label>
                  <input
                    value={profilePhone}
                    onChange={(e) =>
                      setProfilePhone(e.target.value)
                    }
                  />
                </div>

                <div className="form-group">
                  <label>CGPA</label>
                  <input
                    type="number"
                    step="0.1"
                    value={profileCgpa}
                    onChange={(e) =>
                      setProfileCgpa(e.target.value)
                    }
                  />
                </div>

                <div className="form-group">
                  <label>Branch</label>
                  <input
                    value={profileBranch}
                    onChange={(e) =>
                      setProfileBranch(e.target.value)
                    }
                  />
                </div>
              </div>

              <div className="modal-actions">
                <button
                  className="secondary-action"
                  onClick={() => setShowEditProfile(false)}
                >
                  Cancel
                </button>

                <button
                  className="primary-action"
                  onClick={updateProfile}
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}

        {activeStudentPage === "companies" && (
          <section>
            <div className="section-heading">
              <div>
                <h2>Eligible Companies</h2>
                <p>
                  Companies matching your CGPA and branch
                </p>
              </div>
            </div>

            {companies.length === 0 ? (
              <div className="empty-state">
                <div>▣</div>
                <h3>No eligible companies found</h3>
                <p>
                  Check again when new placement opportunities are added.
                </p>
              </div>
            ) : (
              <div className="company-grid">
                {companies.map((company) => (
                  <div className="company-card" key={company.id}>
                    <div className="company-card-top">
                      <div className="company-logo">
                        {company.name.charAt(0).toUpperCase()}
                      </div>

                      <span className="status-badge eligible">
                        Eligible
                      </span>
                    </div>

                    <h3>{company.name}</h3>
                    <p className="job-title">{company.jobRole}</p>

                    <div className="company-details">
                      <div>
                        <span>Location</span>
                        <strong>{company.location}</strong>
                      </div>

                      <div>
                        <span>Minimum CGPA</span>
                        <strong>{company.minimumCgpa}</strong>
                      </div>

                      <div>
                        <span>Branch</span>
                        <strong>{company.eligibleBranch}</strong>
                      </div>

                      <div>
                        <span>Salary</span>
                        <strong>{company.salary} LPA</strong>
                      </div>
                    </div>

                    <button
                      className="apply-btn"
                      onClick={() =>
                        applyForCompany(company.id)
                      }
                    >
                      Apply Now →
                    </button>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {activeStudentPage === "applications" && (
          <section>
            <div className="section-heading">
              <div>
                <h2>Placement Status</h2>
                <p>Track all your job applications</p>
              </div>
            </div>

            <div className="status-grid">
              <div className="status-card total">
                <span>Total</span>
                <strong>{applications.length}</strong>
              </div>

              <div className="status-card applied">
                <span>Applied</span>
                <strong>{getApplicationCount("APPLIED")}</strong>
              </div>

              <div className="status-card shortlisted">
                <span>Shortlisted</span>
                <strong>
                  {getApplicationCount("SHORTLISTED")}
                </strong>
              </div>

              <div className="status-card selected">
                <span>Selected</span>
                <strong>{getApplicationCount("SELECTED")}</strong>
              </div>

              <div className="status-card rejected">
                <span>Rejected</span>
                <strong>{getApplicationCount("REJECTED")}</strong>
              </div>
            </div>

            <div className="application-list">
              {applications.length === 0 ? (
                <div className="empty-state">
                  <div>✓</div>
                  <h3>No applications yet</h3>
                  <p>
                    Explore eligible companies and apply for opportunities.
                  </p>
                </div>
              ) : (
                applications.map((application) => {
                  const company = getCompanyById(
                    application.companyId
                  );

                  return (
                    <div
                      className="application-card"
                      key={application.id}
                    >
                      <div className="application-company-icon">
                        {company
                          ? company.name.charAt(0).toUpperCase()
                          : "C"}
                      </div>

                      <div className="application-main">
                        <h3>
                          {company
                            ? company.name
                            : `Company ${application.companyId}`}
                        </h3>

                        {company && (
                          <p>
                            {company.jobRole} · {company.location}
                          </p>
                        )}

                        <span>
                          Application ID: #{application.id}
                        </span>
                      </div>

                      <span
                        className={`status-badge ${application.status.toLowerCase()}`}
                      >
                        {application.status}
                      </span>
                    </div>
                  );
                })
              )}
            </div>
          </section>
        )}
      </main>
    </div>
  );

  // ================= ADMIN DASHBOARD =================

  const AdminDashboard = () => (
    <div className="app-layout admin-layout">
      <aside className="sidebar admin-sidebar">
        <div className="sidebar-brand">
          <div className="brand-icon admin-brand">PT</div>
          <div>
            <strong>Placement</strong>
            <span>Admin Panel</span>
          </div>
        </div>

        <div className="user-mini-card">
          <div className="avatar admin-avatar">A</div>

          <div>
            <strong>{loggedInAdmin.name}</strong>
            <span>Administrator</span>
          </div>
        </div>

        <div className="sidebar-menu">
          <button
            className={
              activeAdminPage === "dashboard"
                ? "menu-item active"
                : "menu-item"
            }
            onClick={() => {
              setActiveAdminPage("dashboard");
              getDashboard();
            }}
          >
            <span>⌂</span>
            Dashboard
          </button>

          <button
            className={
              activeAdminPage === "companies"
                ? "menu-item active"
                : "menu-item"
            }
            onClick={getAllCompanies}
          >
            <span>▣</span>
            Companies
          </button>

          <button
            className={
              activeAdminPage === "applications"
                ? "menu-item active"
                : "menu-item"
            }
            onClick={getAllApplications}
          >
            <span>✓</span>
            Applications
          </button>

          <button
            className={
              activeAdminPage === "students"
                ? "menu-item active"
                : "menu-item"
            }
            onClick={getAllStudents}
          >
            <span>◉</span>
            Students
          </button>
        </div>

        <button className="logout-btn" onClick={logoutAdmin}>
          <span>↪</span>
          Logout
        </button>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div>
            <h1>
              {activeAdminPage === "dashboard"
                ? "Admin Dashboard"
                : activeAdminPage === "companies"
                  ? "Company Management"
                  : activeAdminPage === "applications"
                    ? "Application Management"
                    : "Student Management"}
            </h1>

            <p>Manage your placement ecosystem</p>
          </div>

          <div className="topbar-profile">
            <div className="small-avatar admin-small">A</div>

            <div>
              <strong>{loggedInAdmin.name}</strong>
              <span>Administrator</span>
            </div>
          </div>
        </header>

        {message && (
          <div className="global-message">
            <span>✓</span>
            {message}
          </div>
        )}

        {activeAdminPage === "dashboard" && (
          <>
            <section className="welcome-banner admin-banner">
              <div>
                <span>ADMINISTRATION</span>
                <h2>Placement overview at a glance.</h2>
                <p>
                  Monitor students, companies and applications
                  from one centralized dashboard.
                </p>
              </div>

              <div className="admin-banner-icon">PT</div>
            </section>

            <div className="stat-grid admin-stat-grid">
              <div className="stat-card">
                <div className="stat-icon blue">◉</div>
                <div>
                  <span>Total Students</span>
                  <strong>
                    {dashboard?.totalStudents ?? 0}
                  </strong>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon green">▣</div>
                <div>
                  <span>Total Companies</span>
                  <strong>
                    {dashboard?.totalCompanies ?? 0}
                  </strong>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon purple">✓</div>
                <div>
                  <span>Total Applications</span>
                  <strong>
                    {dashboard?.totalApplications ?? 0}
                  </strong>
                </div>
              </div>
            </div>

            <section className="quick-section">
              <div className="section-heading">
                <div>
                  <h2>Management Tools</h2>
                  <p>Quick access to placement operations</p>
                </div>

                <button
                  className="primary-action"
                  onClick={() => setShowAddCompany(true)}
                >
                  + Add Company
                </button>
              </div>

              <div className="quick-grid">
                <button
                  className="quick-card"
                  onClick={getAllStudents}
                >
                  <div className="quick-icon blue-bg">◉</div>
                  <h3>Manage Students</h3>
                  <p>View registered student profiles</p>
                  <span>View Students →</span>
                </button>

                <button
                  className="quick-card"
                  onClick={getAllCompanies}
                >
                  <div className="quick-icon green-bg">▣</div>
                  <h3>Manage Companies</h3>
                  <p>Add and update placement companies</p>
                  <span>View Companies →</span>
                </button>

                <button
                  className="quick-card"
                  onClick={getAllApplications}
                >
                  <div className="quick-icon purple-bg">✓</div>
                  <h3>Applications</h3>
                  <p>Update student application statuses</p>
                  <span>Manage Applications →</span>
                </button>
              </div>
            </section>
          </>
        )}

        {activeAdminPage === "companies" && (
          <section>
            <div className="section-heading">
              <div>
                <h2>Companies</h2>
                <p>Manage placement opportunities</p>
              </div>

              <button
                className="primary-action"
                onClick={() => setShowAddCompany(true)}
              >
                + Add Company
              </button>
            </div>

            <div className="company-grid">
              {companies.length === 0 ? (
                <div className="empty-state">
                  <div>▣</div>
                  <h3>No companies available</h3>
                  <p>Add a company to create a placement opportunity.</p>
                </div>
              ) : (
                companies.map((company) => (
                  <div className="company-card" key={company.id}>
                    <div className="company-card-top">
                      <div className="company-logo">
                        {company.name.charAt(0).toUpperCase()}
                      </div>

                      <span className="id-badge">
                        #{company.id}
                      </span>
                    </div>

                    <h3>{company.name}</h3>
                    <p className="job-title">{company.jobRole}</p>

                    <div className="company-details">
                      <div>
                        <span>Location</span>
                        <strong>{company.location}</strong>
                      </div>

                      <div>
                        <span>Minimum CGPA</span>
                        <strong>{company.minimumCgpa}</strong>
                      </div>

                      <div>
                        <span>Branch</span>
                        <strong>{company.eligibleBranch}</strong>
                      </div>

                      <div>
                        <span>Salary</span>
                        <strong>{company.salary} LPA</strong>
                      </div>
                    </div>

                    <div className="card-actions">
                      <button
                        className="edit-btn"
                        onClick={() => editCompany(company)}
                      >
                        Edit
                      </button>

                      <button
                        className="delete-btn"
                        onClick={() =>
                          deleteCompany(company.id)
                        }
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>
        )}

        {activeAdminPage === "applications" && (
          <section>
            <div className="section-heading">
              <div>
                <h2>Student Applications</h2>
                <p>Review and update placement application status</p>
              </div>
            </div>

            <div className="admin-table-wrapper">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Student</th>
                    <th>Company</th>
                    <th>Job Role</th>
                    <th>Status</th>
                    <th>Update Status</th>
                  </tr>
                </thead>

                <tbody>
                  {applications.map((application) => {
                    const company = getCompanyById(
                      application.companyId
                    );

                    return (
                      <tr key={application.id}>
                        <td>#{application.id}</td>
                        <td>Student #{application.studentId}</td>
                        <td>
                          {company
                            ? company.name
                            : application.companyId}
                        </td>
                        <td>
                          {company
                            ? company.jobRole
                            : "-"}
                        </td>
                        <td>
                          <span
                            className={`status-badge ${application.status.toLowerCase()}`}
                          >
                            {application.status}
                          </span>
                        </td>
                        <td>
                          <div className="status-buttons">
                            <button
                              onClick={() =>
                                updateApplicationStatus(
                                  application.id,
                                  "APPLIED"
                                )
                              }
                            >
                              Applied
                            </button>

                            <button
                              onClick={() =>
                                updateApplicationStatus(
                                  application.id,
                                  "SHORTLISTED"
                                )
                              }
                            >
                              Shortlist
                            </button>

                            <button
                              onClick={() =>
                                updateApplicationStatus(
                                  application.id,
                                  "SELECTED"
                                )
                              }
                            >
                              Select
                            </button>

                            <button
                              onClick={() =>
                                updateApplicationStatus(
                                  application.id,
                                  "REJECTED"
                                )
                              }
                            >
                              Reject
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              {applications.length === 0 && (
                <div className="empty-state">
                  <div>✓</div>
                  <h3>No applications found</h3>
                </div>
              )}
            </div>
          </section>
        )}

        {activeAdminPage === "students" && (
          <section>
            <div className="section-heading">
              <div>
                <h2>Students</h2>
                <p>Registered students in the placement system</p>
              </div>
            </div>

            <div className="admin-table-wrapper">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Student</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Branch</th>
                    <th>CGPA</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {students.map((student) => (
                    <tr key={student.id}>
                      <td>#{student.id}</td>

                      <td>
                        <div className="table-user">
                          <div className="table-avatar">
                            {student.name
                              .charAt(0)
                              .toUpperCase()}
                          </div>

                          <strong>{student.name}</strong>
                        </div>
                      </td>

                      <td>{student.email}</td>
                      <td>{student.phone}</td>
                      <td>{student.branch}</td>
                      <td>
                        <strong>{student.cgpa}</strong>
                      </td>

                      <td>
                        <button
                          className="delete-btn"
                          onClick={() =>
                            deleteStudent(student.id)
                          }
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {students.length === 0 && (
                <div className="empty-state">
                  <div>◉</div>
                  <h3>No students found</h3>
                </div>
              )}
            </div>
          </section>
        )}
      </main>
    </div>
  );

  // ================= COMPANY MODALS =================

  const CompanyFormModal = ({ editMode = false }) => (
    <div className="modal-overlay">
      <div className="modal-card large">
        <button
          className="modal-close"
          onClick={() => {
            if (editMode) {
              setShowEditCompany(false);
              setEditingCompanyId(null);
            } else {
              setShowAddCompany(false);
            }

            clearCompanyForm();
            setMessage("");
          }}
        >
          ×
        </button>

        <div className="modal-header">
          <div className="modal-icon">▣</div>
          <h2>{editMode ? "Update Company" : "Add Company"}</h2>
          <p>
            {editMode
              ? "Update placement opportunity details"
              : "Create a new placement opportunity"}
          </p>
        </div>

        <div className="form-grid">
          <div className="form-group">
            <label>Company Name</label>
            <input
              placeholder="Example: TCS"
              value={companyName}
              onChange={(e) =>
                setCompanyName(e.target.value)
              }
            />
          </div>

          <div className="form-group">
            <label>Location</label>
            <input
              placeholder="Example: Bangalore"
              value={companyLocation}
              onChange={(e) =>
                setCompanyLocation(e.target.value)
              }
            />
          </div>

          <div className="form-group">
            <label>Job Role</label>
            <input
              placeholder="Example: Java Developer"
              value={jobRole}
              onChange={(e) =>
                setJobRole(e.target.value)
              }
            />
          </div>

          <div className="form-group">
            <label>Minimum CGPA</label>
            <input
              type="number"
              step="0.1"
              placeholder="Example: 7.5"
              value={minimumCgpa}
              onChange={(e) =>
                setMinimumCgpa(e.target.value)
              }
            />
          </div>

          <div className="form-group">
            <label>Eligible Branch</label>
            <input
              placeholder="Example: ECE"
              value={eligibleBranch}
              onChange={(e) =>
                setEligibleBranch(e.target.value)
              }
            />
          </div>

          <div className="form-group">
            <label>Salary in LPA</label>
            <input
              type="number"
              step="0.1"
              placeholder="Example: 5.5"
              value={salary}
              onChange={(e) =>
                setSalary(e.target.value)
              }
            />
          </div>
        </div>

        <div className="modal-actions">
          <button
            className="secondary-action"
            onClick={() => {
              if (editMode) {
                setShowEditCompany(false);
                setEditingCompanyId(null);
              } else {
                setShowAddCompany(false);
              }

              clearCompanyForm();
            }}
          >
            Cancel
          </button>

          <button
            className="primary-action"
            onClick={editMode ? updateCompany : addCompany}
          >
            {editMode ? "Update Company" : "Save Company"}
          </button>
        </div>

        {message && <div className="form-message">{message}</div>}
      </div>
    </div>
  );

  return (
    <>
      {!loggedInStudent && !loggedInAdmin && HomePage()}

      {loggedInStudent && StudentDashboard()}

      {loggedInAdmin && AdminDashboard()}

      {StudentLoginModal()}
      {StudentRegisterModal()}
      {AdminLoginModal()}

      {showAddCompany && CompanyFormModal(false)}

      {showEditCompany && CompanyFormModal(true)}
    </>
  );
}

export default App;