import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../components/ControlPanel.css';

const ControlPanel = () => {
    const [showLogoutConfirmModal, setShowLogoutConfirmModal] = useState(false);
    const [userName, setUserName] = useState('');
    const [contadores, setContadores] = useState({ clientes: 0, cotizaciones: 0, productos: 0 });
    const navigate = useNavigate();

    useEffect(() => {
        const storedUserName = localStorage.getItem('userName');
        setUserName(storedUserName || 'Usuario');

        // Función para obtener los contadores desde la API
        const fetchContadores = async () => {
            try {
                const [clientesRes, cotizacionesRes, productosRes] = await Promise.all([
                    fetch('http://localhost:3002/api/clientes/obtener/cantidad/todos', {
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('token')}`
                        }
                    }),
                    fetch('http://localhost:3002/api/cotizaciones/obtener/cantidad/todos', {
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('token')}`
                        }
                    }),
                    fetch('http://localhost:3002/api/productos/obtener/cantidad/todos', {
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('token')}`
                        }
                    }),
                ]);

                const [clientes, cotizaciones, productos] = await Promise.all([
                    clientesRes.json(),
                    cotizacionesRes.json(),
                    productosRes.json(),
                ]);

                setContadores({ clientes, cotizaciones, productos });
            } catch (error) {
                console.error('Error al obtener los contadores:', error);
            }
        };

        fetchContadores();
    }, []);

    const handleOpenLogoutConfirmModal = () => {
        setShowLogoutConfirmModal(true);
    };

    const handleCloseLogoutConfirmModal = () => {
        setShowLogoutConfirmModal(false);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userName');
        navigate('/login');
    };

    const handleSelectChange = (e) => {
        const selectedValue = e.target.value;
        if (selectedValue === 'cerrar-sesion') {
            handleOpenLogoutConfirmModal();
            e.target.value = userName; // Restablecer el valor del select
        }
    };

    return (
        <>
            <header className="header">
                <img src="../img/electrotech_color.png" alt="Tienda" className="store-image" />
                <div className="user-info">
                    <img src="../img/usuario.png" alt="Usuario" className="usr-icon" />
                    <select id="empleado" className="employee-select" onChange={handleSelectChange} value={userName}>
                        <option value={userName}>{userName}</option>
                        <option value="cerrar-sesion">Cerrar Sesión</option>
                    </select>
                </div>
            </header>
            <div className="container">
                <nav className="sidebar">
                    <Link to="/ControlPanel">
                        <button className="sidebar-button active"><img src="../img/inicio.png" alt="Inicio" /> Inicio</button>
                    </Link>
                    <Link to="/Cotizaciones">
                        <button className="sidebar-button"><img src="../img/cotizaciones.png" alt="Cotizaciones" /> Cotizaciones</button>
                    </Link>
                    <Link to="/Clientes">
                        <button className="sidebar-button"><img src="../img/usuario.png" alt="Clientes" /> Clientes</button>
                    </Link>
                    <Link to="/Productos">
                        <button className="sidebar-button"><img src="../img/productos1.png" alt="Productos" /> Productos</button>
                    </Link>
                    <Link to="/Usuarios">
                        <button className="sidebar-button"><img src="../img/usuarios.png" alt="Usuarios" /> Usuarios</button>
                    </Link>
                </nav>
                <main className="main">
                    <div className="main-header">
                        <img src="../img/inicio.png" alt="Inicio" className="main-icon" /> / Inicio
                    </div>
                    <h2 className="panel-title">Panel de Control</h2>
                    <div className="cards">
                        <div className="card">
                            <div className="card-icon" style={{ backgroundColor: '#54d7f9' }}>
                                <img src="../img/cotizaciones.png" alt="Cotizaciones" className="icon-small" />
                            </div>
                            <div className="card-info" style={{ backgroundColor: '#ffffff' }}>
                                <h3>Cotizaciones</h3>
                                <span className="number">{contadores.cotizaciones}</span>
                            </div>
                        </div>
                        <div className="card">
                            <div className="card-icon" style={{ backgroundColor: '#fccc42' }}>
                                <img src="../img/productos1.png" alt="Productos" className="icon-small" />
                            </div>
                            <div className="card-info" style={{ backgroundColor: '#ffffff' }}>
                                <h3>Productos</h3>
                                <span className="number">{contadores.productos}</span>
                            </div>
                        </div>
                        <div className="card">
                            <div className="card-icon" style={{ backgroundColor: '#f34642' }}>
                                <img src="../img/usuarios.png" alt="Clientes" className="icon-small" />
                            </div>
                            <div className="card-info" style={{ backgroundColor: '#ffffff' }}>
                                <h3>Clientes</h3>
                                <span className="number">{contadores.clientes}</span>
                            </div>
                        </div>
                    </div>

                    {/* Modal de Confirmación de Cierre de Sesión */}
                    {showLogoutConfirmModal && (
                        <div className="modal-overlay">
                            <div className="modal-content">
                                <h2>Confirmar Cierre de Sesión</h2>
                                <p>¿Estás seguro de que deseas cerrar sesión?</p>
                                <div className="modal-buttons">
                                    <button type="button" onClick={handleCloseLogoutConfirmModal} className="close-button">Cancelar</button>
                                    <button onClick={handleLogout} className="delete-button">Sí</button>
                                </div>
                            </div>
                        </div>
                    )}
                </main>
            </div>
        </>
    );
};

export default ControlPanel;
