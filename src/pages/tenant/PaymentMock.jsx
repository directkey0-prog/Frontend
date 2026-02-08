import { useState } from 'react';

const PaymentMock = ({ requestId, onPayment }) => {
  const [paid, setPaid] = useState(false);

  const handlePay = () => {
    // Mock payment
    setPaid(true);
    onPayment(requestId);
  };

  return (
    <div className="p-4 border rounded">
      <h3>Mock Payment</h3>
      {!paid ? (
        <button onClick={handlePay} className="bg-green-500 text-white px-4 py-2">Pay Now</button>
      ) : (
        <p>Payment Successful!</p>
      )}
    </div>
  );
};

export default PaymentMock;