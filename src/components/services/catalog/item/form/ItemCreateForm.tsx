import { useState } from 'react';
import {
    Button,
    Stack,
    TextInput,
    Textarea,
    TagsInput,
    Paper,
    Group,
    Title,
} from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { z } from 'zod';
import { createItem } from '../../../../../services/api/item';
import { notifications } from '@mantine/notifications';
import { useNavigate } from 'react-router-dom';
import type { Item } from '../../../../../types';

const schema = z.object({
    title: z.string().min(2, 'Title is required'),
    description: z.string().min(5, 'Description is required'),
    url: z.string().url('Invalid URL').optional().or(z.literal('')),
    tags: z.array(z.string()).default([]),
});

export default function ItemCreateForm() {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const form = useForm<{
        title: string;
        description: string;
        url: string;
        tags: string[];
    }>({
        initialValues: { title: '', description: '', url: '', tags: [] },
        validate: zodResolver(schema as any),
    });

    const handleSubmit = async (values: typeof form.values) => {
        setLoading(true);
        try {
            const newItem: Item = await createItem(values);
            notifications.show({
                title: 'Item created',
                message: `"${newItem.title}" was successfully added.`,
                color: 'green',
            });
            navigate(`/item/${newItem.id}`);
        } catch (err) {
            console.error('Failed to create item', err);
            notifications.show({
                title: 'Error',
                message: 'Failed to create item',
                color: 'red',
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Paper withBorder p="lg" radius="md" shadow="sm">
            <Stack>
                <Title order={3}>Create Item</Title>

                <form onSubmit={form.onSubmit(handleSubmit)}>
                    <Stack>
                        <TextInput
                            label="Title"
                            placeholder="Enter item title"
                            required
                            {...form.getInputProps('title')}
                        />

                        <Textarea
                            label="Description"
                            placeholder="Item description"
                            minRows={4}
                            required
                            {...form.getInputProps('description')}
                        />

                        <TextInput
                            label="URL"
                            placeholder="https://..."
                            {...form.getInputProps('url')}
                        />

                        <TagsInput
                            label="Tags"
                            placeholder="Add or create tags..."
                            value={form.values.tags}
                            onChange={(v: string[]) => form.setFieldValue('tags', v)}
                            clearable
                            splitChars={[',', ' ']}
                        />

                        <Group justify="flex-end" mt="md">
                            <Button type="submit" loading={loading}>
                                Create
                            </Button>
                        </Group>
                    </Stack>
                </form>
            </Stack>
        </Paper>
    );
}
