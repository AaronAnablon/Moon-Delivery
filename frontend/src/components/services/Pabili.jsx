import {useSelector} from "react-redux";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import DistanceCalculator from "../booking/DistanceCalculator";
import axios from "axios";
import {setHeaders, url} from "../../slices/api";
import {toast} from 'react-toastify';
import {Button, Card, Container} from "react-bootstrap";
import {TiDelete} from "react-icons/ti";
import io from 'socket.io-client';
import {server} from '../../slices/api'


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
    const [fare, setFare] = useState(false);

    const navigate = useNavigate()

    const handleOtherStoreChange = (event) => {
        setOtherStoreInput(event.target.value);
    };

    const handleUserAddressChange = (event) => {
        if (useDefaultAddress) {
            setUserAddress(auth.address);
        } else {
            setUserAddress(event.target.value);
            setFare(userAddress.length > 11)
        }
    };
    const handleUseDefAddress = () => {
        if (!useDefaultAddress) {
            setUseDefaultAddress(true)
            setFare(true)
        } else {
            setFare(false)
            setUseDefaultAddress(false)
        }
    }

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
        const lastItemFare = items.length > 0 ? Number(items[items.length - 1].Fare) + 10 : booking.totalAmount;
        const newItem = {
            Fare: lastItemFare,
            item: itemInput,
            store: storeInput === 'Other' ? otherStoreInput : storeInput,
            address: addressInput === 'Other' ? otherAddress : addressInput
        };
        setItems([
            ...items,
            newItem
        ]);
        setItemInput('');
    };
   
    
    const handleDeleteItem = (index) => {
        const updatedItems = [...items];
        updatedItems.splice(index, 1);
        setItems(updatedItems);
      
        // Subtract 10 from the fare of the latest item
        if (updatedItems.length > 0) {
          const latestItemIndex = updatedItems.length - 1;
          const latestItem = updatedItems[latestItemIndex];
          const updatedFare = latestItem.Fare - 10;
          updatedItems[latestItemIndex] = { ...latestItem, Fare: updatedFare };
          setItems(updatedItems);
        }
      };
      
      
    const booked = {
        user: {
            _id: auth._id,
            name: auth.name,
            email: auth.email
        },
        motorcycle: '',
        booking: {
            booking,
            items,
            service: 'Pabili'
        }
    };

    const handleBooking = () => {
        axios.post(`${url}/booking`, booked, setHeaders)
        .then(response => {
            console.log(response.data);
            const socket = io.connect(server);
            socket.emit('booking', response.data);
            toast('Booked successfully!');
            navigate('/user/userBooking');
        }).catch(error => {
            console.log(error);
        });
    }
    return (
        <div>
            <div className="row mb-3 d-flex justify-content-center">
                <h2>Pabili</h2>
                <div className="col-11 mb-3 rounded-bottom rounded-top mt-4 shadow">
                    <h2>Add items to purchase</h2>
                    <div className="form-group">
                        <label htmlFor="itemInput">Item/Items:</label>
                        <input className="form-control" type="text" id="itemInput"
                            value={itemInput}
                            onChange={handleItemChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="store">Select a store:</label>
                        <select className="form-control" id="store" name="store"
                            value={storeInput}
                            onChange={handleStoreChange}>
                            <option value="">Please select a store</option>
                            <option value="Grocery">Grocery</option>
                            <option value="Public Market">Public Market</option>
                            <option value="Wet Market">Wet Market</option>
                            <option value="Sari-Sari Store">Sari-Sari Store</option>
                            <option value="Other">Other</option>
                        </select>
                        {
                        storeInput === 'Other' && (
                            <input className="form-control mt-2" type="text" id="otherStoreInput"
                                value={otherStoreInput}
                                onChange={handleOtherStoreChange}/>
                        )
                    } </div>

                    <div className="form-group">
                        <label htmlFor="address">Select a Store Address:</label>
                        <select className="form-control" id="address" name="address"
                            value={addressInput}
                            onChange={handleAddressChange}>
                            <option value="">Please select a Route</option>
                            <option value="Lagawe Trading, Lagawe, Ifugao">Lagawe Trading, Lagawe, Ifugao</option>
                            <option value="Public Market, Lagawe, Ifugao">Public Market, Lagawe, Ifugao</option>
                            <option value="Wet Market, Lagawe, Ifugao">Wet Market, Lagawe, Ifugao</option>
                            <option value="Other">Other</option>
                        </select>
                        {
                        addressInput === 'Other' && (
                            <input className="form-control mt-2" type="text"
                                value={otherAddress}
                                onChange={handleOtherAddress}/>
                        )
                    } </div>

                    <div className="form-group">
                        <label htmlFor="address">Address</label>
                        <input className="form-control" type="text"
                            value={
                                useDefaultAddress ? auth.address : userAddress
                            }
                            onChange={handleUserAddressChange}/>
                    </div>

                    <div className="form-check">
                        <input className="form-check-input" type="checkbox"
                            value={useDefaultAddress}
                            id="useDefaultAddress"
                            onClick={handleUseDefAddress}/>
                        <label className="form-check-label mb-3" htmlFor="useDefaultAddress">
                            Use Default Address
                        </label>
                    </div>
                    {
                    fare && items.length < 1 && <DistanceCalculator pickupAddress={
                            addressInput === 'Other' ? otherAddress : addressInput
                        }
                        destination={
                            useDefaultAddress ? auth.address : userAddress
                        }
                        phoneNumber={
                            auth.phoneNumber
                        }/>
                }
                    <div></div>
                    {
                    booking.totalAmount && <Button className="col-12 mt-4 mb-4 border-top"
                        onClick={handleAddItem}>Add item</Button>
                }
                    {
                    items.length > 0 && (
                        <div>
                            <h3>Summary:</h3>
                            {
                            items.map((item, index) => (
                                <Container>
                                    <div className="row"
                                        key={
                                            index + 1
                                        }
                                        style={
                                            {
                                                backgroundColor: index % 2 === 0 ? 'lightgray' : 'white'
                                            }
                                    }>
                                        <Card.Text style={
                                                {wordWrap: 'break-word'}
                                            }
                                            className="col-10">
                                            {
                                            item.item
                                        }
                                            - {
                                            item.store
                                        }
                                            -{
                                            item.address
                                        } </Card.Text>
                                        <TiDelete className="col-2"
                                            size={35}
                                            onClick={
                                                () => handleDeleteItem(index)
                                            }/>
                                    </div>
                                </Container>
                            ))
                        }
                            <Card.Text>
                                Estimated Fare: {
                                items.slice(-1)[0].Fare
                            } </Card.Text>
                        </div>
                    )
                }
                    {
                    auth._id ? items.length > 0 && <Button className="col-12 mb-5 mt-3"
                        onClick={handleBooking}>Book</Button> : (
                        <Button className="col-12"
                            onClick={
                                () => navigate("/login")
                        }>
                            Login to submit Booking
                        </Button>
                    )
                } </div>
            </div>
        </div>
    );
};

export default Pabili;
