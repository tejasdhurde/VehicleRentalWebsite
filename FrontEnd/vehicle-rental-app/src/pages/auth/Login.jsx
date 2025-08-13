import React, { useContext, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import '../../assets/Login.css';

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('http://localhost:8080/api/auth/login', form);

      const data = response.data;

      login({
        token: data.token,
        userId: data.id,
        email: data.email,
        role: data.role,
        tokenType: data.type || "Bearer"
      });

      // ✅ Navigate
      const redirectPath = location.state?.from || '/';
      const vehicle = location.state?.vehicle;

      if (redirectPath === '/booking' && vehicle) {
        navigate('/booking', { state: { vehicle } });
      } else {
        navigate(redirectPath);
      }

    } catch (err) {
      const message = err?.response?.data || "Login failed";
      setError(typeof message === 'string' ? message : message.message || "Invalid credentials.");
    }
  };

  return (
    <div className="login-container d-flex align-items-center justify-content-center">
      <div className="login-box shadow-lg">
        <h3 className="text-center text-primary mb-4">Login to Your Account</h3>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-semibold">Email address</label>
            <input
              type="email"
              className="form-control shadow-sm"
              required
              value={form.email}
              placeholder="Enter your email"
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Password</label>
            <input
              type="password"
              className="form-control shadow-sm"
              required
              value={form.password}
              placeholder="Enter your password"
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>

          <div className="d-flex justify-content-between align-items-center mb-3">
            <button type="submit" className="btn btn-primary w-50 fw-semibold">Login</button>
            <button
              type="button"
              className="btn btn-link text-decoration-none"
              onClick={() => navigate('/forgot-password')}
            >
              Forgot Password?
            </button>
          </div>

          <div className="text-center mt-3">
            <span>Don't have an account? </span>
            <button
              type="button"
              className="btn btn-link text-decoration-none fw-semibold"
              onClick={() => navigate('/signup')}
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

