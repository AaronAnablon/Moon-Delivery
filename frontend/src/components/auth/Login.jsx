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
    if (auth._id && !auth.isRider && !auth.isAdmin) {
      navigate("/cart");
    } else if (auth.isAdmin && auth.isRider === true) {
      navigate("/system/systemStores");
    } else if (auth.isRider && !auth.isAdmin) {
      navigate("/rider/toship");
    } else if (auth.isAdmin) {
      navigate("/admin/summary");
    }
  }, [auth._id, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(user));
  };

  const handleRegister = () => {
    navigate('/register')
  }

  return (
    <div className="d-flex justify-content-center align-items-center m-5">
        <Card className="col-lg-5 col-12 col-md-8 shadow d-flex justify-content-center align-items-center m-5">
      <Form className="col-10 m-4" onSubmit={handleSubmit}>
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

        <Card.Text>Don't have an account? <span onClick={handleRegister} style={{ cursor: 'pointer' }}>Create account</span></Card.Text>
        <Button type="submit">
          {auth.loginStatus === 'pending' ? 'Submitting...' : 'Login'}
        </Button>
        {auth.loginStatus === 'rejected' ? <p>{auth.loginError}</p> : null}
      </Form>
      </Card>
      </div>
  );
};

export default Login;
