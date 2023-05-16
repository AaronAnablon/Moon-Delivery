import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../slices/authSlice";
import { useNavigate } from "react-router-dom";
import { StyledForm } from "./StyledForm";

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
    } else if(auth.isAdmin && auth.isRider === true) {
      navigate("/system/systemStores");
    } else if(auth.isRider && !auth.isAdmin) {
      navigate("/rider/toship");
    } else if(auth.isAdmin) {
      navigate("/admin/summary");
    } 
  }, [auth._id, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(user));
  };

  return (
    <>
      <StyledForm onSubmit={handleSubmit}>
        <h2>Login</h2>
        <input
          type="email"
          placeholder="email"
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="password"
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          required
        />
        <button>
          {auth.loginStatus === "pending" ? "Submitting..." : "Login"}
        </button>
        {auth.loginStatus === "rejected" ? <p>{auth.loginError}</p> : null}
      </StyledForm>
    </>
  );
};

export default Login;
