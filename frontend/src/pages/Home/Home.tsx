import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

import EventList from "../../components/EventList/EventList";
import { useAppContext } from "../../context/AppContext";
import type { AfishaEvent, PaginatedResponse } from "../../types/Event";
import { createUrl } from "../../utils/url";

import styles from "./Home.module.css";

const Home = () => {
  const { search, category, date } = useAppContext();

  const [events, setEvents] = useState<AfishaEvent[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 18;

  const location = useLocation();
  const [message, setMessage] = useState<{ text: string; type: string } | null>(null);

  useEffect(() => {
    if (location.state?.message) {
      setMessage({ text: location.state.message, type: location.state.type });
      const timer = setTimeout(() => setMessage(null), 2500);
      return () => clearTimeout(timer);
    }
  }, [location.state]);

  useEffect(() => {
    setPage(1);
  }, [search, category, date]);

  useEffect(() => {
    const params: Record<string, any> = { page, limit };
    if (search) params.search = search;
    if (category && category !== "all") params.category = category;
    if (date) params.date = date;

    axios
      .get<PaginatedResponse>(createUrl("/events"), { params })
      .then((response) => {
        setEvents(response.data.data || []);
        setTotal(response.data.total || 0);
      })
      .catch((error) => {
        console.error("Ошибка при получении данных:", error);
      });
  }, [search, category, date, page]);

  const totalPages = Math.ceil(total / limit);

  return (
    <div className={styles.home}>
      <EventList events={events} onDelete={() => {}} />

      {totalPages > 1 && (
        <div className={styles.pagination}>
          <button
            className={styles.pageBtn}
            disabled={page === 1}
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
          >
            ← Назад
          </button>

          <span className={styles.pageInfo}>
            {page} / {totalPages}
          </span>

          <button
            className={styles.pageBtn}
            disabled={page >= totalPages}
            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
          >
            Вперёд →
          </button>
        </div>
      )}

      {message && (
        <div className={message.type === "success" ? styles.successMessage : styles.errorMessage}>
          {message.text}
        </div>
      )}
    </div>
  );
};

export default Home;