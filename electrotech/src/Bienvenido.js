import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Bienvenido.css'; // Asegúrate de que la ruta sea correcta

function Bienvenido() {
    const navigate = useNavigate();

    const handleStartClick = () => {
        navigate('/login');
    };

    return (
        <div className="container">
            <div className="half-circle">
                <img src="/img/electrotech_color.png" alt="Imagen centrada" className="center-image" />
            </div>
            <button className="start-button" onClick={handleStartClick}>Iniciar</button>
        </div>
    );
}

export default Bienvenido;
