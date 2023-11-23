import React, { useEffect } from 'react';
import { Typography, Button, Box } from '@mui/material';
import { ExitToApp } from '@mui/icons-material';

import { useSelector } from 'react-redux';
import { userSelector } from '../../features/auth';
import { useGetListQuery } from '../../services/TMDB';
// eslint-disable-next-line import/no-cycle
import { RatedCard } from '..';

const Profile = () => {
  const { user } = useSelector(userSelector);
  const { data: favoriteMovies, refetch: refetchFavorites } = useGetListQuery({
    listName: 'favorite',
    accountId: user.id,
    sessionId: localStorage.getItem('session_id'),
    page: 1,
  });
  const { data: watchListMovies, refetch: refetchWatchList } = useGetListQuery({
    listName: 'watchlist',
    accountId: user.id,
    sessionId: localStorage.getItem('session_id'),
    page: 1,
  });

  const logout = () => {
    localStorage.clear();

    window.location.href = '/';
  };

  useEffect(() => {
    refetchFavorites();
    refetchWatchList();
  }, []);

  return (
    <Box>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="h4" gutterBottom>
          My Profile
        </Typography>
        <Button color="inherit" onClick={logout}>
          Logout &nbsp; <ExitToApp />
        </Button>
      </Box>
      {!favoriteMovies?.results?.length && !watchListMovies?.results?.length ? (
        <Typography>
          Add favorites or watchlist for some movies to see them here!
        </Typography>
      ) : (
        <Box>
          <RatedCard title="Favorite Movies" data={favoriteMovies} />
          <RatedCard title="WatchList" data={watchListMovies} />
        </Box>
      )}
    </Box>
  );
};

export default Profile;
