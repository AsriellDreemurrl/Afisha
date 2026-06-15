import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import type { AfishaEvent } from "../../../../backend/src/events/events.store"
import Post from "../../pages/Post/Post"

export default function EventPage() {
  const { id } = useParams()
  const [event, setEvent] = useState<AfishaEvent | null>(null)

  useEffect(() => {
    axios
      .get(`http://localhost:3000/events/${id}`)
      .then((res) => setEvent(res.data))
      .catch((err) => console.error(err))
  }, [id])

  if (!event) return <p>Загрузка...</p>

  return (
    <Post
      image={event.photo}
      category={event.category}
      description={event.description}
      date={event.datetime}
      location={event.location}
      price={String(event.price)}
    />
  )
}