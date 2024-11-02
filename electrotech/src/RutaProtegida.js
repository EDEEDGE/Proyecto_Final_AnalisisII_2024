import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const RutaProtegida = ({ children }) => {
    const token = localStorage.getItem('token');
    
    if (!token) {
        localStorage.setItem('redirected', 'true'); // Marca que fue redirigido
        return <Navigate to="/login" />;
    }

    return children ? children : <Outlet />;
};

export default RutaProtegida;
