import { Box, Grid, Card, Stack, Title, Button, Text } from '@mantine/core';
import UserUpdateForm from "../components/services/accounts/form/user-update-form.tsx";
import {useAuth} from "../lib/plugin/auth-provider/use-auth.ts";

export default function Profile() {
  const { user, logout } = useAuth();
  if (!user) return <div>Loading...</div>;

  return (
    <Box px="md" py="lg" style={{ maxWidth: 900, margin: '0 auto' }}>
      <Title order={2} mb="lg">
        Profile
      </Title>
        {/* TODO: à améliorer plus tard */}
      <Grid gutter="xl">
        <Grid.Col span={3}>
          <Stack>
            <Card shadow="sm" p="sm" withBorder>
              <Text w={500}>Account</Text>
            </Card>
            <Card shadow="sm" p="sm" withBorder>
              <Text w={500}>Security</Text>
            </Card>
            <Card shadow="sm" p="sm" withBorder>
              <Text w={500}>Notifications</Text>
            </Card>
          </Stack>
        </Grid.Col>

        <Grid.Col span={9}>
          <Card shadow="sm" p="lg" withBorder>
            <UserUpdateForm
              user={user}
              userId={user.id}
              onSuccess={(updated) => console.log('Updated:', updated)}
            />
          </Card>

          <Button color="red" fullWidth mt="md" onClick={logout}>
            Logout
          </Button>
        </Grid.Col>
      </Grid>
    </Box>
  );
}
