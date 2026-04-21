import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function EditStudent() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [detail, setDetail] = useState({
    StudentName: "",
    FatherName: "",
    MotherName: "",
    PhoneNumber: "",
    FatherNumber: "",
    MailId: "",
    Address: "",
  });

  const [message, setMessage] = useState("");

  // Fetch student
  useEffect(() => {
    if (!id) return;

    axios
      .get(`http://localhost:8080/students/${id}`)
      .then((res) => setDetail(res.data))
      .catch((err) => {
        console.error(err);
        setMessage("Failed to load data");
      });
  }, [id]);

  // Handle change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setDetail((prev) => ({
      ...prev,
      [name]:
        name === "PhoneNumber" || name === "FatherNumber"
          ? Number(value)
          : value,
    }));
  };

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put("http://localhost:8080/students/updateDetails/{studentid}", detail);
      setMessage("Updated successfully");

      setTimeout(() => navigate("/Dashboard"), 1000);
    } catch (err) {
      console.error(err);
      setMessage("Update failed");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Edit Student</h2>

      <form onSubmit={handleSubmit}>
        <input
          className="form-control mb-2"
          name="StudentName"
          value={detail.StudentName}
          onChange={handleChange}
          placeholder="Student Name"
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

        <input
          className="form-control mb-3"
          name="Address"
          value={detail.Address}
          onChange={handleChange}
          placeholder="Address"
        />

        <button className="btn btn-success me-2" type="submit">
          Update
        </button>

        <button
          className="btn btn-secondary"
          type="button"
          onClick={() => navigate("/Dashboard")}
        >
          Cancel
        </button>
      </form>

      {message && <p className="mt-3">{message}</p>}
    </div>
  );
}

export default EditStudent;