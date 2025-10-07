import { useState } from 'react';
import { Box, TextInput, Button, Group } from '@mantine/core';
import type {User} from "../../../../types";
import {patchUserRequest} from "../../../../services/api/account.ts";
import {mutate} from "swr";
import {useAuth} from "../../../../lib/plugin/auth-provider/use-auth.ts";

interface UserUpdateFormProps {
  user: User;
  userId: string;
  onSuccess?: (updatedUser: User) => void;
}

export default function UserUpdateForm({ user, userId, onSuccess }: UserUpdateFormProps) {
    const { refreshUser } = useAuth();
  const [formData, setFormData] = useState({
    username: user.username,
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    try {
      const updated = await patchUserRequest(userId, formData);
      await refreshUser();
      onSuccess?.(updated);
      mutate(() => true);
    } catch (err) {
      console.error('Failed to update user', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box style={{ maxWidth: 400 }}>
      <TextInput
        label="Username"
        value={formData.username}
        onChange={(e) => handleChange('username', e.currentTarget.value)}
        mb="sm"
      />
      <TextInput
        label="First Name"
        value={formData.first_name}
        onChange={(e) => handleChange('first_name', e.currentTarget.value)}
        mb="sm"
      />
      <TextInput
        label="Last Name"
        value={formData.last_name}
        onChange={(e) => handleChange('last_name', e.currentTarget.value)}
        mb="sm"
      />
      <TextInput
        label="Email"
        value={formData.email}
        onChange={(e) => handleChange('email', e.currentTarget.value)}
        mb="sm"
      />
      <Group grow mt="md">
        <Button onClick={handleSubmit} loading={loading}>
          Save
        </Button>
      </Group>
    </Box>
  );
}
