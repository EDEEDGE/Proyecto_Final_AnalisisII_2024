import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate('/ControlPanel');
    };

    return (
        <div className="page-container"> {/* Añadido nuevo contenedor */}
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
                        <input type="text" placeholder="Username" className="input-box" />
                    </div>
                    <div className="input-group">
                        <img src="/img/password.png" alt="Password Icon" className="input-icon" />
                        <input type="password" placeholder="Password" className="input-box" />
                    </div>
                    <button className="login-button" onClick={handleLoginClick}>Login</button>
                </div>
            </div>
        </div>
    );
}

export default Login;