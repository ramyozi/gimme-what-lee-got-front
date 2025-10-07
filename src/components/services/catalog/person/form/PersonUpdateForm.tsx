import { useState, useEffect } from "react";
import {
    Button,
    Stack,
    TextInput,
    Textarea,
    Paper,
    Group,
    Title,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { z } from "zod";
import { notifications } from "@mantine/notifications";
import type { Person } from "../../../../../types";
import { mutate } from "swr";
import {updatePerson} from "../../../../../services/api/person.ts";

const schema = z.object({
    name: z.string().min(2, "Name is required"),
    bio: z.string().optional(),
    website: z
        .string()
        .url("Invalid URL")
        .optional()
        .or(z.literal("")),
});

interface PersonUpdateFormProps {
    person: Person;
    onSuccess?: (person: Person) => void;
}

export default function PersonUpdateForm({
                                             person,
                                             onSuccess,
                                         }: PersonUpdateFormProps) {
    const [saving, setSaving] = useState(false);

    const form = useForm({
        initialValues: {
            name: person.name || "",
            bio: person.bio || "",
            website: person.website || "",
        },
        validate: zodResolver(schema as any),
    });

    useEffect(() => {
        form.setValues({
            name: person.name || "",
            bio: person.bio || "",
            website: person.website || "",
        });
    }, [person]);

    const handleSubmit = async (values: typeof form.values) => {
        setSaving(true);
        try {
            const updated = await updatePerson(person.id, values);
            notifications.show({
                title: "Person updated",
                message: `"${updated.name}" has been successfully updated.`,
                color: "green",
            });
            onSuccess?.(updated);
            mutate("/person");
        } catch (err) {
            console.error(err);
            notifications.show({
                title: "Error",
                message: "Failed to update person",
                color: "red",
            });
        } finally {
            setSaving(false);
        }
    };

    return (
        <Paper withBorder p="lg" radius="md" shadow="sm">
            <Stack>
                <Title order={4}>Edit Person</Title>
                <form onSubmit={form.onSubmit(handleSubmit)}>
                    <Stack>
                        <TextInput label="Name" required {...form.getInputProps("name")} />
                        <Textarea label="Bio" minRows={3} {...form.getInputProps("bio")} />
                        <TextInput label="Website" {...form.getInputProps("website")} />
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
