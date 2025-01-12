import React from "react";
import { Routes, Route } from "react-router-dom";
import NotFound from "./pages/NotFound";
import Register from "./pages/Register/Register";
import { useAuth } from "./context/AuthContext";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login/Login";

function App() {
  const auth = useAuth();

  return (
    <>
      <Routes>
        if(!auth.token)
        {
          <>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<NotFound />} />
          </>
        }
        else
        {
          <>
            <Route path="/dashboard" element={<Dashboard />} />
          </>
        }
      </Routes>
    </>
  );
}

export default App;
