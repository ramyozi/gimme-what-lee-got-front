export function getValueInObject<T>(
  obj: object | undefined,
  path: string
): T | undefined {
  if (!obj) return undefined;

  const keys = path.split('.');
  let current: unknown = obj;

  for (const key of keys) {
    if (typeof current === 'object' && current !== null && key in current) {
      current = (current as Record<string, unknown>)[key];
    } else {
      return undefined;
    }
  }

  return current as T;
}
