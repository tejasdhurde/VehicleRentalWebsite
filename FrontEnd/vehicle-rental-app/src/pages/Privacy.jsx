import React from 'react';
import '../assets/Privacy.css'; // ✅ Import custom CSS

const Privacy = () => {
  return (
    <div className="container privacy-policy mt-4 mb-5">
      <div className="card shadow-sm p-4">
        <h2 className="mb-4 text-primary fw-bold text-center">🔒 Privacy Policy</h2>

        <p className="text-muted">
          We value your privacy. Your personal data is collected only to facilitate vehicle rentals and communication.
          We do <strong>not</strong> sell or share your information with third-party advertisers.
        </p>

        <p className="text-muted">
          Your password is stored securely using advanced encryption. Payment details are processed safely via certified third-party gateways ensuring utmost protection.
        </p>

        <p className="text-muted">
          For any concerns, questions, or data deletion requests, please reach out to our support team. We're here to help!
        </p>
      </div>
    </div>
  );
};

export default Privacy;
