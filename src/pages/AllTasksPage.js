import React, { useState, useEffect } from "react";
import axios from "axios";
import { Grid, Paper, Typography, TextField, Button } from "@mui/material";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { useNavigate } from "react-router-dom";

const AllTasksPage = () => {
  const [tasks, setTasks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 9;
  const navigate = useNavigate(); // Sử dụng useNavigate thay cho useHistory

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get("http://localhost:3001/tasks");
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  // Calculate indexes of tasks to display on the current page
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = tasks.slice(indexOfFirstTask, indexOfLastTask);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleTaskDetail = (taskId) => {
    navigate(`/tasks/${taskId}`);
  };

  return (
    <div>
      <h1>All Tasks</h1>
      <Grid container spacing={2}>
        {currentTasks.map((task) => (
          <Grid item key={task.id} xs={12} sm={6} md={4}>
            <Paper style={{ padding: "10px", position: "relative" }}>
              <Typography variant="h6">{task.title}</Typography>
              <Typography variant="body1">Creator: {task.creator}</Typography>
              <Typography variant="body1">
                Description: {task.description}
              </Typography>
              <Typography variant="body1">Status: {task.status}</Typography>
              <SettingsOutlinedIcon
                style={{
                  position: "absolute",
                  top: "5px",
                  right: "5px",
                  cursor: "pointer",
                }}
                onClick={() => handleTaskDetail(task.id)}
              />
            </Paper>
          </Grid>
        ))}
      </Grid>
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <Button
          disabled={currentPage === 1}
          onClick={() => paginate(currentPage - 1)}
          style={{ marginRight: "10px" }}
        >
          Previous
        </Button>
        <TextField
          label="Page"
          type="number"
          value={currentPage}
          onChange={(e) => paginate(parseInt(e.target.value))}
          InputProps={{
            inputProps: { min: 1, max: Math.ceil(tasks.length / tasksPerPage) },
          }}
          style={{ marginRight: "10px" }}
        />
        <Typography variant="body1" component="span">
          of {Math.ceil(tasks.length / tasksPerPage)}
        </Typography>
        <Button
          disabled={currentPage === Math.ceil(tasks.length / tasksPerPage)}
          onClick={() => paginate(currentPage + 1)}
          style={{ marginLeft: "10px" }}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default AllTasksPage;
