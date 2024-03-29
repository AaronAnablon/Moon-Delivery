import { useEffect, useState } from "react";
import { setHeaders, url, server } from "../../slices/api";
import { toast } from 'react-toastify';
import axios from "axios";
import { useSelector } from "react-redux";
import { Card } from "react-bootstrap";
import io from 'socket.io-client';
import { useNavigate } from "react-router-dom";

const Notification = () => {
  const [notification, setNotification] = useState('')
  const [readNotification, setReadNotification] = useState('')
  const auth = useSelector((state) => state.auth)
  const [newNotif, setNewNotif] = useState()

  const navigate = useNavigate()

  useEffect(() => {
    const socket = io.connect(server);
    socket.on('notification', (notification) => {
      setNewNotif(notification)
    });
    return () => {
      socket.disconnect();
    };
  }, []);


  const fetchNotification = async () => {
    try {
      const response = await axios.get(`${url}/notification/${auth._id}`);
      const notification = response.data;
      setNotification(notification.reverse());
    } catch (error) {
      toast.error("Something went wrong!")
      //console.log(error)
    }
  }

  const fetchReadNotification = async () => {
    try {
      const response = await axios.get(`${url}/notification/notification/${auth._id}`);
      const notification = response.data;
      setReadNotification(notification.reverse());
    } catch (error) {
      toast.error("Something went wrong!")
      //console.log(error)
    }
  }

  useEffect(() => {
    fetchNotification()
    fetchReadNotification()
  }, [newNotif])


const updateRead = async (notifId) => {
  try {
    const updatedNotif = {
      payLoad: {
        read: true
      }
    };
   const response =  await axios.put(`${url}/notification/update/${notifId}`, updatedNotif, setHeaders());
   //console.log('Update:', response.data)
   const socket = io.connect(server);
   socket.emit('notification', response.data);
   navigate("/user/userBooking")
    fetchReadNotification();
    fetchNotification();
  } catch (err) {
    toast.error("Something went wrong!")
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
    }))
  }

  return (
    <div>
  <Card.Text>Unread: {readNotification && readNotification.length}</Card.Text>
      <Card className="col-12 shadow d-flex align-items-center justify-content-center">
        {notification && notification.map((notif) => (
          <div className="col-12 col-md-8 shadow m-1" onClick={() => updateRead(notif._id)} style={{ background: notif.payLoad.read ? '#f4f4f4' : '#a8a8a8' }}>
            <div key={notif._id} className="m-3">
              <Card.Text>Date: <span>{formatDate(notif.createdAt)}</span></Card.Text>
              <Card.Text>Service: <span>{notif.payLoad.service}</span></Card.Text>
              <Card.Text>Notification: <span>{notif.notification}</span></Card.Text>
            </div>
          </div>
        ))}
      </Card>
    </div>
  )
}

export default Notification
