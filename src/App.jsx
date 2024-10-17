import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './views/Home';
import Register from './views/Register';
import Login from './views/Login';
import CrudComponent from './views/CrudComponent';
import TicketComponent from './views/TicketsComponent';  // Importa el nuevo componente

function App() {
  // Función para verificar si el usuario está autenticado
  const isAuthenticated = () => {
    return !!localStorage.getItem('token');  // Comprueba si hay un token en localStorage
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />

        {/* Ruta protegida para Home */}
        <Route
          path='/'
          element={isAuthenticated() ? <Home /> : <Navigate to="/login" />} 
        />

        {/* Ruta protegida para CrudComponent */}
        <Route
          path='/CrudComponent'
          element={isAuthenticated() ? <CrudComponent /> : <Navigate to="/login" />} 
        />

        {/* Ruta protegida para TicketComponent */}
        <Route
          path='/tickets'
          element={isAuthenticated() ? <TicketComponent /> : <Navigate to="/login" />} 
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
