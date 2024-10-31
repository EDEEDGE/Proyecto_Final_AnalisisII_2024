import React, { useState, useEffect } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import '../components/Cotizaciones.css';

const Cotizaciones = () => {
    const [showModal, setShowModal] = useState(false);
    const [showLogoutConfirmModal, setShowLogoutConfirmModal] = useState(false);
    const [cotizaciones, setCotizaciones] = useState([]);
    const [nuevoCliente, setNuevoCliente] = useState('');
    const [productos, setProductos] = useState([{ idProducto: '', cantidad: '', descripcion: '', subtotal: 0 }]);
    const [idCotizacion, setIdCotizacion] = useState(null);
    const [userName, setUserName] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const navigate = useNavigate();

    const fetchCotizaciones = async () => {
        try {
            const response = await fetch('http://localhost:3002/api/cotizaciones/obtener/todo', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            const data = await response.json();

            if (Array.isArray(data)) {
                setCotizaciones(data);
            } else {
                console.error("La respuesta de la API no es un array:", data);
                setCotizaciones([]);
            }
        } catch (error) {
            console.error("Error al obtener cotizaciones:", error);
            setCotizaciones([]);
        }
    };

    useEffect(() => {
        const storedUserName = localStorage.getItem('userName');
        setUserName(storedUserName || 'Usuario');
        fetchCotizaciones();
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
        setIdCotizacion(Date.now()); // Genera un nuevo ID para la cotización al abrir el modal
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setNuevoCliente('');
        setProductos([{ idProducto: '', cantidad: '', descripcion: '', subtotal: 0 }]);
    };

    const handleAgregarProducto = () => {
        const nuevoProducto = { idProducto: '', cantidad: '', descripcion: '', subtotal: 0 };
        setProductos([...productos, nuevoProducto]);
    };

    const handleChangeProducto = (index, field, value) => {
        const updatedProductos = [...productos];
        updatedProductos[index][field] = value;

        // Actualiza el subtotal basado en la cantidad
        if (field === 'cantidad') {
            const precioUnitario = 100; // Cambia esto según tu lógica de precios
            updatedProductos[index].subtotal = value ? precioUnitario * value : 0;
        }

        setProductos(updatedProductos);
    };

    const handleEliminarProducto = (index) => {
        const updatedProductos = productos.filter((_, i) => i !== index);
        setProductos(updatedProductos);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const nuevaCotizacion = { idCliente: nuevoCliente, idCotizacion, productos };

        try {
            const response = await fetch('http://localhost:3002/api/cotizaciones/crear/nuevo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(nuevaCotizacion)
            });
            const data = await response.json();
            if (response.ok) {
                alert('Cotización creada con éxito');
                handleCloseModal();
                fetchCotizaciones(); // Vuelve a obtener las cotizaciones
            } else {
                alert(data.mensaje);
            }
        } catch (error) {
            console.error("Error al crear cotización:", error);
        }
    };

    const totalPages = Math.ceil(cotizaciones.length / itemsPerPage);
    const currentItems = cotizaciones.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
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
                        <button className="sidebar-button active"><img src="../img/cotizaciones.png" alt="Cotizaciones" /> Cotizaciones</button>
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
                        <img src="../img/cotizaciones.png" alt="Cotizaciones" className="main-icon" /> / Cotizaciones
                    </div>
                    
                    <h2 className="panel-title">Gestión de Cotizaciones</h2>
                    <div className="config-container">
                        <div className="search-container full-width">
                            <img src="../img/search.png" alt="Buscar" className="search-icon" />
                            <input type="text" placeholder="Buscar Cotizaciones..." className="search-input" />
                            <button className='new-quote-button' onClick={handleOpenModal}>+ Nueva Cotización</button>
                        </div>

                        <table className="quote-table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Fecha</th>
                                    <th>Total</th>
                                    <th>ID Cliente</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentItems.map(cotizacion => (
                                    <tr key={cotizacion.id}>
                                        <td>{cotizacion.id}</td>
                                        <td>{new Date(cotizacion.fecha).toLocaleDateString()}</td>
                                        <td>${cotizacion.total}</td>
                                        <td>{cotizacion.idCliente}</td>
                                        <td className="action-buttons">
                                            <button className="edit-button"><img src="../img/edit.png" alt="Editar" /></button>
                                            <button className="delete-button"><img src="../img/delete.png" alt="Eliminar" /></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <div className="pagination">
                            <button className="pagination-button" onClick={handlePreviousPage} disabled={currentPage === 1}>Ant</button>
                            <span>{currentPage}</span>
                            <button className="pagination-button" onClick={handleNextPage} disabled={currentPage === totalPages}>Sig</button>
                        </div>

                        {showModal && (
                            <div className="modal-overlay">
                                <div className="modal-content">
                                    <img src="../img/add.png" alt="Agregar" className="modal-icon" />
                                    <h2>Agregar Nueva Cotización</h2>
                                    <form className="modal-form" onSubmit={handleSubmit}>
                                        <label>Cliente</label>
                                        <input
                                            type="text"
                                            value={nuevoCliente}
                                            onChange={(e) => setNuevoCliente(e.target.value)}
                                            placeholder="ID Cliente"
                                            required
                                        />
                                        <div>
                                            <h3>Productos</h3>
                                            <table className="details-table">
                                                <thead>
                                                    <tr>
                                                        <th>ID Producto</th>
                                                        <th>Cantidad</th>
                                                        <th>Subtotal</th>
                                                        <th>Descripción</th>
                                                        <th>Eliminar</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {productos.map((producto, index) => (
                                                        <tr key={index}>
                                                            <td>
                                                                <input
                                                                    type="text"
                                                                    placeholder="ID Producto"
                                                                    value={producto.idProducto}
                                                                    onChange={(e) => handleChangeProducto(index, 'idProducto', e.target.value)}
                                                                    required
                                                                />
                                                            </td>
                                                            <td>
                                                                <input
                                                                    type="number"
                                                                    placeholder="Cantidad"
                                                                    value={producto.cantidad}
                                                                    onChange={(e) => handleChangeProducto(index, 'cantidad', e.target.value)}
                                                                    required
                                                                />
                                                            </td>
                                                            <td>${producto.subtotal}</td>
                                                            <td>
                                                                <input
                                                                    type="text"
                                                                    placeholder="Descripción"
                                                                    value={producto.descripcion}
                                                                    onChange={(e) => handleChangeProducto(index, 'descripcion', e.target.value)}
                                                                />
                                                            </td>
                                                            <td>
                                                                <button className="delete-button">
                                                                    <img src="../img/delete.png" onClick={() => handleEliminarProducto(index)}></img>
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                            <button type="button" className="new-quote-button"onClick={handleAgregarProducto}>Agregar Otro Producto</button>
                                        </div>
                                        <div className="modal-buttons">
                                            <button type="button" onClick={handleCloseModal} className="close-button">Cerrar</button>
                                            <button type="submit" className="add-product-button">Guardar Cotización</button>
                                        </div>
                                    </form>
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

                    </div>
                </main>
            </div>
        </>
    );
};

export default Cotizaciones;
