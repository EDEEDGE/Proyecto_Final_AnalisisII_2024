import React from 'react';
import './Login.css'; // Asegúrate de que esta ruta sea correcta

function Login() {
    return (
        <div className="login-container">
            <div className="left-section">
                <img src="/img/electrotech_color.png" alt="Tienda de Electrónica" className="store-image" />
                <h2>Tienda de Electrónica</h2>
            </div>
            <div className="separator"></div>
            <div className="right-section">
                <img src="/img/usuarios.png"alt="Usuario" className="user-icon" />
                <div className="input-group">
                    <img src="/img/usuario.png" alt="Username Icon" className="input-icon" />
                    <input type="text" placeholder="Username" className="input-box" />
                </div>
                <div className="input-group">
                    <img src="/img/password.png" alt="Password Icon" className="input-icon" />
                    <input type="password" placeholder="Password" className="input-box" />
                </div>
                <button className="login-button">Login</button>
                <a href="#" className="forgot-password">Recuperar contraseña</a>
            </div>
        </div>
    );
}

export default Login;
