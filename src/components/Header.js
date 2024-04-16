import React from 'react';
import { styled } from '@mui/system';
import SearchTask from './SearchTask';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate instead of useHistory
import { AppBar, Toolbar, Button } from '@mui/material';

const FlexContainer = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
});

const Header = ({ onSearch }) => {
  const navigate = useNavigate(); // Use useNavigate instead of useHistory
  return (
    <AppBar position="static">
      <Toolbar>
        <FlexContainer>
          <div className="header-left">
            <Button component={Link} to="/create-task" variant="contained" color="secondary">Create Task</Button>
          </div>
          <div className="header-right">
            <SearchTask onSearch={onSearch} />
          </div>
        </FlexContainer>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
