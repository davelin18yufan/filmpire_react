import React, { useState } from 'react';
import { Box, CircularProgress, styled, Grid, Typography, Button } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';

import { ArrowBack } from '@mui/icons-material';
import { useGetActorDetailsQuery, useGetMovieByActorQuery } from '../../services/TMDB';
// eslint-disable-next-line import/no-cycle
import { MovieList, Paginator } from '..';

const Avatar = styled('img')(() => ({
  maxWidth: '90%',
  borderRadius: '20px',
  objectFit: 'cover',
  boxShadow: '0.5em 0.5em 1em',
}));

const Actors = () => {
  const go = useNavigate();
  const [page, setPage] = useState(1);
  const { id } = useParams();

  const { data, isFetching, error } = useGetActorDetailsQuery(id);
  const { data: movies } = useGetMovieByActorQuery({ id, page });

  if (isFetching) {
    return (
      <Box display="flex" justifyContent="center">
        <CircularProgress size="8rem" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center">
        <Button onClick={() => go(-1)} startIcon={<ArrowBack />} color="primary">
          Go Back
        </Button>
      </Box>
    );
  }
  return (
    <>
      <Grid container spacing={3}>
        <Grid item lg={5} xl={4}>
          <Avatar src={`https://image.tmdb.org/t/p/w500/${data?.profile_path}`} />
        </Grid>

        <Grid item lg={7} xl={8} sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
          <Typography variant="h2" gutterBottom>
            {data?.name}
          </Typography>
          <Typography variant="h5" gutterBottom>
            Born: {new Date(data?.birthday).toDateString()}
          </Typography>
          <Typography variant="body1" align="justify" paragraph>
            {data?.biography || 'Sorry, no bio yet..'}
          </Typography>

          <Box marginTop="2rem" display="flex" justifyContent="space-around">
            <Button variant="contained" color="primary" target="_blank" href={`https:/www.imdb.com/name/${data?.imdb_id}`}>
              IMDB
            </Button>
            <Button startIcon={<ArrowBack />} onClick={() => go(-1)} color="primary">
              Back
            </Button>
          </Box>
        </Grid>
      </Grid>

      {/* starred movies */}
      <Box margin="2rem 0">
        <Typography variant="h2" align="center" gutterBottom>Movies</Typography>
        {movies && <MovieList movies={movies} numberOfMovies={12} />}
        <Paginator currentPage={page} setPage={setPage} totalPages={movies?.total_pages} />
      </Box>
    </>
  );
};

export default Actors;
