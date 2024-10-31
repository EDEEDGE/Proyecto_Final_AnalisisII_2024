import React from 'react';
import { Link } from 'react-router-dom';
import '../components/ControlPanel.css';

const ControlPanel = () => {
    return (
        <>
            <header className="header">
            <img src="../img/electrotech_color.png" alt="Tienda" className="store-image" />
            <div className="user-info">
                <img src="../img/usuario.png" alt="Usuario" className="usr-icon" />
                <select id="empleado" className="employee-select">
                    <option value="empleado1">Empleado 1</option>
                    <option value="empleado2">Empleado 2</option>
                    <option value="empleado3">Empleado 3</option>
                    <option value="cerrar-sesion">Cerrar Sesión</option>
                </select>
            </div>
            </header><div className="container">
                <nav className="sidebar">
                    <Link to ="/ControlPanel">
                        <button className="sidebar-button active" ><img src="../img/inicio.png" alt="Inicio" /> Inicio</button>
                    </Link>
                    <Link to ="/Cotizaciones">
                        <button className="sidebar-button" ><img src="../img/cotizaciones.png" alt="Cotizaciones" /> Cotizaciones</button>
                    </Link>
                    <Link to ="/Clientes">
                        <button className="sidebar-button" ><img src="../img/usuario.png" alt="Clientes" /> Clientes</button>
                    </Link>
                    <Link to ="/Productos">
                        <button className="sidebar-button" ><img src="../img/productos1.png" alt="Productos" /> Productos</button>
                    </Link>
                    <Link to ="/Usuarios">
                        <button className="sidebar-button" ><img src="../img/usuarios.png" alt="Usuarios" /> Usuarios</button>
                    </Link>
                    <Link to ="/Configuracion">
                        <button className="sidebar-button" ><img src="../img/configuracion.png" alt="Configuraciones" /> Configuracion</button>
                    </Link>
                </nav>
                <main className="main">
                    <div className="main-header">
                        <img src="../img/inicio.png" alt="Inicio" className="main-icon" />/ Inicio
                    </div>
                    <h2 className="panel-title">Panel de Control</h2>
                    <div className="cards">
                        <div className="card">
                            <div className="card-icon" style={{ backgroundColor: '#54d7f9' }}>
                                <img src="../img/cotizaciones.png" alt="Cotizaciones" className="icon-small" />
                            </div>
                            <div className="card-info" style={{ backgroundColor: '#ffffff' }}>
                                <h3>Cotizaciones</h3>
                                <span className="number">25</span>
                            </div>
                        </div>
                        <div className="card">
                            <div className="card-icon" style={{ backgroundColor: '#fccc42' }}>
                                <img src="../img/productos1.png" alt="Productos" className="icon-small" />
                            </div>
                            <div className="card-info" style={{ backgroundColor: '#ffffff' }}>
                                <h3>Productos</h3>
                                <span className="number">150</span>
                            </div>
                        </div>
                        <div className="card">
                            <div className="card-icon" style={{ backgroundColor: '#8ac2c9' }}>
                                <img src="../img/fabricantes.png" alt="Fabricantes" className="icon-small" />
                            </div>
                            <div className="card-info" style={{ backgroundColor: '#ffffff' }}>
                                <h3>Fabricantes</h3>
                                <span className="number">10</span>
                            </div>
                        </div>
                        <div className="card">
                            <div className="card-icon" style={{ backgroundColor: '#f34642' }}>
                                <img src="../img/usuarios.png" alt="Clientes" className="icon-small" />
                            </div>
                            <div className="card-info" style={{ backgroundColor: '#ffffff' }}>
                                <h3>Clientes</h3>
                                <span className="number">75</span>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
};

export default ControlPanel;
