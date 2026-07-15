import { useEffect, useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import EventList from '../../components/EventList/EventList'

import type { AfishaEvent } from '../../types/Event'

import styles from './Home.module.css'
import { parseDate } from '../../utils/dateUtils'
import { useAppContext } from '../../context/AppContext'

const Home = () => {
  const { search, category, date } = useAppContext()
  const [events, setEvents] = useState<AfishaEvent[]>([])

  const location = useLocation()
  const [message, setMessage] = useState<{ text: string; type: string } | null>(null)

  useEffect(() => {
    if (location.state?.message) {
      setMessage({ text: location.state.message, type: location.state.type })
      setTimeout(() => setMessage(null), 2500)
    }
  }, [location.state])

  useEffect(() => {
    const params: Record<string, string> = {};
    if (search) params.search = search;
    if (category) params.category = category;
    if (date) params.date = date;

    axios
      .get<AfishaEvent[]>(`${import.meta.env.VITE_API_URL}/events`, { params })
      .then((response) => {
        setEvents(response.data);
      })
      .catch((error) => {
        console.error("Ошибка при получении данных:", error);
      });
  }, []);

  const filteredEvents = useMemo(() => {
    return (events || []).filter(event => {
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
  }, [events, search, category, date])

  return (
    <div className={styles.home}>
      <EventList events={filteredEvents} onDelete={() => {}} />

      {message && (
        <div className={message.type === 'success' ? styles.successMessage : styles.errorMessage}>
          {message.text}
        </div>
      )}
    </div>
  );
};

export default Home;