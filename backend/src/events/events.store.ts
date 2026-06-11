export type Category = 'concert' | 'exhibition' | 'sport' | 'conference' | 'other';

export interface Event {
    id: number;
    name: string;
    description: string;
    datetime: string;
    location: string;
    category: Category;
    price: number;
    photo: string;
}

export const events: Event[] = [
    
]