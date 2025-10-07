import { useState, useEffect } from 'react';
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
import { updateItem } from '../../../../../services/api/item';
import { notifications } from '@mantine/notifications';
import type { Item } from '../../../../../types';
import {mutate} from "swr";

const schema = z.object({
    title: z.string().min(2, 'Title is required'),
    description: z.string().min(5, 'Description is required'),
    url: z.union([z.string().url('Invalid URL').optional(), z.literal('')]),
    tags: z.array(z.string()).default([]),
});

interface ItemUpdateFormProps {
    item: Item;
    onSuccess?: (item: Item) => void;
}

export default function ItemUpdateForm({ item, onSuccess }: ItemUpdateFormProps) {
    const [saving, setSaving] = useState(false);

    const form = useForm({
        initialValues: {
            title: item.title || '',
            description: item.description || '',
            url: item.url || '',
            tags: item.tags || [],
        },
        validate: zodResolver(schema as any),
    });

    useEffect(() => {
        form.setValues({
            title: item.title || '',
            description: item.description || '',
            url: item.url || '',
            tags: item.tags || [],
        });
    }, [item]);

    const handleSubmit = async (values: typeof form.values) => {
        setSaving(true);
        try {
            const updated = await updateItem(item.id, values);
            notifications.show({
                title: 'Item updated',
                message: `"${updated.title}" has been successfully updated.`,
                color: 'green',
            });
            onSuccess?.(updated);
            mutate(() => true);
        } catch (err) {
            console.error(err);
            notifications.show({
                title: 'Error',
                message: 'Failed to update item',
                color: 'red',
            });
        } finally {
            setSaving(false);
        }
    };

    return (
        <Paper withBorder p="lg" radius="md" shadow="sm">
            <Stack>
                <Title order={4}>Edit Item</Title>
                <form onSubmit={form.onSubmit(handleSubmit)}>
                    <Stack>
                        <TextInput label="Title" {...form.getInputProps('title')} />
                        <Textarea
                            label="Description"
                            minRows={4}
                            {...form.getInputProps('description')}
                        />
                        <TextInput label="URL" {...form.getInputProps('url')} />
                        <TagsInput
                            label="Tags"
                            placeholder="Add or create tags..."
                            value={form.values.tags}
                            onChange={(v) => form.setFieldValue('tags', v)}
                            clearable
                            splitChars={[',', ' ']}
                        />
                        <Group justify="flex-end" mt="md">
                            <Button type="submit" loading={saving}>
                                Save Changes
                            </Button>
                        </Group>
                    </Stack>
                </form>
            </Stack>
        </Paper>
    );
}
