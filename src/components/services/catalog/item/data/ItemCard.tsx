import {
    Card,
    Text,
    Image,
    Group,
    Badge,
    Stack,
    Tooltip,
} from "@mantine/core";
import { Link } from "react-router-dom";
import { Tag } from "lucide-react";
import type { Item } from "../../../../../types";

interface ItemCardProps {
    item: Item;
}

export default function ItemCard({ item }: ItemCardProps) {
    const cleanDescription = item.description
        ? item.description.replace(/<[^>]+>/g, "").trim()
        : "";

    const shortDesc =
        cleanDescription.length > 100
            ? cleanDescription.slice(0, 100).trim() + "…"
            : cleanDescription || "No description available.";

    return (
        <Card
            withBorder
            radius="md"
            shadow="sm"
            p="sm"
            component={Link}
            to={`/item/${item.id}`}
            style={{
                textDecoration: "none",
                transition: "transform 0.15s ease, box-shadow 0.15s ease",
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-3px)";
                e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)";
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
            }}
        >
            {item.image && (
                <Image
                    src={item.image}
                    alt={item.title}
                    height={160}
                    fit="cover"
                    radius="sm"
                    mb="sm"
                />
            )}

            <Stack gap={6}>
                <Group justify="space-between">
                    <Text fw={600} size="sm" lineClamp={1}>
                        {item.title}
                    </Text>
                    {item.category && (
                        <Badge size="xs" color="blue" variant="light" radius="sm">
                            {item.category.name}
                        </Badge>
                    )}
                </Group>

                <Text size="xs" color="dimmed" lineClamp={2}>
                    {shortDesc}
                </Text>

                {item.tags && item.tags.length > 0 && (
                    <Group gap={4} mt={4} wrap="wrap">
                        <Tag size={14} color="#868e96" />
                        {item.tags.slice(0, 3).map((tag) => (
                            <Tooltip label={tag} key={tag} openDelay={200}>
                                <Badge
                                    color="gray"
                                    size="xs"
                                    radius="sm"
                                    variant="light"
                                    style={{ textTransform: "none" }}
                                >
                                    {tag.length > 12 ? tag.slice(0, 12) + "…" : tag}
                                </Badge>
                            </Tooltip>
                        ))}
                        {item.tags.length > 3 && (
                            <Text size="xs" color="dimmed">
                                +{item.tags.length - 3} more
                            </Text>
                        )}
                    </Group>
                )}
            </Stack>
        </Card>
    );
}
