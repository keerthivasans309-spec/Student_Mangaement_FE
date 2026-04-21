import { useNavigate } from "react-router-dom";
import "../CSS/Layout.css";

export default function Layout({ children }) {
  const navigate = useNavigate();

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      
      <div className="sidebar">
        <h5 className="sidebar-title">🎓 Admin</h5>

        <div className="sidebar-menu">
          <button className="sidebar-btn" onClick={() => navigate("/dashboard")}>Dashboard</button>
          <button className="sidebar-btn" onClick={() => navigate("/students")}>Students</button>
          <button className="sidebar-btn" onClick={() => navigate("/courses")}>Courses</button>
          <button className="sidebar-btn" onClick={() => navigate("/AddStudent")}>Add Student</button>
          <button className="sidebar-btn" onClick={() => navigate("/AddCourse")}>Add Course</button>
        </div>

        <button className="sidebar-btn logout" onClick={() => navigate("/")}>
          Logout
        </button>
      </div>

      <div style={{ flex: 1, padding: "25px" }}>
        {children}
      </div>
    </div>
  );
}