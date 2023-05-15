import { useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  clearCart,
  decreaseCart,
  getTotals,
  removeFromCart,
} from "../slices/cartSlice";

import { Link } from "react-router-dom";
import { AiFillDelete } from "react-icons/ai";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { Col, Row, Card, Container, Button } from "react-bootstrap";

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const auth = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getTotals());
  }, [cart, dispatch]);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };
  const handleDecreaseCart = (product) => {
    dispatch(decreaseCart(product));
  };
  const handleRemoveFromCart = (product) => {
    dispatch(removeFromCart(product));
  };
  const handleClearCart = () => {
    dispatch(clearCart());
  };
  return (
    <div className="cart-container">
      <h2>Shopping Cart</h2>
      {cart.cartItems.length === 0 ? (
        <div className="cart-empty">
          <p>Your cart is currently empty</p>
          <div className="start-shopping">
            <Link to="/">
              <FaArrowAltCircleLeft />
              <span>Start Shopping</span>
            </Link>
          </div>
        </div>
      ) : (
        <div>
          <Container>
            <div style={{ paddingBottom: "130px" }}>
            {cart.cartItems &&
              cart.cartItems.map((cartItem) => (
                <div className="cart-item" key={cartItem._id}>
                <AiFillDelete onClick={() => 
                handleRemoveFromCart(cartItem)}
                onMouseEnter={(e) => e.target.style.fontSize = '37px'}
                onMouseLeave={(e) => e.target.style.fontSize = '30px'}
                />         
                  <div className="cart-product">
                    <div>
                    <img src={cartItem.image} alt={cartItem.name} />
                      <h3>{cartItem.name}</h3>
                      <p>Brand: {cartItem.brand}</p>
                      </div>
                    <div>
                      <p>{cartItem.desc}</p>
                      <div className="cart-product-price">Price: {`₱ ${cartItem.price.toFixed(2)}`}</div>
                    </div>    
                           
                  </div> 
                  <div className="cart-product-quantity">
                    <button onClick={() => handleDecreaseCart(cartItem)}>
                      -
                    </button>
                    <div className="count">{cartItem.cartQuantity}</div>
                    <button onClick={() => handleAddToCart(cartItem)}>+</button>
                    <div className="cart-product-total-price">
                  </div>
                  </div>
                  <div>
                  Subtotal: {`₱ ${(cartItem.price * cartItem.cartQuantity).toFixed(2)}`}
                      </div>
                </div>
                
              ))}  </div>
                      <div style={{ position: "fixed", bottom: 0, left: 0, width: "100%" }}>
  <Container className="d-flex p-3 bg-light justify-content-between">
    <Button variant="outline-secondary" onClick={() => handleClearCart()}>
      Clear Cart
    </Button>
    <div className="d-flex flex-row justify-content-end">
      <div style={{ width: "60%" }}>
        <Row>
          <div>Total: {`₱ ${cart.cartTotalAmount.toFixed(2)}`}</div>
          <div className="m-3">
            {auth._id ? (
              <Button onClick={() => navigate("/checkout")}>Checkout</Button>
            ) : (
              <Button onClick={() => navigate("/login")}>
                Login to Check out
              </Button>
            )}
          </div s>
          <NavLink
            to="/"
            className="text-decoration-none text-dark"
            style={{ marginBottom: "0" }}
            onMouseEnter={(e) => e.target.style.fontSize = '18px'}
            onMouseLeave={(e) => e.target.style.fontSize = '16px'}
          >
            <FaArrowAltCircleLeft className="m-2" />Continue Shopping
          </NavLink>
        </Row>
      </div>
    </div>
  </Container>
</div>

          </Container>
        </div>
      )}
    </div>
  );
};

export default Cart;
