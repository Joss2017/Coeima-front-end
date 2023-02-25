import React from 'react';
import { SearchBarProps } from '../interface/Searbar';

export const SearchBar = ({ onSearch }: SearchBarProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value);
    console.log(e.target.value);
  };
  return (
    <div>
      <input
        className='form-control mr-sm-2'
        type='search'
        placeholder='taper votre recherche'
        onChange={handleChange}
      />
    </div>
  );
};
