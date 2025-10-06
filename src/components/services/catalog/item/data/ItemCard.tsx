import { Card, Text, Anchor } from '@mantine/core';
import { Link } from 'react-router-dom';
import type { Item } from '../../../../../types';

interface ItemCardProps {
    item: Item;
}

export default function ItemCard({ item }: ItemCardProps) {
    return (
        <Card shadow="sm" p="lg" radius="md" withBorder>
            <Anchor component={Link} to={`/item/${item.id}`} underline="hover">
                <Text size="lg" fw={500}>{item.title}</Text>
            </Anchor>
            <Text size="sm" color="dimmed" mb="sm">
                {item.description?.slice(0, 120) || 'No description'}
            </Text>
        </Card>
    );
}
