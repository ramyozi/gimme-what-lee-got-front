import { useState } from 'react';
import { Button, Modal, Group } from '@mantine/core';
import { Plus } from 'lucide-react';
import { mutate } from 'swr';
import { SWRMultiSelect } from '../../../../layouts/ui/swr-multi-select';
import type { Category } from '../../../../../types';
import CategoryCreateForm from './category-create-form.tsx';
import type { UseFormReturnType } from '@mantine/form';

interface CategoryMultiSelectorProps {
  form: UseFormReturnType<any>;
  name: string;
}

export default function CategoryMultiSelector({ form, name }: CategoryMultiSelectorProps) {
  const [opened, setOpened] = useState(false);

  return (
    <>
      <Group gap="xs" align="flex-end">
        <SWRMultiSelect<Category>
          url="/catalog/category/"
          name={name}
          formHook={form}
          label="Categories"
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
            const current = form.getValues()[name] ?? [];
            form.setFieldValue(name, [...current, newCategory.id]);
            setOpened(false);
          }}
        />
      </Modal>
    </>
  );
}
