import { useState } from "react";
import { Button, Modal, Group } from "@mantine/core";
import { Plus } from "lucide-react";
import { mutate } from "swr";
import { SWRMultiSelect } from "../../../../layouts/ui/swr-multi-select";
import type { Person } from "../../../../../types";
import PersonCreateForm from "./PersonCreateForm";
import type { UseFormReturnType } from "@mantine/form";

interface PersonMultiSelectorProps {
    form: UseFormReturnType<any>;
    name: string;
    label?: string;
}

export default function PersonMultiSelector({
                                                form,
                                                name,
                                                label = "Persons",
                                            }: PersonMultiSelectorProps) {
    const [opened, setOpened] = useState(false);

    const handleCreated = (newPerson: Person) => {
        mutate(() => true);
        const current = form.getValues()[name] ?? [];
        form.setFieldValue(name, [...current, newPerson.id]);
        setOpened(false);
    };

    const closeModal = () => {
        setOpened(false);
    };

    return (
        <>
            <Group gap="xs" align="flex-end">
                <SWRMultiSelect<Person>
                    url="/catalog/person/"
                    name={name}
                    formHook={form}
                    label={label}
                    placeholder="Select..."
                    nothingFoundMessage="No persons found"
                />
                <Button
                    variant="light"
                    size="sm"
                    onClick={(e) => {
                        e.stopPropagation();
                        setOpened(true);
                    }}
                    aria-label="Create person"
                >
                    <Plus size={18} />
                </Button>
            </Group>

            <Modal
                opened={opened}
                onClose={closeModal}
                title={`Create ${label.toLowerCase()}`}
                centered
                withinPortal // isolates modal
                keepMounted={false}
                closeOnClickOutside={false}
                overlayProps={{ blur: 3 }}
            >
                <PersonCreateForm onSuccess={handleCreated} />
            </Modal>
        </>
    );
}
