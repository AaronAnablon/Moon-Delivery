import { useEffect, useState } from "react";
import { url } from "../../slices/api";
import {toast} from 'react-toastify';
import axios from "axios";
import { useSelector } from "react-redux";
import TopProducts from "../products/TopProducts";

const Notification = () => {
  const [notification, setNotification] = useState('')
  const auth = useSelector((state) => state.auth)
  const fetchNotification = async () => {
    try {
      const response = await axios.get(`${url}/notification`);
      const notification = response.data;
      console.log(notification[0].email)
      setNotification(notification);
    } catch (error) {
      toast.error("Something went wrong!")
     console.log(error)
    }
  }
  useEffect(() => {
    fetchNotification()
  }, [])

  return (
    <div>
      <TopProducts />
        <p>{notification[0].email}</p>
    </div>
  )
}

export default Notification
