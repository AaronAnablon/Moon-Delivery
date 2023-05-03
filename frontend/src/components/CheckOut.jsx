import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import OpenCageGeocode from 'opencage-api-client';
import axios from 'axios';
import { url, setHeaders } from '../slices/api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { clearCart } from '../slices/cartSlice';

const Checkout = () => {
  const cart = useSelector((state) => state.cart);
  const auth = useSelector((state) => state.auth);

  // State variables for user input
  const [address, setAddress] = useState(localStorage.getItem('address') || '');
  const [phoneNumber, setPhoneNumber] = useState(localStorage.getItem('phoneNumber') || '');
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(localStorage.getItem('previewUrl') || null);
  const navigate = useNavigate();
  const dispatch = useDispatch()
  // State variables for address suggestions
  const [address2, setAddress2] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  // State variable for distance calculation
  const [distance, setDistance] = useState('');

  // Handlers for user input changes
  const handleAddressChange = (event) => {
    setAddress(event.target.value);
    localStorage.setItem('address', event.target.value);
  };

  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
    localStorage.setItem('phoneNumber', event.target.value);
  };

  const handleAddress2Change = (event) => {
    const value = event.target.value;
    setAddress2(value);

    if (value.length > 3) {
      // Call OpenCage API to get address suggestions
      const params = {
        q: value,
        countrycode: 'ph',
        no_annotations: 1,
        key: '93b8b8cefa044e9cbd2d7b31fa0fd13f',
      };

      OpenCageGeocode.geocode(params)
        .then((response) => {
          setSuggestions(response.results);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setAddress2(suggestion.formatted);
    setSuggestions([]);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    // Preview image
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setPreviewUrl(reader.result);
      localStorage.setItem('previewUrl', reader.result);
      setSelectedFile(reader.result);
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
    }));
  
    const shipping = {
      address1: address,
      address2: address2,
      phoneNumber: phoneNumber,
    };
  
    const subtotal = cart.cartItems.reduce(
      (accumulator, item) => accumulator + item.price * item.cartQuantity,
      0
    );
  
    const total = subtotal;
    const image = selectedFile;
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
  
  let total = 0;

  const carts = cart.cartItems.map((item) => {
    total += item.price * item.cartQuantity
    
    return (
      <div className="order-item" key={item._id}>
        <div className="order-product">
          <div> 
        <img src={item.image.secure_url} alt={item.name} />
        <p>{item.name}</p>
        <p>Brand: {item.brand}</p>
        </div>
      
        <div> 
        <p>Price: {item.price}</p>
        <p>Quantity: {item.cartQuantity}</p>
        <p>Total: {item.price * item.cartQuantity}</p>
        </div>
       
     </div>
      </div>
    );
  });


  return (
    <div className="checkout-page">
      <div className="order-information">
        <h2>Order Information</h2>
        <div className="cart-items">
          <h3>Cart Items:</h3>
          <div className="cart-items">
        {carts}
        <p style={{marginLeft: '10rem', fontWeight: 'bold', fontSize: '1.5rem'}}>Total: {total}</p>
        </div>
        </div>
      </div>
      {/* <Delivery />
    */}
      <div className="checkout-container">
        <h2>Checkout</h2>
        <div>
      <label htmlFor="address2">Address2:</label>
      <input
        type="text"
        id="address2"
        value={address2}
        onChange={handleAddress2Change}
      />
      {suggestions.length > 0 && (
        <ul>
          {suggestions.map((suggestion) => (
            <li key={suggestion.formatted}>
              <button onClick={() => handleSuggestionClick(suggestion)}>
                {suggestion.formatted}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
    <form className="checkout-form">
      <div className="form-group">
        <label htmlFor="address">Address:</label>
        <input
          type="text"
          id="address"
          value={address}
          onChange={handleAddressChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="phoneNumber">Phone number:</label>
        <input
          type="tel"
          id="phoneNumber"
          value={phoneNumber}
          onChange={handlePhoneNumberChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="file">Optional. Upload image of House or dropping Area:</label>
        <input type="file" id="file" onChange={handleFileChange} />
        {previewUrl && (
          <img className="image-preview" src={previewUrl} alt="Preview" />
        )}
      </div>
      <button type="submit" onClick={handleCheckout} className="submit-button">Submit</button>
    </form>
  </div>
</div>

  );
};

export default Checkout;


  
