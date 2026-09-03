import { Head, Link } from '@inertiajs/react';

type EventItem = {
    id: number;
    title: string;
    description?: string | null;
    event_type?: string | null;
    start_date?: string;
    end_date?: string | null;
    status?: string | null;
    location?: string | null;
    max_participants?: number | null;
    active_registration_count?: number;
    can_register?: boolean;
};

export default function Events({ events = [] }: { events?: EventItem[] }) {
    return (
        <>
            <Head title="Church Events - APGA Worldwide" />
            <div className="min-h-screen bg-slate-950 text-slate-100">
                <nav className="border-b border-red-800/70 bg-slate-950/95 backdrop-blur-sm">
                    <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
                        <Link href="/" className="text-2xl font-bold text-red-400">APGA Worldwide</Link>
                        <Link href={route('media')} className="rounded-full border border-red-700 px-4 py-2 text-sm text-red-100 transition hover:bg-red-700 hover:text-white">
                            Media & Sermons
                        </Link>
                    </div>
                </nav>

                <main className="mx-auto max-w-7xl px-6 py-16">
                    <div className="mb-12 text-center">
                        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-red-300">Church calendar</p>
                        <h1 className="mt-4 text-4xl font-bold text-white md:text-5xl">Upcoming church events</h1>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                        {events.length ? events.map((event) => (
                            <article key={event.id} className="rounded-3xl border border-red-800/70 bg-slate-900/85 p-6 shadow-lg shadow-red-950/20">
                                <div className="mb-4 inline-flex rounded-full bg-red-700/20 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-red-200">
                                    {event.event_type || 'Church event'}
                                </div>
                                <h2 className="text-2xl font-bold text-white">{event.title}</h2>
                                <p className="mt-3 text-sm leading-relaxed text-slate-300">{event.description || 'A special gathering for worship, prayer, discipleship, and community.'}</p>
                                <ul className="mt-5 space-y-2 text-sm text-slate-300">
                                    <li><span className="font-semibold text-white">Date:</span> {event.start_date ? new Date(event.start_date).toLocaleString() : 'TBA'}</li>
                                    <li><span className="font-semibold text-white">Location:</span> {event.location || 'Church campus'}</li>
                                    <li><span className="font-semibold text-white">Status:</span> {event.status || 'upcoming'}</li>
                                    {event.max_participants && <li><span className="font-semibold text-white">Capacity:</span> {event.active_registration_count ?? 0} / {event.max_participants} registered</li>}
                                </ul>
                                <div className="mt-6 flex gap-3">
                                    <Link href={route('events.detail', event.id)} className="rounded-full bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-500">
                                        View details
                                    </Link>
                                    {event.can_register && <Link href={route('events.detail', event.id)} className="rounded-full border border-red-700 px-4 py-2 text-sm font-semibold text-red-100 transition hover:bg-red-700 hover:text-white">Register</Link>}
                                    <a href={route('events.calendar', event.id)} className="rounded-full border border-slate-700 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:border-slate-500 hover:text-white">Calendar</a>
                                </div>
                            </article>
                        )) : (
                            <div className="rounded-3xl border border-red-800/70 bg-slate-900/85 p-8 text-center md:col-span-2 xl:col-span-3">
                                <h2 className="text-2xl font-bold text-white">No events scheduled yet</h2>
                                <p className="mt-3 text-slate-300">Check back soon for upcoming prayer nights, worship meetings, and church gatherings.</p>
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </>
    );
}
