<<<<<<< HEAD
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import Header from './components/Header';
import AllTasksPage from './pages/AllTasksPage';
import NewTasksPage from './pages/NewTasksPage';
import DoingTasksPage from './pages/DoingTasksPage';
import DoneTasksPage from './pages/DoneTasksPage';
import TaskDetailPage from './pages/TaskDetailPage';
import CreateTaskPage from './pages/CreateTaskPage';
import Button from '@mui/material/Button';
import { styled } from '@mui/system';
=======
import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  Navigate,
} from "react-router-dom";
import Header from "./components/Header";
import AllTasksPage from "./pages/AllTasksPage";
import NewTasksPage from "./pages/NewTasksPage";
import DoingTasksPage from "./pages/DoingTasksPage";
import DoneTasksPage from "./pages/DoneTasksPage";
import TaskDetailPage from "./pages/TaskDetailPage";
import CreateTaskPage from "./pages/CreateTaskPage";
import Button from "@mui/material/Button";
import { styled } from "@mui/system";
>>>>>>> 0f8291078cf5bd93082cae9f1f2584c4aa52d892

const CustomButton = styled(Button)({
  margin: "0 10px",
});

function App() {
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = (value) => {
    setSearchValue(value);
  };

  return (
    <Router>
      <div>
        <Header onSearch={handleSearch} />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          <CustomButton
            component={Link}
            to="/"
            variant="contained"
            color="primary"
          >
            All Tasks
          </CustomButton>
          <CustomButton
            component={Link}
            to="/new"
            variant="contained"
            color="secondary"
          >
            New
          </CustomButton>
          <CustomButton
            component={Link}
            to="/doing"
            variant="contained"
            color="error"
          >
            Doing
          </CustomButton>
          <CustomButton
            component={Link}
            to="/done"
            variant="contained"
            color="success"
          >
            Done
          </CustomButton>
        </div>
        <Routes>
          <Route
            path="/"
            element={<AllTasksPage searchValue={searchValue} />}
          />
          <Route
            path="/new"
            element={<NewTasksPage searchValue={searchValue} />}
          />
          <Route
            path="/doing"
            element={<DoingTasksPage searchValue={searchValue} />}
          />
          <Route
            path="/done"
            element={<DoneTasksPage searchValue={searchValue} />}
          />
          <Route path="/tasks/:taskId" element={<TaskDetailPage />} />
          <Route path="/create-task" element={<CreateTaskPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
