import { useState } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Record } from '../../../typings';
import { getFilteredRecords } from '../../../utils';

interface IFilter {
  title: keyof Record,
  values: string[],
  offers?: Record[]
  handleApplyFilter?: (offers?: Record[]) => void
}

export default function Filter({ title, values, handleApplyFilter, offers}: IFilter) {
  const [value, setValue] = useState('');

  const handleChange = (event: SelectChangeEvent) => {
    const filterVal = event.target.value as string
    setValue(filterVal);
    const filteredRecords = getFilteredRecords(filterVal, title, offers)
    handleApplyFilter?.(filteredRecords)
  };

  return (
    <Box sx={{ width: '80%', margin: '10px' }}>
      <FormControl fullWidth>
        <InputLabel>{title.toUpperCase()}</InputLabel>
        <Select
          value={value}
          label={title}
          onChange={handleChange}
        >
          {values.map(val => (
            <MenuItem key={val} value={val}>{`${val}`.toUpperCase()}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
