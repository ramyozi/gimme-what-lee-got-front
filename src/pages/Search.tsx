import { useState } from 'react';
import useSWR from 'swr';
import { TextInput, Button, Stack, Grid, Loader, Pagination } from '@mantine/core';
import { searchItems } from '../services/api/item';
import ItemCard from '../components/services/catalog/item/data/ItemCard';
import type { SearchResponse } from '../types';
import CategorySelector from "../components/services/catalog/category/form/CategorySelector.tsx";

export default function Search() {
  const [query, setQuery] = useState('');
  const [categories, setCategories] = useState<string[]>([]);
  const [page, setPage] = useState(1);

  const { data, isLoading, error } = useSWR<SearchResponse>(
    ['/search', query, categories, page],
    () => searchItems({ q: query, categories, page })
  );

  const handleSearch = () => {
    setPage(1);
  };

  // Wait for data before rendering results
  if (isLoading) return <Loader />;
  if (error) return <div>Error loading items</div>;
  if (!data || !Array.isArray(data.results)) return <Loader />;

  return (
    <Stack p="md">
      <TextInput
        placeholder="Search items..."
        value={query}
        onChange={(e) => setQuery(e.currentTarget.value)}
        rightSection={<Button onClick={handleSearch}>Search</Button>}
      />
    <CategorySelector value={categories} onChange={setCategories} />

      {data.results.length > 0 ? (
        <Grid>
          {data.results.map((item) => (
            <Grid.Col key={item.id} span={4}>
              <ItemCard item={item} />
            </Grid.Col>
          ))}
        </Grid>
      ) : (
        <div>No items found</div>
      )}

      {data.count > 20 && (
        <Pagination
          value={page}
          onChange={(p: number) => setPage(p)}
          total={Math.ceil(data.count / 20)}
        />
      )}
    </Stack>
  );
}
