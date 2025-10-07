import { useMemo, useCallback } from 'react';
import useSWR from 'swr';
import { Select, Loader } from '@mantine/core';
import type { UseFormReturnType } from '@mantine/form';
import { ApiFilterBuilder, type Filter } from '../../../lib/utils/api-filter-builder';
import type { PaginatedResponse } from '../../../types';
import {swrFetcher} from '../../../lib/plugin/auth-provider/api-client.tsx';

interface Option {
  label: string;
  value: string;
}

export interface SWRSelectProps<T> {
  url: string;
  selectedItemId?: string | null;
  valueAccessor?: keyof T;
  labelAccessor?: keyof T;
  labelAccessorFn?: (item: T) => string;
  label?: string;
  formHook?: UseFormReturnType<any>;
  name?: string;
  onChange?: (selectedId: string | null) => void;
  filters?: Filter[];
  placeholder?: string;
  nothingFoundMessage?: string;
}

export function SWRSelect<T extends Record<string, any>>({
  url,
  selectedItemId = null,
  valueAccessor = 'id' as keyof T,
  labelAccessor = 'name' as keyof T,
  labelAccessorFn,
  formHook,
  name,
  label,
  onChange,
  filters = [],
  placeholder = 'Select...',
  nothingFoundMessage = 'No results',
}: SWRSelectProps<T>) {
  const queryParams = useMemo<Record<string, string>>(() => {
    const p: Record<string, string> = {};
    if (filters.length > 0) {
      const built = ApiFilterBuilder.fromFilters(filters).build();
      if (built) p.filters = String(built);
    }
    return p;
  }, [filters]);

  const queryUrl = useMemo(() => {
    const paramsStr = new URLSearchParams(queryParams).toString();
    return paramsStr ? `${url}?${paramsStr}` : url;
  }, [url, queryParams]);

  const { data, error, isLoading } = useSWR<PaginatedResponse<T>>(
    queryUrl, swrFetcher
  );

  const options: Option[] = useMemo(() => {
    if (!data) return [];
    return data.results.map((item) => ({
      value: String(item[valueAccessor]),
      label: labelAccessorFn ? labelAccessorFn(item) : String(item[labelAccessor]),
    }));
  }, [data, valueAccessor, labelAccessor, labelAccessorFn]);

  const handleChange = useCallback(
    (newValue: string | null) => {
      if (formHook && name) {
        formHook.setFieldValue(name, newValue);
      } else if (onChange) {
        onChange(newValue);
      }
    },
    [formHook, name, onChange]
  );

  if (isLoading) return <Loader size="sm" />;
  if (error) return <div>Error loading data</div>;

  const currentValue =
    (formHook && name ? (formHook.getValues()[name] as string | null) : selectedItemId) ?? null;

  const safeValue =
    currentValue && options.some((opt) => opt.value === currentValue) ? currentValue : null;

  const errorMessage = name ? formHook?.errors?.[name] : null;

  return (
    <div className="flex flex-col gap-1">
      <Select
        label={label}
        placeholder={placeholder}
        data={options}
        value={safeValue}
        onChange={handleChange}
        searchable
        clearable
        nothingFoundMessage={nothingFoundMessage}
      />
      {errorMessage && (
        <span className="text-xs text-red-500">{String(errorMessage)}</span>
      )}
    </div>
  );
}
