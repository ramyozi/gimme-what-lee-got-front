import { useState } from "react";
import { useParams } from "react-router-dom";
import useSWR, { mutate } from "swr";
import {
    Paper,
    Grid,
    Stack,
    Group,
    Title,
    Text,
    Image,
    Badge,
    Button,
    Modal,
    Anchor,
    Divider,
    Loader,
    Rating,
    ScrollArea,
} from "@mantine/core";
import { Heart, Bookmark, ExternalLink } from "lucide-react";
import { getItemById } from "../services/api/item";
import {
    createInteraction,
    deleteInteraction,
    getUserItemInteractions,
} from "../services/api/interaction";
import ItemUpdateForm from "../components/services/catalog/item/form/ItemUpdateForm";
import type { Item, UserInteraction } from "../types";
import { useAuth } from "../lib/plugin/auth-provider/use-auth";
import { notifications } from "@mantine/notifications";
import ManagePeopleForItemForm from "../components/services/catalog/item/form/ManagePeopleForItemForm.tsx";

enum ModalType {
    EDIT_ITEM = "EDIT_ITEM",
    MANAGE_PEOPLE = "MANAGE_PEOPLE",
}

export default function ItemDetail() {
    const { id } = useParams<{ id: string }>();
    const { user } = useAuth();

    const { data: item, error, isLoading } = useSWR<Item>(
        id ? [`/item/${id}`] : null,
        () => getItemById(id!)
    );

    const {
        data: interactions,
        mutate: refreshInteractions,
    } = useSWR<UserInteraction[]>(
        user && id ? [`/interaction/user/${user.id}/item/${id}`] : null,
        () => getUserItemInteractions(user!.id, id!)
    );

    const [activeModal, setActiveModal] = useState<ModalType | null>(null);
    const [loadingAction, setLoadingAction] = useState<"like" | "bookmark" | null>(
        null
    );

    const openModal = (type: ModalType) => setActiveModal(type);
    const closeModal = () => setActiveModal(null);

    // Detect current user interactions
    const likedInteraction = interactions?.find(
        (i) => i.interaction_type === "like"
    );
    const bookmarkedInteraction = interactions?.find(
        (i) => i.interaction_type === "bookmark"
    );
    const hasLiked = !!likedInteraction;
    const hasBookmarked = !!bookmarkedInteraction;

    // Toggle like/bookmark
    const handleToggleInteraction = async (type: "like" | "bookmark") => {
        if (!user || !item) return;
        const isActive = type === "like" ? hasLiked : hasBookmarked;
        const target = type === "like" ? likedInteraction : bookmarkedInteraction;

        setLoadingAction(type);
        try {
            if (isActive && target) {
                await deleteInteraction(target.id);
            } else {
                await createInteraction(user.id, item.id, type);
            }

            await refreshInteractions();
            mutate(() => true);
        } catch (e) {
            notifications.show({
                title: "Error",
                message: `Failed to update ${type} and error ${(e as Error).message}`,
                color: "red",
            });
        } finally {
            setLoadingAction(null);
        }
    };

    if (isLoading)
        return (
            <Group justify="center" p="xl">
                <Loader size="lg" />
            </Group>
        );
    if (error) return <Text color="red">Error loading item</Text>;
    if (!item) return <Text>Item not found</Text>;


    const cleanedDescription = item.description
        ? item.description
            .replace(/<br\s*\/?>/gi, "\n") // Convert <br> to line breaks
            .replace(/<\/p>\s*<p>/gi, "\n\n") // Separate paragraphs
            .replace(/<[^>]+>/g, "") // Remove other tags
            .trim()
        : "No description available.";
    
    return (
        <Paper p="xl" withBorder radius="md" shadow="sm">
            <Grid gutter="xl">
                <Grid.Col span={{ base: 12, md: 5 }}>
                    {item.image ? (
                        <Image
                            src={item.image}
                            alt={item.title}
                            radius="md"
                            h={{ base: 240, md: 320 }}
                            w="100%"
                            fit="contain"
                        />
                    ) : (
                        <Paper
                            p="xl"
                            radius="md"
                            withBorder
                            style={{
                                height: 320,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                background:
                                    "repeating-linear-gradient(135deg, rgba(0,0,0,0.03) 0 10px, transparent 10px 20px)",
                            }}
                        >
                            <Text color="dimmed">No image</Text>
                        </Paper>
                    )}
                </Grid.Col>

                <Grid.Col span={{ base: 12, md: 7 }}>
                    <Stack gap="md">
                        <Group justify="space-between" align="flex-start">
                            <Title order={2}>{item.title}</Title>

                            {user && (
                                <Group>
                                    <Button
                                        size="sm"
                                        variant="light"
                                        onClick={() => openModal(ModalType.EDIT_ITEM)}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant="default"
                                        onClick={() => openModal(ModalType.MANAGE_PEOPLE)}
                                    >
                                        Add Author
                                    </Button>
                                </Group>
                            )}
                        </Group>

                        <Text size="sm" color="dimmed">
                            Category: {item.category?.name ?? "—"}
                        </Text>

                        <Divider />

                        <ScrollArea.Autosize mah={240}>
                            <Text
                                lh={1.6}
                                size="sm"
                                style={{
                                    whiteSpace: "pre-line",
                                    wordBreak: "break-word",
                                }}
                            >
                                {cleanedDescription}
                            </Text>
                        </ScrollArea.Autosize>

                        <Divider variant="dashed" />

                        <Group gap="sm" align="center">
                            <Rating value={item.rating || 0} readOnly />
                            <Text size="sm" color="dimmed">
                                {item.number_of_ratings ?? 0} ratings
                            </Text>
                            <Badge color="yellow" variant="light">
                                Popularity: {Math.round(item.popularity_score ?? 0)}
                            </Badge>
                        </Group>

                        {item.url && (
                            <Anchor href={item.url} target="_blank" size="sm">
                                Visit link <ExternalLink size={14} style={{ marginLeft: 4 }} />
                            </Anchor>
                        )}

                        {item.tags?.length ? (
                            <Group gap="xs">
                                {item.tags.map((t) => (
                                    <Badge key={t} color="gray" variant="outline">
                                        {t}
                                    </Badge>
                                ))}
                            </Group>
                        ) : (
                            <Text size="sm" color="dimmed">
                                No tags
                            </Text>
                        )}

                        {user && (
                            <>
                                <Divider />
                                <Group gap="sm">
                                    <Button
                                        leftSection={<Heart size={16} />}
                                        variant={hasLiked ? "filled" : "light"}
                                        color="red"
                                        loading={loadingAction === "like"}
                                        onClick={() => handleToggleInteraction("like")}
                                    >
                                        {hasLiked ? "Liked" : "Like"}
                                    </Button>

                                    <Button
                                        leftSection={<Bookmark size={16} />}
                                        variant={hasBookmarked ? "filled" : "default"}
                                        loading={loadingAction === "bookmark"}
                                        onClick={() => handleToggleInteraction("bookmark")}
                                    >
                                        {hasBookmarked ? "Bookmarked" : "Bookmark"}
                                    </Button>
                                </Group>
                            </>
                        )}
                    </Stack>
                </Grid.Col>
            </Grid>

            <Modal
                opened={!!activeModal}
                onClose={closeModal}
                title={
                    (activeModal === ModalType.EDIT_ITEM && "Edit Item") ||
                    (activeModal === ModalType.MANAGE_PEOPLE && "Manage People") ||
                    ""
                }
                centered
                size="lg"
                overlayProps={{ blur: 2 }}
            >
                {activeModal === ModalType.EDIT_ITEM && (
                    <ItemUpdateForm item={item} onSuccess={closeModal} />
                )}

                {activeModal === ModalType.MANAGE_PEOPLE && (
                    <ManagePeopleForItemForm item={item} onSuccess={closeModal} />
                )}
            </Modal>
        </Paper>
    );
}