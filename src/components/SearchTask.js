import React, { useState } from 'react';
import { Input } from 'antd';

const { Search } = Input;

const SearchTask = ({ onSearch }) => { // Thêm props onSearch
  const [searchValue, setSearchValue] = useState('');

  const handleSearch = (value) => {
    setSearchValue(value);
    onSearch(value); // Gọi hàm onSearch và truyền giá trị tìm kiếm lên component cha
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
