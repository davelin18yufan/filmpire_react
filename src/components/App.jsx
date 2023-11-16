import React from 'react';
import { CssBaseline } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import Box from '@mui/system/Box';
import { Actors, Profile, MovieInformation, Movies, NavBar } from '.';

const App = () => (
  <Box sx={{
    display: 'flex',
    height: '100%' }}
  >
    <CssBaseline />
    <NavBar />
    <Box
      component="main"
      sx={{ flexGrow: '1',
        p: '2rem' }}
    >
      <Box sx={{ height: '70px' }} />
      <Routes>
        <Route exact path="/movie/:id" element={<MovieInformation />} />

        <Route
          exact
          path="/actors/:id"
          element={<Actors />}
        />

        <Route
          exact
          path="/profile/:id"
          element={<Profile />}
        />

        <Route
          exact
          path="/"
          element={<Movies />}
        />
      </Routes>
    </Box>
  </Box>
);
export default App;
