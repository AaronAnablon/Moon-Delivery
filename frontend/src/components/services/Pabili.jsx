import { useSelector } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DistanceCalculator from "../DistanceCalculator";
import axios from "axios";
import { setHeaders, url } from "../../slices/api";
import { toast } from 'react-toastify';


const Pabili = () => {
  const auth = useSelector(state => state.auth)
  const booking = useSelector(state => state.booking)
  const [items, setItems] = useState([]);
  const [itemInput, setItemInput] = useState('');
  const [storeInput, setStoreInput] = useState('');
  const [addressInput, setAddressInput] = useState('');
  const [otherStoreInput, setOtherStoreInput] = useState('');
  const [otherAddress, setOtherAddress] = useState('')
  const [userAddress, setUserAddress] = useState('')
  const [useDefaultAddress, setUseDefaultAddress] = useState(false);

  const navigate = useNavigate()

  const handleOtherStoreChange = (event) => {
    setOtherStoreInput(event.target.value);
  };

  const handleUserAddressChange = (event) => {
    if (useDefaultAddress) {
      setUserAddress(auth.address);
    } else {
      setUserAddress(event.target.value);
    }
  };
  

  const handleOtherAddress = (event) => {
    setOtherAddress(event.target.value);
  };

  const handleItemChange = (event) => {
    setItemInput(event.target.value);
  };

  const handleStoreChange = (event) => {
    setStoreInput(event.target.value);
  };

  const handleAddressChange = (event) => {
    setAddressInput(event.target.value);
  };

  const handleAddItem = () => {
    console.log(booking)
    const lastItemFare = items.length > 0 ? Number(items[items.length - 1].Fare) + 10 : booking.totalAmount;
  
    const newItem = {
      Fare: lastItemFare,
      item: itemInput,
      store: storeInput === 'Other' ? otherStoreInput : storeInput,
      address: addressInput === 'Other' ? otherAddress : addressInput,
    };
  
    setItems([...items, newItem]);
    setItemInput('');
  };
  
  

  const handleDeleteItem = (index) => {
    const updatedItems = [...items];
    updatedItems.splice(index, 1);
    setItems(updatedItems);
  };


  const booked = {
    user: {_id: auth._id, name: auth.name} ,
    motorcycle: '',
    booking: {booking, items, service: 'Pabili'},
  };

  const handleBooking = () => {
    axios.post(`${url}/booking`, booked, setHeaders)
  .then(response => {
   console.log(response.data);
    toast('Booked successfully!');
    navigate('/user/userBooking');
  })
  .catch(error => {
    console.log(error);
  });
  }

  return (
    <div>
      <h2>Add items to purchase</h2>
      <div>
        <label htmlFor="itemInput">Item/Items:</label>
        <input type="text" id="itemInput" value={itemInput} onChange={handleItemChange} />
      </div>
      <div>
      <label htmlFor="store">Select a store:</label>
        <select id="store" name="store" value={storeInput} onChange={handleStoreChange}>
          <option value="">Please select a store</option>
          <option value="Grocery">Grocery</option>
          <option value="Public Market">Public Market</option>
          <option value="Wet Market">Wet Market</option>
          <option value="Sari-Sari Store">Sari-Sari Store</option>
          <option value="Other">Other</option>
        </select>
        {storeInput === 'Other' && (
          <input type="text" id="otherStoreInput" value={otherStoreInput} onChange={handleOtherStoreChange} />
        )}
      </div>
      <div>
      <label htmlFor="address">Select a Route:</label>
        <select id="address" name="address" value={addressInput} onChange={handleAddressChange}>
          <option value="">Please select a Route</option>
          <option value="Lagawe Trading, Lagawe, Ifugao">Lagawe Trading, Lagawe, Ifugao</option>
          <option value="Public Market, Lagawe, Ifugao">Public Market, Lagawe, Ifugao</option>
          <option value="Wet Market, Lagawe, Ifugao">Wet Market, Lagawe, Ifugao</option>
          <option value="Other">Other</option>
        </select>
        {addressInput === 'Other' && (
          <input type="text" value={otherAddress} onChange={handleOtherAddress} />
        )}
      </div>
       <label htmlFor="address">Address</label>
  <input
    type="text"
    value={useDefaultAddress ? auth.address : userAddress}
    onChange={handleUserAddressChange}
  />
  <label>
    <input
      type="checkbox"
      checked={useDefaultAddress}
      onChange={() =>
        setUseDefaultAddress(!useDefaultAddress)
      }
    />
    Use Default Address
  </label>
      <DistanceCalculator pickupAddress={useDefaultAddress ? auth.address : userAddress} destination={addressInput === 'Other' ? otherAddress: addressInput} phoneNumber={auth.phoneNumber}/>
      <div>
 </div>
      <button onClick={handleAddItem}>Add item</button>
      {items.length > 0 && (
  <div>
    <h3>Items to purchase:</h3>
    <ul>
      {items.map((item, index) => (
        <li key={index} style={{ backgroundColor: index % 2 === 0 ? 'lightgray' : 'white' }}>
          {item.item} - {item.store} -{item.address}
          <button
            style={{
              borderRadius: '50%',
              width: '30px',
              height: '30px',
              backgroundColor: 'red',
              color: 'white',
              fontWeight: 'bold',
              fontSize: '1.2rem',
              lineHeight: '1rem',
              cursor: 'pointer',
            }}
            onClick={() => handleDeleteItem(index)}
          >X</button>
        </li>
      ))}
     
    </ul>
    <li>
       Total Fare: {items.slice(-1)[0].Fare}
      </li>
  </div>
)}

   
        {auth._id ? (
               <button onClick={handleBooking}>Book</button>
              ) : (
                <button
                  className="cart-login"
                  onClick={() => navigate("/login")}
                >
                  Login to submit Booking
                </button>
              )}
                <p>Payment varies Depending on the Purchases made. Receipt will always be presented by the rider and recorded by our system</p>
    </div>
  );
};

export default Pabili;
