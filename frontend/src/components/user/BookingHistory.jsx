  import { url, setHeaders } from "../../slices/api";
  import { useState, useEffect } from "react";
  import { useSelector } from "react-redux";
  import Card from 'react-bootstrap/Card';
  import ListGroup from 'react-bootstrap/ListGroup';
  import Button from 'react-bootstrap/Button';
  import axios from "axios";
  
  const BookingHistory = () => {
    const [booked, setBooked] = useState([]);
    const auth = useSelector(state => state.auth)
    const [loading, setLoading] = useState(false);

    const getBooking = () => {
      setLoading(true); // Set loading to true before the axios call
      axios.get(`${url}/booking/user/${auth._id}/Completed`, setHeaders)
        .then((response) => {
          setBooked(response.data);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setLoading(false); // Set loading to false after the axios call
        });
    };
  
    useEffect(() => {
      getBooking()
    }, []);
  
    const handleDelete = async (booking) => {
      try {
        const updatedBooking = {
          motorcycle: 'Honda Click',
          booking:{
            booking: { 
              address:
              {pickUpAdress: booking.booking.booking.address.pickUpAdress,
              destination: booking.booking.booking.address.destination,},
              totalAmount: booking.booking.booking.totalAmount,
              phoneNumber: booking.booking.booking.phoneNumber,
              riderPhone: booking.booking.booking.riderPhone,
              status: booking.booking.booking.status,
              riderDelete: booking.booking.booking.riderDelete,
              userDelete: true,
              riderId: booking.booking.booking.riderId,
              rider: booking.booking.booking.name,
            },  item: booking.booking.item,
            itemDetails: booking.booking.itemDetails,
            service: booking.booking.service,
            completedAt: booking.booking.completedAt,
          }
        };
        await axios.put(`${url}/booking/${booking._id}`, updatedBooking, setHeaders()).then((response) => {
          console.log(response.data)
          getBooking()
        });
      } catch (err) {
        console.log(err);
      }
    };
    
    const handleCallRider = (riderNumber) => {
      window.open(`tel:${riderNumber}`);
    }

    const formatDate = (date) =>{
       return( new Date(date).toLocaleString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZoneName: 'short',
    }))
    }

    const currency = (price) => {
      return price.toLocaleString('en-PH', { style: 'currency', currency: 'PHP' })
     }
    return (
      <div>
        <h2>Booking History</h2>
        {loading && <p>Loading...</p>}
        {loading.length > 0 && <p>No history found</p>}
        {booked &&
          booked.map((booking) => (
            <div style={{ borderBottom: '1px solid black', marginBottom: '1px' }} key={booking._id}>
              <div>Date Booked: {formatDate(booking.createdAt)}</div> 
              <div>Date Completed: <span>{formatDate(booking.booking.completedAt)}</span></div> 
              <div className="row border-bottom border-top">
              <div className="col-6 ">
                  <Card.Text>Service: <span>{booking.booking.service}</span></Card.Text> 
                 <Card.Text>Status: <span>{booking.booking.booking.status}</span></Card.Text>
              </div>
              <div className="col-6 ">
                <Card.Text>Rider: <span>{booking.booking.booking.rider}</span></Card.Text>
                <Card.Text>Client Name: <span>{booking.user.name}</span></Card.Text>
              </div>
              </div>
              <div className="row border-bottom">
                <div className="col-6">
                <Card.Text>Pick Up Address: <span>{booking.booking.booking.address.pickUpAdress}</span></Card.Text> 
              </div>
              <div className="col-6">
              <Card.Text>Destination: <span>{booking.booking.booking.address.destination}</span></Card.Text> 
            </div>
              </div>
             {booking.booking.item ? <div><p>Item: {booking.booking.item}</p>
            <p>Details: {booking.booking.itemDetails}</p></div>  : null}
            {booking.booking.items ? (<div>
                  <ListGroup variant="flush">
                  <ListGroup.Item style={{display: 'flex', justifyContent: 'space-between', padding: '0.5rem' }}>
                    <div>Item</div>
                    <div>Store</div>
                    <div>Address</div>
                  </ListGroup.Item>
                    {booking.booking.items.map((item, index) => (
                      <>
              <ListGroup.Item key={index} style={{ fontWeight: 'bold', display: 'flex', justifyContent: 'space-between', padding: '0.5rem' }}>
                    <span>{index + 1}. {item.item}</span>
                    <span>{item.store}</span>
                    <span>{item.address}</span>
                  </ListGroup.Item></>
                    ))}
                  </ListGroup>
                </div>) : null}
                <Card.Text>Fare: <span>{currency(booking.booking.booking.totalAmount)}</span></Card.Text> 
              <div className="m-3">
                 {booking.booking.booking.status === 'For Pick Up' ? 
            <Button onClick={() => handleCallRider(booking.booking.booking.riderPhone)}>Call Rider</Button> :
            booking.booking.booking.status === 'Completed' ?  <Button variant="danger" onClick={() => handleDelete(booking)}>Delete</Button> :
                  null} </div>        
            </div>
          ))}
      </div>
    );
  };
  
  export default BookingHistory;
  