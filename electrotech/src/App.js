import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Bienvenido from './Bienvenido';
import Login from './Login'; 
import ControlPanel from './components/ControlPanel';
import Configuracion from './components/Configuracion';
import Usuarios from './components/Usuarios';
import Productos from './components/Productos';
import Clientes from './components/Clientes';
import Cotizaciones from './components/Cotizaciones';

function App() {
    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route path="/" element={<Bienvenido />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/ControlPanel" element={<ControlPanel />} />
                    <Route path="/Cotizaciones" element={<Cotizaciones />} />
                    <Route path="/Clientes" element={<Clientes />} />
                    <Route path="/Productos" element={<Productos />} />
                    <Route path="/Usuarios" element={<Usuarios />} />
                    <Route path="/Configuracion" element={<Configuracion />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
