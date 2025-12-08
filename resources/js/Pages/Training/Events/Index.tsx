// resources/js/Pages/Training/EventsPage.tsx
import React, { useState } from 'react';
import { usePage, router, Head } from '@inertiajs/react';
import { Calendar, MapPin, Users, Trophy, CheckCircle } from 'lucide-react';
import ModernLayout from '@/Layouts/Training/TrainingLayout';
import { BasePageProps } from '@/types';

interface Event {
  id: number;
  title: string;
  description: string;
  type: string;
  start_date: string;
  end_date: string;
  location: string;
  max_participants: number;
  prize_pool?: string;
  registration_deadline: string;
  is_online: boolean;
  status: string;
  registered_count: number;
  is_registered?: boolean;
}

interface PageProps extends BasePageProps {
  auth: {
    user: any;
  };
  events: {
    data: Event[];
  };
  userRegistrations?: number[];
  [key: string]: any; // Index signature for Inertia compatibility
}

type FilterType = 'all' | 'upcoming' | 'hackathon' | 'bootcamp' | 'competition';

interface FilterOption {
  key: FilterType;
  label: string;
  count: number;
}

export default function EventsPage() {
  const { auth, events, userRegistrations = [] } = usePage<PageProps>().props;

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedFilter, setSelectedFilter] = useState<FilterType>('all');

  // Filter events
  const filteredEvents = events.data.filter((event) => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.type.toLowerCase().includes(searchTerm.toLowerCase());

    if (!matchesSearch) return false;

    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'upcoming') return new Date(event.start_date) > new Date();

    return event.type.toLowerCase().includes(selectedFilter);
  });

  // Event counts
  const eventCounts: Record<FilterType, number> = {
    all: events.data.length,
    upcoming: events.data.filter((e) => new Date(e.start_date) > new Date()).length,
    hackathon: events.data.filter((e) => e.type.toLowerCase().includes('hackathon')).length,
    bootcamp: events.data.filter((e) => e.type.toLowerCase().includes('bootcamp')).length,
    competition: events.data.filter((e) => e.type.toLowerCase().includes('competition')).length
  };

  const handleRegister = (eventId: number): void => {
    router.post(route('training.events.register', eventId), {}, {
      preserveScroll: true,
      onSuccess: () => {
        // Success message handled by backend
      }
    });
  };

  const getEventTypeColor = (type: string): string => {
    const typeMap: Record<string, string> = {
      hackathon: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
      bootcamp: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
      competition: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
      workshop: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    };
    return typeMap[type.toLowerCase()] || 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
  };

  const isEventRegistered = (eventId: number): boolean => {
    return userRegistrations.includes(eventId);
  };

  const filterOptions: FilterOption[] = [
    { key: 'all', label: 'All Events', count: eventCounts.all },
    { key: 'upcoming', label: 'Upcoming', count: eventCounts.upcoming },
    { key: 'hackathon', label: 'Hackathons', count: eventCounts.hackathon },
    { key: 'bootcamp', label: 'Bootcamps', count: eventCounts.bootcamp },
    { key: 'competition', label: 'Competitions', count: eventCounts.competition }
  ];

  return (
    <ModernLayout>
        <Head title="Event"/>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="rounded-lg p-6 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-white mb-6">
            <h1 className="text-3xl font-bold mb-2">Events & Competitions</h1>
            <p className="text-lg opacity-90">
              Participate in hackathons, bootcamps, and competitions
            </p>
          </div>

          {/* Search and Filters */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 mb-6">
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              {/* Search */}
              <div className="flex-1">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search events..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-4 pr-4 py-2 bg-gray-100 dark:bg-gray-700 border-0 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 dark:text-white"
                  />
                </div>
              </div>

              {/* Filter Tabs */}
              <div className="flex flex-wrap gap-2">
                {filterOptions.map((filter) => (
                  <button
                    key={filter.key}
                    onClick={() => setSelectedFilter(filter.key)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      selectedFilter === filter.key
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                    }`}
                  >
                    {filter.label}
                    {filter.count > 0 && (
                      <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
                        selectedFilter === filter.key
                          ? 'bg-white/20 text-white'
                          : 'bg-gray-200 text-gray-600 dark:bg-gray-600 dark:text-gray-300'
                      }`}>
                        {filter.count}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Events Grid */}
          {filteredEvents.length === 0 ? (
            <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
              <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                No events found
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {searchTerm || selectedFilter !== 'all'
                  ? "Try adjusting your search or filter criteria"
                  : "Check back later for new events and competitions"}
              </p>
              {(searchTerm || selectedFilter !== 'all') && (
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedFilter('all');
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                >
                  Clear Filters
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents.map((event) => (
                <div
                  key={event.id}
                  className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-all duration-300"
                >
                  {/* Event Header */}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getEventTypeColor(event.type)}`}>
                        {event.type}
                      </span>
                      {isEventRegistered(event.id) && (
                        <span className="flex items-center space-x-1 text-green-600 dark:text-green-400 text-sm">
                          <CheckCircle className="w-4 h-4" />
                          <span>Registered</span>
                        </span>
                      )}
                    </div>

                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
                      {event.title}
                    </h3>

                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                      {event.description}
                    </p>

                    {/* Event Details */}
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(event.start_date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                        <MapPin className="w-4 h-4" />
                        <span>{event.is_online ? 'Online' : event.location}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                        <Users className="w-4 h-4" />
                        <span>{event.registered_count} / {event.max_participants} participants</span>
                      </div>
                      {event.prize_pool && (
                        <div className="flex items-center space-x-2 text-sm font-semibold text-green-600 dark:text-green-400">
                          <Trophy className="w-4 h-4" />
                          <span>{event.prize_pool}</span>
                        </div>
                      )}
                    </div>

                    {/* Action Button */}
                    <button
                      onClick={() => handleRegister(event.id)}
                      disabled={isEventRegistered(event.id) || event.registered_count >= event.max_participants}
                      className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
                        isEventRegistered(event.id)
                          ? 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400 cursor-not-allowed'
                          : event.registered_count >= event.max_participants
                          ? 'bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-400 cursor-not-allowed'
                          : 'bg-blue-600 hover:bg-blue-700 text-white'
                      }`}
                    >
                      {isEventRegistered(event.id)
                        ? 'Already Registered'
                        : event.registered_count >= event.max_participants
                        ? 'Event Full'
                        : 'Register Now'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Quick Stats */}
          {events.data.length > 0 && (
            <div className="mt-8 bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                Event Statistics
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {events.data.length}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Total Events
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                    {eventCounts.upcoming}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Upcoming
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                    {userRegistrations.length}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Registered
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                    {eventCounts.hackathon}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Hackathons
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </ModernLayout>
  );
}
