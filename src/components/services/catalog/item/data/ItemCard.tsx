import { Card, Text } from '@mantine/core';
import type {Item} from "../../../../../types";

interface ItemCardProps {
  item: Item;
}

export default function ItemCard({ item }: ItemCardProps) {
  return (
    <Card shadow="sm" p="lg" radius="md" withBorder>
      <Text size="lg">{item.title}</Text>
      <Text size="sm" color="dimmed" mb="sm">{item.description?.slice(0, 100)}</Text>
    </Card>
  );
}
