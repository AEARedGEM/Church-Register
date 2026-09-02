import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';

interface ChurchEvent {
    id: number;
    title: string;
    description?: string | null;
    event_type: string;
    start_date: string;
    end_date?: string | null;
    location?: string | null;
    is_virtual?: boolean;
    max_participants?: number | null;
    registration_deadline?: string | null;
    status: string;
    registration_summary?: Record<string, number>;
    registrants?: { name: string; email?: string | null; status: string }[];
}

export default function EventManagement({ events, flash }: { events: ChurchEvent[]; flash?: { success?: string } }) {
    const { data, setData, post, put, processing, errors, reset } = useForm<{
        title: string;
        description: string;
        event_type: string;
        start_date: string;
        end_date: string;
        location: string;
        is_virtual: boolean;
        max_participants: string;
        registration_deadline: string;
        status: string;
    }>({
        title: '',
        description: '',
        event_type: 'workshop',
        start_date: '',
        end_date: '',
        location: '',
        is_virtual: false,
        max_participants: '',
        registration_deadline: '',
        status: 'upcoming',
    });
    const [editingEventId, setEditingEventId] = useState<number | null>(null);

    const submit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const options = { onSuccess: () => { reset(); setEditingEventId(null); } };
        if (editingEventId) {
            put(route('church-admin.events.update', editingEventId), options);
        } else {
            post(route('church-admin.events.store'), options);
        }
    };

    const editEvent = (event: ChurchEvent) => {
        setEditingEventId(event.id);
        setData({
            title: event.title,
            description: event.description || '',
            event_type: event.event_type,
            start_date: event.start_date.slice(0, 16),
            end_date: event.end_date?.slice(0, 16) || '',
            location: event.location || '',
            is_virtual: event.is_virtual || false,
            max_participants: event.max_participants?.toString() || '',
            registration_deadline: event.registration_deadline?.slice(0, 16) || '',
            status: event.status,
        });
    };

    return (
        <AuthenticatedLayout>
            <Head title="Church Events" />
            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="mb-6"><p className="text-xs font-semibold uppercase tracking-[0.25em] text-red-600">Church calendar</p><h1 className="mt-2 text-3xl font-bold text-slate-900">Event Management</h1><p className="mt-2 text-sm text-slate-600">Schedule worship gatherings, prayer meetings, outreach, and church programmes.</p></div>
                {flash?.success && <div className="mb-6 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">{flash.success}</div>}
                <form onSubmit={submit} className="mb-8 space-y-5 rounded-3xl border border-red-100 bg-white p-5 shadow-sm sm:p-6">
                    <h2 className="text-lg font-semibold text-slate-900">{editingEventId ? 'Edit event' : 'Schedule an event'}</h2>
                    <div className="grid gap-4 md:grid-cols-2">
                        <label className="text-sm font-medium text-slate-700">Title<input value={data.title} onChange={(event) => setData('title', event.target.value)} className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm" required />{errors.title && <span className="text-xs text-red-600">{errors.title}</span>}</label>
                        <label className="text-sm font-medium text-slate-700">Event type<select value={data.event_type} onChange={(event) => setData('event_type', event.target.value)} className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm"><option value="workshop">Worship / programme</option><option value="conference">Conference</option><option value="competition">Competition</option><option value="bootcamp">Training</option><option value="hackathon">Special project</option></select></label>
                        <label className="text-sm font-medium text-slate-700">Start date and time<input type="datetime-local" value={data.start_date} onChange={(event) => setData('start_date', event.target.value)} className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm" required />{errors.start_date && <span className="text-xs text-red-600">{errors.start_date}</span>}</label>
                        <label className="text-sm font-medium text-slate-700">End date and time<input type="datetime-local" value={data.end_date} onChange={(event) => setData('end_date', event.target.value)} className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm" required />{errors.end_date && <span className="text-xs text-red-600">{errors.end_date}</span>}</label>
                        <label className="text-sm font-medium text-slate-700">Location<input value={data.location} onChange={(event) => setData('location', event.target.value)} className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm" placeholder="Main sanctuary" /></label>
                        <label className="text-sm font-medium text-slate-700">Registration deadline<input type="datetime-local" value={data.registration_deadline} onChange={(event) => setData('registration_deadline', event.target.value)} className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm" required />{errors.registration_deadline && <span className="text-xs text-red-600">{errors.registration_deadline}</span>}</label>
                        <label className="text-sm font-medium text-slate-700">Capacity<input type="number" min="1" value={data.max_participants} onChange={(event) => setData('max_participants', event.target.value)} className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm" /></label>
                        <label className="text-sm font-medium text-slate-700">Status<select value={data.status} onChange={(event) => setData('status', event.target.value)} className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm"><option value="upcoming">Upcoming</option><option value="registration_open">Registration open</option><option value="ongoing">Ongoing</option><option value="cancelled">Cancelled</option></select></label>
                    </div>
                    <label className="block text-sm font-medium text-slate-700">Description<textarea rows={3} value={data.description} onChange={(event) => setData('description', event.target.value)} className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm" required />{errors.description && <span className="text-xs text-red-600">{errors.description}</span>}</label>
                    <label className="flex items-center gap-2 text-sm font-medium text-slate-700"><input type="checkbox" checked={data.is_virtual} onChange={(event) => setData('is_virtual', event.target.checked)} className="h-4 w-4 rounded border-slate-300 text-red-600" />Online event</label>
                    <div className="flex flex-wrap gap-3"><button type="submit" disabled={processing} className="rounded-full bg-red-600 px-5 py-2.5 text-sm font-semibold text-white disabled:bg-red-300">{processing ? 'Saving...' : editingEventId ? 'Update event' : 'Publish event'}</button>{editingEventId && <button type="button" onClick={() => { reset(); setEditingEventId(null); }} className="rounded-full border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700">Cancel edit</button>}</div>
                </form>
                <div className="space-y-3">{events.map((event) => <div key={event.id} className="rounded-2xl border border-red-100 bg-white p-5 shadow-sm"><div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"><div><h2 className="font-semibold text-slate-900">{event.title}</h2><p className="mt-1 text-sm text-slate-500">{new Date(event.start_date).toLocaleString()} · {event.location || 'Online / church campus'}</p></div><div className="flex items-center gap-3"><span className="w-fit rounded-full bg-red-50 px-3 py-1 text-xs font-semibold capitalize text-red-700">{event.status.replace('_', ' ')}</span><button type="button" onClick={() => editEvent(event)} className="rounded-full border border-red-200 px-3 py-1 text-xs font-semibold text-red-700">Edit</button></div></div><div className="mt-4 border-t border-slate-100 pt-4"><p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Registration report</p><p className="mt-2 text-sm text-slate-600">Active: {(event.registration_summary?.registered || 0) + (event.registration_summary?.confirmed || 0) + (event.registration_summary?.attended || 0)}{event.max_participants ? ` / ${event.max_participants}` : ''} · Cancelled: {event.registration_summary?.cancelled || 0}</p>{event.registrants?.length ? <div className="mt-3 grid gap-2 sm:grid-cols-2">{event.registrants.map((registrant, index) => <p key={`${registrant.email || registrant.name}-${index}`} className="text-xs text-slate-500">{registrant.name}{registrant.email ? ` (${registrant.email})` : ''} · <span className="capitalize">{registrant.status.replace('_', ' ')}</span></p>)}</div> : <p className="mt-2 text-xs text-slate-400">No registrations yet.</p>}</div></div>)}{!events.length && <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center text-sm text-slate-500">No church events scheduled yet.</div>}</div>
            </div>
        </AuthenticatedLayout>
    );
}
