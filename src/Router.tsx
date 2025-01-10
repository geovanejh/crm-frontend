import React from 'react'
import { Routes, Route } from "react-router-dom";
import Login from './pages/Login/Login';
import NotFound from './pages/NotFound';
import Register from './pages/Register/Register';


function App() {
    return (
        <>
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
        </>
    );
}

export default App;