import { AppBar, Box, Button, Toolbar } from '@mui/material';
import { Link } from 'react-router-dom';

const navItems = [
  { href: '/', data: '메인' },
  { href: '/todos', data: 'TODO목록' },
  { href: '/auth', data: '로그인' },
];

function Navigation() {
  return (
    <AppBar component="nav" position="static">
      <Toolbar>
        <Box sx={{}}>
          {navItems.map(({ href, data }) => (
            <Link to={href} style={{ textDecoration: 'none' }} key={data}>
              <Button key={data} sx={{ color: '#fff' }}>
                {data}
              </Button>
            </Link>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
export default Navigation;
