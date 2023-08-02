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
import {
  FcCalendar,
  FcServices,
  FcTodoList,
  FcPodiumWithSpeaker,
  FcMoneyTransfer,
  FcDeployment,
  FcViewDetails,
} from "react-icons/fc";


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
        // console.log('Orders', response.data)
      } catch (error) {
       // console.log(error);
        toast.error('Something went wrong!')
      }
    };

    fetchData();
  }, [auth._id]);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const response = await axios.get(`${url}/orders/orders-by-status-and-date`, setHeaders());

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
      <div className="col-lg-5 m-3 col-11 border p-5">
        <LineChart
          date={ordersByDate}
          pending={pendingOrders}
          cancelled={cancelledOrders} />
      </div>
      <div className="col-lg-5 m-3 col-11 border p-5">
        <Chart
          orders={pendingOrders}
          completed={completedOrders}
          forPickUp={forPickUpOrders}
          cancelled={cancelledOrders} />
      </div>

      <div className="col-12">
        <div className="orderByStats col-12 border p-5">
          <h2 className="col-12">Orders by Status</h2>
          <div className="d-lg-flex justify-content-center col-12">
            <Card className="border text-light bg-success d-flex align-items-center m-3 col-md-6 col-lg-4">
              <span>
                {completedOrders}
              </span>
              <Card.Text>Completed Orders </Card.Text>
            </Card>
            <Card className="border text-light bg-warning d-flex align-items-center m-3 col-md-6 col-lg-4">
              <span >
                {cancelledOrders}
              </span>
              <Card.Text>Cancelled Orders </Card.Text>
            </Card>
            <Card className="border text-light bg-secondary d-flex align-items-center m-3 col-md-6 col-lg-4">
              <span>
                {pendingOrders}
              </span>
              <Card.Text>Pending Orders</Card.Text>
            </Card>
          </div>
        </div>
        <h3>Orders by Date</h3>
        <div className="border mt-2 mb-3 p-3">
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3">
            {ordersByDate.map((order) => (
              <div className="col">
                <Card className="orderByStats text-light bg-secondary align-items-center">
                  <span>{order.count}</span>
                  <Card.Text key={`${order._id.year}-${order._id.month}-${order._id.day}`}>
                    {`${moment(
                      `${order._id.year}-${order._id.month}-${order._id.day}-${order._id.hour}-${order._id.minute}`,
                      'YYYY-M-D'
                    ).format('MMMM D, YYYY')}`}
                  </Card.Text>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="col-12 border p-md-5">
        <h2>Recent Sales: </h2>
        {orders && orders.map((order) => (
          <li className="shadow p-3 mb-3" style={{ borderColor: 'white', borderWidth: '12px', borderStyle: 'solid' }} key={order._id}>
            <div className="d-md-flex border-bottom">
              <Card.Text className="col-md-6 col-12"><FcCalendar size={24} /> Date Ordered: {DateFormat(order.createdAt)}</Card.Text>
              <Card.Text className="col-md-6 col-12"><FcPodiumWithSpeaker size={24} /> Client Name: {order.name}</Card.Text>
            </div>
            <div className=" border-bottom">
              {order.products.filter((product) => product.sellerId === auth._id).map((product, index) => (
                <div className="d-flex">

                  <div className="col-3">
                    <img
                      src={product.image}
                      alt={product.name}
                      style={{ zIndex: '1', width: '100%', height: '100px', objectFit: 'cover' }}
                    />
                  </div>
                  <div className="col-9">
                    <Card.Text><FcTodoList size={24} /> Product Number: {product.productId}</Card.Text>
                    <Card.Text><FcTodoList size={24} /> Product Name: {product.name}</Card.Text>
                    <Card.Text className="col-md-6 col-12"><FcDeployment size={24} /> Quantity: {product.quantity}</Card.Text>
                    <div className="d-md-flex border-bottom mb-3">
                      <Card.Text className="col-md-6 col-12"><FcMoneyTransfer size={24} /> Total: {CurrencyFormat(product.price * product.quantity)}</Card.Text>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </li>
        ))}
      </div>
    </div>
  );
};

export default Summary;
