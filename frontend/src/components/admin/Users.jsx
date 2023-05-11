import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { setHeaders, url } from "../../slices/api";
import { toast } from "react-toastify";
import { Form, Button, Container, Modal } from "react-bootstrap";

const User = () => {
  const auth = useSelector(state => state.auth)
  const [user, setUser] = useState({
    name: auth.name,
    email: auth.email,
    password: auth.password,
    phoneNumber: auth.phoneNumber,
    address: auth.address,
  });

  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [verifiedPassword, setVerifiedPassword] = useState('');
  const [disabled, setDisabled] = useState(false)

  const handleVerifyPassword = (e) => {
      setVerifiedPassword(e.target.value)
  }

  let errorCount = 0;

  const verifyPassword = () => {
    axios.get(`${url}/login/verify-password/${auth._id}?password=${verifiedPassword}`)
  .then((response) => {
    const decryptedPassword = response.data;   
    if (decryptedPassword === true) {
      console.log(verifiedPassword, auth.password)
      setShowPasswordModal(false);
      handleSubmit();
      toast.success("Updated successfully");
    } })
  .catch((error) => {
    console.error(error);
    toast.error("Invalid password")
    errorCount++;
    console.log(errorCount)
    if (errorCount === 3) {
      setDisabled(true);
      toast.warning("You have attempted 3 invalid entries! Try again after 12 hours");
      setShowPasswordModal(false);
      setTimeout(() => {
        setDisabled(false);
      }, 43200000);
    }});
  }

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`${url}/user/${auth._id}`, user, setHeaders());
      console.log(response.data);
      } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container className="shadow" style={{ maxWidth: "310px" }}>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Name:</Form.Label>
          <Form.Control type="text" name="name" value={user.name} onChange={handleChange} />
        </Form.Group>

        <Form.Group>
          <Form.Label>Email:</Form.Label>
          <Form.Control type="email" name="email" value={user.email} onChange={handleChange} />
        </Form.Group>

        <Form.Group>
          <Form.Label>Password:</Form.Label>
          <Form.Control type="password" name="password" value={user.password} onChange={handleChange} />
        </Form.Group>

        <Form.Group>
          <Form.Label>Phone Number:</Form.Label>
          <Form.Control type="tel" name="phoneNumber" value={user.phoneNumber} onChange={handleChange} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Address:</Form.Label>
          <Form.Control type="text" name="address" value={user.address} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="d-flex justify-content-center">
          <Button className="m-3" variant="primary" onClick={() => setShowPasswordModal(true)} disabled={disabled}>
            Update
          </Button>
        </Form.Group>
      </Form>
           <Modal show={showPasswordModal} onHide={() => setShowPasswordModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Verify Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Enter your password to continue:</Form.Label>
            <Form.Control type="password" name="password" onChange={handleVerifyPassword} />
           </Form.Group> 
           <Form.Group className="d-flex m-3 justify-content-center">
              <Button onClick={() => verifyPassword()}>Submit</Button>
           </Form.Group>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default User;
