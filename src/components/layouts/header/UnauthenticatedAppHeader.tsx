import { Grid, Box, Button, Image } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import ThemeSwitch from "../ThemeSwitch.tsx";

export default function UnAuthenticatedAppHeader() {
  const navigate = useNavigate();

  return (
    <Box px="md" py="sm" style={{ borderBottom: '1px solid #e0e0e0' }}>
      <Grid align="center" gutter="md">
        <Grid.Col span="auto">
          <Box style={{ display: 'flex', justifyContent: 'flex-start' }}>
            <Image
              src="/logo.png"
              alt="Logo"
              style={{ cursor: 'pointer', maxHeight: 36, width: 'auto' }}
              onClick={() => navigate('/')}
            />
          </Box>
        </Grid.Col>

        <Grid.Col span="auto" style={{ display: 'flex', justifyContent: 'center', gap: 12 }}>
          <Button variant="subtle" onClick={() => navigate('/')}>
            Home
          </Button>
          <Button variant="subtle" onClick={() => navigate('/search')}>
            Search
          </Button>
        </Grid.Col>

        <Grid.Col span="auto" style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
          <Button variant="outline" size="sm" onClick={() => navigate('/login')}>
            Login
          </Button>
          <Button variant="filled" size="sm" onClick={() => navigate('/register')}>
            Register
          </Button>
          <ThemeSwitch />
        </Grid.Col>
      </Grid>
    </Box>
  );
}
