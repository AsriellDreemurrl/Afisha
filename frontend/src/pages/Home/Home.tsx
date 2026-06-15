import { useEffect, useState } from "react";
import axios from "axios";

import Header from "../../components/Header/Header";
import EventList from "../../components/EventList/EventList";

// import type { Category } from "../../../../backend/src/events/events.store";
import type { AfishaEvent } from "../../../../backend/src/events/events.store"; 

import "./Home.css";

export default function Home() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");

 
  const [events, setEvents] = useState<AfishaEvent[]>([]);

  
  useEffect(() => {
    axios
      .get("http://localhost:3000/events")
      .then((response) => {
        setEvents(response.data);
      })
      .catch((error) => {
        console.error("Ошибка при получении данных:", error);
      });
  }, []);


  const handleDeleteEvent = (id: number) => { 
    axios
      .delete(`http://localhost:3000/events/${id}`)
      .then(() => {
        setEvents((prevEvents) => prevEvents.filter((event) => event.id !== id));
      })
      .catch((error) => {
        console.error("Не удалось удалить событие:", error);
      });
  };

  
  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.name.toLowerCase().includes(search.toLowerCase()) ||
      event.description.toLowerCase().includes(search.toLowerCase());

  
    const matchesCategory = category ? event.category === category : true;

    
    const matchesDate = date ? event.datetime.startsWith(date) : true;

    return matchesSearch && matchesCategory && matchesDate;
  });

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
        events={filteredEvents as any} 
        onDelete={(id) => handleDeleteEvent(Number(id))} 
      />
    </div>
  );
}