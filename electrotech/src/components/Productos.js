import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../components/Productos.css';

const Productos = () => {
    const [showModal, setShowModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);
    const [showLogoutConfirmModal, setShowLogoutConfirmModal] = useState(false);
    const [productos, setProductos] = useState([]);
    const [nuevoProducto, setNuevoProducto] = useState({
        nombre: '',
        descripcion: '',
        precio: '',
        codigo: '',
        modelo: '',
        fabricante: '',
        estado: true,
    });
    const [productoAEditar, setProductoAEditar] = useState(null);
    const [productoAEliminar, setProductoAEliminar] = useState(null);
    const [userName, setUserName] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 10; // Número de productos por página
    const navigate = useNavigate();

    useEffect(() => {
        const storedUserName = localStorage.getItem('userName');
        setUserName(storedUserName || 'Usuario');
        fetchProductos();
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
        if (selectedValue === 'logout') {
            handleOpenLogoutConfirmModal();
            e.target.value = userName; // Restablecer el valor del select
        }
    };

    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
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

    const handleOpenEditModal = (producto) => {
        setProductoAEditar(producto);
        setShowEditModal(true);
    };

    const handleCloseEditModal = () => {
        setShowEditModal(false);
        setProductoAEditar(null);
    };

    const handleOpenDeleteConfirmModal = (producto) => {
        setProductoAEliminar(producto);
        setShowDeleteConfirmModal(true);
    };

    const handleCloseDeleteConfirmModal = () => {
        setShowDeleteConfirmModal(false);
        setProductoAEliminar(null);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (productoAEditar) {
            setProductoAEditar({ ...productoAEditar, [name]: value });
        } else {
            setNuevoProducto({ ...nuevoProducto, [name]: value });
        }
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            await axios.post('http://localhost:3002/api/productos/crear/nuevo', nuevoProducto, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            handleCloseModal();
            fetchProductos();
        } catch (error) {
            console.error('Error al crear nuevo producto', error);
            alert('Error al crear nuevo producto. Verifica la información e intenta nuevamente.');
        }
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            await axios.put(`http://localhost:3002/api/productos/actualizar/${productoAEditar.id}`, productoAEditar, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            handleCloseEditModal();
            fetchProductos();
        } catch (error) {
            console.error('Error al editar el producto', error);
            alert('Error al editar el producto. Verifica la información e intenta nuevamente.');
        }
    };

    const handleDelete = async () => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`http://localhost:3002/api/productos/eliminar/${productoAEliminar.id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            handleCloseDeleteConfirmModal();
            fetchProductos();
        } catch (error) {
            console.error('Error al eliminar el producto', error);
            alert('Error al eliminar el producto.');
        }
    };

    const fetchProductos = async () => {
        try {
            const token = localStorage.getItem('token');
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

    const filteredProductos = productos.filter(producto =>
        producto.codigo.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Cálculo de productos a mostrar en función de la página actual
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProductos.slice(indexOfFirstProduct, indexOfLastProduct);

    const totalPages = Math.ceil(filteredProductos.length / productsPerPage);

    const handlePrevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    return (
        <>
            <header className="header">
                <img src="../img/electrotech_color.png" alt="Tienda" className="store-image" />
                <div className="user-info">
                    <img src="../img/usuario.png" alt="Usuario" className="usr-icon" />
                    <select id="empleado" className="employee-select" onChange={handleSelectChange} value={userName}>
                        <option value={userName}>{userName}</option>
                        <option value="logout">Cerrar Sesión</option>
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
                            <input 
                                type="text" 
                                placeholder="Buscar producto por código..." 
                                className="search-input" 
                                value={searchTerm}
                                onChange={handleSearchChange} 
                            />
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
                                {currentProducts.map((producto) => (
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
                                            <button className="edit-button" onClick={() => handleOpenEditModal(producto)}>
                                                <img src="../img/edit.png" alt="Editar" />
                                            </button>
                                            <button className="delete-button" onClick={() => handleOpenDeleteConfirmModal(producto)}>
                                                <img src="../img/delete.png" alt="Eliminar" />
                                            </button>
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

                        {showEditModal && productoAEditar && (
                            <div className="modal-overlay">
                                <div className="modal-content">
                                    <img src="../img/edit.png" alt="Editar" className="modal-icon" />
                                    <h2>Editar Producto</h2>
                                    <form className="modal-form" onSubmit={handleEditSubmit}>
                                        <label>Nombre</label>
                                        <input type="text" name="nombre" value={productoAEditar.nombre} onChange={handleChange} required />
                                        <label>Descripción</label>
                                        <input type="text" name="descripcion" value={productoAEditar.descripcion} onChange={handleChange} required />
                                        <label>Código</label>
                                        <input type="text" name="codigo" value={productoAEditar.codigo} onChange={handleChange} required />
                                        <label>Modelo</label>
                                        <input type="text" name="modelo" value={productoAEditar.modelo} onChange={handleChange} required />
                                        <label>Fabricante</label>
                                        <input type="text" name="fabricante" value={productoAEditar.fabricante} onChange={handleChange} required />
                                        <label>Estado</label>
                                        <select name="estado" value={productoAEditar.estado} onChange={handleChange} required>
                                            <option value={true}>Disponible</option>
                                            <option value={false}>No Disponible</option>
                                        </select>
                                        <label>Precio</label>
                                        <input type="number" name="precio" value={productoAEditar.precio} onChange={handleChange} required />
                                        <div className="modal-buttons">
                                            <button type="button" onClick={handleCloseEditModal} className="close-button">Cerrar</button>
                                            <button type="submit" className="save-button">Actualizar Cambios</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        )}

                        {showDeleteConfirmModal && productoAEliminar && (
                            <div className="modal-overlay">
                                <div className="modal-content">
                                    <h2>Eliminar Producto</h2>
                                    <p>¿Estás seguro de que deseas eliminar el producto "{productoAEliminar.nombre}"?</p>
                                    <div className="modal-buttons">
                                        <button type="button" onClick={handleCloseDeleteConfirmModal} className="close-button">Cancelar</button>
                                        <button type="button" onClick={handleDelete} className="delete-button">Si</button>
                                    </div>
                                </div>
                            </div>
                        )}

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

                        {/* Paginación */}
                        <div className="pagination">
                            <button onClick={handlePrevPage} className="pagination-button"disabled={currentPage === 1}>Anterior</button>
                            <span>Pág {currentPage} de {totalPages}</span>
                            <button onClick={handleNextPage} className="pagination-button"disabled={currentPage === totalPages}>Siguiente</button>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
};

export default Productos;
