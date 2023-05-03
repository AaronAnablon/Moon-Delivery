import React from 'react';


const PayButton = () => {
  const handleCheckout = () => {
    window.location.href = `/checkout`;
  };

  return (
    <button onClick={handleCheckout}>
      Checkout
    </button>
  );
};

export default PayButton;
