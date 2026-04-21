import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Layout from "./Layout";

function AddStudent() {
  const navigate = useNavigate();

  const [detail, setDetail] = useState({
    StudentName: "",
    FatherName: "",
    MotherName: "",
    PhoneNumber: "",
    FatherNumber: "",
    MailId: "",
    Address: "",
    course_id: ""
  });

  const [courses, setCourses] = useState([]);
  const [message, setMessage] = useState("");

  // 🔹 Fetch courses (FIXED endpoint)
  useEffect(() => {
    axios
      .get("http://localhost:8080/course/upcoming") // ✅ correct endpoint
      .then((res) => {
        console.log("Courses API:", res.data); // debug
        setCourses(res.data);
      })
      .catch((err) => {
        console.error("Course fetch error:", err);
        setCourses([]); // prevent crash
      });
  }, []);

  // 🔹 Handle input
  const handleChange = (e) => {
    const { name, value } = e.target;

    setDetail((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // 🔹 Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!detail.course_id) {
      setMessage("Please select a course");
      return;
    }

    const payload = {
      StudentName: detail.StudentName,
      FatherName: detail.FatherName,
      MotherName: detail.MotherName,
      PhoneNumber: detail.PhoneNumber,
      FatherNumber: detail.FatherNumber,
      MailId: detail.MailId,
      Address: detail.Address,
      course: {
        course_id: Number(detail.course_id) // ✅ correct mapping
      }
    };

    console.log("Sending payload:", payload);

    try {
      const res = await axios.post(
        "http://localhost:8080/student/addDetails",
        payload
      );

      setMessage(res.data);

      if (res.data === "Student added successfully") {
        setTimeout(() => navigate("/Dashboard"), 1500);
      }
    } catch (err) {
      console.error("FULL ERROR:", err.response || err);
      setMessage(err.response?.data || "Student creation failed!");
    }
  };

  return (
    <Layout>
    <div className="container mt-5">
      <div className="col-md-6 mx-auto">
        <div className="card shadow p-4">
          <h4 className="text-center mb-3">Add Student</h4>

          {message && (
            <div className="alert alert-info text-center">
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <input
              className="form-control mb-2"
              name="StudentName"
              value={detail.StudentName}
              onChange={handleChange}
              placeholder="Student Name"
              required
            />

            <input
              className="form-control mb-2"
              name="FatherName"
              value={detail.FatherName}
              onChange={handleChange}
              placeholder="Father Name"
            />

            <input
              className="form-control mb-2"
              name="MotherName"
              value={detail.MotherName}
              onChange={handleChange}
              placeholder="Mother Name"
            />

            <input
              className="form-control mb-2"
              name="PhoneNumber"
              value={detail.PhoneNumber}
              onChange={handleChange}
              placeholder="Phone Number"
            />

            <input
              className="form-control mb-2"
              name="FatherNumber"
              value={detail.FatherNumber}
              onChange={handleChange}
              placeholder="Father Number"
            />

            <input
              className="form-control mb-2"
              name="MailId"
              value={detail.MailId}
              onChange={handleChange}
              placeholder="Email"
            />

            <textarea
              className="form-control mb-3"
              name="Address"
              value={detail.Address}
              onChange={handleChange}
              placeholder="Address"
            />

            {/* 🔹 Course Dropdown */}
            <select
              className="form-select mb-3"
              name="course_id"
              value={detail.course_id}
              onChange={handleChange}
              required
            >
              <option value="">-- Select Course --</option>

              {Array.isArray(courses) &&
                courses.map((c) => (
                  <option key={c.course_id} value={c.course_id}>
                    {c.courseName}
                  </option>
                ))}
            </select>

            {courses.length === 0 && (
              <small className="text-danger">
                No upcoming courses available
              </small>
            )}

            <button className="btn btn-primary w-100">
              Add Student
            </button>
          </form>
        </div>
      </div>
    </div>
    </Layout>
  );
}

export default AddStudent;