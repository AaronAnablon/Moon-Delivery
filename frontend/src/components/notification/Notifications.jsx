import { useEffect, useState } from "react";
import { url } from "../../slices/api";
import { toast } from 'react-toastify';
import axios from "axios";
import { useSelector } from "react-redux";
import { Card } from "react-bootstrap";

const Notification = () => {
  const [notification, setNotification] = useState('')
  const auth = useSelector((state) => state.auth)
  const fetchNotification = async () => {
    try {
      const response = await axios.get(`${url}/notification`);
      const notification = response.data;
      console.log(notification)
      setNotification(notification);
    } catch (error) {
      toast.error("Something went wrong!")
      console.log(error)
    }
  }
  useEffect(() => {
    fetchNotification()
  }, [])

  const formatDate = (date) =>{
    return( new Date(date).toLocaleString('en-US', {
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
      <Card className="col-12 shadow d-flex align-items-center justify-content-center">
        {notification && notification.map((notif) => (
          <div className="col-6 shadow m-1">
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
