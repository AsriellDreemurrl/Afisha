import EventCard from "../EventCard/EventCard"
import type { AfishaEvent } from "../../../../backend/src/events/events.store"
import "./EventList.css"

type Props = {
  events: AfishaEvent[]
  onDelete: (id: number) => void
}

export default function EventList({ events, onDelete }: Props) {
  return (
    <div className="list">
      {events.map((event) => (
        <EventCard
          key={event.id}
          event={event}
          onDelete={onDelete}
        />
      ))}
    </div>
  )
}