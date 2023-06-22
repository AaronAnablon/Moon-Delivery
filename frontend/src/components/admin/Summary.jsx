import Chart from "./Chart";
import LineChart from "./LineChart";
import { setHeaders, url } from "../../slices/api";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import moment from 'moment';
import { toast } from "react-toastify";
import { Card } from "react-bootstrap";
import CurrencyFormat from "../formatters/CurrencyFormat"
import DateFormat from "../formatters/DateFormat"

const Summary = () => {
  const auth = useSelector(state => state.auth)
  const [orders, setOrders] = useState('')
  const [completedOrders, setCompletedOrders] = useState(0);
  const [cancelledOrders, setCancelledOrders] = useState(0);
  const [pendingOrders, setPendingOrders] = useState(0);
  const [ordersByDate, setOrdersByDate] = useState([]);
  const [forPickUpOrders, setForPickUp] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${url}/orders/seller-orders/${auth._id}/pending`,
          setHeaders()
        );
        setOrders((response.data).reverse())
      } catch (error) {
        console.log(error);
        toast.error('Something went wrong!')
      }
    };

    fetchData();
  }, [auth._id]);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const response = await axios.get(`${url}/orders/orders-by-status-and-date`, setHeaders());
        console.log(response.data)
        setCompletedOrders(response.data.completedOrders);
        setCancelledOrders(response.data.cancelledOrders);
        setPendingOrders(response.data.pendingOrders);
        setOrdersByDate(response.data.ordersByDate);
        setForPickUp(response.data.forPickUpOrders)
      } catch (err) {
        console.error(err);
        toast.error('Something went wrong!')
      }
    }
    fetchOrders();
  }, []);



  return (
    <div className="d-flex flex-wrap justify-content-center container-fluid">
      <div className="col-lg-6 col-11 border p-5">
        <Chart
          orders={pendingOrders}
          completed={completedOrders}
          forPickUp={forPickUpOrders}
          cancelled={cancelledOrders} />
      </div>
      <div className="col-lg-6 col-11 border p-5">
        <LineChart
          date={ordersByDate}
          pending={pendingOrders}
          cancelled={cancelledOrders} />
      </div>


      <div className="col-12">
        <div className="orderByStats col-12 border p-5">
          <h2 className="col-12">Orders by Status</h2>
          <div className="d-lg-flex justify-content-center col-12">
            <Card className="border d-flex align-items-center m-3 col-md-6 col-lg-4">
              <span>
                {completedOrders}
              </span>
              <Card.Text>Completed Orders </Card.Text>
            </Card>
            <Card className="border d-flex align-items-center m-3 col-md-6 col-lg-4">
              <span >
                {cancelledOrders}
              </span>
              <Card.Text>Cancelled Orders </Card.Text>
            </Card>
            <Card className="border d-flex align-items-center m-3 col-md-6 col-lg-4">
              <span>
                {pendingOrders}
              </span>
              <Card.Text>Pending Orders</Card.Text>
            </Card>
          </div>
        </div>
        <h3>Orders by Date</h3>
        <div className="border d-flex mt-2 mb-3 p-3">

          {ordersByDate.map((order) => (
            <Card className="col-4 orderByStats align-items-center">
              <span>
                {order.count}
              </span>
              <Card.Text key={`${order._id.year}-${order._id.month}-${order._id.day}`}>
                {`${moment(
                  `${order._id.year}-${order._id.month}-${order._id.day}-${order._id.hour}-${order._id.minute}`,
                  'YYYY-M-D'
                ).format('MMMM D, YYYY')}`}
              </Card.Text>
            </Card>))}
        </div>
      </div>

      <div className="col-12 border p-md-5">
        <h2>Recent Sales: </h2>
        {orders && orders.map((order) =>
          <Card className="border mb-md-3 p-3">
            <Card.Text>Date Ordered: {DateFormat(order.createdAt)}</Card.Text>
            <Card.Text>Client Name:{order.name}</Card.Text>
            <Card.Text>Rider: {order.rider[0]}</Card.Text>
            <Card.Text>Total Amount: {CurrencyFormat(order.total)}</Card.Text>
          </Card>
        )}</div>
    </div>
  );
};

export default Summary;
