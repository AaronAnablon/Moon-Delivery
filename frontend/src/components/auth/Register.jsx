import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../slices/authSlice";
import { StyledForm } from "./StyledForm";
import sendMail from "../notification/sendMail";

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

  const generatePassword = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let code = '';
    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      code += characters.charAt(randomIndex);
    }
    return code;
  };
  
  const code = generatePassword();
  

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

  const recipientEmail = user.email;
  const subject = 'Moon Delivery Authentication Code';
  const text = `Good day, This is Moon Delivery. Your Authentication Code is ${code}.
  Please open your Moon Delivery Web Application here https://example.com/tracking"`;

  const handleSubmit = (e) => {

    sendMail({ recipientEmail, subject, text })

    e.preventDefault();
    console.log(user);
    dispatch(registerUser(user));
  };


  return (
    <>
      <StyledForm onSubmit={handleSubmit}>
        <h2>Register</h2>
        <input
          type="text"
          placeholder="name"
          onChange={(e) => setUser({ ...user, name: e.target.value })}
          maxLength={100}
          required
        />
        <input
          type="email"
          placeholder="email"
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          maxLength={100}
          required
        />
            <input
          type="text"
          placeholder="address"
          value={user.address}
          onChange={handleAddressChange}
          required
        />
        <input
          type="tel"
          placeholder="phoneNumber"
          onChange={(e) => setUser({ ...user, phoneNumber: e.target.value })}
          maxLength={11}
          required
        />
    

        <ul>
          {addressSuggestions.map((address, index) => (
            <li key={index} onClick={() => handleAddressClick(address)}>
              {address.formatted}
            </li>
          ))}
        </ul>
        <input
          type="password"
          placeholder="password"
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          maxLength={150}
          required
        />
        <button>
          {auth.rigisterStatus === "pending" ? "Submitting..." : "Register"}
        </button>
        {auth.registerStatus === "rejected" ? (
          <p>{auth.registerError}</p>
        ) : null}
      </StyledForm>
    </>
  );
};

export default Register;
