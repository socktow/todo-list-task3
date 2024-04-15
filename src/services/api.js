import axios from 'axios';

const baseURL = 'http://localhost:3001';

export const saveTask = async (taskData) => {
  try {
    const response = await axios.post(`${baseURL}/tasks`, taskData);
    return response.data;
  } catch (error) {
    throw error;
  }
};
