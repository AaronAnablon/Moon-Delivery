import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../slices/authSlice";
import { StyledForm } from "./StyledForm";

const RegisterAsSeller = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);

  const [user, setUser] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    address: "",
    password: "",
    isAdmin: true,
    isRider: false,
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

  const handleSubmit = (e) => {
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
          placeholder="Your Name or BusinessName"
          onChange={(e) => setUser({ ...user, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="email"
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
        <input
          type="tel"
          placeholder="phoneNumber"
          onChange={(e) => setUser({ ...user, phoneNumber: e.target.value })}
        />
        <input
          type="text"
          placeholder="address"
          value={user.address}
          onChange={handleAddressChange}
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

export default RegisterAsSeller;
