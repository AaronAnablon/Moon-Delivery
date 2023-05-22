import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../slices/authSlice";
import sendMail from "../notification/sendMail";
import { Modal, Card, Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);

  const [user, setUser] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    address: "",
    password: "",
  });

  const [addressSuggestions, setAddressSuggestions] = useState([]);

  useEffect(() => {
    if (auth._id) {
      navigate("/cart");
    }
  }, [auth._id, navigate]);

  const handleAddressChange = (e) => {
    setUser({ ...user, address: e.target.value });
  };

  const handleAddressClick = (address) => {
    setUser({ ...user, address: address.formatted });
    setAddressSuggestions([]);
  };


  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `https://api.opencagedata.com/geocode/v1/json?q=${user.address}&key=93b8b8cefa044e9cbd2d7b31fa0fd13f`
      );
      const data = await response.json();
      setAddressSuggestions(data.results);
    };

    fetchData();
  }, [user.address]);


  const [showPasswordModal, setShowPasswordModal] = useState(false)
  const [userCode, setUserCode] = useState('')
  const [code, setCode] = useState('');

  const generateCode = () => {
    const characters = '0123456789';
    let code = '';
    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      code += characters.charAt(randomIndex);
    }
    return code;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const generatedCode = generateCode();
    setCode(generatedCode);
    const recipientEmail = user.email;
    const subject = 'Moon Delivery Authentication Code';
    const text = `Good day ${user.name}, This is Moon Delivery. Your Authentication Code is ${generatedCode}.
    Please open your Moon Delivery Web Application here https://example.com/tracking"`;
    sendMail({ recipientEmail, subject, text });
    setShowPasswordModal(true);
  };

  const handleVerifyCode = (e) => {
    setUserCode(e.target.value)
  }
  const verifyCode = () => {
    if ( userCode === code ) {
      console.log(user);
      setShowPasswordModal(false)
      dispatch(registerUser(user));
    } else{
      toast.error('Code invalid!')
    }
  }

  const handleLogin = () => {
    navigate('/login')
  }

  return (
    <div className="d-flex m-5 align-items-center justify-content-center">
       <div className="col-5 m-5 d-flex shadow align-items-center justify-content-center">
      <Form className="col-10 m-5" onSubmit={handleSubmit}>
        <h2>Register</h2>
        <Form.Group>
          <Form.Control
            type="text"
            className="mb-2"
            placeholder="Name"
            onChange={(e) => setUser({ ...user, name: e.target.value })}
            maxLength={100}
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            type="email"
            placeholder="Email"
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            maxLength={100}
            required
            className="mb-2"
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            type="text"
            placeholder="Address"
            value={user.address}
            onChange={handleAddressChange}
            required
            className="mb-2"
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            type="tel"
            placeholder="Phone Number"
            onChange={(e) => {setUser({ ...user, phoneNumber: e.target.value });
            handleAddressClick([]);
          }}
            maxLength={11}
            required
            className="mb-2"
          />
        </Form.Group>
        <ul>
          {addressSuggestions.map((address, index) => (
            <li key={index} onClick={() => handleAddressClick(address)}>
              {address.formatted}
            </li>
          ))}
        </ul>
        <Form.Group>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={(e) => {setUser({ ...user, password: e.target.value });
            handleAddressClick([]);
          }}
            maxLength={150}
            required
          />
        </Form.Group>
        <Card.Text>
          Already have an account? <span onClick={handleLogin} style={{ cursor: 'pointer' }}>Log In</span>
        </Card.Text>
        <Button type="submit">
          {auth.registerStatus === 'pending' ? 'Submitting...' : 'Register'}
        </Button>
        {auth.registerStatus === 'rejected' ? <p type="button">{auth.registerError}</p> : null}
      </Form>
      <Modal show={showPasswordModal} onHide={() => setShowPasswordModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Verify Email</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Enter Code sent to your Email to continue:</Form.Label>
            <Form.Control type="text" name="text" onChange={handleVerifyCode} />
           </Form.Group> 
           <Form.Group className="d-flex m-3 justify-content-center">
              <Button onClick={verifyCode}>Submit</Button>
           </Form.Group>
        </Modal.Body>
      </Modal>
      </div>
    </div>
  );
};

export default Register;
