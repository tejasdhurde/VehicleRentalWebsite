import React, { useState } from 'react';
import '../../assets/Profile.css'; // ✅ Custom CSS

const Profile = () => {
  const [profile, setProfile] = useState({
    name: 'Tejas Dhurde',
    email: 'tdhurde@gmail.com',
    password: '',
  });

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('✅ Profile updated successfully!');
  };

  return (
    <div className="container profile-container mt-4">
      <div className="profile-card p-4 shadow-sm rounded bg-white">
        <h3 className="mb-4 text-primary fw-bold text-center">👤 My Profile</h3>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-semibold">Full Name</label>
            <input
              type="text"
              name="name"
              className="form-control"
              value={profile.name}
              onChange={handleChange}
              placeholder="Enter your full name"
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Email Address</label>
            <input
              type="email"
              name="email"
              className="form-control"
              value={profile.email}
              disabled
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">New Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              value={profile.password}
              onChange={handleChange}
              placeholder="Enter new password"
            />
          </div>

          <button type="submit" className="btn btn-primary w-100 mt-3">
            🔒 Update Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
