import React from 'react';
import { Typography, Grid, Grow, Tooltip, Rating } from '@mui/material';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';

const StyledLink = styled(Link)(({ theme }) => ({
  alignItems: 'center',
  fontWeight: 'bolder',
  [theme.breakpoints.up('sm')]: {
    display: 'flex',
    flexDirection: 'column',
  },
  textDecoration: 'none',
  '&:hover': {
    cursor: 'pointer',
  },
}));

const StyledImg = styled('img')(() => ({
  borderRadius: '20px',
  height: ' 300px',
  marginBottom: '10px',
  '&:hover': {
    transform: 'scale(1.05)',
  },
}));

const Movie = ({ movie, i }) => (
  <Grid item xs={12} sm={6} md={4} lg={3} xl={2} sx={{ padding: '10px' }}>
    {/* transition one by one */}
    <Grow in key={i} timeout={(i + 1) * 250}>
      <StyledLink to={`/movie/${movie.id}`}>
        <StyledImg
          alt={movie.title}
          src={movie.poster_path ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : 'https://www.fillmurray.com/200/300'}
        />
        <Typography
          variant="h5"
          sx={{ color: 'text.primary',
            textOverflow: 'ellipsis',
            width: '230px',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            marginTop: '10px',
            marginBottom: '0',
            textAlign: 'center' }}
        >
          {movie.title}
        </Typography>
        <Tooltip disableTouchListener title={`${movie.vote_average} / 10`}>
          <div>
            <Rating readOnly value={movie.vote_average / 2} precision={0.1} />
          </div>
        </Tooltip>
      </StyledLink>
    </Grow>
  </Grid>
);

export default Movie;
