export type Category = 'Концерт' | 'Выставка' | 'Спорт' | 'Лекция' | 'Другое';

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
    {
        id: 1,
        name: "Rock night",
        description: "Rock nightt",
        datetime: "00",
        location: "00",
        category: 'Концерт',
        price: 500,
        photo: "00"
    },
    {
        id: 2,
        name: "Лекция Реакт",
        description: "Лекция",
        datetime: "00",
        location: "00",
        category: 'Лекция',
        price: 500,
        photo: "00"
    },
    {
        id: 3,
        name: "Футбол",
        description: "Футбол",
        datetime: "00",
        location: "00",
        category: 'Спорт',
        price: 500,
        photo: "00"
    }
]