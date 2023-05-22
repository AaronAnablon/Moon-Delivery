import { NavLink, useLocation } from 'react-router-dom';
import StarRating from "./StarRating";
import { BiUserCircle } from "react-icons/bi"
import { Card, Button } from 'react-bootstrap';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../../slices/cartSlice";
import { IoArrowBackCircleSharp } from "react-icons/io5"
import { BsCartPlus } from "react-icons/bs";

function ProductDetails() {
  const { state } = useLocation();
  const { product } = state;

  const dispatch = useDispatch();
  const navigate = useNavigate()

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    navigate("/cart");
  };

  const comments = product.rating.comment && product.rating.comment.map((comments) =>
    comments.map(comment =>
      comment))

  const comment = comments && comments.map(comment => comment)

  const currency = (price) => {
    return price.toLocaleString('en-PH', { style: 'currency', currency: 'PHP' })
  }
  return (
    <>
      <NavLink to="/"><IoArrowBackCircleSharp color="black" size={30} /></NavLink>
      <div className='col-12 m-3 d-lg-flex border-bottom'>
        <div className="col-lg-6 col-12 ">
          <div>
            <img
              src={product.image}
              alt={product.name}
              style={{ width: "100%", height: '400px', objectFit: 'cover' }}
            />
          </div>
        </div>
        <div className='col-lg-6 col-12'>
          <div className='m-3'>
            <h3>{product.name}</h3>
            <div className="d-flex border-bottom border-top mt-3 mb-3">
              <StarRating rating={product.rating.rating} overAll={product.rating.count} />
              sold
            </div>
            <Card.Text><span>{currency(product.price)}</span></Card.Text>
            <Card.Text className='border-top mt-3'>Store: <span>{product.stores}</span></Card.Text>
            <Card.Text className='border-bottom'>Store Address: {product.address}</Card.Text>
            <div className='m-3'>
              <Button variant="outline-primary" className='d-flex align-items-center justify-content-between px-2' onClick={() =>
                handleAddToCart(product)}><BsCartPlus />Add To Cart</Button>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className='m-3'>Description: <span>{product.desc}</span></div>
        {comment ? comment.map(comment =>
          <Card>
            <div className='m-3 d-flex'>
            <BiUserCircle className='col-1' size={40} />
            <div className='col-11'>
            <Card.Text>{comment[1]}</Card.Text>
            <Card.Text><StarRating rating={(comment[2]) * 5} overAll={5} /></Card.Text>
            <Card.Text>{comment[0]}</Card.Text>
            </div>
            </div>
          </Card>
        ) : <p className='m-5 shadow'>No Comments</p>}
      </div>
    </>
  );
}

export default ProductDetails