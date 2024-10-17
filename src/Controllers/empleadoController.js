import axios from 'axios';

// Definir la URL base del servidor desplegado en Heroku
const API_URL = 'https://mysql-tickets-deploy-b8922bfc52f7.herokuapp.com/api/users'; // Nueva URL de tu API

// Obtener todos los empleados
export const getEmpleados = async () => {
  const token = localStorage.getItem('token');
  try {
    const response = await axios.get(`${API_URL}/empleados`, {
      headers: {
        'Authorization': token
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error al obtener los empleados', error);
    throw error;
  }
};

// Agregar un nuevo empleado
export const addEmpleado = async (empleado) => {
  const token = localStorage.getItem('token');
  try {
    await axios.post(`${API_URL}/register`, empleado, {
      headers: {
        'Authorization': token
      }
    });
  } catch (error) {
    console.error('Error al agregar el empleado', error);
    throw error;
  }
};

// Actualizar un empleado existente
export const updateEmpleado = async (empleado) => {
  const token = localStorage.getItem('token');
  try {
    await axios.put(`${API_URL}/update`, empleado, {
      headers: {
        'Authorization': token
      }
    });
  } catch (error) {
    console.error('Error al actualizar el empleado', error);
    throw error;
  }
};

// Eliminar un empleado
export const deleteEmpleado = async (id) => {
  const token = localStorage.getItem('token');
  try {
    await axios.delete(`${API_URL}/delete/${id}`, {
      headers: {
        'Authorization': token
      }
    });
  } catch (error) {
    console.error('Error al eliminar el empleado', error);
    throw error;
  }
};
