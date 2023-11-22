import React from 'react';
import { Grid } from '@mui/material';
// eslint-disable-next-line import/no-cycle
import { Movie } from '..';

const MovieList = ({ movies, numberOfMovies }) => {
  console.log('11');

  return (
    <Grid
      container
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: { xs: 'center', sm: 'space-between' },
        overflow: 'auto' }}
    >
      {movies.results.slice(0, numberOfMovies).map((movie, i) => (
        <Movie key={i} movie={movie} i={i} />
      ))}
    </Grid>
  );
};

export default MovieList;
