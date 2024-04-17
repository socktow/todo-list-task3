import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Grid, Paper, Typography, Button, TextField, MenuItem } from "@mui/material";

const AllTasksPage = ({ searchValue }) => {
  const [tasks, setTasks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [creatorFilter, setCreatorFilter] = useState("");
  const [titleFilter, setTitleFilter] = useState("");
  const [sortByDate, setSortByDate] = useState(""); // State for sorting by date
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

  useEffect(() => {}, [searchValue]);

  const filteredTasks = tasks.filter(
    (task) =>
      task.title.toLowerCase().includes(searchValue.toLowerCase()) &&
      task.creator.toLowerCase().includes(creatorFilter.toLowerCase()) &&
      task.title.toLowerCase().includes(titleFilter.toLowerCase())
  );

  // Sort tasks based on sortByDate value
  const sortedTasks = filteredTasks.sort((a, b) => {
    if (sortByDate === "asc") {
      return new Date(a.createdAt) - new Date(b.createdAt);
    } else if (sortByDate === "desc") {
      return new Date(b.createdAt) - new Date(a.createdAt);
    } else {
      return 0;
    }
  });

  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = sortedTasks.slice(indexOfFirstTask, indexOfLastTask);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
      <div style={{ marginBottom: "10px" }}>
        <TextField
          label="Filter by Creator"
          variant="outlined"
          size="small"
          value={creatorFilter}
          onChange={(e) => setCreatorFilter(e.target.value)}
          style={{ marginRight: "10px" }}
        />
        <TextField
          label="Filter by Title"
          variant="outlined"
          size="small"
          value={titleFilter}
          onChange={(e) => setTitleFilter(e.target.value)}
          style={{ marginRight: "10px" }}
        />
        <TextField
          select
          label="Sort by Date"
          variant="outlined"
          size="small"
          value={sortByDate}
          onChange={(e) => setSortByDate(e.target.value)}
        >
          <MenuItem value="asc">Date Ascending</MenuItem>
          <MenuItem value="desc">Date Descending</MenuItem>
        </TextField>
      </div>
      <Grid container spacing={2}>
        {currentTasks.map((task) => (
          <Grid item key={task.id} xs={12} sm={6} md={4}>
            <Paper style={{ padding: "10px", position: "relative" }}>
              <Link
                to={`/tasks/${task.id}`}
                style={{ textDecoration: "none" }}
              >
                <Typography variant="h6" style={{ cursor: "pointer" }}>
                  {task.title}
                </Typography>
              </Link>
              <Typography variant="body1">Creator: {task.creator}</Typography>
              <Typography variant="body1">
                Description: {task.description}
              </Typography>
              <Typography variant="body1">
                Created At:{" "}
                {new Date(task.createdAt).getDate()}/
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
      <div
        style={{
          textAlign: "center",
          marginTop: "10%",
          position: "fixed",
          bottom: "7%",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: "999",
        }}
      >
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
