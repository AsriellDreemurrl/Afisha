import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

import Header from "../../components/Header/Header";
import EventList from "../../components/EventList/EventList";

import type { AfishaEvent } from "../../types/Event";
import styles from "./Home.module.css";

const Home = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [events, setEvents] = useState<AfishaEvent[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 18;

  const location = useLocation();
  const [message, setMessage] = useState<{ text: string; type: string } | null>(null);

  useEffect(() => {
    if (location.state?.message) {
      setMessage({ text: location.state.message, type: location.state.type });
      setTimeout(() => setMessage(null), 2500);
    }
  }, [location.state]);

  useEffect(() => {
    const params: Record<string, any> = { page, limit };
    if (search) params.search = search;
    if (category) params.category = category;
    if (date) params.date = date;

    axios
      .get(`${import.meta.env.VITE_API_URL}/events`, { params })
      .then((response) => {
        setEvents(response.data.data);   
        setTotal(response.data.total);   
      })
      .catch((error) => {
        console.error("Ошибка при получении данных:", error);
      });
  }, [search, category, date, page]);

  
  useEffect(() => {
    setPage(1);
  }, [search, category, date]);

  const totalPages = Math.ceil(total / limit);

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
        events={events}
        onDelete={() => {}}
      />

      {totalPages > 1 && (
      <div className={styles.pagination}>
  <button
    className={styles.pageBtn}
    disabled={page === 1}
    onClick={() => setPage(p => p - 1)}
  >
    ← Назад
  </button>
  <span className={styles.pageInfo}>{page} / {Math.ceil(total / limit)}</span>
  <button
    className={styles.pageBtn}
    disabled={page >= Math.ceil(total / limit)}
    onClick={() => setPage(p => p + 1)}
  >
    Вперёд →
  </button>
</div>
      )}

      {message && (
        <div className={message.type === 'success' ? styles.successMessage : styles.errorMessage}>
          {message.text}
        </div>
      )}
    </div>
  );
};

export default Home;