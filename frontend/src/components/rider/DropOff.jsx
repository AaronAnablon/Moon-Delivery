import React, { useState, useEffect } from "react";
import axios from "axios";
import { setHeaders, url } from "../../slices/api";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Button, Card } from "react-bootstrap";
import { FcCalendar,
  FcServices, 
  FcTodoList, 
  FcInTransit,
  FcNightPortrait,
  FcPodiumWithSpeaker,
  FcPortraitMode,
  FcMoneyTransfer,
  FcDeployment,
  FcViewDetails,
  FcShop,
  FcGlobe,
  FcAssistant
} from "react-icons/fc";
import { GiFullMotorcycleHelmet } from "react-icons/gi";


const DropOff = () => {
  const auth = useSelector((state) => state.auth);
  const [booked, setBooked] = useState([]);
  const [loading, setLoading] = useState(false);

  const getBooking = () => {
    setLoading(true)
    axios.get(`${url}/booking/rider/Arrived/${auth._id}`, setHeaders)
      .then((response) => {
        setBooked((response.data).reverse());
        setLoading(false)
      })
      .catch((error) => {
        console.log(error);
        setLoading(false)
        toast.error("Something went wrong!!")
      });
  }


  useEffect(() => {
    getBooking()
  }, []);


  const handleDelete = async (booking) => {
    try {
      const updatedBooking = {
        booking: {
          booking: {
            address:
            {
              pickUpAdress: booking.booking.booking.address.pickUpAdress,
              destination: booking.booking.booking.address.destination,
            },
            totalAmount: booking.booking.booking.totalAmount,
            phoneNumber: booking.booking.booking.phoneNumber,
            riderPhone: auth.phoneNumber,
            status: booking.booking.booking.status,
            riderDelete: true,
            userDelete: booking.booking.booking.userDelete,
            active: true,
            riderId: auth._id,
            rider: auth.name,
          }, items: booking.booking.items,
          item: booking.booking.item,
          itemDetails: booking.booking.itemDetails,
          service: booking.booking.service,
          completedAt: booking.booking.completedAt
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

  const formatDate = (date) => {
    return (new Date(date).toLocaleString('en-US', {
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
      <h2>Pick Up Client</h2>
      {loading && <p>Loading...</p>}
      {booked && booked.length === 0 && <p>No Drop Off found</p>}
      <ul>
        {booked &&
          booked.map((booking) => (
            <div className="border-bottom p-3 shadow mb-3 rounded" key={booking._id}>
              <Card.Text><FcServices size={28}/> Service: {booking.booking.service}</Card.Text>
              <Card.Text><FcCalendar size={28}/> Date Booked: {formatDate(booking.createdAt)}</Card.Text>
              <Card.Text><FcCalendar size={28}/> Date Completed: {formatDate(booking.booking.completedAt)}</Card.Text>
              <Card.Text>📞 Client Phone Number: {booking.booking.booking.phoneNumber}</Card.Text>
              <Card.Text><FcGlobe size={28}/> Destination: {booking.booking.booking.address.destination}</Card.Text>
              <Card.Text><FcAssistant size={28}/> Pick Up Address: {booking.booking.booking.address.pickUpAdress}</Card.Text>
              <Card.Text><FcMoneyTransfer size={28}/> Fare: {currency(booking.booking.booking.totalAmount)}</Card.Text>
              <Card.Text><FcTodoList size={28}/> Status: {booking.booking.booking.status}</Card.Text>

              <Card.Text>📞 RiderDelete: {booking.booking.booking.riderDelete}</Card.Text>

              {booking.booking.item ? <div><Card.Text><FcTodoList size={28}/> Item: {booking.booking.item}</Card.Text>
                <Card.Text><FcViewDetails size={28}/> Details: {booking.booking.itemDetails}</Card.Text></div> : null}

              {booking.booking.items ? (<div>Items: {booking.booking.items.map((item, index) =>
                <ul><li key={index}>{item.item} - {item.store} </li></ul>)}
                <Card.Text><FcMoneyTransfer size={28}/> Fare: {currency(booking.booking.items.slice(-1)[0].Fare)}</Card.Text>
              </div>) : null}

              <Button onClick={() => handleDelete(booking)}>Delete</Button>
            </div>
          ))}

      </ul>
    </div>
  );
};

export default DropOff;
