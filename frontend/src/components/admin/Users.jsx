import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { url } from "../../slices/api";
import { toast } from "react-toastify";

const User = () => {
  const auth = useSelector(state => state.auth)
  const [user, setUser] = useState({
    name: auth.name,
    email: auth.email,
    password: auth.password,
    phoneNumber: auth.phoneNumber,
    address: auth.address,
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`${url}/user/${auth._id}`, user);
      console.log(response.data);
      toast.success("Updated successfully");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
    <label htmlFor="name" style={styles.label}>Name:</label>
    <input type="text" name="name" value={user.name} onChange={handleChange} style={styles.input} />
  
    <label htmlFor="email" style={styles.label}>Email:</label>
    <input type="email" name="email" value={user.email} onChange={handleChange} style={styles.input} />
  
    <label htmlFor="password" style={styles.label}>Password:</label>
    <input type="password" name="password" value={user.password} onChange={handleChange} style={styles.input} />
  
    <label htmlFor="phoneNumber" style={styles.label}>Phone Number:</label>
    <input type="tel" name="phoneNumber" value={user.phoneNumber} onChange={handleChange} style={styles.input} />
  
    <label htmlFor="address" style={styles.label}>Address:</label>
    <input type="text" name="address" value={user.address} onChange={handleChange} style={styles.input} />
  
    <button type="submit" style={styles.button} onMouseEnter={(e) => e.target.style.backgroundColor = styles.buttonHover.backgroundColor} onMouseLeave={(e) => e.target.style.backgroundColor = styles.button.backgroundColor}>Update User</button>
  </form>
  );
};

const styles = {
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: "20px auto",
    width: "100%"
  },
  
  label: {
    fontWeight: "bold",
    marginTop: "10px"
  },
  
  input: {
    padding: "8px",
    margin: "5px 0",
    width: "100%",
    borderRadius: "4px",
    border: "1px solid #ccc"
  },
  
  button: {
    backgroundColor: "#4CAF50",
    color: "white",
    padding: "10px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    marginTop: "10px",
    width: "100%"
  },
  
  buttonHover: {
    backgroundColor: "#45a049"
  }
}

export default User