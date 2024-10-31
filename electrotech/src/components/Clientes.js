import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../components/Clientes.css';

const Clientes = () => {
    const [showModal, setShowModal] = useState(false);
    const [clientes, setClientes] = useState([]);
    const [nuevoCliente, setNuevoCliente] = useState({
        nombre: '',
        direccion: '',
        correoElectronico: '',
        telefono: '',
        DPI: '',
        fechaIngreso: new Date().toISOString().split('T')[0], // Formato YYYY-MM-DD
    });

    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        // Reiniciar los campos del nuevo cliente al cerrar el modal
        setNuevoCliente({
            nombre: '',
            direccion: '',
            correoElectronico: '',
            telefono: '',
            DPI: '',
            fechaIngreso: new Date().toISOString().split('T')[0],
        });
    };

    // Función para manejar cambios en los inputs del nuevo cliente
    const handleChange = (e) => {
        const { name, value } = e.target;
        setNuevoCliente({ ...nuevoCliente, [name]: value });
    };

    // Función para enviar el nuevo cliente
    const handleSubmit = async (e) => {
        e.preventDefault(); // Evita la recarga de la página
        try {
            const token = localStorage.getItem('token'); // Obtén el token de autenticación
            await axios.post('http://localhost:3002/api/clientes/crear/nuevo', nuevoCliente, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            // Cierra el modal después de guardar
            handleCloseModal();
            // Vuelve a obtener los clientes
            fetchClientes();
        } catch (error) {
            console.error('Error al crear nuevo cliente', error);
            alert('Error al crear nuevo cliente. Verifica la información e intenta nuevamente.');
        }
    };

    // Función para obtener todos los clientes
    const fetchClientes = async () => {
        try {
            const token = localStorage.getItem('token'); // Obtén el token de autenticación
            const response = await axios.get('http://localhost:3002/api/clientes/obtener/todos', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setClientes(response.data);
        } catch (error) {
            console.error('Error al obtener los clientes', error);
            alert('Error al obtener la lista de clientes.');
        }
    };

    useEffect(() => {
        fetchClientes(); // Obtener clientes al cargar el componente
    }, []);

    return (
        <>
            <header className="header">
                <img src="../img/electrotech_color.png" alt="Tienda" className="store-image" />
                <div className="user-info">
                    <img src="../img/usuario.png" alt="Usuario" className="usr-icon" />
                    <select id="empleado" className="employee-select">
                        <option value="empleado1">Empleado 1</option>
                        <option value="empleado2">Empleado 2</option>
                        <option value="cerrar-sesion">Cerrar Sesión</option>
                    </select>
                </div>
            </header>
            <div className="container">
                <nav className="sidebar">
                    <Link to="/ControlPanel">
                        <button className="sidebar-button"><img src="../img/inicio.png" alt="Inicio" /> Inicio</button>
                    </Link>
                    <Link to="/Cotizaciones">
                        <button className="sidebar-button"><img src="../img/cotizaciones.png" alt="Cotizaciones" /> Cotizaciones</button>
                    </Link>
                    <Link to="/Clientes">
                        <button className="sidebar-button active"><img src="../img/usuario.png" alt="Clientes" /> Clientes</button>
                    </Link>
                    <Link to="/Productos">
                        <button className="sidebar-button"><img src="../img/productos1.png" alt="Productos" /> Productos</button>
                    </Link>
                    <Link to="/Usuarios">
                        <button className="sidebar-button"><img src="../img/usuarios.png" alt="Usuarios" /> Usuarios</button>
                    </Link>
                    <Link to="/Configuracion">
                        <button className="sidebar-button"><img src="../img/configuracion.png" alt="Configuraciones" /> Configuracion</button>
                    </Link>
                </nav>
                <main className="main">
                    <div className="main-header">
                        <img src="../img/usuario.png" alt="Clientes" className="main-icon" /> / Clientes
                    </div>
                    <h2 className="panel-title">Gestión de Clientes</h2>
                    <div className="config-container">
                        <div className="search-container full-width">
                            <img src="../img/search.png" alt="Buscar" className="search-icon" />
                            <input type="text" placeholder="Buscar Clientes..." className="search-input" />
                            <button className='new-user-button' onClick={handleOpenModal}>+ Nuevo Cliente</button>
                        </div>

                        {/* Tabla de clientes */}
                        <table className="user-table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Nombre</th>
                                    <th>Dirección</th>
                                    <th>Correo Electrónico</th>
                                    <th>Número de Teléfono</th>
                                    <th>No. Identificación</th>
                                    <th>Fecha de Ingreso</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {clientes.map((cliente) => (
                                    <tr key={cliente.id}>
                                        <td>{cliente.id}</td>
                                        <td>{cliente.nombre}</td>
                                        <td>{cliente.direccion}</td>
                                        <td>{cliente.correoElectronico}</td>
                                        <td>{cliente.telefono}</td>
                                        <td>{cliente.DPI}</td>
                                        <td>{new Date(cliente.fechaIngreso).toLocaleDateString()}</td>
                                        <td className="action-buttons">
                                            {/* Botones de acción */}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {showModal && (
                            <div className="modal-overlay">
                                <div className="modal-content">
                                    <img src="../img/add.png" alt="Agregar" className="modal-icon" />
                                    <h2>Agregar Nuevo Cliente</h2>
                                    <form className="modal-form" onSubmit={handleSubmit}>
                                        <label>Nombre del Cliente</label>
                                        <input type="text" name="nombre" value={nuevoCliente.nombre} onChange={handleChange} placeholder="Nombre del Cliente" required />
                                        <label>Dirección</label>
                                        <input type="text" name="direccion" value={nuevoCliente.direccion} onChange={handleChange} placeholder="Dirección" required />
                                        <label>Correo Electrónico</label>
                                        <input type="email" name="correoElectronico" value={nuevoCliente.correoElectronico} onChange={handleChange} placeholder="Correo Electrónico" required />
                                        <label>Número de Teléfono</label>
                                        <input type="text" name="telefono" value={nuevoCliente.telefono} onChange={handleChange} placeholder="Número de Teléfono" required />
                                        <label>No. de Identificación</label>
                                        <input type="text" name="DPI" value={nuevoCliente.DPI} onChange={handleChange} placeholder="No. Identificación" required />
                                        <label>Fecha de Ingreso</label>
                                        <input type="date" name="fechaIngreso" value={nuevoCliente.fechaIngreso} onChange={handleChange} required />
                                        <div className="modal-buttons">
                                            <button type="button" onClick={handleCloseModal} className="close-button">Cerrar</button>
                                            <button type="submit" className="save-button">Guardar</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        )}
                        <div className="pagination">
                            <button className="pagination-button">Anterior</button>
                            <button className="pagination-button">1</button>
                            <button className="pagination-button">Siguiente</button>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
};

export default Clientes;
