import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../components/Clientes.css';

const Clientes = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);
    const [showLogoutConfirmModal, setShowLogoutConfirmModal] = useState(false);
    const [clientes, setClientes] = useState([]);
    const [nuevoCliente, setNuevoCliente] = useState({
        nombre: '',
        direccion: '',
        correoElectronico: '',
        telefono: '',
        DPI: '',
        fechaIngreso: new Date().toISOString().split('T')[0],
    });
    
    const [clienteAEditar, setClienteAEditar] = useState(null);
    const [clienteAEliminar, setClienteAEliminar] = useState(null);
    const [userName, setUserName] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const [searchTerm, setSearchTerm] = useState(''); // Estado para el término de búsqueda
    
    const sidebarRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUserName = localStorage.getItem('userName');
        setUserName(storedUserName || 'Usuario');
        fetchClientes();
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
        setNuevoCliente({
            nombre: '',
            direccion: '',
            correoElectronico: '',
            telefono: '',
            DPI: '',
            fechaIngreso: new Date().toISOString().split('T')[0],
        });
    };

    const handleOpenEditModal = (cliente) => {
        setClienteAEditar(cliente);
        setShowEditModal(true);
    };

    const handleCloseEditModal = () => {
        setShowEditModal(false);
        setClienteAEditar(null);
    };

    const handleOpenDeleteConfirmModal = (cliente) => {
        setClienteAEliminar(cliente);
        setShowDeleteConfirmModal(true);
    };

    const handleCloseDeleteConfirmModal = () => {
        setShowDeleteConfirmModal(false);
        setClienteAEliminar(null);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (clienteAEditar) {
            setClienteAEditar({ ...clienteAEditar, [name]: value });
        } else {
            setNuevoCliente({ ...nuevoCliente, [name]: value });
        }
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value); // Actualizar el término de búsqueda
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const closeSidebar = () => {
        setIsSidebarOpen(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            await axios.post('http://localhost:3002/api/clientes/crear/nuevo', nuevoCliente, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            handleCloseModal();
            fetchClientes();
        } catch (error) {
            console.error('Error al crear nuevo cliente', error);
            alert('Error al crear nuevo cliente. Verifica la información e intenta nuevamente.');
        }
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            await axios.put(`http://localhost:3002/api/clientes/actualizar/${clienteAEditar.id}`, clienteAEditar, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            handleCloseEditModal();
            fetchClientes();
        } catch (error) {
            console.error('Error al editar cliente', error);
            alert('Error al editar cliente. Verifica la información e intenta nuevamente.');
        }
    };

    const handleDelete = async () => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`http://localhost:3002/api/clientes/eliminar/${clienteAEliminar.id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            handleCloseDeleteConfirmModal();
            fetchClientes();
        } catch (error) {
            console.error('Error al eliminar cliente', error);
            alert('Error al eliminar cliente.');
        }
    };

    const fetchClientes = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:3002/api/clientes/obtener/todos', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setClientes(response.data);
        } catch (error) {
            console.error('Error al obtener los clientes', error);
            alert('Error al obtener la lista de clientes.');
        }
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const filteredClientes = clientes.filter(cliente => 
        cliente.nombre.toLowerCase().includes(searchTerm.toLowerCase()) // Filtrar por nombre
    );
    
    const totalPages = Math.ceil(clientes.length / itemsPerPage);
    const startIdx = (currentPage - 1) * itemsPerPage;
    const currentClientes = filteredClientes.slice(startIdx, startIdx + itemsPerPage);

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
                        <button className="sidebar-button"><img src="../img/cotizaciones.png" alt="Cotizaciones" /> Cotizaciones</button>
                    </Link>
                    <Link to="/Clientes" onClick={closeSidebar}>
                        <button className="sidebar-button active"><img src="../img/usuario.png" alt="Clientes" /> Clientes</button>
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
                        <img src="../img/usuario.png" alt="Clientes" className="main-icon" /> / Clientes
                    </div>
                    <h2 className="panel-title">Gestión de Clientes</h2>
                    <div className="config-container">
                        <div className="search-container full-width">
                            <img src="../img/search.png" alt="Buscar" className="search-icon" />
                            <input 
                                type="text" 
                                placeholder="Buscar Clientes..." 
                                className="search-input" 
                                value={searchTerm} 
                                onChange={handleSearchChange} // Manejar el cambio de búsqueda
                            />
                            <button className='new-user-button' onClick={handleOpenModal}>+ Nuevo Cliente</button>
                        </div>

                        <table className="user-table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Nombre</th>
                                    <th>Dirección</th>
                                    <th>Correo Electrónico</th>
                                    <th>Número de Teléfono</th>
                                    <th>No. Identificación</th>
                                    <th>Fecha de Ingreso</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                            {currentClientes.map((cliente) => (
                                <tr key={cliente.id}>
                                    <td>{cliente.id}</td>
                                    <td>{cliente.nombre}</td>
                                    <td>{cliente.direccion}</td>
                                    <td>{cliente.correoElectronico}</td>
                                    <td>{cliente.telefono}</td>
                                    <td>{cliente.DPI}</td>
                                    <td>{new Date(cliente.fechaIngreso).toLocaleDateString()}</td>
                                    <td className="action-buttons">
                                        <button className="edit-button" onClick={() => handleOpenEditModal(cliente)}>
                                            <img src="../img/edit.png" alt="Editar" />
                                        </button>
                                        <button className="delete-button" onClick={() => handleOpenDeleteConfirmModal(cliente)}>
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
                                    <h2>Agregar Nuevo Cliente</h2>
                                    <form className="modal-form" onSubmit={handleSubmit}>
                                        <label>Nombre del Cliente</label>
                                        <input type="text" name="nombre" value={nuevoCliente.nombre} onChange={handleChange} placeholder="Nombre del Cliente" required />
                                        <label>Dirección</label>
                                        <input type="text" name="direccion" value={nuevoCliente.direccion} onChange={handleChange} placeholder="Dirección" required />
                                        <label>Correo Electrónico</label>
                                        <input type="email" name="correoElectronico" value={nuevoCliente.correoElectronico} onChange={handleChange} placeholder="Correo Electrónico" required />
                                        <label>Número de Teléfono</label>
                                        <input type="tel" name="telefono" value={nuevoCliente.telefono} onChange={handleChange} placeholder="Número de Teléfono" required />
                                        <label>No. Identificación</label>
                                        <input type="text" name="DPI" value={nuevoCliente.DPI} onChange={handleChange} placeholder="No. Identificación" required />
                                        <label>Fecha de Ingreso</label>
                                        <input type="date" name="fechaIngreso" value={nuevoCliente.fechaIngreso} onChange={handleChange} required />
                                        <div className="modal-buttons">
                                            <button type="button" onClick={handleCloseModal} className="close-button">Cancelar</button>
                                            <button type="submit" className="save-button">Guardar</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        )}

                        {showEditModal && clienteAEditar && (
                            <div className="modal-overlay">
                                <div className="modal-content">
                                    <img src="../img/edit.png" alt="Editar" className="modal-icon" />
                                    <h2>Editar Cliente</h2>
                                    <form className="modal-form" onSubmit={handleEditSubmit}>
                                        <label>Nombre del Cliente</label>
                                        <input type="text" name="nombre" value={clienteAEditar.nombre} onChange={handleChange} required />
                                        <label>Dirección</label>
                                        <input type="text" name="direccion" value={clienteAEditar.direccion} onChange={handleChange} required />
                                        <label>Correo Electrónico</label>
                                        <input type="email" name="correoElectronico" value={clienteAEditar.correoElectronico} onChange={handleChange} required />
                                        <label>Número de Teléfono</label>
                                        <input type="tel" name="telefono" value={clienteAEditar.telefono} onChange={handleChange} required />
                                        <label>No. Identificación</label>
                                        <input type="text" name="DPI" value={clienteAEditar.DPI} onChange={handleChange} required />
                                        <label>Fecha de Ingreso</label>
                                        <input type="date" name="fechaIngreso" value={clienteAEditar.fechaIngreso.split('T')[0]} onChange={handleChange} required />
                                        <div className="modal-buttons">
                                            <button type="button" onClick={handleCloseEditModal} className="close-button">Cancelar</button>
                                            <button type="submit" className="save-button">Actualizar</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        )}

                        {showDeleteConfirmModal && (
                            <div className="modal-overlay">
                                <div className="modal-content">
                                    <h2>Confirmar Eliminación</h2>
                                    <p>¿Estás seguro de que deseas eliminar a {clienteAEliminar.nombre}?</p>
                                    <div className="modal-buttons">
                                        <button type="button" onClick={handleCloseDeleteConfirmModal} className="close-button">Cancelar</button>
                                        <button onClick={handleDelete} className="delete-button">Si</button>
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

                        {/* Controles de Paginación */}
                        <div className="pagination">
                            <button 
                                className={`pagination-button ${currentPage === 1 ? 'disabled' : ''}`} 
                                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                disabled={currentPage === 1}
                            >
                                Anterior
                            </button>
                            <span>Pág {currentPage} de {totalPages}</span>
                            <button 
                                className={`pagination-button ${currentPage === totalPages ? 'disabled' : ''}`} 
                                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                disabled={currentPage === totalPages}
                            >
                                Siguiente
                            </button>
                        </div>

                    </div>
                </main>
            </div>
        </>
    );
};

export default Clientes;
