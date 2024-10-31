import React, { useState } from 'react';
import '../components/Fabricantes.css';

const Fabricantes = () => {
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
                    <button className="sidebar-button"><img src="../img/inicio.png" alt="Inicio" /> Inicio</button>
                    <button className="sidebar-button"><img src="../img/cotizaciones.png" alt="Cotizaciones" /> Cotizaciones</button>
                    <button className="sidebar-button"><img src="../img/usuario.png" alt="Clientes" /> Clientes</button>
                    <button className="sidebar-button"><img src="../img/productos1.png" alt="Productos" /> Productos</button>
                    <button className="sidebar-button active"><img src="../img/fabricantes.png" alt="Fabricantes" /> Fabricantes</button>
                    <button className="sidebar-button"><img src="../img/usuarios.png" alt="Usuarios" /> Usuarios</button>
                    <button className="sidebar-button"><img src="../img/configuracion.png" alt="Configuracion" /> Configuración</button>
                </nav>
                <main className="main">
                    <div className="main-header">
                        <img src="../img/fabricantes.png" alt="Fabricantes" className="main-icon" /> / Fabricantes
                    </div>
                    
                    <h2 className="panel-title">Gestión de Fabricantes</h2>
                    <div className="config-container">
                        <div className="search-container full-width">
                            <img src="../img/search.png" alt="Buscar" className="search-icon"></img>
                            <input type="text" placeholder="Buscar fabricante..." className="search-input" />
                            <button className='new-user-button' onClick={handleOpenModal}>+ Nuevo Fabricante</button>
                        </div>

                        <div className="search-container-divider"></div>

                        <div className="search-container with-icon">
                            <label htmlFor="search-names" className="search-label">Nombres:</label>
                            <input type="text" id="search-names" placeholder="Buscar" className="search-input" />
                            <img src="../img/search.png" alt="Buscar" className="search-icon" onClick={() => {/* función de búsqueda aquí */}} />
                        </div>

                        <table className="fabricante-table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Fabricante</th>
                                    <th>No. Producto</th>
                                    <th>Estado</th>
                                    <th>Agregado</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>Fabricante XYZ</td>
                                    <td>123</td>
                                    <td>Activo</td>
                                    <td>2024-10-29</td>
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
                                    <h2>Agregar Nuevo Fabricante</h2>
                                    <form className="modal-form">
                                        <label>Fabricante</label>
                                        <input type="text" placeholder="Fabricante" />
                                        <label>Estado</label>
                                        <input type="text" placeholder="Estado" />
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

export default Fabricantes;
