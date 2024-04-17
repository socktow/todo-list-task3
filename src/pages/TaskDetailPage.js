import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import Modal from "@mui/material/Modal"; // Import Modal
import { useParams, useNavigate, Link } from "react-router-dom";
import { deleteTask, updateTask } from "../services/api";

import "./styles/TaskDetailPage.css";

const TaskDetailPage = () => {
  const { taskId } = useParams();
  const [task, setTask] = useState(null);
  const [editable, setEditable] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/tasks/${taskId}`
        );
        setTask(response.data);
      } catch (error) {
        console.error("Error fetching task:", error);
      }
    };

    fetchTask();
  }, [taskId]);

  const handleEdit = () => setEditable(true);

  const handleSave = async () => {
    try {
      setLoading(true);
      await updateTask(taskId, task);
      setEditable(false);

      setTimeout(() => {
        setLoading(false);
        navigate("/");
      }, 2500);
    } catch (error) {
      console.error("Error updating task:", error);
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteTask(taskId);
      setConfirmDelete(false); // Close the confirmation modal
      setLoading(true); // Start loading animation

      // Simulate deletion process
      setTimeout(() => {
        setLoading(false);
        navigate("/");
      }, 1500);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      {task ? (
        <div>
          <h1>Task Detail: {taskId}</h1>
          <TextField
            label="Title"
            variant="outlined"
            fullWidth
            value={task.title}
            onChange={(e) => setTask({ ...task, title: e.target.value })}
            disabled={!editable}
          />
          <TextField
            label="Creator"
            variant="outlined"
            fullWidth
            value={task.creator}
            onChange={(e) => setTask({ ...task, creator: e.target.value })}
            disabled={!editable}
          />
          <TextField
            label="Description"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            value={task.description}
            onChange={(e) => setTask({ ...task, description: e.target.value })}
            disabled={!editable}
          />
          <FormControl fullWidth>
            <InputLabel>Status</InputLabel>
            <Select
              value={task.status}
              onChange={(e) => setTask({ ...task, status: e.target.value })}
              disabled={!editable}
            >
              <MenuItem value="New">New</MenuItem>
              <MenuItem value="Doing">Doing</MenuItem>
              <MenuItem value="Done">Done</MenuItem>
            </Select>
          </FormControl>
          {!editable ? (
            <div style={{ margin: "20px" }}>
              <Button variant="contained" color="primary" onClick={handleEdit}>
                Edit
              </Button>{" "}
              <Button
                variant="contained"
                color="error"
                onClick={() => setConfirmDelete(true)}
              >
                Delete
              </Button>
              <Button
                variant="outlined"
                color="primary"
                component={Link}
                to="/"
              >
                Back
              </Button>
            </div>
          ) : (
            <div style={{ margin: "20px" }}>
              <Button variant="contained" color="primary" onClick={handleSave}>
                Save
              </Button>{" "}
              <Button variant="outlined" onClick={() => setEditable(false)}>
                Cancel
              </Button>
              <Button
                variant="outlined"
                color="primary"
                component={Link}
                to="/"
              >
                Back
              </Button>
            </div>
          )}
          <Modal
            open={confirmDelete}
            onClose={() => setConfirmDelete(false)}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
            className="modal-container" // Thêm class modal-container
          >
            <div className="confirm-delete-modal">
              <h2 id="modal-title">Confirm Delete</h2>
              <p id="modal-description">
                Are you sure you want to delete this task?
              </p>
              <div>
                <Button
                  variant="contained"
                  color="error"
                  onClick={handleDelete}
                >
                  Confirm
                </Button>{" "}
                <Button
                  variant="outlined"
                  onClick={() => setConfirmDelete(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </Modal>

          {loading && <div className="loading-animation">Loading...</div>}
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default TaskDetailPage;
