import React, { useState } from "react";
import axios from "axios";
import { baseUrl } from "../constants";
import { useNavigate } from "react-router-dom";
import "./Auth.css";
import taskManagerImage from "../assets/task-manager.png"; // Importe a imagem corretamente

const Auth: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [registerUsername, setRegisterUsername] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!username || !password) {
      setError("Username and Password are required to login");
      return;
    }

    try {
      const response = await axios.post(`${baseUrl}/login`, {
        username,
        password,
      });

      if (response.data.access_token) {
        localStorage.setItem("token", response.data.access_token);
        navigate("/app");
      }
    } catch (err: any) {
      setError(err.response?.data.message || "Login failed");
    }
  };

  const handleRegister = async () => {
    if (!registerUsername || !registerPassword) {
      setError("Username and Password are required for registration");
      return;
    }

    try {
      const response = await axios.post(`${baseUrl}/users`, {
        username: registerUsername,
        password: registerPassword,
      });

      if (response.data) {
        setShowRegisterForm(false);
        setError(null);
        setRegisterUsername("");
        setRegisterPassword("");
      }
    } catch (err: any) {
      setError(err.response?.data.message || "Registration failed");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-image">
        <img src={taskManagerImage} alt="Auth" />
      </div>
      <div className="auth-container">
        {showRegisterForm ? (
          <div className="register-form">
            <h2>Create Account</h2>
            {error && <p className="error">{error}</p>}
            <input
              type="text"
              placeholder="New Username"
              value={registerUsername}
              onChange={(e) => setRegisterUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="New Password"
              value={registerPassword}
              onChange={(e) => setRegisterPassword(e.target.value)}
            />
            <button onClick={handleRegister}>Register</button>
            <button onClick={() => setShowRegisterForm(false)}>
              Back to Login
            </button>
          </div>
        ) : (
          <div className="login-form">
            <h1>Login</h1>
            {error && <p className="error">{error}</p>}
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLogin}>Login</button>
            <p className="switch-form">
              Don't have an account?{" "}
              <button onClick={() => setShowRegisterForm(true)}>
                Create Account
              </button>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Auth;
