import EventCard from '../EventCard/EventCard';
import type { AfishaEvent } from '../../types/Event';
import styles from './EventList.module.css';

type Props = {
  events: AfishaEvent[];
  onDelete: (id: number) => void;
};

const EventList = ({ events, onDelete }: Props) => {
  return (
    <div className={styles.list}>
      {events.map((event) => (
        <EventCard key={event.id} {...event} onDelete={onDelete} />
      ))}
    </div>
  );
};

export default EventList;
