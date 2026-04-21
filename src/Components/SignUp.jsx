import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../CSS/SignUp.css"

function SignUp()
 {
  const [user, setUser] = useState({
    username: "",
    password: ""
  });

  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };

  useEffect(() => {
    if (message === "successful added") {
      const timer = setTimeout(() => {
        navigate("/");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [message, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:8080/sign/up", user);
      setMessage(res.data);
    } catch (err) {
      setMessage(err.response?.data || "Signup failed!");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow p-4" style={{ width: "350px" }}>
        <h3 className="text-center mb-3">Sign Up</h3>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="text"
              name="username"
              className="form-control"
              placeholder="Enter Username"
              value={user.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Enter Password"
              value={user.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Sign Up
          </button>
        </form>

        {message && (
          <div className="alert alert-info mt-3 text-center">
            {message}
          </div>
        )}
      </div>
    </div>
  );
}

export default SignUp;