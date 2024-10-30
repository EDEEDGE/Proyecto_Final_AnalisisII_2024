import React, { useState } from 'react';
import '../components/Cotizaciones.css';

const Cotizaciones = () => {
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
                    <button className="sidebar-button active"><img src="../img/cotizaciones.png" alt="Cotizaciones" /> Cotizaciones</button>
                    <button className="sidebar-button"><img src="../img/usuario.png" alt="Clientes" /> Clientes</button>
                    <button className="sidebar-button"><img src="../img/productos1.png" alt="Productos" /> Productos</button>
                    <button className="sidebar-button"><img src="../img/fabricantes.png" alt="Fabricantes" /> Fabricantes</button>
                    <button className="sidebar-button"><img src="../img/usuarios.png" alt="Usuarios" /> Usuarios</button>
                    <button className="sidebar-button"><img src="../img/configuracion.png" alt="Configuracion" /> Configuración</button>
                </nav>
                <main className="main">
                    <div className="main-header">
                        <img src="../img/cotizaciones.png" alt="Cotizaciones" className="main-icon" /> / Cotizaciones
                    </div>
                    
                    <h2 className="panel-title">Gestión de Cotizaciones</h2>
                    <div className="config-container">
                        <div className="search-container full-width">
                            <img src="../img/search.png" alt="Buscar" className="search-icon"></img>
                            <input type="text" placeholder="Buscar Cotizaciones..." className="search-input" />
                            <button className='new-quote-button' onClick={handleOpenModal}>+ Nueva Cotización</button>
                        </div>

                        <table className="quote-table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Fecha Alta</th>
                                    <th>Atención</th>
                                    <th>Cliente</th>
                                    <th>Neto</th>
                                    <th>Total</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>2024-10-29</td>
                                    <td>Juan Perez</td>
                                    <td>Empresa XYZ</td>
                                    <td>$500</td>
                                    <td>$600</td>
                                    <td className="action-buttons">
                                        <button className="edit-button"><img src="../img/edit.png" alt="Editar" /></button>
                                        <button className="delete-button"><img src="../img/delete.png" alt="Eliminar" /></button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                        {showModal && (
                            <div className="modal-overlay">
                                <div className="modal-content">
                                    <img src="../img/add.png" alt="Agregar" className="modal-icon" />
                                    <h2>Agregar Nueva Cotización</h2>
                                    <form className="modal-form">
                                        <label>Cliente</label>
                                        <input type="text" placeholder="Cliente" />
                                        <label>Atención</label>
                                        <input type="text" placeholder="Atención" />
                                        <label>Teléfono</label>
                                        <input type="text" placeholder="Teléfono" />
                                        <label>Empresa</label>
                                        <input type="text" placeholder="Empresa" />
                                        <label>Email</label>
                                        <input type="email" placeholder="Correo Electrónico" />
                                        <div className="modal-buttons">
                                            <button type="button" onClick={handleCloseModal} className="close-button">Cerrar</button>
                                            <button type="button" className="add-product-button">Agregar Producto</button>
                                            <button type="button" className="print-quote-button"><img src="../img/print.png" alt="Imprimir" /></button>
                                        </div>

                                        <table className="product-table">
                                            <thead>
                                                <tr>
                                                    <th>Código</th>
                                                    <th>Cantidad</th>
                                                    <th>Descripción</th>
                                                    <th>Precio Unitario</th>
                                                    <th>Precio Total</th>
                                                    <th>Acciones</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>001</td>
                                                    <td>2</td>
                                                    <td>Producto A</td>
                                                    <td>$100</td>
                                                    <td>$200</td>
                                                    <td>
                                                        <button className="delete-button"><img src="../img/delete.png" alt="Eliminar" /></button>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>

                                        <div className="dropdown-container">
                                            <label>Condiciones de Pago:</label>
                                            <select>
                                                <option value="pago1">Condición 1</option>
                                                <option value="pago2">Condición 2</option>
                                            </select>

                                            <label>Validez:</label>
                                            <select>
                                                <option value="validez1">Validez 1</option>
                                                <option value="validez2">Validez 2</option>
                                            </select>

                                            <label>Tiempo de Entrega:</label>
                                            <select>
                                                <option value="tiempo1">Tiempo 1</option>
                                                <option value="tiempo2">Tiempo 2</option>
                                            </select>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </>
    );
};

export default Cotizaciones;
