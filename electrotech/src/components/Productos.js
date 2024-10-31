import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../components/Productos.css';

const Productos = () => {
    const [showModal, setShowModal] = useState(false);
    const [productos, setProductos] = useState([]);
    const [nuevoProducto, setNuevoProducto] = useState({
        nombre: '',
        descripcion: '',
        precio: '',
        codigo: '',
        modelo: '',
        fabricante: '',
        estado: true, // Asignamos un estado por defecto
    });

    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        // Reiniciar los campos del nuevo producto al cerrar el modal
        setNuevoProducto({
            nombre: '',
            descripcion: '',
            precio: '',
            codigo: '',
            modelo: '',
            fabricante: '',
            estado: true,
        });
    };

    // Función para manejar cambios en los inputs del nuevo producto
    const handleChange = (e) => {
        const { name, value } = e.target;
        setNuevoProducto({ ...nuevoProducto, [name]: value });
    };

    // Función para enviar el nuevo producto
    const handleSubmit = async (e) => {
        e.preventDefault(); // Evita la recarga de la página
        try {
            const token = localStorage.getItem('token'); // Obtén el token de autenticación
            await axios.post('http://localhost:3002/api/productos/crear/nuevo', nuevoProducto, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            // Cierra el modal después de guardar
            handleCloseModal();
            // Vuelve a obtener los productos
            fetchProductos();
        } catch (error) {
            console.error('Error al crear nuevo producto', error);
            alert('Error al crear nuevo producto. Verifica la información e intenta nuevamente.');
        }
    };

    // Función para obtener todos los productos
    const fetchProductos = async () => {
        try {
            const token = localStorage.getItem('token'); // Obtén el token de autenticación
            const response = await axios.get('http://localhost:3002/api/productos/obtener/todos', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setProductos(response.data);
        } catch (error) {
            console.error('Error al obtener los productos', error);
            alert('Error al obtener la lista de productos.');
        }
    };

    useEffect(() => {
        fetchProductos(); // Obtener productos al cargar el componente
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
                        <button className="sidebar-button"><img src="../img/usuario.png" alt="Clientes" /> Clientes</button>
                    </Link>
                    <Link to="/Productos">
                        <button className="sidebar-button active"><img src="../img/productos1.png" alt="Productos" /> Productos</button>
                    </Link>
                    <Link to="/Usuarios">
                        <button className="sidebar-button"><img src="../img/usuarios.png" alt="Usuarios" /> Usuarios</button>
                    </Link>
                </nav>
                <main className="main">
                    <div className="main-header">
                        <img src="../img/productos1.png" alt="Productos" className="main-icon" /> / Productos
                    </div>
                    
                    <h2 className="panel-title">Gestión de Productos</h2>
                    <div className="config-container">
                        <div className="search-container full-width">
                            <img src="../img/search.png" alt="Buscar" className="search-icon" />
                            <input type="text" placeholder="Buscar producto..." className="search-input" />
                            <button className='new-user-button' onClick={handleOpenModal}>+ Nuevo Producto</button>
                        </div>

                        <table className="user-table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Código</th>
                                    <th>Modelo</th>
                                    <th>Nombre</th>
                                    <th>Descripción</th>
                                    <th>Fabricante</th>
                                    <th>Estado</th>
                                    <th>Precio</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {productos.map((producto) => (
                                    <tr key={producto.id}>
                                        <td>{producto.id}</td>
                                        <td>{producto.codigo}</td>
                                        <td>{producto.modelo}</td>
                                        <td>{producto.nombre}</td>
                                        <td>{producto.descripcion}</td>
                                        <td>{producto.fabricante}</td>
                                        <td>{producto.estado ? 'Disponible' : 'No Disponible'}</td>
                                        <td>{producto.precio}</td>
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
                                    <h2>Agregar Nuevo Producto</h2>
                                    <form className="modal-form" onSubmit={handleSubmit}>
                                        <label>Nombre</label>
                                        <input type="text" name="nombre" value={nuevoProducto.nombre} onChange={handleChange} placeholder="Nombre del Producto" required />
                                        <label>Descripción</label>
                                        <input type="text" name="descripcion" value={nuevoProducto.descripcion} onChange={handleChange} placeholder="Descripción" required />
                                        <label>Código</label>
                                        <input type="text" name="codigo" value={nuevoProducto.codigo} onChange={handleChange} placeholder="Código" required />
                                        <label>Modelo</label>
                                        <input type="text" name="modelo" value={nuevoProducto.modelo} onChange={handleChange} placeholder="Modelo" required />
                                        <label>Fabricante</label>
                                        <input type="text" name="fabricante" value={nuevoProducto.fabricante} onChange={handleChange} placeholder="Fabricante" required />
                                        <label>Estado</label>
                                        <select name="estado" value={nuevoProducto.estado} onChange={handleChange} required>
                                            <option value={true}>Disponible</option>
                                            <option value={false}>No Disponible</option>
                                        </select>
                                        <label>Precio</label>
                                        <input type="number" name="precio" value={nuevoProducto.precio} onChange={handleChange} placeholder="Precio" required />
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

export default Productos;
