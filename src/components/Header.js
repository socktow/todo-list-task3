import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { styled } from '@mui/system';
import SearchTask from './SearchTask';

const FlexContainer = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
});

const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <FlexContainer>
          <div className="header-left">
            {/* Nút tạo task mới */}
            <Button component={Link} to="/create-task" variant="contained" color="secondary">Create Task</Button>
          </div>
          <div className="header-right">
            {/* Thanh search */}
            <SearchTask />
          </div>
        </FlexContainer>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
