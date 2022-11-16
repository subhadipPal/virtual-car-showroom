import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

interface IHeaderToolbar {
  toggleSideNav: (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => void
}

export default function HeaderToolbar({toggleSideNav}: IHeaderToolbar) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon onClick={toggleSideNav(true)}/>
          </IconButton>
          <Typography>
            Virtual Car Showroom
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}