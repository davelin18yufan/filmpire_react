import React from 'react';
import { CssBaseline } from '@mui/material';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import Box from '@mui/system/Box';
import { Actors, Profile, MovieInformation, Movies, NavBar } from '.';

const Root = () => (
  <Box
    sx={{
      display: 'flex',
      height: '100%',
    }}
  >
    <CssBaseline />
    <NavBar />
    <Box component="main" sx={{ flexGrow: '1', p: '2rem' }}>
      <Box sx={{ height: '70px' }} />
      <Outlet />
    </Box>
  </Box>
);

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      { path: '', element: <Movies /> },
      { path: 'movie/:id', element: <MovieInformation /> },
      { path: 'profile/:id', element: <Profile /> },
      { path: 'actors/:id', element: <Actors /> },
    ],
  },
]);

const App = () => <RouterProvider router={router} />;

export default App;
