import { useEffect, useState } from "react";
import axios from "axios";

import Header from "../../components/Header/Header";
import EventList from "../../components/EventList/EventList";
import type { Event } from "../../types/Event";

import "./Home.css";

export default function Home() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");

  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/events")
      .then((response) => {
        const formattedEvents: Event[] = response.data.map(
          (event: any) => ({
            id: String(event.id),
            name: event.name,
            description: event.description,
            datetime: event.datetime,
            location: event.location,
            category: event.category,
            price: String(event.price),
            image: event.photo,
          })
        );

        setEvents(formattedEvents);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

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
  );
}