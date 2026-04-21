import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Layout from "./Layout";

function AddCourse() {
  const navigate = useNavigate();

  const [course, setCourse] = useState({
    courseName: "",
    courseStartDate: "",
    courseEndDate: "",
    handleStaff: "",
    status: ""
  });

  const [message, setMessage] = useState("");

  // Handle input change
  const handleChange = (e) => {
    setCourse({
      ...course,
      [e.target.name]: e.target.value
    });
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 🔴 Basic validation (don’t skip this)
    if (!course.courseName || !course.courseStartDate || !course.courseEndDate) {
      setMessage("Please fill all required fields");
      return;
    }

    try {
      await axios.post("http://localhost:8080/course/addcourse", course);
      setMessage("Course added successfully");

      // redirect after 1.5 sec
      setTimeout(() => {
        navigate("/Dashboard");
      }, 1500);

    } catch (error) {
      console.error(error);
      setMessage("Error adding course");
    }
  };

  return (
    <Layout>
    <div className="container mt-5">
      <h2 className="mb-4">Add Course</h2>

      {message && <p className="text-info">{message}</p>}

      <form onSubmit={handleSubmit}>

        <div className="mb-3">
          <label>Course Name</label>
          <input
            type="text"
            name="courseName"
            className="form-control"
            value={course.courseName}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label>Start Date</label>
          <input
            type="date"
            name="courseStartDate"
            className="form-control"
            value={course.courseStartDate}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label>End Date</label>
          <input
            type="date"
            name="courseEndDate"
            className="form-control"
            value={course.courseEndDate}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label>Handled By</label>
          <input
            type="text"
            name="handleStaff"
            className="form-control"
            value={course.handleStaff}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label>Status</label>
          <select
            name="status"
            className="form-control"
            value={course.status}
            onChange={handleChange}
          >
            <option value="">Select Status</option>
            <option value="ONGOING">Ongoing</option>
            <option value="COMPLETED">Completed</option>
            <option value="UPCOMING">Upcoming</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary">
          Add Course
        </button>

      </form>
    </div>
    </Layout>
  );
}

export default AddCourse;