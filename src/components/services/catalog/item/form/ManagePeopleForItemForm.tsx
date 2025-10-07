import { useState } from "react";
import { useForm } from "@mantine/form";
import type { Item } from "../../../../../types";
import { updateItem } from "../../../../../services/api/item.ts";
import { notifications } from "@mantine/notifications";
import { mutate } from "swr";
import { Button, Group, Stack, Title, Divider, Text } from "@mantine/core";
import PersonMultiSelector from "../../person/form/PersonMultiSelector.tsx";

interface ManagePeopleForItemFormProps {
    item: Item;
    onSuccess: () => void;
}

export default function ManagePeopleForItemForm({
                                                    item,
                                                    onSuccess,
                                                }: ManagePeopleForItemFormProps) {
    const [saving, setSaving] = useState(false);

    const form = useForm({
        initialValues: {
            authors: item.authors?.map((a) => a.id) ?? [],
            producers: item.producers?.map((p) => p.id) ?? [],
            contributors: item.contributors?.map((c) => c.id) ?? [],
        },
    });

    const handleSubmit = async (values: typeof form.values) => {
        setSaving(true);
        try {
            await updateItem(item.id, values);
            notifications.show({
                title: "Updated",
                message: "People successfully updated.",
                color: "green",
            });
            mutate(() => true);
            onSuccess();
        } catch (err) {
            console.error(err);
            notifications.show({
                title: "Error",
                message: "Failed to update people.",
                color: "red",
            });
        } finally {
            setSaving(false);
        }
    };

    return (
        <form onSubmit={form.onSubmit(handleSubmit)}>
            <Stack>
                <Title order={4}>Manage People</Title>
                <Text size="sm" color="dimmed">
                    Link existing people as authors, producers, or contributors.
                </Text>

                <Divider my="sm" />

                <PersonMultiSelector form={form} name="authors" label="Authors" />
                <PersonMultiSelector form={form} name="producers" label="Producers" />
                <PersonMultiSelector
                    form={form}
                    name="contributors"
                    label="Contributors"
                />

                <Group justify="flex-end" mt="md">
                    <Button type="submit" loading={saving}>
                        Save Changes
                    </Button>
                </Group>
            </Stack>
        </form>
    );
}
