import React, { useState, useEffect } from 'react';
import { TextField, InputAdornment, Box } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { searchMovie } from '../../features/currentGenreOrCategory';

const Search = () => {
  const theme = useTheme();
  const [query, setQuery] = useState('');
  const dispatch = useDispatch();
  const location = useLocation();

  function handleKeypress(e) {
    if (e.key === 'Enter') {
      dispatch(searchMovie(query));
    }
  }

  // only show at the home  page
  if (location.pathname !== '/') return null;

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
        sx={{
          color: theme.palette.mode === 'light' && 'black',
          filter: theme.palette.mode === 'light' && 'invert(1)',
          [theme.breakpoints.down('sm')]: {
            marginTop: '-10px',
            marginBottom: '10px',
          } }}
        InputProps={{
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
