

export type QueryParams = Record<string, string | number | boolean | undefined | null>;

const DEFAULT_BASE_URL: string = import.meta.env.VITE_API_BASE_URL ?? '';


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


export function createUrl(base: string, params?: QueryParams): string {
  const isAbsolute = /^https?:\/\//i.test(base);
  const resolvedBase = isAbsolute
    ? base
    : `${DEFAULT_BASE_URL.replace(/\/+$/, '')}/${base.replace(/^\/+/, '')}`;

  const normalizedBase = resolvedBase.replace(/\/+$/, '');
  return `${normalizedBase}${buildQueryString(params)}`;
}