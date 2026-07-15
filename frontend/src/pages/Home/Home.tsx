import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

import Header from "../../components/Header/Header";
import EventList from "../../components/EventList/EventList";


import type { AfishaEvent } from "../../types/Event";

import styles from "./Home.module.css";
import { parseDate } from "../../utils/dateUtils";

const Home = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");

  const [events, setEvents] = useState<AfishaEvent[]>([]);

  const location = useLocation()
  const [message, setMessage] = useState<{ text: string, type: string } | null>(null)

  useEffect(() => {
    if (location.state?.message) {
      setMessage({ text: location.state.message, type: location.state.type })
      setTimeout(() => setMessage(null), 2500)
    }
  }, [location.state])


  useEffect(() => {
    axios
      .get<AfishaEvent[]>(`${import.meta.env.VITE_API_URL}/events`)
      .then((response) => {
        setEvents(response.data);
      })
      .catch((error) => {
        console.error("Ошибка при получении данных:", error);
      });
  }, []);

  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.name?.toLowerCase().includes(search.toLowerCase()) ||
      event.description?.toLowerCase().includes(search.toLowerCase())

    const matchesCategory = category && category !== 'all'
      ? event.category === category
      : true

    const matchesDate = date
      ? parseDate(event.datetime)?.toISOString().startsWith(date)
      : true

    return matchesSearch && matchesCategory && matchesDate
  })

  return (
    <div className={styles.home}>
      <Header
        search={search}
        setSearch={setSearch}
        category={category}
        setCategory={setCategory}
        date={date}
        setDate={setDate}
      />

      
      <EventList
        events={filteredEvents}
        onDelete={() => { }}
      />

      {message && (
        <div className={message.type === 'success' ? styles.successMessage : styles.errorMessage}>
          {message.text}
        </div>
      )}
    </div>
  );
}

export default Home;