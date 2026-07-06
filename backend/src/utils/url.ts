/**
 * Утилита для построения URL.
 *
 * Сохраняет сигнатуру из старого dist/utils/url.d.ts:
 *   export declare function createUrl(base: string, params: any): string;
 */

export type QueryParams = Record<string, string | number | boolean | undefined | null>;

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

/**
 * Создаёт URL на основе base и объекта params.
 *
 * @example
 * createUrl('http://localhost:3000/api/users', { page: 1, active: true })
 * // -> "http://localhost:3000/api/users?page=1&active=true"
 */
export function createUrl(base: string, params: QueryParams): string {
  const normalizedBase = base.replace(/\/+$/, '');
  return `${normalizedBase}${buildQueryString(params)}`;
}