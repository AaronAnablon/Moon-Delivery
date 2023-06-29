import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../slices/authSlice";
import { useNavigate } from "react-router-dom";
import { Form, Button, Card } from 'react-bootstrap'


const Login = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const [user, setUser] = useState({
    email: "",
    password: "",
  });


  useEffect(() => {
    console.log(auth)
    if (auth._id && auth.active && !auth.isRider && !auth.isAdmin) {
      navigate("/");
    } else if (auth.isAdmin && auth.active && auth.isRider === true) {
      navigate("/system/systemStores");
    } else if (auth.isRider && auth.active && !auth.isAdmin) {
      navigate("/rider/toship");
    } else if (auth.isAdmin && auth.active) {
      navigate("/admin/summary");
    } else if (auth._id && !auth.active) {
      navigate("/notApproved");
    }
  }, [auth._id, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(user));
  };

  const handleRegister = () => {
    navigate('/register')
  }

  const handleForgot = () => {
    navigate('/forgotPassword')
  }

  return (
    <div className="d-flex justify-content-center align-items-center m-md-5 m-2 mt-5">
        <div style={{background: 'linear-gradient(45deg, rgba(255,255,255,1) 71%, rgba(244,61,0,1) 71%)'}} 
        className="col-lg-5 col-md-8 col-12 d-flex shadow align-items-center justify-content-center">
        <Form className="col-lg-8 col-10 m-md-4" onSubmit={handleSubmit}>
          <h2>Login</h2>
          <Form.Group>
            <Form.Control
              type="email"
              placeholder="Email"
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              required
              className="mb-2"
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              required
            />
          </Form.Group>
      

          <Card.Text> <span onClick={handleForgot} style={{ cursor: 'pointer' }}>Forgot Password?</span></Card.Text>
          <Card.Text>Don't have an account? <span onClick={handleRegister} style={{ cursor: 'pointer' }}>Create account</span></Card.Text>
       
            <Button className="col-11 m-3" type="submit">
              {auth.loginStatus === 'pending' ? 'Submitting...' : 'Login'}
            </Button>
            {auth.loginStatus === 'rejected' ? <p>{auth.loginError}</p> : null}
        </Form>
      </div>
    </div>
  );
};

export default Login;
