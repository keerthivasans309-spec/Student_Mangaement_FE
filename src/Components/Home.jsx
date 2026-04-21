import { useNavigate } from "react-router-dom";
import "../CSS/home.css";


function Home() {
  const navigate = useNavigate();

  return (
    <div>

      {/* 🔹 HEADER / NAVBAR */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
        <span className="navbar-brand fw-bold">StudentMS</span>

        <div className="ms-auto">
          <button
            className="btn btn-outline-light me-2"
            onClick={() => navigate("/SignIn")}
          >
            Sign In
          </button>
          <button
            className="btn btn-success"
            onClick={() => navigate("/SignUp")}
          >
            Sign Up
          </button>
        </div>
      </nav>

      {/* 🔹 HERO SECTION */}
      <div className="container-fluid bg-light py-5">
        <div className="row align-items-center px-5">

          {/* Left Content */}
          <div className="col-md-6">
            <h1 className="fw-bold text-primary">
              Welcome to Student Management System 🎓
            </h1>

            <p className="text-muted mt-3">
              Easily manage student records, track details, and organize data
              efficiently. This system helps you handle student information
              with speed and accuracy.
            </p>

            <button
              className="btn btn-primary mt-3 me-2"
              onClick={() => navigate("/SignUp")}
            >
              Get Started
            </button>

            <button
              className="btn btn-outline-secondary mt-3"
              onClick={() => navigate("/SignIn")}
            >
              Login
            </button>
          </div>

          {/* Right Image */}
          <div className="col-md-6 text-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/3135/3135755.png"
              alt="student"
              className="img-fluid"
              style={{ maxHeight: "300px" }}
            />
          </div>

        </div>
      </div>

      {/* 🔹 CONTENT SECTION */}
      <div className="container py-5">
        <h2 className="text-center mb-4">Why Use This System?</h2>

        <div className="row text-center">
          <div className="col-md-4">
            <h5>📊 Easy Management</h5>
            <p>Store and manage student data without complexity.</p>
          </div>

          <div className="col-md-4">
            <h5>⚡ Fast Access</h5>
            <p>Quickly retrieve and update student information.</p>
          </div>

          <div className="col-md-4">
            <h5>🔒 Secure</h5>
            <p>Keep your data safe with proper authentication.</p>
          </div>
        </div>
      </div>

      {/* 🔹 FOOTER */}
      <footer className="bg-dark text-light text-center py-3">
        <p className="mb-0">
          © 2026 Student Management System | Built with React & Spring Boot
        </p>
      </footer>

    </div>
    
  );
}

export default Home;