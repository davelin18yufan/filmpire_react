/* eslint-disable react/jsx-no-bind */
import React from 'react';
import { Typography, Button, Box } from '@mui/material';

const Paginator = ({ currentPage, setPage, totalPages }) => {
  function handlePrev() {
    if (currentPage !== 1) {
      setPage((prevPage) => prevPage - 1);
    }
  }

  function handleNext() {
    if (currentPage !== totalPages && currentPage < 500) {
      setPage((prevPage) => prevPage + 1);
    }
  }

  if (totalPages === 0) return null;

  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      {currentPage !== 1 && <Button onClick={() => setPage(1)} variant="contained" color="primary" type="button" sx={{ margin: '30px 2px' }}>{'<<'}</Button>}
      <Button onClick={handlePrev} variant="contained" color="primary" type="button" sx={{ margin: '30px 2px' }}>Prev</Button>
      <Typography variant="h4" sx={{ margin: '0 20px !important', color: 'text.primary' }}>{currentPage}</Typography>
      <Button onClick={handleNext} variant="contained" color="primary" type="button" sx={{ margin: '30px 2px' }}>Next</Button>
      {currentPage < 500 && <Button onClick={() => setPage(totalPages)} variant="contained" color="primary" type="button" sx={{ margin: '30px 2px' }}>{'>>'}</Button>}
    </Box>
  );
};

export default Paginator;
