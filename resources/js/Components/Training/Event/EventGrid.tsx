import React from 'react';
import { EventCard, ProcessedEvent } from './EventCard';

interface EventGridProps {
  events: ProcessedEvent[];
  onEventRegister?: (eventId: number) => void;
  onEventLearnMore?: (eventId: number) => void;
  emptyState?: React.ReactNode;
}

export const EventGrid: React.FC<EventGridProps> = ({
  events,
  onEventRegister,
  onEventLearnMore,
  emptyState
}) => {
  if (events.length === 0) {
    return <div>{emptyState}</div>;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {events.map((event) => (
        <EventCard
          key={event.id}
          event={event}
          onRegister={() => onEventRegister?.(event.id)}
          onLearnMore={() => onEventLearnMore?.(event.id)}
        />
      ))}
    </div>
  );
};
