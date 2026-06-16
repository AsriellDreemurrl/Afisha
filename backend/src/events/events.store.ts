export type Category = 'Концерт' | 'Выставка' | 'Спорт' | 'Лекция' | 'Другое';

export interface AfishaEvent {
    id: number;
    name: string;
    description: string;
    datetime: string;
    location: string;
    category: Category;
    price: number;
    photo: string;
}

export const events: AfishaEvent[] = [
    {
        id: 1,
        name: "Rock night",
        description: "Rock nightt",
        datetime: "31.05.2026",
        location: "00",
        category: 'Концерт',
        price: 500,
        photo: "https://th.bing.com/th/id/R.e5274ad00ab77438da6a4d602e150485?rik=tidLPi5xAJBqHA&pid=ImgRaw&r=0"
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