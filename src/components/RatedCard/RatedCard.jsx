import React from 'react';
import { Typography, Box } from '@mui/material';

// eslint-disable-next-line import/no-cycle
import { Movie } from '..';

const RatedCard = ({ title, data }) => (
  <Box>
    <Typography variant="h5" gutterBottom>{title}</Typography>
    <Box display="flex" flexWrap="wrap" sx={{}}>
      {data?.results?.map((movie, i) => (
        <Movie key={movie.id} movie={movie} i={i} />
      ))}
    </Box>
  </Box>
);

export default RatedCard;
