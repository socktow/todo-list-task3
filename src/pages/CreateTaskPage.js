import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Link } from 'react-router-dom';
import { saveTask } from '../services/api'; // Import saveTask function

const CreateTaskForm = () => {
  const [title, setTitle] = useState('');
  const [createdAt, setCreatedAt] = useState(null);
  const [creator, setCreator] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('New');

  const handleSave = async () => {
    try {
      // Create task object with form data
      const taskData = {
        title,
        createdAt,
        creator,
        description,
        status,
      };

      // Call saveTask function to save task data to server
      await saveTask(taskData);

      // Reset form after successful save
      setTitle('');
      setCreatedAt(null);
      setCreator('');
      setDescription('');
      setStatus('New');

      // Optionally, you can redirect user to another page after save
      // window.location.href = '/'; // Redirect to homepage
    } catch (error) {
      // Handle error
      console.error('Error saving task:', error);
    }
  };

  const handleReset = () => {
    setTitle('');
    setCreatedAt(null);
    setCreator('');
    setDescription('');
    setStatus('New');
  };


  return (
    <div style={{ padding: '10px' }}>
      <form style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <TextField
          label="Title"
          variant="outlined"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <DatePicker
          selected={createdAt}
          onChange={(date) => setCreatedAt(date)}
          dateFormat="dd/MM/yyyy"
          placeholderText="Select a date"
          className="custom-datepicker"
        />
        <TextField
          label="Creator"
          variant="outlined"
          fullWidth
          value={creator}
          onChange={(e) => setCreator(e.target.value)}
        />
        <TextField
          label="Description"
          variant="outlined"
          fullWidth
          multiline
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <FormControl fullWidth>
          <InputLabel>Status</InputLabel>
          <Select value={status} onChange={(e) => setStatus(e.target.value)}>
            <MenuItem value="New">New</MenuItem>
            <MenuItem value="Doing">Doing</MenuItem>
            <MenuItem value="Done">Done</MenuItem>
          </Select>
        </FormControl>
        <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
          <Button variant="outlined" color="primary" component={Link} to="/">
            Back
          </Button>{' '}
          <Button variant="contained" color="primary" onClick={handleSave}>
            Save
          </Button>
          <Button variant="contained" color="error" onClick={handleReset}>
            Reset
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateTaskForm;
