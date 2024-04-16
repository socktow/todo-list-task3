// api.js
import axios from 'axios';

const baseURL = 'http://localhost:3001';

export const fetchTasks = async () => {
  try {
    const response = await axios.get(`${baseURL}/tasks`);
    return response.data;
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw error;
  }
};

export const saveTask = async (newTask) => {
  try {
    const response = await axios.post(`${baseURL}/tasks`, newTask);
    return response.data;
  } catch (error) {
    console.error('Error saving task:', error);
    throw error;
  }
};

export const updateTask = async (taskId, updatedTask) => {
  try {
    const existingTask = await axios.get(`${baseURL}/tasks/${taskId}`);
    if (!existingTask) {
      throw new Error('Task not found');
    }

    const response = await axios.put(`${baseURL}/tasks/${taskId}`, updatedTask);
    return response.data;
  } catch (error) {
    console.error('Error updating task:', error);
    throw error;
  }
};


export const deleteTask = async (taskId) => {
  try {
    const response = await axios.delete(`${baseURL}/tasks/${taskId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting task:', error);
    throw error;
  }
};
