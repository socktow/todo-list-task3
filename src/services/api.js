import axios from 'axios';

const baseURL = 'http://localhost:3001'; // Base URL of your API

// Function to fetch all tasks
export const fetchTasks = async () => {
  try {
    const response = await axios.get(`${baseURL}/tasks`);
    return response.data;
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw error; // Throw the error to handle it in the caller function
  }
};

// Function to save a new task
export const saveTask = async (newTask) => {
  try {
    const response = await axios.post(`${baseURL}/tasks`, newTask);
    return response.data;
  } catch (error) {
    console.error('Error saving task:', error);
    throw error;
  }
};

// Function to update an existing task
export const updateTask = async (taskId, updatedTask) => {
  try {
    const response = await axios.put(`${baseURL}/tasks/${taskId}`, updatedTask);
    return response.data;
  } catch (error) {
    console.error('Error updating task:', error);
    throw error;
  }
};

// Function to delete a task
export const deleteTask = async (taskId) => {
  try {
    const response = await axios.delete(`${baseURL}/tasks/${taskId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting task:', error);
    throw error;
  }
};
