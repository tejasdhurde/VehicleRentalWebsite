import React, { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import "../../assets/PaymentPage.css";

const PaymentPage = () => {
  const { state } = useLocation();
  const booking = state?.booking;
  const navigate = useNavigate();

  const [paymentDetails, setPaymentDetails] = useState({
    paymentMode: "UPI",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    upiId: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `http://localhost:8080/api/payments/customer/${booking.user.id}/${booking.id}`,
        paymentDetails
      );
      alert("Payment Successful!");
      navigate("/mybookings");
    } catch (error) {
      console.error("Payment failed", error);
      alert("Payment failed");
    }
  };

  return (
    <div className="payment-container">
      <h2>Payment</h2>
      <form onSubmit={handleSubmit} className="payment-form">
        <label>Payment Mode:</label>
        <select
          name="paymentMode"
          value={paymentDetails.paymentMode}
          onChange={handleChange}
        >
          <option value="UPI">UPI</option>
          <option value="CARD">Card</option>
        </select>

        {paymentDetails.paymentMode === "CARD" && (
          <>
            <label>Card Number:</label>
            <input
              type="text"
              name="cardNumber"
              value={paymentDetails.cardNumber}
              onChange={handleChange}
              required
            />
            <label>Expiry Date:</label>
            <input
              type="text"
              name="expiryDate"
              placeholder="MM/YY"
              value={paymentDetails.expiryDate}
              onChange={handleChange}
              required
            />
            <label>CVV:</label>
            <input
              type="password"
              name="cvv"
              value={paymentDetails.cvv}
              onChange={handleChange}
              required
            />
          </>
        )}

        {paymentDetails.paymentMode === "UPI" && (
          <>
            <label>UPI ID:</label>
            <input
              type="text"
              name="upiId"
              value={paymentDetails.upiId}
              onChange={handleChange}
              required
            />
          </>
        )}

        <button type="submit">Pay Now</button>
      </form>
    </div>
  );
};

export default PaymentPage;
