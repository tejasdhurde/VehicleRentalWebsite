import React from 'react';
import '../assets/About.css'; // ✅ Import the CSS

const About = () => {
  return (
    <div className="about-page container py-5">
      <div className="text-center mb-4">
        <h2 className="about-title fw-bold text-primary">🚗 About Us</h2>
        <p className="about-subtitle text-muted">
          Empowering seamless journeys, one ride at a time.
        </p>
      </div>

      <div className="about-content bg-white p-4 rounded shadow-sm">
        <p className="lead mb-4">
          Welcome to our <strong>Vehicle Rental Platform</strong>! We aim to make transportation convenient,
          affordable, and accessible for everyone.
        </p>
        <p>
          Our platform connects vehicle owners with renters across India. Whether you're looking to rent a
          car for a weekend getaway or a bike for daily commuting, we’ve got you covered.
        </p>
        <p>
          We are on a mission to revolutionize urban mobility through seamless, secure, and sustainable
          rental solutions that prioritize customer experience and environmental responsibility.
        </p>
        <p className="text-success mt-4 fw-semibold">
          Join us in driving toward a smarter and greener future!
        </p>
      </div>
    </div>
  );
};

export default About;
