import React from 'react';
import '../components/Configuracion.css';

const Configuracion = () => {
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
            </header>
            <div className="container">
                <nav className="sidebar">
                    <button className="sidebar-button"><img src="../img/inicio.png" alt="Inicio" /> Inicio</button>
                    <button className="sidebar-button"><img src="../img/cotizaciones.png" alt="Cotizaciones" /> Cotizaciones</button>
                    <button className="sidebar-button"><img src="../img/usuario.png" alt="Clientes" /> Clientes</button>
                    <button className="sidebar-button"><img src="../img/productos1.png" alt="Productos" /> Productos</button>
                    <button className="sidebar-button"><img src="../img/fabricantes.png" alt="Fabricantes" /> Fabricantes</button>
                    <button className="sidebar-button"><img src="../img/usuarios.png" alt="Usuarios" /> Usuarios</button>
                    <button className="sidebar-button active"><img src="../img/configuracion.png" alt="Configuracion" /> Configuración</button>
                </nav>
                <main className="main">
                    <div className="main-header">
                        <img src="../img/configuracion.png" alt="Configuracion" className="main-icon" />/ Configuración
                    </div>
                    
                    <h2 className="panel-title">Configuración de la Empresa</h2>
                        <div className="config-container">
                            <div className="config-form">
                                <div className="form-group">
                                    <label>Nombre o Razón Social:</label>
                                    <input type="text" />
                                </div>
        
                                <div className="form-group">
                                    <label>Actividad Económica:</label>
                                    <input type="text" />
                                </div>
        
                                <div className="form-group">
                                    <label>Propietario:</label>
                                    <input type="text" />
                                </div>
        
                                <div className="form-group">
                                    <label>Número de Registro:</label>
                                    <input type="text" />
                                </div>
        
                                <div className="form-group">
                                    <label>Dirección:</label>
                                    <input type="text" />
                                </div>
        
                                <div className="form-group">
                                    <label>Teléfono:</label>
                                    <input type="text" />
                                </div>

                                <div className="form-group" style={{ gridColumn: 'span 2' }}>
                                    <label>Comentarios:</label>
                                    <textarea rows="4"></textarea>
                                </div>
        
                                <button className="save-button">Guardar Datos</button>
                            </div>
                        </div>
                </main>
            </div>
        </>
    );
};

export default Configuracion;
