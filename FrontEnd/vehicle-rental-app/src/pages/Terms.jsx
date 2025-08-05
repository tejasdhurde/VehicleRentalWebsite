import React from 'react';
import '../assets/Terms.css'; // ✅ Import your custom CSS

const Terms = () => {
  return (
    <div className="container terms-container mt-4 mb-5">
      <div className="card shadow-sm p-4">
        <h2 className="text-primary fw-bold mb-4 text-center">📜 Terms & Conditions</h2>

        <p className="text-muted">
          By using our platform, you agree to our terms of service. This includes complying with rental agreements,
          payment terms, and not misusing the rented vehicles.
        </p>

        <ul className="custom-list mt-3">
          <li>✅ All drivers must possess a valid driving license.</li>
          <li>⏱️ Vehicles must be returned on time and in good condition.</li>
          <li>💸 Late returns may incur additional charges.</li>
          <li>⛽ Fuel costs are to be borne by the renter unless stated otherwise.</li>
        </ul>
      </div>
    </div>
  );
};

export default Terms;
