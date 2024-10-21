import React from 'react';
import './Bienvenido.css'; // Asegúrate de que la ruta sea correcta

function Bienvenido() {
    return (
        <div className="container">
            <div className="half-circle">
                <img src="/img/electrotech_color.png" alt="Imagen centrada" className="center-image" />
            </div>
            <button className="start-button">Iniciar</button>
        </div>
    );
}

export default Bienvenido;
