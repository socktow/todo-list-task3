import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Grid, Paper, Typography, Button } from "@mui/material";

const AllTasksPage = ({ searchValue }) => {
  const [tasks, setTasks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 9;

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

  useEffect(() => {
    // Logic to filter tasks based on searchValue
    // Update tasks state with filtered tasks
  }, [searchValue]); // Re-run effect when searchValue changes

  // Filter tasks based on searchValue
  const filteredTasks = tasks.filter(
    (task) =>
      task.title.toLowerCase().includes(searchValue.toLowerCase()) ||
      task.creator.toLowerCase().includes(searchValue.toLowerCase()) ||
      task.description.toLowerCase().includes(searchValue.toLowerCase())
  );

  // Calculate indexes of tasks to display on the current page
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = filteredTasks.slice(indexOfFirstTask, indexOfLastTask);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Function to get background color for status
  const getStatusColor = (status) => {
    switch (status) {
      case "New":
        return "red";
      case "Doing":
        return "yellow";
      case "Done":
        return "green";
      default:
        return "white"; // Default color
    }
  };

  return (
    <div>
      <h1>All Tasks</h1>
      <Grid container spacing={2}>
        {currentTasks.map((task) => (
          <Grid item key={task.id} xs={12} sm={6} md={4}>
            <Paper style={{ padding: "10px", position: "relative" }}>
              <Link to={`/tasks/${task.id}`} style={{ textDecoration: "none" }}>
                <Typography variant="h6" style={{ cursor: "pointer" }}>
                  {task.title}
                </Typography>
              </Link>
              <Typography variant="body1">Creator: {task.creator}</Typography>
              <Typography variant="body1">
                Description: {task.description}
              </Typography>
                <Typography variant="body1">
                  Created At: {new Date(task.createdAt).getDate()}/
                  {new Date(task.createdAt).getMonth() + 1}/
                  {new Date(task.createdAt).getFullYear()}
                </Typography>
              <Typography
                variant="body1"
                style={{
                  backgroundColor: getStatusColor(task.status),
                  color: "white",
                  padding: "2px 5px",
                  borderRadius: "4px",
                }}
              >
                Status: {task.status}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <Button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          variant="contained"
        >
          Previous
        </Button>
        <span style={{ margin: "0 10px" }}>{currentPage}</span>
        <Button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentTasks.length < tasksPerPage}
          variant="contained"
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default AllTasksPage;
