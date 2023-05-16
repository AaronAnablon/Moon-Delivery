import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { url, setHeaders } from '../slices/api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { clearCart } from '../slices/cartSlice';
import { Form, Button, Card, Container } from 'react-bootstrap';

const Checkout = () => {
  const cart = useSelector((state) => state.cart);
  const auth = useSelector((state) => state.auth);

  const [phoneNumber, setPhoneNumber] = useState(localStorage.getItem('phoneNumber') || '');
  const [previewUrl, setPreviewUrl] = useState(localStorage.getItem('previewUrl') || null);
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [address2, setAddress2] = useState('');
  const [defaultAddress, setDefaultAddress] = useState('');
  const [defaultNumber, setDefaultNumber] = useState('');

  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  const handleAddress2Change = (event) => {
    const value = event.target.value;
    setAddress2(value);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    // Preview image
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setPreviewUrl(reader.result);
      localStorage.setItem('previewUrl', reader.result);
    };
    reader.onerror = () => {
      console.error('Error reading file');
    };
  };
  
  const handleCheckout = (event) => {
    event.preventDefault();

    const products = cart.cartItems.map((item) => ({
      sellerId: item.storeId,
      productId: item._id,
      quantity: item.cartQuantity,
      image: item.image,
      name: item.name,
      price: item.price,
    }));
  
    const shipping = {
      address2: defaultAddress ? auth.address : address2,
      phoneNumber: defaultNumber ? auth.phoneNumber : phoneNumber,
    };
  
    const subtotal = cart.cartItems.reduce(
      (accumulator, item) => accumulator + item.price * item.cartQuantity,
      0
    );
  
    const total = subtotal;
    const image = localStorage.getItem('previewUrl');
    const name = auth.name
    const userId = auth._id;
    const payment_status = 'pending';
  
    const data = {
      userId,
      name,
      shipping,
      products,
      subtotal,
      total,
      payment_status,
      image,
    };
  
    axios
      .post(`${url}/orders/${auth._id}`, data, setHeaders())
      .then((response) => {
        console.log(response);
        navigate('/user/order');
        toast('Order placed successfully!');
        dispatch(clearCart());
      })
      .catch((error) => {
        console.log(error);
      });
  };

const currency = (price) => {
 return price.toLocaleString('en-PH', { style: 'currency', currency: 'PHP' })
}

  const getSubtotals = (cartItems) => {
    const subtotals = cartItems.map((item) => item.price * item.cartQuantity);
    const total = subtotals.reduce((a, b) => a + b);
    return total;
  };
    let total = getSubtotals(cart.cartItems);
  return (

       <div className="row">
    <Card className='col-lg-6'>
      <div className='m-4'>
  <h2 className="text-center">Order Information</h2>
      <h3 className="mb-4">Cart Items:</h3>
      {cart && cart.cartItems.map((item) => (
        <div className="row border-bottom" key={item._id}>
          <div className='col-6'>
            <img src={item.image} alt={item.name} className="col-12"  />
              <p>{item.name}</p>
              <p>Brand: {item.brand}</p>
          </div>
          <div className='col-6'>
            <p>Price: {currency(item.price)}</p>
            <p>Quantity: {item.cartQuantity}</p>
            <p>Subtotal: {currency(item.price * item.cartQuantity)}</p>
          </div>
        </div>
      ))}
   
    <p style={{fontSize: '11px'}}>Shipping may vary. Delivered within 2-3 days within Ifugao</p>
    <div className="col-lg-12 d-flex justify-content-end">
      <div className="text-right">
      <p>Shipping Fee: {currency(60)}</p>
        <p style={{ fontWeight: 'bold', fontSize: '1.5rem' }}>Total: {currency(total)}</p>
      </div>
    </div>
    </div>
</Card>

    <Card className='col-lg-6'>
    <div className='m-4'>
  <Form className='m-4' onSubmit={handleCheckout}>
  <Form.Group>
    <h2 className="text-center">Checkout</h2>
    <Form.Label>Address:</Form.Label>
    <Form.Control
      type="text"
      value={defaultAddress ? auth.address : address2}
      onChange={handleAddress2Change}
      maxLength={150}
      required
    />
    <Form.Check
      type="checkbox"
      onChange={() => setDefaultAddress(!defaultAddress)}
      label="Use Default Address"
    />
  </Form.Group>
  <Form.Group>
    <Form.Label>Phone number:</Form.Label>
    <Form.Control
      type="tel"
      value={defaultNumber ? auth.phoneNumber : phoneNumber}
      onChange={handlePhoneNumberChange}
      maxLength={11}
      required
    />
    <Form.Check
      type="checkbox"
      onChange={() => setDefaultNumber(!defaultNumber)}
      label="Use Default Number"
    />
  </Form.Group>
  <Form.Group>
    <Form.Label>Optional. Upload image of House or dropping Area:</Form.Label>
    <Form.Control type="file" id="file" onChange={handleFileChange} />
    {previewUrl && (
      <img
        style={{ display: 'block', marginTop: '0.5rem', maxWidth: '100%', height: 'auto' }}
        src={previewUrl}
        alt="Preview"
      />
    )}
  </Form.Group>
  <div className="d-flex justify-content-center">
    <Button type="submit" className="m-3">Submit</Button>
  </div>
</Form>
</div>
  </Card>
  </div>
  );
};

export default Checkout;


  
