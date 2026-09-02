import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';

interface NotificationItem {
    id: string;
    data: {
        subject?: string;
        message?: string;
    };
    read_at?: string | null;
    created_at: string;
}

export default function Notifications({ notifications }: { notifications: NotificationItem[] }) {
    return (
        <AuthenticatedLayout>
            <Head title="Notifications" />
            <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-red-600">Member communications</p>
                    <h1 className="mt-2 text-3xl font-bold text-slate-900">Notifications</h1>
                    <p className="mt-2 text-sm text-slate-600">Stay informed when the church team responds to you.</p>
                </div>
                <div className="space-y-4">{notifications.map((notification) => <article key={notification.id} className={`rounded-3xl border p-5 shadow-sm sm:p-6 ${notification.read_at ? 'border-slate-200 bg-white' : 'border-red-200 bg-red-50/50'}`}><div className="flex flex-wrap items-start justify-between gap-4"><div><div className="flex items-center gap-3"><h2 className="text-lg font-bold text-slate-900">{notification.data.subject || 'Church notification'}</h2>{!notification.read_at && <span className="rounded-full bg-red-600 px-2.5 py-1 text-xs font-semibold text-white">Unread</span>}</div><p className="mt-2 text-sm leading-relaxed text-slate-700">{notification.data.message || 'You have a new church notification.'}</p><p className="mt-3 text-xs text-slate-500">{new Date(notification.created_at).toLocaleString()}</p></div>{!notification.read_at && <button type="button" onClick={() => router.patch(route('member.notifications.read', notification.id))} className="rounded-full border border-red-200 px-4 py-2 text-sm font-semibold text-red-700 transition hover:bg-red-100">Mark as read</button>}</div></article>)}{!notifications.length && <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 px-6 py-12 text-center text-sm text-slate-500">You have no notifications yet.</div>}</div>
            </div>
        </AuthenticatedLayout>
    );
}
