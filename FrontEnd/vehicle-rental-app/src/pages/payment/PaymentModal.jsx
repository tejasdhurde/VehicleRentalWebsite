import React from 'react';

const PaymentModal = ({ booking, onClose, onPaymentSuccess }) => {
  const handleConfirmPayment = async () => {
    alert("✅ Payment Successful!");
    onPaymentSuccess();
    onClose();
  };

  if (!booking) return null;

  return (
    <div className="modal d-block bg-dark bg-opacity-75" tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Make Payment for Booking #{booking.bookingId}</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body text-center">
            <p><strong>Vehicle:</strong> {booking.vehicleTitle}</p>
            <p><strong>Total Amount:</strong> ₹{booking.totalCost}</p>
            <p className="text-muted">This is a dummy payment simulation.</p>
            <button className="btn btn-success" onClick={handleConfirmPayment}>
              🔐 Confirm Payment
            </button>
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
