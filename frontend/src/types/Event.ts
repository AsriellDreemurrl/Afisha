export type Category = '' | 'Концерт' | 'Лекция' | 'Спорт' | 'Выставка' | 'Другое';
export interface AfishaEvent {
  id: number;
  name?: string;
  description?: string;
  datetime?: string;
  location?: string;
  category?: Category;
  price?: number;
  photo?: string;
}
