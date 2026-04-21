import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../CSS/signin.css";

function SignIn() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:8080/sign/in", user);

      setMessage(res.data);
      console.log(res.data);
      if (res.data === "Login successful")
      {
        navigate("/Dashboard");
      }

    } catch (error) {
      console.error(error);
      setMessage("Login failed");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow signin-card" style={{ width: "350px" }}>
        <h3 className="text-center mb-3">Sign In</h3>

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

          <button type="submit" className="btn btn-primary w-100">Sign In</button>
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

export default SignIn;