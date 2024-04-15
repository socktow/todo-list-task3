// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Header from './components/Header';
import AllTasksPage from './pages/AllTasksPage';
import NewTasksPage from './pages/NewTasksPage';
import DoingTasksPage from './pages/DoingTasksPage';
import DoneTasksPage from './pages/DoneTasksPage';
import TaskDetailPage from './pages/TaskDetailPage';
import CreateTaskPage from './pages/CreateTaskPage'; // Đảm bảo đường dẫn đến trang CreateTaskPage là chính xác
import Button from '@mui/material/Button';
import { styled } from '@mui/system';

// Styled button for custom styles
const CustomButton = styled(Button)({
  margin: '0 10px',
});

function App() {
  return (
    <Router>
      <div>
        <Header />
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          <CustomButton component={Link} to="/" variant="contained" color="primary">All Tasks</CustomButton>
          <CustomButton component={Link} to="/new" variant="contained" color="secondary">New</CustomButton>
          <CustomButton component={Link} to="/doing" variant="contained" color="error">Doing</CustomButton>
          <CustomButton component={Link} to="/done" variant="contained" color="success">Done</CustomButton>
        </div>
        <Routes>
          <Route path="/" element={<AllTasksPage />} />
          <Route path="/new" element={<NewTasksPage />} />
          <Route path="/doing" element={<DoingTasksPage />} />
          <Route path="/done" element={<DoneTasksPage />} />
          <Route path="/tasks/:id" element={<TaskDetailPage />} />
          <Route path="/create-task" element={<CreateTaskPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
