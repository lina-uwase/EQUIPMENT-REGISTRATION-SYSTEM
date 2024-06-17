import React from 'react';
import { Input } from 'antd';
const { Search } = Input;
const SearchField = ({ searchQuery, handleSearch}) => (
  <>
    <Search placeholder="Search here..." value={searchQuery} onChange={handleSearch} />
  </>
);
export default SearchField;