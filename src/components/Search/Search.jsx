import React, { useState, useEffect } from 'react';
import { TextField, InputAdornment, Box } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { searchMovie } from '../../features/currentGenreOrCategory';

import { classes } from './style';

const Search = () => {
  const theme = useTheme();
  const [query, setQuery] = useState('');
  const dispatch = useDispatch();

  function handleKeypress(e) {
    if (e.key === 'Enter') {
      dispatch(searchMovie(query));
    }
  }

  return (
    <Box sx={{ [theme.breakpoints.down('sm')]: {
      display: 'flex',
      justifyContent: 'center',
      width: '100%',
    } }}
    >
      <TextField
        // eslint-disable-next-line react/jsx-no-bind
        onKeyDown={handleKeypress}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        variant="standard"
        InputProps={{
          className: classes(theme).input,
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
};

export default Search;
