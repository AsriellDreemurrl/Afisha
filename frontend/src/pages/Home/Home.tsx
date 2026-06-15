import { useState } from "react"

import Header from "../../components/Header/Header"
import EventList from "../../components/EventList/EventList"
import type { Event } from "../../types/Event"
import "./Home.css"

export default function Home() {
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("")
  const [date, setDate] = useState("")

  const [events] = useState<Event[]>([
    {
      id: "1",
      title: "Rock Night",
      place: "Бишкек Арена",
      date: "20 июня",
      price: "500",
      image:
        "https://img.freepik.com/premium-vector/rock-night-neon-sign-style-text-vector_118419-809.jpg"
    },
    {
      id: "2",
      title: "Лекция React",
      place: "Вефа",
      date: "22 июня",
      price: "200",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNspEQEwimKxheqGAL7UlywQIAyrueCVngug&s"
    },
    {
      id: "3",
      title: "Футбол",
      place: "Дордой",
      date: "25 июня",
      price: "300",
      image:
        "https://upload.wikimedia.org/wikipedia/ru/0/01/%D0%A4%D0%9A_%D0%94%D0%BE%D1%80%D0%B4%D0%BE%D0%B9.png"
    },
    {
      id: "3",
      title: "Футбол",
      place: "Дордой",
      date: "25 июня",
      price: "300",
      image:
        "https://upload.wikimedia.org/wikipedia/ru/0/01/%D0%A4%D0%9A_%D0%94%D0%BE%D1%80%D0%B4%D0%BE%D0%B9.png"
    },
        {
      id: "3",
      title: "Футбол",
      place: "Дордой",
      date: "25 июня",
      price: "300",
      image:
        "https://upload.wikimedia.org/wikipedia/ru/0/01/%D0%A4%D0%9A_%D0%94%D0%BE%D1%80%D0%B4%D0%BE%D0%B9.png"
    }
  ])

  return (
    <div className="home">
      <Header
        search={search}
        setSearch={setSearch}
        category={category}
        setCategory={setCategory}
        date={date}
        setDate={setDate}
      />

      <EventList
        search={search}
        events={events}
        onDelete={() => {}}
      />
    </div>
  )
}