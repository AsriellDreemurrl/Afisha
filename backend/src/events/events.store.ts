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
        description: "Rock night",
        datetime: "20.10.2026 21:00",
        location: "Уметалиева 20",
        category: 'Концерт',
        price: 500,
        photo: "https://hjzdnbyyicfewjajahpf.supabase.co/storage/v1/object/sign/another/rocknight.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9hZWFhYzM5NS0wNTcxLTRkNDMtOTU1ZC1kOGM1MWM5ZmNhMjYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJhbm90aGVyL3JvY2tuaWdodC5qcGciLCJzY29wZSI6ImRvd25sb2FkIiwiaWF0IjoxNzgxNjAxNTEyLCJleHAiOjE4MTMxMzc1MTJ9.kacnR0tzWSTCljcwXSqLvZSOh6W0j9hJPHoPRHRe8kc"
    },
    {
        id: 2,
        name: "Лекция Реакт",
        description: "Лекция",
        datetime: "12.08.2026 14:00",
        location: "Манаса 3",
        category: 'Лекция',
        price: 500,
        photo: "https://hjzdnbyyicfewjajahpf.supabase.co/storage/v1/object/sign/another/lekciyareact.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9hZWFhYzM5NS0wNTcxLTRkNDMtOTU1ZC1kOGM1MWM5ZmNhMjYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJhbm90aGVyL2xla2NpeWFyZWFjdC5wbmciLCJzY29wZSI6ImRvd25sb2FkIiwiaWF0IjoxNzgxNjAwNzg1LCJleHAiOjE4MTMxMzY3ODV9.wY8Omy_FrNoA3ZQJqFb2pFAoeH3J0kfRiU1ROGp_THE"
    },
    {
        id: 3,
        name: "Футбол",
        description: "Футбол",
        datetime: "30.07.2026 16:00",
        location: "Киевская 18",
        category: 'Спорт',
        price: 500,
        photo: "https://hjzdnbyyicfewjajahpf.supabase.co/storage/v1/object/sign/another/footbal.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9hZWFhYzM5NS0wNTcxLTRkNDMtOTU1ZC1kOGM1MWM5ZmNhMjYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJhbm90aGVyL2Zvb3RiYWwuanBnIiwic2NvcGUiOiJkb3dubG9hZCIsImlhdCI6MTc4MTYwMDc3MiwiZXhwIjoxODEzMTM2NzcyfQ.Oxkf2IFe_Jj4s1oQ-4Fn-SaHjLHphe04Jl67nWk075Y"
    }
]