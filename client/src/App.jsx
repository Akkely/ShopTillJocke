import { Link, Outlet } from 'react-router-dom';
import { Box, AppBar, Toolbar, Typography, Button } from '@mui/material';

function App() {
  return (
    <>
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to="/">Webbshop</Link>
          </Typography>
          <Button color="inherit">
            <Link to="/products/new">Skapa ny produkt</Link>
          </Button>

          <Button color='inherit'>
							<Link to='/carts'>Varukorg</Link>
				</Button>
        </Toolbar>
      </AppBar>
    </Box>
    <Outlet />
  </>
);
}

export default App;
