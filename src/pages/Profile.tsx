import { Box, Button, Title } from '@mantine/core';
import { useAuth } from '../lib/plugin/auth-provider';
import UserUpdateForm from "../components/services/accounts/form/user-update-form.tsx";

export default function Profile() {
  const { user, logout } = useAuth();
  if (!user) return <div>Loading...</div>;

  return (
    <Box px="md" py="lg" style={{ maxWidth: 600, margin: '0 auto' }}>
      <Title order={2} mb="md">
        Profile
      </Title>

            <UserUpdateForm user={user} userId={user.id} onSuccess={(updated) => console.log('Updated:', updated)} />

      <Button color="red" fullWidth onClick={logout}>
        Logout
      </Button>
    </Box>
  );
}
