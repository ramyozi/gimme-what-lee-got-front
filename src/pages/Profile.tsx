import { Box, Button, Title } from '@mantine/core';
import { useAuth } from '../lib/plugin/auth-provider';

export default function Profile() {
  const { user, logout } = useAuth();

  return (
    <Box px="md" py="lg" style={{ maxWidth: 600, margin: '0 auto' }}>
      <Title order={2} mb="md">
        Profile
      </Title>

      <Box mb="lg">
        <p><strong>Username:</strong> {user?.username}</p>
        <p><strong>Email:</strong> {user?.email}</p>
      </Box>

      <Button color="red" fullWidth onClick={logout}>
        Logout
      </Button>
    </Box>
  );
}
