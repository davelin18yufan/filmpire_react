const drawerWidth = '240px';

export const classes = (theme) => ({
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  drawPaper: {
    width: drawerWidth,
  },
});
