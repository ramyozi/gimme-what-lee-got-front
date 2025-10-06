import { useParams } from 'react-router-dom';
import useSWR from 'swr';
import { Loader, Stack, Title, Text, Image, Paper } from '@mantine/core';
import { getItemById } from '../services/api/item';
import type { Item } from '../types';

export default function ItemDetail() {
    const { id } = useParams<{ id: string }>();
    const { data, error, isLoading } = useSWR<Item>(
        id ? ['/item', id] : null,
        () => getItemById(id!)
    );

    if (isLoading) return <Loader />;
    if (error) return <div>Error loading item</div>;
    if (!data) return <div>Item not found</div>;

    return (
        <Paper p="md" withBorder>
            <Stack>
                {data.image && <Image src={data.image} alt={data.title} radius="md" />}
                <Title order={2}>{data.title}</Title>
                <Text>{data.description}</Text>
                {data.category && (
                    <Text size="sm" color="dimmed">
                        Category: {data.category.name}
                    </Text>
                )}
            </Stack>
        </Paper>
    );
}
