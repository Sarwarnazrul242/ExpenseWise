import api from './api';

const API_URL = '/dashboard';

// Get dashboard data
export const getDashboardData = async () => {
  try {
    const response = await api.get(API_URL);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Error fetching dashboard data' };
  }
};

// Update dashboard data
export const updateDashboardData = async (data) => {
  try {
    const response = await api.put(API_URL, data);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Error updating dashboard data' };
  }
};

// Add new item
export const addItem = async (type, item) => {
  try {
    console.log('Adding item:', { type, item });
    if (!type) {
      throw new Error('Item type is required');
    }
    const response = await api.post(`${API_URL}/${type}`, { ...item, type });
    console.log('Add item response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error in addItem:', error);
    throw error.response?.data || { 
      message: 'Error adding item',
      error: error.message,
      stack: error.stack
    };
  }
};

// Delete item
export const deleteItem = async (type, id) => {
  try {
    const response = await api.delete(`${API_URL}/${type}/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Error deleting item' };
  }
};

// Edit item
export const editItem = async (type, id, item) => {
  try {
    const response = await api.put(`${API_URL}/${type}/${id}`, item);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Error updating item' };
  }
}; 