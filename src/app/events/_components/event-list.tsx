import { events } from "@/data/events";

import EventItemCard from "./event-item-card";

type Props = {
  sliceStart?: number;
  sliceEnd?: number;
};

export default function EventList({ sliceStart = 0, sliceEnd = 10 }: Props) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {events
        .sort(
          (a, b) =>
            new Date(b.events_date).getTime() -
            new Date(a.events_date).getTime()
        )
        .slice(sliceStart, sliceEnd)
        .map((event) => (
          <EventItemCard key={event.id} {...event} />
        ))}
    </div>
  );
}
