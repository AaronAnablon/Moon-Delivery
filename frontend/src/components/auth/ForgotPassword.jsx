import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';
import sendMail from "../notification/sendMail";
import { url } from '../../slices/api';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [verificationCode, setVerificationCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [showUpdatePassword, setShowUpdatePassword] = useState(false);
    const [code, setCode] = useState('');
    const [disable, setDisable] = useState(false);
    const navigate = useNavigate()

    const generateCode = () => {
        const characters = '0123456789';
        let code = '';
        for (let i = 0; i < 6; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            code += characters.charAt(randomIndex);
        }
        return code;
    };

    const handleSendCode = (e) => {
        e.preventDefault();
        const generatedCode = generateCode();
        setCode(generatedCode);
        const recipientEmail = email;
        const subject = 'Moon Delivery Authentication Code';
        const text = `Good day, This is Moon Delivery. Your Authentication Code is ${generatedCode}.
        Please open your Moon Delivery Web Application here https://moon-delivery.vercel.app"`;
        sendMail({ recipientEmail, subject, text });
        setShowModal(true);
        setShowModal(true);
    };

    const [errorCount, setErrorCount] = useState(0);

    const handleVerifyCode = () => {
      if (verificationCode === code) {
        setShowModal(false);
        setShowUpdatePassword(true);
      } else {
        toast.error('Code invalid!')
        setErrorCount(count => count + 1)
        console.log(errorCount)
      }
      if (errorCount === 2) {
        setDisable(true);
        toast.warning("You have attempted 3 invalid entries! Try again after 12 hours");
        setShowModal(false);
        setTimeout(() => {
          setDisable(false);
          setErrorCount(0);
        }, 43200000); 
      }
    };


    const handleUpdatePassword = async (e) => {
         if (e) {
            e.preventDefault();
          }
          try {
            const response = await axios.put(`${url}/register/password`, {email: email, password: newPassword});
            console.log(response.data);
            toast.success('Successfully Changed')
            navigate('/login')
          } catch (error) {
            console.error(error);
          }
        setEmail('');
        setVerificationCode('');
        setNewPassword('');
        setShowUpdatePassword(false);
    };

    return (
        <div className="container-fluid flex-wrap d-flex justify-content-center align-items-center">
            {!disable && !showUpdatePassword && <Form onSubmit={handleSendCode} style={{background: 'linear-gradient(45deg, rgba(255,255,255,1) 71%, rgba(244,61,0,1) 71%)'}} className="col-12 mt-3 col-md-6 p-5 shadow">
                <Form.Group >
                    <Form.Label>Email:</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <Button className="m-3" variant="primary" type="submit">
                        Send Code
                    </Button>
                </Form.Group>
            </Form>
        }
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Enter Verification Code</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group>
                        <Form.Label>Verification Code</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter the verification code"
                            value={verificationCode}
                            onChange={(e) => setVerificationCode(e.target.value)}
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleVerifyCode}>
                        Verify Code
                    </Button>
                </Modal.Footer>
            </Modal>

            {!disable && showUpdatePassword &&
                <Form.Group className="col-md-6 col-12 p-5 shadow">
                    <Form.Label>New Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Enter your new password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <Button className="m-3" variant="success" onClick={handleUpdatePassword}>
                        Update Password
                    </Button>
                </Form.Group>
          }
        </div>
    );
};

export default ForgotPassword;
