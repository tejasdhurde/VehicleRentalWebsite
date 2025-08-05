import React, { useState } from 'react';
import '../assets/Contact.css'; // ✅ Import the custom CSS

const Contact = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('✅ Message submitted successfully!');
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <div className="contact-container container py-5">
      <div className="text-center mb-4">
        <h2 className="contact-title text-primary fw-bold">📩 Contact Us</h2>
        <p className="text-muted">We’d love to hear from you! Send us a message.</p>
      </div>

      <form onSubmit={handleSubmit} className="contact-form bg-white p-4 rounded shadow-sm">
        <div className="mb-3">
          <label className="form-label">Full Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="form-control"
            placeholder="Your name"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Email Address</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="form-control"
            placeholder="you@example.com"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Your Message</label>
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            className="form-control"
            placeholder="Write your message here..."
            rows="4"
            required
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Send Message
        </button>
      </form>
    </div>
  );
};

export default Contact;
