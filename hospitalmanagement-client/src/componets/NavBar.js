import React from "react";
import logo from "../assets/logo.webp";
import { Link, useNavigate } from "react-router-dom";

function NavBar({ authenticated }) {
  const handleLogout = () => {
    // Clear the token from local storage
    localStorage.removeItem("token");

    // Navigate to the login page
    window.location.href = '/';

    // Optionally, you can reload the page to ensure a fresh start

    
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <img
          class="card-img-top"
          src={logo}
          style={{ height: "50px", width: "50px" }}
        />
        <span className="text-info text-uppercase">
          <h2>&nbsp;ZONE</h2>
        </span>

        <div className="container-fluid">
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {authenticated ? (
            <div className="container">
   
              <ul className="navbar-nav me-auto mb-6 mb-lg-0">
                <li class="nav-item">
                  <a class="nav-link active" aria-current="page" href="/home">
                    Home
                  </a>
                </li>

                <li class="nav-item">
                  <a class="nav-link active" aria-current="page" href="/thhome">
                    Book Appointment
                  </a>
                </li>
                <li class="nav-item">
                  <a
                    class="nav-link active"
                    aria-current="page"
                    href="/labdash"
                  >
                    Book Lab Test
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link active" aria-current="page" href="/view">
                    View Lab Appointments
                  </a>
                </li>
                <li class="nav-item">
                  <a
                    class="nav-link active"
                    aria-current="page"
                    href="/phar"
                  >
                    Buy Medicines
                  </a>
                </li>
                <li class="nav-item">
                  <a
                    class="nav-link active"
                    aria-current="page"
                    href="/patientsProgram"
                  >
                    Health Programs
                  </a>
                </li>

                <li class="nav-item">
                  <a
                    class="nav-link active"
                    aria-current="page"
                    href="/patients"
                  >
                    Patients
                  </a>
                </li>
                <li className="nav-item">
                    <button
                      className="btn btn-info ml-5"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </li>
              </ul>
            </div>
            ) : (
            <form className="d-flex" style={{ marginLeft: "1000px" }}>
              <button className="btn btn-info tab" type="submit">
                <a className="text-decoration-none text-dark " href="/">
                  Login
                </a>
                <i className="bi bi-box-arrow-in-right"></i>
              </button>
              &nbsp;&nbsp;
              <button className="btn btn-outline-info " type="submit">
                <a className="text-decoration-none text-white" href="/register">
                  Registration
                </a>
                <i className="bi bi-save2"></i>
              </button>
              &nbsp;&nbsp;
            </form>
            )}
          </div>
        
        </div>
      </nav>
    </div>
  );
}

export default NavBar;
//updated