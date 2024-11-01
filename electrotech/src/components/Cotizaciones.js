import React, { useState, useEffect } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import '../components/Cotizaciones.css';

const Cotizaciones = () => {
    const [showModal, setShowModal] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [showLogoutConfirmModal, setShowLogoutConfirmModal] = useState(false);
    const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);
    const [selectedCotizacion, setSelectedCotizacion] = useState(null);
    const [cotizaciones, setCotizaciones] = useState([]);
    const [nuevoCliente, setNuevoCliente] = useState('');
    const [productos, setProductos] = useState([]); // Productos de la cotización actual
    const [idCotizacion, setIdCotizacion] = useState(null);
    const [userName, setUserName] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [productPrices, setProductPrices] = useState({});
    const itemsPerPage = 10;
    const navigate = useNavigate();

    // Función para obtener el precio de un producto
    const fetchProductPrice = async (productId) => {
        try {
            const response = await fetch(`http://localhost:3002/api/productos/obtener/${productId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            const data = await response.json();
            if (response.ok) {
                return data.precio; // Asumiendo que el API retorna un objeto con una propiedad 'precio'
            } else {
                console.error('Error al obtener el precio del producto:', data);
                return 0;
            }
        } catch (error) {
            console.error('Error al obtener el precio del producto:', error);
            return 0;
        }
    };

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

    const openEditModal = (cotizacion) => {
        setEditMode(true);
        setIdCotizacion(cotizacion.id); // Guarda el ID de la cotización
        setNuevoCliente(cotizacion.idCliente); // Carga el ID del cliente
        console.log("Productos de la cotización:", cotizacion.DetalleCotizacions); // Verifica que los productos existan
        setProductos(cotizacion.DetalleCotizacions || []); // Carga los productos existentes
        setShowModal(true); // Abre el modal
    };

    const handleOpenModal = () => {
        setEditMode(false);
        setIdCotizacion(Date.now());
        setNuevoCliente('');
        setProductos([{ idProducto: '', cantidad: '', descripcion: '', subtotal: 0 }]);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setNuevoCliente('');
        setProductos([{ idProducto: '', cantidad: '', descripcion: '', subtotal: 0 }]);
        setEditMode(false);
    };

    const handleAgregarProducto = () => {
        setProductos([...productos, { idProducto: '', cantidad: '', descripcion: '', subtotal: 0 }]);
    };

     // Actualizar handleChangeProducto para manejar la obtención del precio
     const handleChangeProducto = async (index, field, value) => {
        const updatedProductos = [...productos];
        updatedProductos[index][field] = value;

        if (field === 'idProducto' && value) {
            // Si ya tenemos el precio en cache, usarlo
            if (productPrices[value]) {
                const precio = productPrices[value];
                updatedProductos[index].precioUnitario = precio;
                updatedProductos[index].subtotal = precio * (updatedProductos[index].cantidad || 0);
            } else {
                // Si no está en cache, obtenerlo de la API
                const precio = await fetchProductPrice(value);
                setProductPrices(prev => ({ ...prev, [value]: precio }));
                updatedProductos[index].precioUnitario = precio;
                updatedProductos[index].subtotal = precio * (updatedProductos[index].cantidad || 0);
            }
        } else if (field === 'cantidad' && value) {
            const precio = updatedProductos[index].precioUnitario || 0;
            updatedProductos[index].subtotal = precio * value;
        }

        setProductos(updatedProductos);
    };

    // Eliminar un producto específico
    const handleEliminarProducto = (index) => {
        const updatedProductos = productos.filter((_, i) => i !== index);
        setProductos(updatedProductos);
    };

    // Guardar o actualizar una cotización
    const handleSubmit = async (event) => {
        event.preventDefault();
        const cotizacionData = { idCliente: nuevoCliente, idCotizacion, productos };

        try {
            const url = editMode
                ? `http://localhost:3002/api/cotizaciones/actualizar/${idCotizacion}`
                : 'http://localhost:3002/api/cotizaciones/crear/nuevo';

            const response = await fetch(url, {
                method: editMode ? 'PUT' : 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(cotizacionData)
            });

            const data = await response.json();
            if (response.ok) {
                alert(`Cotización ${editMode ? 'actualizada' : 'creada'} con éxito`);
                handleCloseModal();
                fetchCotizaciones();
            } else {
                alert(data.mensaje);
            }
        } catch (error) {
            console.error(`Error al ${editMode ? 'actualizar' : 'crear'} cotización:`, error);
        }
    };

    const openDeleteConfirmModal = (cotizacion) => {
        setSelectedCotizacion(cotizacion);
        setShowDeleteConfirmModal(true);
    };

    const closeDeleteConfirmModal = () => {
        setSelectedCotizacion(null);
        setShowDeleteConfirmModal(false);
    };

    const handleEliminarCotizacion = async () => {
        if (selectedCotizacion) {
            try {
                const response = await fetch(`http://localhost:3002/api/cotizaciones/eliminar/${selectedCotizacion.id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });

                if (response.ok) {
                    
                    fetchCotizaciones(); // Actualiza la lista de cotizaciones
                } else {
                    alert("Error al eliminar la cotización");
                }
            } catch (error) {
                console.error("Error al eliminar cotización:", error);
            }
            closeDeleteConfirmModal();
        }
    };

    const handleSendEmail = async (idCotizacion) => {
        try {
            const response = await fetch(`http://localhost:3002/api/cotizaciones/enviar/correo/${idCotizacion}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (response.ok) {
                alert("Correo enviado exitosamente.");
            } else {
                const data = await response.json();
                alert(`Error al enviar el correo: ${data.mensaje}`);
            }
        } catch (error) {
            console.error("Error al enviar el correo:", error);
            alert("Hubo un problema al enviar el correo.");
        }
    };
    

    const totalPages = Math.ceil(cotizaciones.length / itemsPerPage);
    // Filtrar cotizaciones por ID según el término de búsqueda
    const filteredCotizaciones = cotizaciones.filter(cotizacion => 
        cotizacion.id.toString().includes(searchTerm)
    );
    const currentItems = filteredCotizaciones.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

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
                            <input 
                                type="text" 
                                placeholder="Buscar Cotizaciones por ID..." 
                                className="search-input" 
                                value={searchTerm} 
                                onChange={(e) => setSearchTerm(e.target.value)} // Actualiza el término de búsqueda
                            />
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
                                            <button className="edit-button" onClick={() => openEditModal(cotizacion)}>
                                                <img src="../img/edit.png" alt="Editar" />
                                            </button>
                                            <button className="email-button" onClick={() => handleSendEmail(cotizacion.id)}>
                                                <img src="../img/email.png" alt="Enviar Correo" />
                                            </button>
                                            <button className="delete-button" onClick={() => openDeleteConfirmModal(cotizacion)}>
                                                <img src="../img/delete.png" alt="Eliminar" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {/* Modal para crear/editar cotización */}
                        {showModal && (
                            <div className="modal-overlay">
                                <div className="modal-content">
                                    <img src="../img/add.png" alt="Agregar" className="modal-icon" />
                                    <h2>{editMode ? 'Editar Cotización' : 'Editar Cotizacion'}</h2>
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
                                                                <button className="delete-button" onClick={() => handleEliminarProducto(index)}>
                                                                    <img src="../img/delete.png" alt="Eliminar Producto" />
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                            <button type="button" className="new-quote-button" onClick={handleAgregarProducto}>
                                                Agregar Otro Producto
                                            </button>
                                        </div>
                                        <div className="modal-buttons">
                                            <button type="button" onClick={handleCloseModal} className="close-button">Cerrar</button>
                                            <button type="submit" className="add-product-button">{editMode ? 'Actualizar' : 'Guardar'} Cotización</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        )}

                        {/* Modal de confirmación de eliminación */}
                        {showDeleteConfirmModal && (
                            <div className="modal-overlay">
                                <div className="modal-content">
                                    <h2>Confirmar eliminación</h2>
                                    <p>¿Estás seguro que deseas eliminar a "{selectedCotizacion.id}"?</p>
                                    <div className="modal-buttons">
                                        <button onClick={closeDeleteConfirmModal} className="close-button">Cancelar</button>
                                        <button onClick={handleEliminarCotizacion} className="delete-button">Sí</button>
                                    </div>
                                </div>
                            </div>
                        )}

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
                        
                        <div className="pagination">
                            <button onClick={handlePreviousPage} className="pagination-button" disabled={currentPage === 1}>Anterior</button>
                            <span> Pág {currentPage} de {totalPages}</span>
                            <button onClick={handleNextPage} className="pagination-button" disabled={currentPage === totalPages}>Siguiente</button>
                        </div>

                    </div>
                </main>
            </div>
        </>
    );
};

export default Cotizaciones;
