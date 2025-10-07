import { useState } from "react";
import { useForm } from "@mantine/form";
import { TextInput, Textarea, Button, Stack, Group } from "@mantine/core";
import { z } from "zod";
import { zodResolver } from "mantine-form-zod-resolver";
import { createPerson } from "../../../../../services/api/person";
import { notifications } from "@mantine/notifications";
import type { Person } from "../../../../../types";
import {mutate} from "swr";

const schema = z.object({
    name: z.string().min(2, "Name is required"),
    bio: z.string().optional(),
    website: z.string().url("Invalid URL").optional().or(z.literal("")),
});

export default function PersonCreateForm({
                                             onSuccess,
                                         }: {
    onSuccess: (person: Person) => void;
}) {
    const [saving, setSaving] = useState(false);

    const form = useForm({
        initialValues: { name: "", bio: "", website: "" },
        validate: zodResolver(schema),
    });

    const handleSubmit = async () => {
        const parsed = schema.safeParse(form.values);
        if (!parsed.success) {
            form.validate();
            return;
        }

        try {
            setSaving(true);
            const person = await createPerson(parsed.data);
            notifications.show({
                title: "Person created",
                message: `"${person.name}" has been added.`,
                color: "green",
            });
            onSuccess(person);
            mutate(() => true);
        } catch (err) {
            console.error(err);
            notifications.show({
                title: "Error",
                message: "Failed to create person.",
                color: "red",
            });
        } finally {
            setSaving(false);
        }
    };

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
            }}
        >
            <Stack>
                <TextInput label="Name" required {...form.getInputProps("name")} />
                <Textarea label="Bio" minRows={3} {...form.getInputProps("bio")} />
                <TextInput label="Website" {...form.getInputProps("website")} />

                <Group justify="flex-end" mt="md">
                    <Button
                        type="button"
                        loading={saving}
                        onClick={handleSubmit}
                    >
                        Create
                    </Button>
                </Group>
            </Stack>
        </form>
    );
}
