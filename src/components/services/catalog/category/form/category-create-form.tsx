import { z } from 'zod';
import { zodResolver } from 'mantine-form-zod-resolver';
import { useForm } from '@mantine/form';
import { TextInput, Button, Stack } from '@mantine/core';
import type { Category } from '../../../../../types';
import { createCategory } from '../../../../../services/api/category';
import {mutate} from "swr";

const schema = z.object({
  name: z.string().min(2, { message: 'Name should have at least 2 letters' }),
  description: z.string().optional(),
});

type CategoryFormValues = z.infer<typeof schema>;

interface CategoryCreateFormProps {
  onCreated?: (category: Category) => void;
}

export default function CategoryCreateForm({ onCreated }: CategoryCreateFormProps) {
  const form = useForm<CategoryFormValues>({
    initialValues: { name: '', description: '' },
    validate: zodResolver(schema),
  });

  const handleSubmit = async (values: CategoryFormValues) => {
    try {
      const res = await createCategory(values);
      onCreated?.(res);
      mutate(() => true);
      form.reset();
    } catch (error) {
      console.error('Failed to create category', error);
    }
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack>
        <TextInput
          label="Name"
          placeholder="Category name"
          {...form.getInputProps('name')}
        />
        <TextInput
          label="Description"
          placeholder="Optional description"
          {...form.getInputProps('description')}
        />
        <Button type="submit">Create</Button>
      </Stack>
    </form>
  );
}
