import EventCard from "../EventCard/EventCard"
import type { Event } from "../../types/Event"
import "./EventList.css"

type Props = {
  events: Event[]
  search: string
  onDelete: (id: string) => void
}

export default function EventList({ search, events }: Props) {
  const filtered = events.filter((event) =>
    event.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="list">
      {filtered.map((event) => (
        <EventCard
          key={event.id}
          {...event}
        />
      ))}
    </div>
  )
}