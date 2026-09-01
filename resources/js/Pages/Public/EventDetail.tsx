import { Head, Link, useForm } from '@inertiajs/react';

type EventItem = {
    id: number;
    title: string;
    description?: string | null;
    event_type?: string | null;
    start_date?: string;
    end_date?: string | null;
    location?: string | null;
    max_participants?: number | null;
    registration_deadline?: string | null;
    status?: string | null;
    is_virtual?: boolean;
};

export default function EventDetail({
    event,
    isRegistered = false,
    flash,
}: {
    event: EventItem;
    isRegistered?: boolean;
    flash?: { success?: string; info?: string };
}) {
    const { post, processing } = useForm({});

    const register = () => {
        post(route('events.register', event.id));
    };

    return (
        <>
            <Head title={`${event.title} - APGA Worldwide`} />
            <div className="min-h-screen bg-slate-950 text-slate-100">
                <nav className="border-b border-red-800/70 bg-slate-950/95 backdrop-blur-sm">
                    <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
                        <Link href="/" className="text-2xl font-bold text-red-400">APGA Worldwide</Link>
                        <div className="flex items-center gap-3">
                            <Link href={route('events')} className="rounded-full border border-red-700 px-4 py-2 text-sm text-red-100 transition hover:bg-red-700 hover:text-white">
                                All events
                            </Link>
                            <Link href={route('media')} className="rounded-full border border-slate-700 px-4 py-2 text-sm text-slate-200 transition hover:border-slate-500 hover:text-white">
                                Media & sermons
                            </Link>
                        </div>
                    </div>
                </nav>

                <main className="mx-auto max-w-5xl px-6 py-16">
                    {flash?.success && (
                        <div className="mb-6 rounded-2xl border border-emerald-700/50 bg-emerald-900/40 px-4 py-3 text-sm text-emerald-100">
                            {flash.success}
                        </div>
                    )}
                    {flash?.info && (
                        <div className="mb-6 rounded-2xl border border-amber-700/50 bg-amber-900/40 px-4 py-3 text-sm text-amber-100">
                            {flash.info}
                        </div>
                    )}

                    <div className="rounded-3xl border border-red-800/70 bg-slate-900/85 p-8 shadow-lg shadow-red-950/20">
                        <div className="mb-4 inline-flex rounded-full bg-red-700/20 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-red-200">
                            {event.event_type || 'Church event'}
                        </div>
                        <h1 className="text-4xl font-bold text-white md:text-5xl">{event.title}</h1>
                        <p className="mt-4 text-sm uppercase tracking-[0.22em] text-slate-400">
                            {event.status || 'upcoming'} · {event.location || (event.is_virtual ? 'Online' : 'Church campus')}
                        </p>

                        <div className="mt-8 grid gap-6 md:grid-cols-2">
                            <div className="rounded-2xl border border-red-900/60 bg-slate-950/70 p-5">
                                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-red-300">When</p>
                                <p className="mt-3 text-lg text-slate-100">
                                    {event.start_date ? new Date(event.start_date).toLocaleString() : 'TBA'}
                                </p>
                                {event.end_date && (
                                    <p className="mt-2 text-sm text-slate-400">Ends: {new Date(event.end_date).toLocaleString()}</p>
                                )}
                            </div>
                            <div className="rounded-2xl border border-red-900/60 bg-slate-950/70 p-5">
                                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-red-300">Location</p>
                                <p className="mt-3 text-lg text-slate-100">{event.location || (event.is_virtual ? 'Online gathering' : 'Church campus')}</p>
                                {event.max_participants && (
                                    <p className="mt-2 text-sm text-slate-400">Capacity: {event.max_participants} people</p>
                                )}
                            </div>
                        </div>

                        <div className="mt-8 rounded-2xl border border-red-900/60 bg-slate-950/70 p-6">
                            <p className="text-lg leading-relaxed text-slate-200">{event.description || 'A special time of worship, prayer, teaching, and fellowship for the church family.'}</p>
                        </div>

                        <div className="mt-8 flex flex-wrap gap-4">
                            {isRegistered ? (
                                <button
                                    type="button"
                                    disabled
                                    className="rounded-full border border-emerald-700 bg-emerald-900/40 px-6 py-3 font-semibold text-emerald-100"
                                >
                                    Registered
                                </button>
                            ) : (
                                <button
                                    type="button"
                                    onClick={register}
                                    disabled={processing}
                                    className="rounded-full bg-red-600 px-6 py-3 font-semibold text-white transition hover:bg-red-500 disabled:bg-red-400"
                                >
                                    {processing ? 'Registering...' : 'Register for this event'}
                                </button>
                            )}
                            <Link href={route('events')} className="rounded-full border border-red-700 px-6 py-3 font-semibold text-red-100 transition hover:bg-red-700 hover:text-white">
                                Back to events
                            </Link>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}
