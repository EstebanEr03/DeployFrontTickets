import axios from 'axios';

// Actualiza las URL base para Heroku
const API_URL = 'https://mysql-tickets-deploy-b8922bfc52f7.herokuapp.com/api/tickets';
const API_USERS_URL = 'https://mysql-tickets-deploy-b8922bfc52f7.herokuapp.com/api/users';  // URL para obtener los usuarios

// Obtener todos los tickets
export const getTickets = async () => {
  const token = localStorage.getItem('token');
  try {
    const response = await axios.get(`${API_URL}/all`, {
      headers: {
        'Authorization': token
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error al obtener los tickets', error);
    throw error;
  }
};

// Obtener todos los usuarios (para la asignación de tickets)
export const getUsers = async () => {
  const token = localStorage.getItem('token');
  try {
    const response = await axios.get(`${API_USERS_URL}/empleados`, {
      headers: {
        'Authorization': token
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error al obtener los usuarios', error);
    throw error;
  }
};

// Crear un nuevo ticket y asignarlo automáticamente
export const createTicket = async (ticketData) => {
  const token = localStorage.getItem('token');
  try {
    // Obtener todos los usuarios
    const users = await getUsers();

    // Encontrar al usuario con menos tickets asignados
    let usuarioMenosCargado = users[0];
    users.forEach(user => {
      if (user.ticketCount < usuarioMenosCargado.ticketCount) {
        usuarioMenosCargado = user;
      }
    });

    // Asignar el ticket al usuario menos cargado
    ticketData.asignadoA = usuarioMenosCargado.id;

    // Crear el ticket en el backend
    await axios.post(`${API_URL}/create`, ticketData, {
      headers: {
        'Authorization': token
      }
    });
  } catch (error) {
    console.error('Error al crear el ticket', error);
    throw error;
  }
};

// Actualizar un ticket
export const updateTicket = async (ticketData) => {
  const token = localStorage.getItem('token');
  try {
    await axios.put(`${API_URL}/update/${ticketData.id}`, ticketData, {
      headers: {
        'Authorization': token
      }
    });
  } catch (error) {
    console.error('Error al actualizar el ticket', error);
    throw error;
  }
};

// Eliminar un ticket
export const deleteTicket = async (id) => {
  const token = localStorage.getItem('token');
  try {
    await axios.delete(`${API_URL}/delete/${id}`, {
      headers: {
        'Authorization': token
      }
    });
  } catch (error) {
    console.error('Error al eliminar el ticket', error);
    throw error;
  }
};
