/**
 * Утилита для построения URL (frontend, Vite).
 *
 * Базовый адрес API берётся из переменной окружения VITE_API_BASE_URL
 * (задаётся в .env, например: VITE_API_BASE_URL=http://localhost:3000/api)
 */

export type QueryParams = Record<string, string | number | boolean | undefined | null>;

const DEFAULT_BASE_URL: string = import.meta.env.VITE_API_BASE_URL ?? '';

/**
 * Собирает query-строку из объекта параметров.
 * undefined/null значения пропускаются.
 */
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