const drawerWidth = 240;

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
