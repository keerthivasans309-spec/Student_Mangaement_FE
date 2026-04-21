import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Layout from "./Layout";

export default function Students() {
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await axios.get("http://localhost:8080/student/getDetails");
      setStudents(res.data);
    } catch (err) {
      console.error("Error fetching students:", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this student?"))
      return;

    try {
      await axios.delete(`http://localhost:8080/student/deleteDetails/${id}`);

      setStudents((prev) => prev.filter((s) => s.StudentId !== id));
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  const handleEdit = (id) => {
    navigate(`/editStudent/${id}`);
  };

  return (
    <Layout>
    <div
      className="container-fluid px-4 py-4"
      style={{ background: "#f8fafc", minHeight: "100vh" }}
    >
      {/* HEADER */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Students</h2>
        <button
          className="btn btn-primary"
          onClick={() => navigate("/AddStudent")}
        >
          + Add Student
        </button>
      </div>

      {/* TABLE */}
      <div className="card shadow-sm p-3">
        <div className="table-responsive">
          <table className="table table-hover align-middle">
            <thead className="table-light">
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Course</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {students.length > 0 ? (
                students.map((s) => (
                  <tr key={s.StudentId}>
                    <td>{s.StudentId}</td>
                    <td>{s.StudentName}</td>
                    <td>{s.PhoneNumber}</td>
                    <td>{s.MailId}</td>
                    <td>{s.course?.courseName || "N/A"}</td>

                    <td>
                      <button
                        className="btn btn-sm btn-warning me-2"
                        onClick={() => handleEdit(s.StudentId)}
                      >
                        Edit
                      </button>

                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDelete(s.StudentId)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center text-muted">
                    No students found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </Layout>
  );
}
