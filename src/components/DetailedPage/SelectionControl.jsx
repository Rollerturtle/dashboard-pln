import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const SelectionControl = ({ label, selected, setSelected, options }) => {
  return (
    <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
      <InputLabel id={`${label}-select-label`}>{label}</InputLabel>
      <Select
        labelId={`${label}-select-label`}
        id={`${label}-select`}
        value={selected}
        onChange={(event) => {
          console.log(`Selected ${label}:`, event.target.value);
          setSelected(event.target.value);
        }}
        
      >
        {options.map((option) => (
          <MenuItem key={option} value={option}>{option}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectionControl;
