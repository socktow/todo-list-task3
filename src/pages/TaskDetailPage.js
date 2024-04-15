// TaskDetailPage.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const TaskDetailPage = () => {
  const { taskId } = useParams();
  const [task, setTask] = useState(null);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/tasks/${taskId}`);
        setTask(response.data);
      } catch (error) {
        console.error('Error fetching task:', error);
      }
    };

    fetchTask();
  }, [taskId]);

  if (!task) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Task Detail</h1>
      <p>Title: {task.title}</p>
      <p>Creator: {task.creator}</p>
      <p>Description: {task.description}</p>
      <p>Status: {task.status}</p>
      <p>Created At: {new Date(task.createdAt).toLocaleString()}</p>
    </div>
  );
};

export default TaskDetailPage;
