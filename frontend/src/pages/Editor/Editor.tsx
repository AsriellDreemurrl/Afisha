import { useState } from "react"
import { useNavigate } from "react-router-dom"
import type { Event } from "../../types/Event"

export default function Editor() {
  const navigate = useNavigate()

  const [title, setTitle] = useState("")
  const [place, setPlace] = useState("")
  const [date, setDate] = useState("")
  const [price, setPrice] = useState("")

  const [image, setImage] = useState(
    "https://img.freepik.com/premium-vector/rock-night-neon-sign-style-text-vector_118419-809.jpg"
  )

  function saveEvent() {
    const newEvent: Event = {
      id: crypto.randomUUID(),
      title,
      place,
      date,
      price,
      image
    }

    const saved: Event[] = JSON.parse(
      localStorage.getItem("events") || "[]"
    )

    localStorage.setItem(
      "events",
      JSON.stringify([...saved, newEvent])
    )

    navigate("/")
  }

  return (
    <div>
      <input placeholder="Название" onChange={(e) => setTitle(e.target.value)} />
      <input placeholder="Место" onChange={(e) => setPlace(e.target.value)} />
      <input placeholder="Дата" onChange={(e) => setDate(e.target.value)} />
      <input placeholder="Цена" onChange={(e) => setPrice(e.target.value)} />

      <input
        placeholder="Ссылка на картинку"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />

      <button onClick={saveEvent}>Сохранить</button>
    </div>
  )
}
















// // Editor.jsx
// function Editor() {
//   return <div>Editor</div>
// }

// export default Editor