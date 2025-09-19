import { useForm } from '@mantine/form';
import { TextInput, Button, Stack } from '@mantine/core';
import type { Category } from "../../../../../types";
import { createCategory } from "../../../../../services/api/category.ts";

interface CategoryCreateFormProps {
  onCreated?: (category: Category) => void;
}

export default function CategoryCreateForm({ onCreated }: CategoryCreateFormProps) {
  const form = useForm({
    initialValues: { name: '', description: '' },
  });

  const handleSubmit = async (values: { name: string; description: string }) => {
    try {
      const res = await createCategory(values);
      onCreated?.(res);
      form.reset();
    } catch (error) {
      console.error('Failed to create category', error);
    }
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack>
        <TextInput label="Name" {...form.getInputProps('name')} required />
        <TextInput label="Description" {...form.getInputProps('description')} />
        <Button type="submit">Create</Button>
      </Stack>
    </form>
  );
}
