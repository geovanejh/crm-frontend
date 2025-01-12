import React from "react";
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const auth = useAuth();

  return (
    <div>
      Dashboard
      <button onClick={() => auth.logout()}>logout</button>
    </div>
  );
};

export default Dashboard;
