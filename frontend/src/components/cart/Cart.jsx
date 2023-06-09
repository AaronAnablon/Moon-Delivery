import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  clearCart,
  decreaseCart,
  getTotals,
  removeFromCart,
} from "../../slices/cartSlice";

import { Link } from "react-router-dom";
import { AiFillDelete, AiOutlineMinusSquare, AiOutlinePlusSquare } from "react-icons/ai";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { Container, Button } from "react-bootstrap";

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

  const currency = (price) => {
    return price.toLocaleString('en-PH', { style: 'currency', currency: 'PHP' })
  }

  return (
    <Container className="mb-5">
      <h2>Shopping Cart</h2>
      {cart.cartItems.length === 0 ? (
        <div>
          <p>Your cart is currently empty</p>
          <div>
            <Link to="/shoppingPage">
             
              <div className="px-2"><FaArrowAltCircleLeft /> Start Shopping</div>
            </Link>
          </div>
        </div>
      ) : (
        <div>
          <Container>
            <div>
              {cart.cartItems &&
                cart.cartItems.map((cartItem) => (
                  <div className="d-flex justify-content-center align-items-center border-bottom" key={cartItem._id}>
                    <div> <AiFillDelete onClick={() => handleRemoveFromCart(cartItem)} size={'1.3rem'} className="hover" /></div>
                    <div className="m-3" style={{ width: "100%" }}>
                      <img src={cartItem.image[0]} alt={cartItem._id} style={{ zIndex: 1, width: "5rem", height: "5rem" }}
                        className="d-block d-sm-none" />
                      <img
                        src={cartItem.image[0]}
                        alt={cartItem._id}
                        style={{ zIndex: 1, width: "8rem", height: "8rem" }}
                        className="d-none d-sm-block"
                      />
                    </div>
                    <div className="container d-flex">
                      <div className="row">
                        <div style={{ width: "150px", fontSize: "13px" }} className="col-lg-6 col-md-12">
                          <div style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                            {cartItem.name}
                          </div>
                          <div>{currency(cartItem.price)}</div>
                        </div>
                        <div className="col-lg-6 col-md-12" style={{ width: "10%" }}>
                          <Container className="d-flex align-items-center justify-content-center">
                            <div><AiOutlineMinusSquare color="rgb(187, 187, 187)" size={30} onClick={() => handleDecreaseCart(cartItem)} /></div>
                            <div>
                              {cartItem.cartQuantity}
                            </div>
                            <div><AiOutlinePlusSquare color="rgb(153, 153, 153)" size={30} onClick={() => handleAddToCart(cartItem)} /></div>
                          </Container>
                        </div>
                      </div>
                    </div>
                    <div>Subtotal: {currency(cartItem.price * cartItem.cartQuantity)}</div>
                  </div>
                ))}  </div>
          </Container>
          <div className="d-flex bg-light justify-content-between">
            <div className="d-flex flex-column col-6 col-md-3">
              <Link to="/shoppingPage"
                className="d-flex align-items-center m-2 hover text-decoration-none text-nowrap fs-6 "
              >
                <FaArrowAltCircleLeft />
                <div className="px-md-2"> Continue Shopping</div>
              </Link>
              <Button variant="outline-secondary" onClick={() => handleClearCart()}>
                Clear Cart
              </Button>
            </div>
            <div className="col-6 col-md-3 px-1">
              <div className="m-2">Total: {currency(cart.cartTotalAmount)}
              </div>
              <div className="col-12">
                {auth._id ? (
                  <Button style={{width: '100%'}} onClick={() => navigate("/checkout")}>Checkout</Button>
                ) : (<> <p>Login to Checkout</p>
                  <Button onClick={() => navigate("/login")}>
                    Login
                  </Button></>

                )}

              </div>
            </div>
          </div>
        </div>
      )}
    </Container>
  );
};

export default Cart;
