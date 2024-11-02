import React, { useState, useEffect, useRef } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import '../components/Cotizaciones.css';

const Cotizaciones = () => {
    const [showModal, setShowModal] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [showSendEmailConfirmModal, setShowSendEmailConfirmModal] = useState(false);
    const [showEmailSentSuccessModal, setShowEmailSentSuccessModal] = useState(false);
    const [showEditSuccessModal, setShowEditSuccessModal] = useState(false);
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
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // Add new state for error message
    const [errorMessage, setErrorMessage] = useState('');
    const [showErrorModal, setShowErrorModal] = useState(false);

    const itemsPerPage = 10;
    
    const navigate = useNavigate();
    const sidebarRef = useRef(null);

    // Función para obtener el precio de un producto
    const fetchProductPrice = async (productId) => {
        try {
            const response = await fetch(`https://electrotech-b7fmc9escsercwca.westus-01.azurewebsites.net/api/productos/obtener/${productId}`, {
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
            const response = await fetch('https://electrotech-b7fmc9escsercwca.westus-01.azurewebsites.net/api/cotizaciones/obtener/todo', {
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

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const closeSidebar = () => {
        setIsSidebarOpen(false);
    };

    const openEditModal = (cotizacion) => {
        setEditMode(true);
        setSelectedCotizacion(cotizacion);
        setIdCotizacion(cotizacion.id);
        setNuevoCliente(cotizacion.idCliente);
        
        // Normalizar los datos de los productos existentes
        const productosExistentes = cotizacion.DetalleCotizacions.map(producto => ({
            idProducto: producto.idProducto,
            cantidad: Math.floor(producto.cantidad), // Eliminar decimales
            descripcion: producto.descripcion,
            precioUnitario: Math.floor(producto.precioUnitario), // Eliminar decimales
            subtotal: Math.floor(producto.subtotal) // Eliminar decimales
        }));
        
        setProductos(productosExistentes);
        
        // Normalizar los precios
        const prices = {};
        cotizacion.DetalleCotizacions.forEach(producto => {
            prices[producto.idProducto] = Math.floor(producto.precioUnitario);
        });
        setProductPrices(prices);
        
        setShowModal(true);
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

    // Modified handleChangeProducto to check for duplicates
    const handleChangeProducto = async (index, field, value) => {
        const updatedProductos = [...productos];
    
        if (field === 'idProducto' && value) {
            const newProductId = value.toString();
    
            // Verificar duplicados en TODOS los productos (existentes y nuevos)
            const isDuplicate = productos.some((producto, idx) => idx !== index && producto.idProducto?.toString() === newProductId);
            if (isDuplicate) {
                setErrorMessage('Este producto ya existe en la cotización. Por favor, modifica la cantidad del producto existente en lugar de agregar uno nuevo.');
                setShowErrorModal(true);
                updatedProductos[index].idProducto = '';
                setProductos(updatedProductos);
                return;
            }
    
            setErrorMessage('');
            setShowErrorModal(false);
    
            // Obtener el precio del nuevo producto
            const precio = await fetchProductPrice(value);
            updatedProductos[index] = {
                ...updatedProductos[index],
                idProducto: value,
                precioUnitario: Math.floor(precio),
                subtotal: Math.floor(precio * (updatedProductos[index].cantidad || 0)) // Multiplica por cantidad existente o por 1 si no hay
            };
            setProductPrices(prev => ({ ...prev, [value]: Math.floor(precio) }));
        } else if (field === 'cantidad') {
            const cantidad = parseInt(value) || updatedProductos[index].cantidad || 0; // Mantener cantidad actual o asignar 1 si no es válida
            const precioUnitario = updatedProductos[index].precioUnitario;
    
            // Actualizar siempre la cantidad y el subtotal
            updatedProductos[index] = {
                ...updatedProductos[index],
                cantidad: cantidad,
                subtotal: precioUnitario ? Math.floor(precioUnitario * cantidad) : updatedProductos[index].subtotal
            };
        } else {
            updatedProductos[index][field] = value;
        }
    
        // Crear una nueva referencia de array para forzar actualización
        setProductos([...updatedProductos]);
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
                ? `https://electrotech-b7fmc9escsercwca.westus-01.azurewebsites.net/api/cotizaciones/actualizar/${idCotizacion}`
                : 'https://electrotech-b7fmc9escsercwca.westus-01.azurewebsites.net/api/cotizaciones/crear/nuevo';

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
                setShowEditSuccessModal(true);  // Show the edit success modal
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
                const response = await fetch(`https://electrotech-b7fmc9escsercwca.westus-01.azurewebsites.net/api/cotizaciones/eliminar/${selectedCotizacion.id}`, {
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

    const handleSendEmailConfirm = (idCotizacion) => {
        setSelectedCotizacion(idCotizacion);
        setShowSendEmailConfirmModal(true);
    };
    
    const handleSendEmail = async (idCotizacion) => {
        try {
            const response = await fetch(`https://electrotech-b7fmc9escsercwca.westus-01.azurewebsites.net/api/cotizaciones/enviar/correo/${idCotizacion}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (response.ok) {
                setShowEmailSentSuccessModal(true);
            } else {
                const data = await response.json();
                alert(`Error al enviar el correo: ${data.mensaje}`);
            }
        } catch (error) {
            console.error("Error al enviar el correo:", error);
            alert("Hubo un problema al enviar el correo.");
        } finally {
            setShowSendEmailConfirmModal(false);
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

    // Detectar clic fuera del menú para cerrarlo
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
                setIsSidebarOpen(false);
            }
        };

        if (isSidebarOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isSidebarOpen]);

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
                <button className="menu-toggle" onClick={toggleSidebar}>
                    ☰
                </button>
            </header>
            <div className="container">
            <nav ref={sidebarRef} className={`sidebar ${isSidebarOpen ? 'active' : ''}`}>
                    <Link to="/ControlPanel" onClick={closeSidebar}>
                        <button className="sidebar-button"><img src="../img/inicio.png" alt="Inicio" /> Inicio</button>
                    </Link>
                    <Link to="/Cotizaciones" onClick={closeSidebar}>
                        <button className="sidebar-button active"><img src="../img/cotizaciones.png" alt="Cotizaciones" /> Cotizaciones</button>
                    </Link>
                    <Link to="/Clientes" onClick={closeSidebar}>
                        <button className="sidebar-button"><img src="../img/usuario.png" alt="Clientes" /> Clientes</button>
                    </Link>
                    <Link to="/Productos" onClick={closeSidebar}>
                        <button className="sidebar-button"><img src="../img/productos1.png" alt="Productos" /> Productos</button>
                    </Link>
                    <Link to="/Usuarios" onClick={closeSidebar}>
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

                        {/* Single Modal for Create/Edit */}
                        {showModal && (
                            <div className="modal-overlay">
                                <div className="modal-content">
                                    <img src="../img/add.png" alt="Agregar" className="modal-icon" />
                                    <h2>{editMode ? 'Editar Cotización' : 'Nueva Cotización'}</h2>
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
                            value={producto.idProducto || ''}
                            onChange={(e) => handleChangeProducto(index, 'idProducto', e.target.value)}
                            required
                        />
                    </td>
                    <td>
                        <input
                            type="number"
                            placeholder="Cantidad"
                            value={producto.cantidad || ''}
                            onChange={(e) => handleChangeProducto(index, 'cantidad', e.target.value)}
                            required
                        />
                    </td>
                    <td>${producto.subtotal || 0}</td>
                    <td>
                        <input
                            type="text"
                            placeholder="Descripción"
                            value={producto.descripcion || ''}
                            onChange={(e) => handleChangeProducto(index, 'descripcion', e.target.value)}
                        />
                    </td>
                    <td>
                        <button 
                            type="button"
                            className="delete-button"
                            onClick={() => handleEliminarProducto(index)}
                        >
                            <img src="../img/delete.png" alt="Eliminar" />
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
                                            <button type="button" onClick={handleCloseModal} className="close-button">
                                                Cerrar
                                            </button>
                                            <button type="submit" className="add-product-button">
                                                {editMode ? 'Actualizar' : 'Guardar'} Cotización
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        )}

                        {/* Error Modal */}
                        {showErrorModal && (
                            <div className="modal-overlay" style={{ zIndex: 1100 }}>
                                <div className="modal-content" style={{ maxWidth: '400px' }}>
                                    <h2>Error</h2>
                                    <div style={{
                                        color: 'red',
                                        padding: '15px',
                                        marginBottom: '15px',
                                        borderRadius: '4px',
                                        backgroundColor: '#ffe6e6',
                                        textAlign: 'center'
                                    }}>
                                        {errorMessage}
                                    </div>
                                    <div className="modal-buttons">
                                        <button 
                                            onClick={() => setShowErrorModal(false)} 
                                            className="close-button"
                                            style={{ width: '100%' }}
                                        >
                                            Entendido
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Delete Confirmation Modal */}
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

                        {/* Confirm Send Email Modal */}
                        {showSendEmailConfirmModal && (
                            <div className="modal-overlay">
                                <div className="modal-content">
                                    <h2>Confirmar Envío de Correo</h2>
                                    <p>¿Estás seguro de que deseas enviar el correo para la cotización {selectedCotizacion}?</p>
                                    <div className="modal-buttons">
                                        <button onClick={() => setShowSendEmailConfirmModal(false)} className="close-button">Cancelar</button>
                                        <button onClick={handleSendEmail} className="send-button">Enviar</button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Email Sent Success Modal */}
                        {showEmailSentSuccessModal && (
                            <div className="modal-overlay">
                                <div className="modal-content">
                                    <h2>Correo Enviado</h2>
                                    <p>El correo ha sido enviado exitosamente.</p>
                                    <button onClick={() => setShowEmailSentSuccessModal(false)} className="close-button">Cerrar</button>
                                </div>
                            </div>
                        )}

                        {/* Edit Success Modal */}
                        {showEditSuccessModal && (
                            <div className="modal-overlay">
                                <div className="modal-content">
                                    <h2>Edición Exitosa</h2>
                                    <p>La cotización ha sido actualizada con éxito.</p>
                                    <button onClick={() => setShowEditSuccessModal(false)} className="close-button">Cerrar</button>
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
