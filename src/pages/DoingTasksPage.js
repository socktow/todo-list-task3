// pages/DoingTasksPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid, Paper, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
const DoingTasksPage = ({ searchValue }) => {
  const [doingTasks, setDoingTasks] = useState([]);

  useEffect(() => {
    const fetchDoingTasks = async () => {
      try {
        const response = await axios.get('http://localhost:3001/tasks');
        const tasks = response.data;
        let filteredTasks = tasks.filter(task => task.status === 'Doing');

        // Apply search filter if searchValue exists
        if (searchValue) {
          filteredTasks = filteredTasks.filter(task =>
            task.title.toLowerCase().includes(searchValue.toLowerCase()) ||
            task.creator.toLowerCase().includes(searchValue.toLowerCase()) ||
            task.description.toLowerCase().includes(searchValue.toLowerCase())
          );
        }

        setDoingTasks(filteredTasks);
      } catch (error) {
        console.error('Error fetching doing tasks:', error);
      }
    };

    fetchDoingTasks();
  }, [searchValue]);

  return (
    <div>
      <h1>Doing Tasks</h1>
      <Grid container spacing={2}>
        {doingTasks.map(task => (
          <Grid item key={task.id} xs={12} sm={6} md={4}>
            <Paper style={{ padding: '10px' }}>
            <Link to={`/tasks/${task.id}`} style={{ textDecoration: 'none' }}>
                <Typography variant="h6" style={{ cursor: 'pointer' }}>{task.title}</Typography>
              </Link>
              <Typography variant="body1">Creator: {task.creator}</Typography>
              <Typography variant="body1">Description: {task.description}</Typography>
              <Typography variant="body1">Status: {task.status}</Typography>
              <Typography variant="body1">
                Created At: {new Date(task.createdAt).getDate()}/
                {new Date(task.createdAt).getMonth() + 1}/
                {new Date(task.createdAt).getFullYear()}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default DoingTasksPage;
