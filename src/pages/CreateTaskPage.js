import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './styles/CreateTaskPage.css';
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
      // Kiểm tra các trường dữ liệu
      if (!title || !createdAt || !creator || !description || !status) {
        alert('Please fill in all fields.');
        return;
      }
  
      // Create task object with form data
      const taskData = {
        title,
        createdAt,
        creator,
        description,
        status,
      };
  
      // Gọi hàm saveTask để lưu dữ liệu task lên server
      await saveTask(taskData);
  
      // Reset form sau khi lưu thành công
      setTitle('');
      setCreatedAt(null);
      setCreator('');
      setDescription('');
      setStatus('New');
  
      // Chuyển hướng người dùng về trang chính sau khi lưu
      window.location.href = '/';
    } catch (error) {
      // Xử lý lỗi
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
  className="custom-datepicker"
  selected={createdAt}
  onChange={(date) => setCreatedAt(date)}
  dateFormat="dd/MM/yyyy"
  placeholderText="Select a date"
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
