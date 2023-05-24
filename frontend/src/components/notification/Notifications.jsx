import { useEffect, useState } from "react";
import { setHeaders, url } from "../../slices/api";
import { toast } from 'react-toastify';
import axios from "axios";
import { useSelector } from "react-redux";
import { Card } from "react-bootstrap";
import io from 'socket.io-client';
import { server } from "../../slices/api";

const Notification = () => {
  const [notification, setNotification] = useState('')
  const [readNotification, setReadNotification] = useState('')
  const auth = useSelector((state) => state.auth)
  const [newNotif, setNewNotif] = useState()

  useEffect(() => {
    const socket = io.connect(server);
    socket.on('notification', (notification) => {
      console.log('Received new notification:', notification);
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
      console.log(notification)
      setNotification(notification);
    } catch (error) {
      toast.error("Something went wrong!")
      console.log(error)
    }
  }

  const fetchReadNotification = async () => {
    try {
      const response = await axios.get(`${url}/notification/notification/${auth._id}`);
      const notification = response.data;
      console.log(notification)
      setReadNotification(notification);
    } catch (error) {
      toast.error("Something went wrong!")
      console.log(error)
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
   const read =  await axios.put(`${url}/notification/update/${notifId}`, updatedNotif, setHeaders());
   console.log('Update:', read.data)
    fetchReadNotification();
    fetchNotification();
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
    }))
  }

  return (
    <div>
  <Card.Text>Unread: {readNotification && readNotification.length}</Card.Text>
      <Card className="col-12 shadow d-flex align-items-center justify-content-center">
        {notification && notification.map((notif) => (
          <div className="col-6 shadow m-1" onClick={() => updateRead(notif._id)} style={{ background: notif.payLoad.read ? '#f4f4f4' : '#a8a8a8' }}>
            <div key={notif._id} className="m-3">
              <Card.Text>Date: <span>{formatDate(notif.createdAt)}</span></Card.Text>
              <Card.Text>Notification: <span>{notif.notification}</span></Card.Text>
            </div>
          </div>
        ))}
      </Card>
    </div>
  )
}

export default Notification
