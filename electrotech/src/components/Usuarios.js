import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../components/Usuarios.css';

const Usuarios = () => {
    const [showModal, setShowModal] = useState(false);
    const [nombre, setNombre] = useState('');
    const [credenciales, setCredenciales] = useState('');
    const [usuarios, setUsuarios] = useState([
        { id: 4, nombre: 'josue' } // Datos de ejemplo
    ]);

    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Aquí debes implementar la lógica para enviar el nuevo usuario a tu API
        // Ejemplo de llamada a la API (ajusta la URL y el método según sea necesario)
        fetch('http://localhost:3002/api/usuarios/registrar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ nombre, credenciales }),
        })
        .then(response => response.json())
        .then(data => {
            // Manejo de la respuesta de la API
            console.log('Usuario agregado:', data);
            // Agregar el nuevo usuario a la lista local (actualiza el estado)
            setUsuarios(prev => [...prev, { id: data.id, nombre }]); // Asumiendo que la API devuelve el nuevo id
            setNombre('');
            setCredenciales('');
            handleCloseModal();
        })
        .catch((error) => {
            console.error('Error al agregar usuario:', error);
        });
    };

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
                        <button className="sidebar-button"><img src="../img/usuario.png" alt="Clientes" /> Clientes</button>
                    </Link>
                    <Link to="/Productos">
                        <button className="sidebar-button"><img src="../img/productos1.png" alt="Productos" /> Productos</button>
                    </Link>
                    <Link to="/Usuarios">
                        <button className="sidebar-button active"><img src="../img/usuarios.png" alt="Usuarios" /> Usuarios</button>
                    </Link>
                </nav>
                <main className="main">
                    <div className="main-header">
                        <img src="../img/usuarios.png" alt="Usuarios" className="main-icon" /> / Usuarios
                    </div>
                    
                    <h2 className="panel-title">Gestión de Usuarios</h2>
                    <div className="config-container">
                        <div className="search-container full-width">
                            <img src="../img/search.png" alt="Buscar" className="search-icon"></img>
                            <input type="text" placeholder="Buscar usuario..." className="search-input" />
                            <button className='new-user-button' onClick={handleOpenModal}>+ Nuevo Usuario</button>
                        </div>

                        <table className="user-table">
                            <thead>
                                <tr>
                                    <th>Nombres</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {usuarios.map(usuario => (
                                    <tr key={usuario.id}>
                                        <td>{usuario.nombre}</td>
                                        <td className="action-buttons">
                                            <button className="edit-button"><img src="../img/edit.png" alt="Editar" /></button>
                                            <button className="delete-button"><img src="../img/delete.png" alt="Eliminar" /></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {showModal && (
                            <div className="modal-overlay">
                                <div className="modal-content">
                                    <img src="../img/add.png" alt="Agregar" className="modal-icon" />
                                    <h2>Agregar Nuevo Usuario</h2>
                                    <form className="modal-form" onSubmit={handleSubmit}>
                                        <label>Nombre</label>
                                        <input type="text" value={nombre} onChange={e => setNombre(e.target.value)} placeholder="Nombre" required />
                                        <label>Credenciales</label>
                                        <input type="password" value={credenciales} onChange={e => setCredenciales(e.target.value)} placeholder="Credenciales" required />
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

export default Usuarios;
