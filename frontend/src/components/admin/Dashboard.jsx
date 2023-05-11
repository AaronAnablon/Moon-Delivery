import AdminNav from "./AdminNav";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const auth = useSelector((state) => state.auth);

  if (!auth.isAdmin) return <p>Access denied. Not an Admin!</p>;

  return (
   <div> 
     <AdminNav />
     <Outlet />
  </div>
   
      
  );
};

export default Dashboard;
