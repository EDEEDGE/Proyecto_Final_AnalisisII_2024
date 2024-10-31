import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

function Login() {
    const navigate = useNavigate();
    const [nombre, setNombre] = useState('');
    const [credenciales, setCredenciales] = useState('');
    const [error, setError] = useState('');

    const handleLoginClick = async () => {
        try {
            const response = await axios.post('http://localhost:3002/api/usuarios/login', {
                nombre,
                credenciales
            });
            // Suponiendo que el token se devuelve en la respuesta
            const { nuevoToken } = response.data;
            localStorage.setItem('token', nuevoToken); // Guarda el token en localStorage
            navigate('/ControlPanel'); // Redirige al panel de control
        } catch (error) {
            if (error.response) {
                setError(error.response.data.mensaje);
            } else {
                setError('Error en el servidor...');
            }
        }
    };

    return (
        <div className="page-container">
            <div className="login-container">
                <div className="left-section">
                    <img src="/img/electrotech_color.png" alt="Tienda de Electrónica" className="store-image" />
                    <h2>Tienda de Electrónica</h2>
                </div>
                <div className="separator"></div>
                <div className="right-section">
                    <img src="/img/usuarios.png" alt="Usuario" className="user-icon" />
                    <div className="input-group">
                        <img src="/img/usuario.png" alt="Username Icon" className="input-icon" />
                        <input 
                            type="text" 
                            placeholder="Username" 
                            className="input-box" 
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)} 
                        />
                    </div>
                    <div className="input-group">
                        <img src="/img/password.png" alt="Password Icon" className="input-icon" />
                        <input 
                            type="password" 
                            placeholder="Password" 
                            className="input-box" 
                            value={credenciales}
                            onChange={(e) => setCredenciales(e.target.value)} 
                        />
                    </div>
                    {error && <div className="error-message">{error}</div>}
                    <button className="login-button" onClick={handleLoginClick}>Login</button>
                </div>
            </div>
        </div>
    );
}

export default Login;
