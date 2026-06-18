import { useEffect, useState } from "react";
import axios from "axios";

import Header from "../../components/Header/Header";
import EventList from "../../components/EventList/EventList";
import type { AfishaEvent } from "../../types/Event";

import "./Home.module.css";

const Home = () => {
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

export default Home;