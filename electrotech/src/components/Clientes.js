import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../components/Clientes.css';

const Clientes = () => {
    const [showModal, setShowModal] = useState(false);

    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
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
                    <Link to ="/ControlPanel">
                        <button className="sidebar-button" ><img src="../img/inicio.png" alt="Inicio" /> Inicio</button>
                    </Link>
                    <Link to ="/Cotizaciones">
                        <button className="sidebar-button" ><img src="../img/cotizaciones.png" alt="Cotizaciones" /> Cotizaciones</button>
                    </Link>
                    <Link to ="/Clientes">
                        <button className="sidebar-button active" ><img src="../img/usuario.png" alt="Clientes" /> Clientes</button>
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
                        <img src="../img/usuario.png" alt="Clientes" className="main-icon" /> / Clientes
                    </div>
                    
                    <h2 className="panel-title">Gestión de Clientes</h2>
                    <div className="config-container">
                        <div className="search-container full-width">
                            <img src="../img/search.png" alt="Buscar" className="search-icon"></img>
                            <input type="text" placeholder="Buscar Clientes..." className="search-input" />
                            <button className='new-user-button' onClick={handleOpenModal}>+ Nuevo Cliente</button>
                        </div>

                        <div className="search-container-divider"></div>

                        <div className="search-container with-icon">
                            <label htmlFor="search-names" className="search-label">Nombre del Cliente:</label>
                            <input type="text" id="search-names" placeholder="Buscar" className="search-input" />
                            <img src="../img/search.png" alt="Buscar" className="search-icon" onClick={() => {/* función de búsqueda aquí */}} />
                        </div>

                        <table className="user-table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Fecha alta</th>
                                    <th>No Documento</th>
                                    <th>Nombre</th>
                                    <th>Direccion</th>
                                    <th>Contacto</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>2024-10-29</td>
                                    <td>juanp</td>
                                    <td>juan@example.com</td>
                                    <td>2024-10-29</td>
                                    <td>juanp</td>
                                    <td className="action-buttons">
                                        <button className="edit-button"><img src="../img/edit.png" alt="Editar" /></button>
                                        <button className="delete-button"><img src="../img/delete.png" alt="Eliminar" /></button>
                                        <button className="update-button"><img src="../img/update.png" alt="Actualizar" /></button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                        {showModal && (
                            <div className="modal-overlay">
                                <div className="modal-content">
                                    <img src="../img/add.png" alt="Agregar" className="modal-icon" />
                                    <h2>Agregar Nuevo Cliente</h2>
                                    <form className="modal-form">
                                        <label>Nombre del Cliente</label>
                                        <input type="text" placeholder="Nombre del Cliente" />
                                        <label>Nombre Comercial</label>
                                        <input type="text" placeholder="Nombre Comercial" />
                                        <label>No. de Identificación</label>
                                        <input type="text" placeholder="No. Identificación" />
                                        <label>Utilidad</label>
                                        <input type="email" placeholder="Utilidad" />
                                        <label>Dirección</label>
                                        <input type="text" placeholder="Dirección" />
                                        <label>Correo Electrónico</label>
                                        <input type="email" placeholder="Correo Electrónico" />
                                        <label>Nombre Contacto</label>
                                        <input type="text" placeholder="Nombre Contacto" />
                                        <label>Número de Teléfono</label>
                                        <input type="text" placeholder="Número de Teléfono" />
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
