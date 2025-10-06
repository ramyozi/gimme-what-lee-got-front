import { useMemo, useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import useSWR from 'swr';
import { z } from 'zod';
import { zodResolver } from 'mantine-form-zod-resolver';
import { useForm } from '@mantine/form';
import {
  TextInput,
  Button,
  Stack,
  Grid,
  Loader,
  Pagination,
  Paper,
  Group,
} from '@mantine/core';
import { searchItems } from '../services/api/item';
import ItemCard from '../components/services/catalog/item/data/ItemCard';
import CategoryMultiSelector from '../components/services/catalog/category/form/category-multi-selector';
import type { SearchResponse } from '../types';

const schema = z.object({
  q: z.string().trim().max(200).optional().or(z.literal('')),
  categories: z.array(z.string()).default([]),
});

type SearchForm = z.infer<typeof schema>;

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams();

  const initialQ = searchParams.get('q') ?? '';
  const initialCats = searchParams.get('categories')?.split(',').filter(Boolean) ?? [];
  const initialPage = Number(searchParams.get('page') ?? 1);

  const form = useForm<SearchForm>({
    initialValues: { q: initialQ, categories: initialCats },
    validate: zodResolver(schema),
  });

  const [page, setPage] = useState(initialPage);
  const [params, setParams] = useState<SearchForm>({ q: initialQ, categories: initialCats });

  useEffect(() => {
    const urlParams: Record<string, string> = {};
    if (params.q) urlParams.q = params.q;
    if (params.categories?.length) urlParams.categories = params.categories.join(',');
    if (page > 1) urlParams.page = String(page);
    setSearchParams(urlParams, { replace: true });
  }, [params, page]);

  const swrKey = useMemo(
      () => ['/search', params.q ?? '', (params.categories ?? []).join(','), page],
      [params.q, params.categories, page]
  );

  const { data, error, isLoading, isValidating } = useSWR<SearchResponse>(
      swrKey,
      () => searchItems({ q: params.q, categories: params.categories, page }),
      {
        revalidateOnFocus: false, // Don’t reload on window refocus
        keepPreviousData: true,   // Keep old data while fetching new
      }
  );

  const handleSubmit = (values: SearchForm) => {
    const parsed = schema.parse(values);
    setPage(1);
    setParams(parsed);
  };

  const resultsLoading = isLoading || isValidating;

  return (
      <Stack p="md" gap="md">
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Group align="flex-end" gap="sm" wrap="nowrap">
            <TextInput
                label="Search"
                placeholder="Search items..."
                {...form.getInputProps('q')}
                style={{ flex: 1 }}
            />
            <Button type="submit">Search</Button>
          </Group>
          <CategoryMultiSelector form={form} name="categories" />
        </form>

        <Paper withBorder p="md">
          {error && <div>Error loading items</div>}
          {resultsLoading && (
              <Group justify="center" p="md"><Loader /></Group>
          )}

          {!resultsLoading && data?.results?.length ? (
              <Grid>
                {data.results.map((item) => (
                    <Grid.Col key={item.id} span={{ base: 12, sm: 6, md: 4 }}>
                      <ItemCard item={item} />
                    </Grid.Col>
                ))}
              </Grid>
          ) : null}

          {!resultsLoading && data && Array.isArray(data.results) && data.results.length === 0 && (
              <div>No items found</div>
          )}

          {data && data.count > 20 && (
              <Group justify="center" mt="md">
                <Pagination
                    value={page}
                    onChange={(p) => setPage(p)}
                    total={Math.ceil(data.count / 20)}
                />
              </Group>
          )}
        </Paper>
      </Stack>
  );
}
