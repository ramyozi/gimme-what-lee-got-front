import {
    Anchor,
    AppShell,
    Badge,
    Button,
    Card,
    Grid,
    Group,
    Loader,
    Paper,
    Stack,
    Table,
    Text,
    Title,
} from "@mantine/core";
import {useAuth} from "../lib/plugin/auth-provider/use-auth";
import useSWR from "swr";
import {getItemsPaginated, getSuggestedItems} from "../services/api/item";
import type {Item} from "../types";

export default function Home() {
    const {user, logout} = useAuth();

    // fetch des items
    const {data: paginated, error, isLoading} = useSWR(
        "/catalog/item/",
        getItemsPaginated
    );
    const items = paginated?.results ?? [];

    // fetch des suggestions
    const {data: suggested, isLoading: loadingSuggestions} = useSWR<Item[]>(
        user ? "/catalog/item/suggestions/" : null,
        getSuggestedItems
    );


    // Trier la list
    const topComics = items
        ?.slice()
        .sort((a, b) => (b.popularity_score ?? 0) - (a.popularity_score ?? 0))
        .slice(0, 5);

    const newestComics = items
        ?.slice()
        .sort(
            (a, b) =>
                new Date(b.created_at ?? "").getTime() -
                new Date(a.created_at ?? "").getTime()
        )
        .slice(0, 5);

    return (
        <AppShell padding="xl">
            <Grid gutter="xl">
                <Grid.Col span={{base: 12, md: 9}}>
                    <Stack gap="lg">                        {user ? (
                        <Paper withBorder p="lg" radius="md" shadow="xs">
                            <Group justify="space-between">
                                <div>
                                    <Title order={2}>Welcome back, {user.username}</Title>
                                    <Text color="dimmed" size="sm">
                                        Explore trending and new comics based on your interests.
                                    </Text>
                                </div>
                                <Button variant="outline" color="red" onClick={logout}>
                                    Logout
                                </Button>
                            </Group>
                        </Paper>
                    ) : (
                        <Paper withBorder p="lg" radius="md" shadow="xs">
                            <Title order={2}>Welcome to the Catalog!</Title>
                            <Text color="dimmed">
                                Log in to get personalized recommendations and track your favorites.
                            </Text>
                        </Paper>
                    )}
                        {isLoading && (
                            <Group justify="center" p="lg">
                                <Loader size="lg"/>
                            </Group>
                        )}
                        {error && (
                            <Text color="red" ta="center">
                                Failed to load comics.
                            </Text>
                        )}
                        {!isLoading && topComics && (
                            <Paper withBorder p="lg" radius="md" shadow="sm">
                                <Title order={3} mb="sm">
                                    🔥 Top Comics
                                </Title>
                                <Table striped highlightOnHover>
                                    <Table.Thead>
                                        <Table.Tr>
                                            <Table.Th>Title</Table.Th>
                                            <Table.Th>Category</Table.Th>
                                            <Table.Th>Popularity</Table.Th>
                                        </Table.Tr>
                                    </Table.Thead>
                                    <Table.Tbody>
                                        {topComics.map((comic) => (
                                            <Table.Tr key={comic.id}>
                                                <Table.Td>
                                                    <Anchor href={`/item/${comic.id}`}>{comic.title}</Anchor>
                                                </Table.Td>
                                                <Table.Td>{comic.category?.name ?? "—"}</Table.Td>
                                                <Table.Td>
                                                    <Badge color="yellow" variant="filled">
                                                        {Math.round(comic.popularity_score ?? 0)}
                                                    </Badge>
                                                </Table.Td>
                                            </Table.Tr>
                                        ))}
                                    </Table.Tbody>
                                </Table>
                            </Paper>
                        )}
                        {!isLoading && newestComics && (
                            <Paper withBorder p="lg" radius="md" shadow="sm">
                                <Title order={3} mb="sm">
                                    🆕 Newly Added
                                </Title>
                                <Table striped highlightOnHover>
                                    <Table.Thead>
                                        <Table.Tr>
                                            <Table.Th>Title</Table.Th>
                                            <Table.Th>Category</Table.Th>
                                            <Table.Th>Added</Table.Th>
                                        </Table.Tr>
                                    </Table.Thead>
                                    <Table.Tbody>
                                        {newestComics.map((comic) => (
                                            <Table.Tr key={comic.id}>
                                                <Table.Td>
                                                    <Anchor href={`/item/${comic.id}`}>{comic.title}</Anchor>
                                                </Table.Td>
                                                <Table.Td>{comic.category?.name ?? "—"}</Table.Td>
                                                <Table.Td>
                                                    {new Date(comic.created_at ?? "").toLocaleDateString()}
                                                </Table.Td>
                                            </Table.Tr>
                                        ))}
                                    </Table.Tbody>
                                </Table>
                            </Paper>
                        )}
                    </Stack>
                </Grid.Col>
                <Grid.Col span={{base: 12, md: 3}}>
                    <Paper withBorder p="lg" radius="md" shadow="sm">
                        <Title order={4} mb="sm">
                            🎯 Suggested for You
                        </Title>

                        {user ? (
                            loadingSuggestions ? (
                                <Group justify="center" p="md">
                                    <Loader size="sm"/>
                                </Group>
                            ) : suggested && suggested.length > 0 ? (
                                <Stack gap="xs">
                                    {suggested.map((s) => (
                                        <Card
                                            key={s.id}
                                            withBorder
                                            shadow="xs"
                                            radius="md"
                                            p="sm"
                                            component="a"
                                            href={`/item/${s.id}`}
                                        >
                                            <Text fw={500} size="sm" truncate="end">
                                                {s.title}
                                            </Text>
                                            <Text size="xs" color="dimmed">
                                                {s.category?.name ?? "Uncategorized"}
                                            </Text>
                                        </Card>
                                    ))}
                                </Stack>
                            ) : (
                                <Text size="sm" color="dimmed">
                                    No suggestions yet.
                                </Text>
                            )
                        ) : (
                            <Text size="sm" color="dimmed">
                                Log in to see your personalized recommendations.
                            </Text>
                        )}
                    </Paper>
                </Grid.Col>
            </Grid>
        </AppShell>
    );
}
