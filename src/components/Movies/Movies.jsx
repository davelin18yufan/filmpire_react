import React, { useState, useEffect } from 'react';
import { Box, CircularProgress, useMediaQuery, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
// eslint-disable-next-line import/no-cycle
import { MovieList, Paginator } from '..';

import { useGetMoviesQuery } from '../../services/TMDB';

const Movies = () => {
  const [page, setPage] = useState(1);
  const { genreIdOrCategoryName, searchQuery } = useSelector((state) => state.currentGenreOrCategory);
  const { data, isFetching, error } = useGetMoviesQuery({ genreIdOrCategoryName, page, searchQuery });
  const lg = useMediaQuery((theme) => theme.breakpoints.only('lg'));

  const numberOfMovies = lg ? 16 : 18;

  if (isFetching) {
    return (
      <Box display="flex" justifyContent="center">
        <CircularProgress size="4rem" />
      </Box>
    );
  }

  if (!data.results.length) {
    return (
      <Box display="flex" alignItems="center" mt="20px">
        <Typography variant="h4">
          No movies that match this name
          <br />
          Please search for something else..
        </Typography>
      </Box>
    );
  }

  if (error) return 'An error has occurred!';

  return (
    <div>
      <MovieList movies={data} numberOfMovies={numberOfMovies} />
      <Paginator currentPage={page} setPage={setPage} totalPages={data?.total_pages} />
    </div>
  );
};

export default Movies;
