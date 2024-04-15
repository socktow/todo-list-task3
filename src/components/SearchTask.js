// components/SearchTask.js
import React, { useState } from 'react';
import { Input } from 'antd';

const { Search } = Input;

const SearchTask = ({ onSearch }) => {
  const [searchValue, setSearchValue] = useState('');

  const handleSearch = (value) => {
    setSearchValue(value);
    onSearch(value);
  };

  return (
    <Search
      placeholder="Search tasks..."
      allowClear
      enterButton="Search"
      value={searchValue}
      onChange={(e) => setSearchValue(e.target.value)}
      onSearch={handleSearch}
    />
  );
};

export default SearchTask;
