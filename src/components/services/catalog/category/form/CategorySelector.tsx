import { useState } from 'react';
import useSWR, { mutate } from 'swr';
import { MultiSelect, Button, Loader, Modal, Group } from '@mantine/core';
import { Plus } from 'lucide-react';
import { getCategories } from '../../../../../services/api/category';
import CategoryCreateForm from './CategoryCreateForm';
import type { Category } from "../../../../../types";

interface CategorySelectorProps {
  value: string[];
  onChange: (ids: string[]) => void;
}

export default function CategorySelector({ value, onChange }: CategorySelectorProps) {
  const { data, error } = useSWR('/categories', getCategories);
  const [opened, setOpened] = useState(false);

  if (!data) return <Loader />;
  if (error) return <div>Error loading categories</div>;

  const options = Array.isArray(data)
    ? data.map(c => ({ value: c.id, label: c.name }))
    : [];

  return (
    <>
      <Group gap="xs" align="flex-end">
        <MultiSelect
          label="Categories"
          placeholder="Choose..."
          data={options}
          value={value}
          onChange={onChange}
          searchable
          nothingFoundMessage="No categories"
          clearable
          w={300}
        />
        <Button
          variant="light"
          size="sm"
          onClick={() => setOpened(true)}
          aria-label="Create category"
        >
          <Plus size={18} />
        </Button>
      </Group>

      <Modal opened={opened} onClose={() => setOpened(false)} title="Create category">
        <CategoryCreateForm
          onCreated={(newCategory: Category) => {
            mutate('/categories');
            onChange([...value, newCategory.id]);
            setOpened(false);
          }}
        />
      </Modal>
    </>
  );
}
