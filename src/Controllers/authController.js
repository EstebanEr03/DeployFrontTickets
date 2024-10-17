import axios from 'axios';
const API_URL = 'https://mysql-tickets-deploy-b8922bfc52f7.herokuapp.com/api/users';  // URL de tu servidor en Heroku

export const login = async (values) => {
  try {
    const response = await axios.post(`${API_URL}/login`, values);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      return { success: true };
    } else {
      return { success: false, message: 'Invalid credentials' };
    }
  } catch (error) {
    console.error('Error during login:', error);
    return { success: false, message: 'An error occurred during login' };
  }
};

export const register = async (values) => {
  try {
    const response = await axios.post(`${API_URL}/register`, values);
    if (response.data.message === 'User and login created successfully') {
      return { success: true };
    } else {
      return { success: false, message: 'Registration failed' };
    }
  } catch (error) {
    console.error('Error during registration:', error);
    return { success: false, message: 'An error occurred during registration' };
  }
};
