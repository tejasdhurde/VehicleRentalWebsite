import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import '../../assets/ForgotPassword.css';

const ForgotPassword = () => {
  const [step, setStep] = useState(1); // Step 1: email, Step 2: otp + new password
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSendOtp = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/api/auth/forgot-password', { email });
      setMessage('📧 OTP sent to your email.');
      setStep(2); // move to next step
    } catch (error) {
      setMessage('❌ Failed to send OTP. Please check email.');
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/api/auth/reset-password', {
        email,
        otp,
        newPassword
      });
      setMessage('✅ Password reset successful! Redirecting...');
      setTimeout(() => navigate('/login'), 3000);
    } catch (error) {
      setMessage('❌ Failed to reset password. Please check OTP and try again.');
    }
  };

  return (
    <div className="forgot-password-container d-flex align-items-center justify-content-center">
      <div className="forgot-password-box shadow-lg">
        <h3 className="text-center text-primary mb-4">Forgot Password</h3>

        {message && (
          <div className="alert alert-info text-center">
            {message}
          </div>
        )}

        {step === 1 && (
          <form onSubmit={handleSendOtp}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label fw-semibold">Email address</label>
              <input
                type="email"
                id="email"
                className="form-control shadow-sm"
                placeholder="Enter your registered email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-warning w-100 fw-semibold">
              Send OTP
            </button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleResetPassword}>
            <div className="mb-3">
              <label className="form-label fw-semibold">OTP</label>
              <input
                type="text"
                className="form-control shadow-sm"
                placeholder="Enter OTP"
                required
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">New Password</label>
              <input
                type="password"
                className="form-control shadow-sm"
                placeholder="Enter new password"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>

            <button type="submit" className="btn btn-success w-100 fw-semibold">
              Reset Password
            </button>
          </form>
        )}

        <div className="text-center mt-3">
          <Link to="/login" className="text-decoration-none text-secondary">
            ← Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
