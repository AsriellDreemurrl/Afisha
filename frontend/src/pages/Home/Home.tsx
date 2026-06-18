import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

import Header from "../../components/Header/Header";
import EventList from "../../components/EventList/EventList";

//generics, memoization, use .envm standardize, better to make pages always export from components, not components export from pages, make many things global such as * and contanier in css, really don't use variables from back, make interface AfishaEvent global and make everyone use it instead of declaring another one
import type { AfishaEvent } from "../../types/Event";

import styles from "./Home.module.css";

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
      .get<AfishaEvent[]>("http://localhost:3000/events")
      .then((response) => {
        setEvents(response.data);
      })
      .catch((error) => {
        console.error("Ошибка при получении данных:", error);
      });
  }, []);

  const filteredEvents = events.filter((event) => {
    console.log(event.datetime, date)
    const matchesSearch =
      event.name?.toLowerCase().includes(search.toLowerCase()) ||
      event.description?.toLowerCase().includes(search.toLowerCase())

    const matchesCategory = category && category !== 'all'
      ? event.category === category
      : true

    const matchesDate = date
      ? event.datetime.startsWith(date.split('-').reverse().join('.'))
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