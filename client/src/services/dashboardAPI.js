import axios from 'axios';

const API_URL = 'http://localhost:5000/api/dashboard';

// Get dashboard data
export const getDashboardData = async (token) => {
  const config = {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  };
  try {
    const response = await axios.get(API_URL, config);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Error fetching dashboard data' };
  }
};

// Update dashboard data
export const updateDashboardData = async (data, token) => {
  const config = {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  };
  try {
    const response = await axios.put(API_URL, data, config);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Error updating dashboard data' };
  }
};

// Add new item
export const addItem = async (type, item, token) => {
  const config = {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  };
  try {
    const response = await axios.post(`${API_URL}/${type}`, item, config);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Error adding item' };
  }
};

// Delete item
export const deleteItem = async (type, id, token) => {
  const config = {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  };
  try {
    const response = await axios.delete(`${API_URL}/${type}/${id}`, config);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Error deleting item' };
  }
};

// Edit item
export const editItem = async (type, id, item, token) => {
  const config = {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  };
  try {
    const response = await axios.put(`${API_URL}/${type}/${id}`, item, config);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Error updating item' };
  }
}; 