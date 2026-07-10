

export type QueryParams = Record<string, string | number | boolean | undefined | null>;


function buildQueryString(params?: QueryParams): string {
  if (!params) return '';

  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      searchParams.append(key, String(value));
    }
  });

  const query = searchParams.toString();
  return query ? `?${query}` : '';
}


export function createUrl(base: string, params: QueryParams): string {
  const normalizedBase = base.replace(/\/+$/, '');
  return `${normalizedBase}${buildQueryString(params)}`;
}