import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../assets/Signup.css';

const Signup = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    reEnterPassword: '',
    phone: '',
    role: 'CUSTOMER' // Default role
  });

  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (form.password !== form.reEnterPassword) {
      setError("❌ Passwords do not match.");
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/api/auth/register', {
        name: form.name,
        email: form.email,
        password: form.password,
        phone: form.phone,
        role: form.role
      });

      // Log response to see format
      console.log('✅ Registration response:', response.data);

      // Handle both string or object response
      if (typeof response.data === 'string') {
        alert('✅ ' + response.data);
      } else if (response.data.message) {
        alert('✅ ' + response.data.message);
      } else {
        alert('✅ Registration successful!');
      }

      navigate('/login');
    } catch (err) {
      console.error('❌ Registration error:', err.response?.data || err.message);
      const data = err.response?.data;
      if (typeof data === 'string') {
        setError(data);
      } else if (data?.message) {
        setError(data.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className="signup-container d-flex align-items-center justify-content-center">
      <div className="signup-box shadow-lg">
        <h3 className="text-center text-success mb-4 fw-bold">Create Your Account</h3>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-semibold">Full Name</label>
            <input
              type="text"
              className="form-control shadow-sm"
              required
              placeholder="Enter your full name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Email Address</label>
            <input
              type="email"
              className="form-control shadow-sm"
              required
              placeholder="Enter your email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Phone Number</label>
            <input
              type="tel"
              className="form-control shadow-sm"
              required
              placeholder="Enter your phone number"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Role</label>
            <select
              className="form-select shadow-sm"
              required
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
            >
              <option value="CUSTOMER">User</option>
              <option value="OWNER">Vehicle Owner</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Password</label>
            <input
              type="password"
              className="form-control shadow-sm"
              required
              placeholder="Create a password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>

          <div className="mb-4">
            <label className="form-label fw-semibold">Re-enter Password</label>
            <input
              type="password"
              className="form-control shadow-sm"
              required
              placeholder="Confirm your password"
              value={form.reEnterPassword}
              onChange={(e) => setForm({ ...form, reEnterPassword: e.target.value })}
            />
          </div>

          <button type="submit" className="btn btn-success w-100 fw-semibold">
            Register
          </button>

          <div className="text-center mt-3">
            <span>Already have an account? </span>
            <button
              type="button"
              className="btn btn-link text-decoration-none fw-semibold"
              onClick={() => navigate('/login')}
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
