import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../components/Usuarios.css';

const Usuarios = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);
    const [nombre, setNombre] = useState('');
    const [credenciales, setCredenciales] = useState('');
    const [usuarios, setUsuarios] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [userName, setUserName] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [editUserId, setEditUserId] = useState(null);
    const [deleteUserId, setDeleteUserId] = useState(null);
    const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
    const [confirmationMessage, setConfirmationMessage] = useState('');
    const [isRedirectModalOpen, setIsRedirectModalOpen] = useState(false);
    const [redirectMessage, setRedirectMessage] = useState('');
    
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [currentUserId, setCurrentUserId] = useState(null); // To track current user's ID

    const usersPerPage = 10;
    const sidebarRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUserName = localStorage.getItem('userName');
        setUserName(storedUserName || 'Usuario');

        // Fetch current user ID based on token or userName
        const fetchCurrentUserId = async () => {
            try {
                const response = await fetch('http://localhost:3002/api/usuarios/obtenerIdActual', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                const data = await response.json();
                setCurrentUserId(data.id); // Assuming the response has the user's ID
            } catch (error) {
                console.error('Error fetching current user ID:', error);
            }
        };

        const fetchUsuarios = async () => {
            try {
                const response = await fetch('http://localhost:3002/api/usuarios/obtenerUsuarios', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                const data = await response.json();
                setUsuarios(data);
            } catch (error) {
                console.error('Error al obtener usuarios:', error);
            }
        };

        fetchCurrentUserId();
        fetchUsuarios();
    }, []);

    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleOpenEditModal = (usuario) => {
        setNombre(usuario.nombre);
        setEditUserId(usuario.id);
        setShowEditModal(true);
    };

    const handleCloseEditModal = () => {
        setShowEditModal(false);
        setNombre(''); // Resetear el nombre
        setEditUserId(null); // Resetear el id del usuario
    };

    const handleOpenDeleteConfirmModal = (usuarioId) => {
        setDeleteUserId(usuarioId);
        setShowDeleteConfirmModal(true);
    };

    const handleCloseDeleteConfirmModal = () => {
        setShowDeleteConfirmModal(false);
        setDeleteUserId(null); // Resetear el id del usuario
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3002/api/usuarios/registrar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nombre, credenciales }),
            });
            const data = await response.json();
            console.log('Usuario agregado:', data);
            setUsuarios(prev => [...prev, { id: data.usuario.id, nombre }]);
            setNombre('');
            setCredenciales('');
            handleCloseModal();
        } catch (error) {
            console.error('Error al agregar usuario:', error);
        }
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        const isEditingSelf = editUserId === currentUserId;
    
        const body = isEditingSelf 
            ? { nombre, credenciales: newPassword, currentPassword }
            : { nombre, credenciales: newPassword };
    
        try {
            const response = await fetch(`http://localhost:3002/api/usuarios/editar/${editUserId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(body),
            });
    
            const data = await response.json();
            console.log('Respuesta del servidor al editar:', data);
    
            if (data.mensaje === 'Usuario actualizado correctamente...') {
                setUsuarios((prevUsuarios) => 
                    prevUsuarios.map((usuario) =>
                        usuario.id === editUserId ? { ...usuario, nombre: data.usuario.nombre } : usuario
                    )
                );
    
                handleCloseEditModal();
                
                if (isEditingSelf) {
                    setRedirectMessage("Has actualizado tu contraseña. Por favor, inicia sesión nuevamente.");
                    setIsRedirectModalOpen(true); // Abre el modal de redirección
                } else {
                    setConfirmationMessage('Usuario editado correctamente.');
                    setIsConfirmationModalOpen(true); // Abre el modal de confirmación
                }
            } else {
                console.error('Error al editar usuario:', data.mensaje);
                alert(data.mensaje);
            }
        } catch (error) {
            console.error('Error en la solicitud de edición:', error);
            alert('Hubo un problema con la conexión al servidor.');
        }
    };    
    
    const handleDeleteUser = async () => {
        try {
            await fetch(`http://localhost:3002/api/usuarios/eliminar/${deleteUserId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            console.log('Usuario eliminado:', deleteUserId);
            setUsuarios(prev => prev.filter(usuario => usuario.id !== deleteUserId));
            handleCloseDeleteConfirmModal();
        } catch (error) {
            console.error('Error al eliminar usuario:', error);
        }
    };

    const handleSelectChange = (e) => {
        const selectedValue = e.target.value;
        if (selectedValue === 'cerrar-sesion') {
            localStorage.removeItem('token');
            localStorage.removeItem('userName');
            navigate('/login');
        }
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
    };

    const filteredUsuarios = usuarios.filter(usuario =>
        usuario.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsuarios = filteredUsuarios.slice(indexOfFirstUser, indexOfLastUser);

    const totalPages = Math.ceil(filteredUsuarios.length / usersPerPage);

    const handlePrevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const closeSidebar = () => {
        setIsSidebarOpen(false);
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
                        <option value="cerrar-sesion">Cerrar Sesión</option>
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
                        <button className="sidebar-button"><img src="../img/usuario.png" alt="Clientes" /> Clientes</button>
                    </Link>
                    <Link to="/Productos" onClick={closeSidebar}>
                        <button className="sidebar-button"><img src="../img/productos1.png" alt="Productos" /> Productos</button>
                    </Link>
                    <Link to="/Usuarios" onClick={closeSidebar}>
                        <button className="sidebar-button active"><img src="../img/usuarios.png" alt="Usuarios" /> Usuarios</button>
                    </Link>
                </nav>
                <main className="main">
                    <div className="main-header">
                        <img src="../img/usuarios.png" alt="Usuarios" className="main-icon" /> / Usuarios
                    </div>
                    
                    <h2 className="panel-title">Gestión de Usuarios</h2>
                    <div className="config-container">
                        <div className="search-container full-width">
                            <img src="../img/search.png" alt="Buscar" className="search-icon" />
                            <input 
                                type="text" 
                                placeholder="Buscar usuario..." 
                                className="search-input" 
                                value={searchTerm} 
                                onChange={handleSearchChange} 
                            />
                            <button className='new-user-button' onClick={handleOpenModal}>+ Nuevo Usuario</button>
                        </div>

                        <table className="user-table">
                            <thead>
                                <tr>
                                    <th>Nombres</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentUsuarios.map(usuario => (
                                    <tr key={usuario.id}>
                                        <td>{usuario.nombre}</td>
                                        <td className="action-buttons">
                                            <button className="edit-button" onClick={() => handleOpenEditModal(usuario)}><img src="../img/edit.png" alt="Editar" /></button>
                                            <button className="delete-button" onClick={() => handleOpenDeleteConfirmModal(usuario.id)}><img src="../img/delete.png" alt="Eliminar" /></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {showModal && (
                            <div className="modal-overlay">
                                <div className="modal-content">
                                    <img src="../img/add.png" alt="Agregar" className="modal-icon" />
                                    <h2>Agregar Nuevo Usuario</h2>
                                    <form className="modal-form" onSubmit={handleSubmit}>
                                        <label>Nombre</label>
                                        <input type="text" value={nombre} onChange={e => setNombre(e.target.value)} placeholder="Nombre" required />
                                        <label>Credenciales</label>
                                        <input type="password" value={credenciales} onChange={e => setCredenciales(e.target.value)} placeholder="Credenciales" required />
                                        <div className="modal-buttons">
                                            <button type="button" onClick={handleCloseModal} className="close-button">Cerrar</button>
                                            <button type="submit" className="save-button">Guardar</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        )}

{showEditModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <img src="../img/edit.png" alt="Editar" className="modal-icon" />
                        <h2>Editar Usuario</h2>
                        <form className="modal-form" onSubmit={handleEditSubmit}>
                            <label>Nombre</label>
                            <input type="text" value={nombre} onChange={e => setNombre(e.target.value)} placeholder="Nombre" required />
                            <label>Contraseña Actual</label>
                            <input type="password" value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} placeholder="Contraseña Actual" required />
                            <label>Nueva Contraseña</label>
                            <input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} placeholder="Nueva Contraseña" required />
                            <div className="modal-buttons">
                                <button type="button" onClick={handleCloseEditModal} className="close-button">Cerrar</button>
                                <button type="submit" className="save-button">Guardar</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}


                        {showDeleteConfirmModal && (
                            <div className="modal-overlay">
                                <div className="modal-content">
                                    <h2>Confirmar Eliminación</h2>
                                    <p>¿Estás seguro de que deseas eliminar este usuario?</p>
                                    <div className="modal-buttons">
                                        <button type="button" onClick={handleCloseDeleteConfirmModal} className="close-button">Cancelar</button>
                                        <button onClick={handleDeleteUser} className="delete-button">Sí</button>
                                    </div>
                                </div>
                            </div>
                        )}

{isConfirmationModalOpen && (
    <div className="modal-overlay">
        <div className="modal-content">
            <h2>Confirmación</h2>
            <p>{confirmationMessage}</p>
            <button onClick={() => setIsConfirmationModalOpen(false)}className='close-button'>Cerrar</button>
        </div>
    </div>
)}

{isRedirectModalOpen && (
    <div className="modal-overlay">
        <div className="modal-content">
            <h2>Redirección</h2>
            <p>{redirectMessage}</p>
            <button onClick={() => {
                setIsRedirectModalOpen(false);
                localStorage.removeItem('token'); // Cierra sesión
                navigate('/login'); // Redirige al login
            }} className='save-button'>Aceptar</button>
        </div>
    </div>
)}
                        <div className="pagination">
                            <button onClick={handlePrevPage} className="pagination-button" disabled={currentPage === 1}>Anterior</button>
                            <span> Pág {currentPage} de {totalPages}</span>
                            <button onClick={handleNextPage} className="pagination-button" disabled={currentPage === totalPages}>Siguiente</button>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
};

export default Usuarios;
