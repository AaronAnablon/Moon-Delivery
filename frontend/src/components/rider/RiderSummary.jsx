import React, { useEffect, useState } from 'react'
import { Card } from 'react-bootstrap'
import { toast } from 'react-toastify'
import CurrencyFormat from '../formatters/CurrencyFormat'
import DateFormat from '../formatters/DateFormat'
import { useSelector } from 'react-redux'
import { url, setHeaders } from '../../slices/api'
import axios from 'axios'

const Summary = () => {
  const auth = useSelector((state) => state.auth)
  const [loading, setLoading] = useState()
  const [booked, setBooked] = useState()
  const [orders, setOrders] = useState()

  const getBooking = () => {
    setLoading(!loading)
    axios.get(`${url}/booking/rider/summary/${auth._id}`, setHeaders())
      .then((response) => {
        setBooked(response.data);
        //console.log(response.data);
      })
      .catch((error) => {
        //console.log(error);
        toast.error("Something Went Wrong!!")
      })
      .finally(() => {
        setLoading(loading)
      })
  }



  const getOrders = () => {
    axios.get(`${url}/orders/riders/orderSummary/${auth._id}`, setHeaders())
      .then((response) => {
        setOrders((response.data).reverse());
        //console.log('orders:', response.data);
      })
      .catch((error) => {
        //console.log(error);
        toast.error("Something Went Wrong!!")
      })
  }


  useEffect(() => {
    getBooking()
    getOrders()
  }, [])

  const totalBookedAmount = booked && booked.reduce((accumulator, booking) => {
    return accumulator + booking.booking.booking.totalAmount;
  }, 0);

  const totalOrdersAmount = orders && orders.reduce((accumulator, orders) => {
    return accumulator + orders.total;
  }, 0);

  return (
    <>
      <div className="border-bottom">
        <div className="border-bottom d-flex justify-content-center">
        <div className="d-flex align-items-center justify-content-center m-3 col-md-6 col-lg-4">
          <span style={{fontSize: '5rem'}}>
            {orders && booked && CurrencyFormat(totalBookedAmount + totalOrdersAmount)}
          </span>
          <Card.Text>Revenue Today</Card.Text>
        </div>
        </div>
        <h2 className="border-bottom border-top bg-info">Completed Booking Today | Revenue: {booked && CurrencyFormat(totalBookedAmount)}</h2>
        {booked &&
          booked.map((booking) => (
            <div className="border-bottom p-3" key={booking._id}>
              <div className="d-md-flex">
                <Card.Text className="col-12 col-md-6">
                  Service: <span>{booking.booking.service}</span>
                </Card.Text>
                <Card.Text className="col-12 col-md-6">
                  Date Booked: <span>{DateFormat(booking.createdAt)}</span>
                </Card.Text>
              </div>
              <div className="d-md-flex">
                <Card.Text className="col-12 col-md-6">
                  Client Name: <span>{booking.user.name}</span>
                </Card.Text>
                <Card.Text>Total: {CurrencyFormat(booking.booking.booking.totalAmount)}</Card.Text>
              </div>
            </div>
          ))}
        <div className='m-4'>Total Revenue for Booking: {booked && CurrencyFormat(totalBookedAmount)}</div>
      </div>
      <div>
        <h2 className="border-bottom border-top bg-info">Completed Delivery Today | Revenue: {orders && CurrencyFormat(totalOrdersAmount)}</h2>
        {orders && orders.map((order) => (
          <div className='border-bottom p-3'>
            <div className="d-md-flex">
              {order.products.map((product) => (
                <div className="d-md-flex">
                  <Card.Text className="col-12">Product: <span>{product.name}</span></Card.Text>
                  <Card.Text className="col-12">Subtotal: <span>{CurrencyFormat(product.price)}</span></Card.Text>
                </div>
              ))}
            </div>
            <div className="d-md-flex">
              <Card.Text className="col-12 col-md-6 border-top border-bottom">Client Name: <span>{order.name}</span></Card.Text>
              <Card.Text className="col-12 col-md-6">Total: <span>{CurrencyFormat(order.total)}</span></Card.Text>
            </div>
          </div>
        ))}
        <div className='m-4 mb-5'>Total Revenue for Orders: <span>{orders && CurrencyFormat(totalOrdersAmount)}</span></div>
      </div>
    </>
  )
}

export default Summary
