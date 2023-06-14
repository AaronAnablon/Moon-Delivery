import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { setHeaders, url } from "../../slices/api";
import { toast } from "react-toastify";
import { Form, Button, Container, Card, Modal } from "react-bootstrap";
import { CgProfile } from "react-icons/cg";

const UserSettings = () => {
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
  const [updateForm, setUpdateForm] = useState(false)

  const handleVerifyPassword = (e) => {
      setVerifiedPassword(e.target.value)
  }

  let errorCount = 0;

  const verifyPassword = () => {
    axios.get(`${url}/login/verify-password/${auth._id}?password=${verifiedPassword}`, setHeaders())
      .then((response) => {
        const decryptedPassword = response.data;   
        if (decryptedPassword === true) {
          console.log(verifiedPassword, auth.password);
          setShowPasswordModal(false);
          handleSubmit(); // Pass the event object here
          toast.success("Updated successfully");
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error("Invalid password");
        errorCount++;
        console.log(errorCount);
        if (errorCount === 3) {
          setDisabled(true);
          toast.warning("You have attempted 3 invalid entries! Try again after 12 hours");
          setShowPasswordModal(false);
          setTimeout(() => {
            setDisabled(false);
          }, 43200000);
        }
      });
  }
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  
  const handleSubmit = async (e) => {
    if (e) {
      e.preventDefault();
    }
    console.log(user)
    try {
      const response = await axios.put(`${url}/user/${auth._id}`, user, setHeaders());
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
    setUpdateForm(false)
  };
  

  return (
    <div className="d-flex justify-content-center">
    <Container className="shadow mt-5 col-lg-8 m-lg-4" style={{ borderRadius: "15px" }}>
    <div className="row m-3 d-flex justify-content-center">
    <CgProfile className="col-2" size={50}/>
    {!updateForm &&
    <div className="col-10">
      <Card.Text>Name: <span>{user.name}</span></Card.Text>
      <Card.Text>E-mail: <span>{user.email}</span></Card.Text>
      <Card.Text>Address: <span>{user.address}</span></Card.Text>
      <Card.Text>Phone Number: <span>{user.phoneNumber}</span></Card.Text>
    </div>}
    </div>
    <div className="d-flex m-3 justify-content-center">
    {!updateForm && <Button className="col-3" onClick={() => setUpdateForm(true)}>Update</Button>}
    </div>
      {updateForm &&
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Name:</Form.Label>
          <Form.Control type="text" name="name" value={user.name} maxLength={100} onChange={handleChange} />
        </Form.Group>

        <Form.Group>
          <Form.Label>Email:</Form.Label>
          <Form.Control type="email" name="email" maxLength={100} value={user.email} onChange={handleChange} required/>
        </Form.Group>

        <Form.Group>
          <Form.Label>Password:</Form.Label>
          <Form.Control type="password" name="password" maxLength={100} value={user.password} onChange={handleChange} required/>
        </Form.Group>

        <Form.Group>
          <Form.Label>Phone Number:</Form.Label>
          <Form.Control type="tel" name="phoneNumber" maxLength={11} value={user.phoneNumber} onChange={handleChange} required/>
        </Form.Group>
        <Form.Group>
          <Form.Label>Address:</Form.Label>
          <Form.Control type="text" name="address" maxLength={150} value={user.address} onChange={handleChange} required/>
        </Form.Group>
        <Form.Group className="d-flex justify-content-center">
          <Button className="m-3" onClick={() => setUpdateForm(false)}>Cancel</Button>
          <Button className="m-3" variant="primary" onClick={() => setShowPasswordModal(true)} disabled={disabled}>
            Update
          </Button>
        </Form.Group>
      </Form>}
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
    </div>
  );
};

export default UserSettings;
