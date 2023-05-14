import { NavLink, useLocation } from 'react-router-dom';
import StarRating from "./StarRating";
import { BiUserCircle} from "react-icons/bi"
import { Container, Card, Row, Col } from 'react-bootstrap';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../slices/cartSlice";
import {IoArrowBackCircleSharp} from "react-icons/io5"

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
  return (
    <>
    <Container>
      <Container className="m-3">
      <NavLink to="/"><IoArrowBackCircleSharp color="black" size={30} /></NavLink>
      </Container>
    <Row>
      <Col lg={7} className="d-flex justify-content-center align-items-center">
        <Card>
          <img
            src={product.image}
            alt={product.name}
          /> 
        </Card>
      </Col>
      <Col lg={5}>
        <Card>
          <div>
            <h3>{product.name}</h3>
            <div className="d-flex">
              <StarRating rating={product.rating.rating} overAll={product.rating.count}/> 
              sold
            </div>
          </div>
          <div>{product.desc}</div>
          <div>₱{product.price}</div>
          <div>{product.stores}</div>
          <div>{product.address}</div>
          <button onClick={() => handleAddToCart(product)}>Add To Cart</button>    
        </Card>
      </Col>
    </Row>
  </Container>
        <Container className="d-flex bg-light justify-content-center align-items-center">
           <Container>
         {comment ? comment.map(comment => 
         <Card>
         <p><BiUserCircle size={24}/>{comment[1]}</p>  
         <p><StarRating rating= {(comment[2])*5} overAll={5}/></p>  
         <p>{comment[0]}</p>  
         </Card>
         ) : <p>No Comments Found</p>}
         </Container>
      </Container>
      </>
  );
}

export default ProductDetails