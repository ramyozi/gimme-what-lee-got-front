import { useState } from 'react';
import { Button, Modal, Group } from '@mantine/core';
import { Plus } from 'lucide-react';
import { mutate } from 'swr';
import { SWRSelect } from '../../../../layouts/ui/swr-select';
import type { Category } from '../../../../../types';
import CategoryCreateForm from './category-create-form.tsx';
import type { UseFormReturnType } from '@mantine/form';

interface CategorySelectorProps {
  value?: string | null;
  onChange?: (id: string | null) => void;
  formHook?: UseFormReturnType<any>;
  name?: string;
}

export default function CategorySelector({
  value = null,
  onChange,
  formHook,
  name,
}: CategorySelectorProps) {
  const [opened, setOpened] = useState(false);

  return (
    <>
      <Group gap="xs" align="flex-end">
        <SWRSelect<Category>
          url="/catalog/category/"
          selectedItemId={value}
          onChange={onChange}
          formHook={formHook}
          name={name}
          label="Category"
          placeholder="Choose..."
          nothingFoundMessage="No categories"
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
            mutate('/catalog/category/');

            if (formHook && name) {
              formHook.setFieldValue(name, newCategory.id);
            } else if (onChange) {
              onChange(newCategory.id);
            }

            setOpened(false);
          }}
        />
      </Modal>
    </>
  );
}
