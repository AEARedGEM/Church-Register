import React from 'react';
import { Zap, Calendar, Users, Trophy } from 'lucide-react';
import { Card } from '../Card';
import { Button } from '../Button';
import { Badge } from '../Badge';
export interface ProcessedEvent {
  id: number;
  title: string;
  type: string;
  date: string;
  participants: number;
  prize: string;
  registration_deadline?: string;
}

interface EventCardProps {
  event: ProcessedEvent;
  onRegister?: () => void;
  onLearnMore?: () => void;
}

export const EventCard: React.FC<EventCardProps> = ({
  event,
  onRegister,
  onLearnMore
}) => {
  const getEventTypeVariant = (type: string) => {
    return type === 'Hackathon' ? 'warning' : 'info';
  };

  return (
    <Card className="p-6">
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center space-x-3 mb-2">
            <Zap className="w-5 h-5 text-purple-600" />
            <Badge variant={getEventTypeVariant(event.type)}>
              {event.type}
            </Badge>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            {event.title}
          </h3>
        </div>
      </div>

      <div className="space-y-3 mb-6">
        <div className="flex items-center space-x-3">
          <Calendar className="w-4 h-4 text-gray-600 dark:text-gray-400" />
          <span className="text-sm text-gray-700 dark:text-gray-300">
            {event.date ? new Date(event.date).toLocaleDateString() : 'Date TBD'}
          </span>
        </div>
        <div className="flex items-center space-x-3">
          <Users className="w-4 h-4 text-gray-600 dark:text-gray-400" />
          <span className="text-sm text-gray-700 dark:text-gray-300">
            Max {event.participants} participants
          </span>
        </div>
        <div className="flex items-center space-x-3">
          <Trophy className="w-4 h-4 text-yellow-500" />
          <span className="text-sm font-semibold text-red-600">
            Prize Pool: {event.prize}
          </span>
        </div>
      </div>

      <div className="flex space-x-3">
        <Button variant="primary" className="flex-1" onClick={onRegister}>
          Register Now
        </Button>
        <Button variant="secondary" onClick={onLearnMore}>
          Learn More
        </Button>
      </div>
    </Card>
  );
};
