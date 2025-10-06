import { useParams } from 'react-router-dom';
import useSWR from 'swr';
import {
    Loader,
    Stack,
    Title,
    Text,
    Image,
    Paper,
    Group,
    Button,
    Modal,
} from '@mantine/core';
import { useState } from 'react';
import { getItemById } from '../services/api/item';
import ItemUpdateForm from '../components/services/catalog/item/form/ItemUpdateForm';
import type { Item } from '../types';

enum ModalType {
    EDIT_ITEM = 'EDIT_ITEM',
    ADD_AUTHOR = 'ADD_AUTHOR',
}

export default function ItemDetail() {
    const { id } = useParams<{ id: string }>();
    const { data, error, isLoading } = useSWR<Item>(
        id ? ['/item', id] : null,
        () => getItemById(id!)
    );

    const [activeModal, setActiveModal] = useState<ModalType | null>(null);

    const openModal = (type: ModalType) => setActiveModal(type);
    const closeModal = () => setActiveModal(null);

    if (isLoading) return <Loader />;
    if (error) return <div>Error loading item</div>;
    if (!data) return <div>Item not found</div>;

    return (
        <Paper p="lg" withBorder>
            <Stack>
                {data.image && <Image src={data.image} alt={data.title} radius="md" />}

                <Group justify="space-between" align="flex-start">
                    <Title order={2}>{data.title}</Title>

                    <Group>
                        <Button variant="light" onClick={() => openModal(ModalType.EDIT_ITEM)}>
                            Edit
                        </Button>
                        <Button variant="subtle" onClick={() => openModal(ModalType.ADD_AUTHOR)}>
                            Add Author
                        </Button>
                    </Group>
                </Group>

                <Text>{data.description}</Text>
                {data.category && (
                    <Text size="sm" color="dimmed">
                        Category: {data.category.name}
                    </Text>
                )}
                {data.tags?.length ? (
                    <Text size="sm">Tags: {data.tags.join(', ')}</Text>
                ) : (
                    <Text size="sm" color="dimmed">
                        No tags
                    </Text>
                )}
            </Stack>

            <Modal
                opened={!!activeModal}
                onClose={closeModal}
                title={
                    (activeModal === ModalType.EDIT_ITEM && 'Edit Item')
                    || (activeModal === ModalType.ADD_AUTHOR && 'Add Author')
                }
                centered
            >
                {activeModal === ModalType.EDIT_ITEM && (
                    <ItemUpdateForm item={data} onSuccess={closeModal} />
                )}

                {activeModal === ModalType.ADD_AUTHOR && (
                    <div>
                        <Text>Add author form here</Text>
                    </div>
                )}
            </Modal>
        </Paper>
    );
}
