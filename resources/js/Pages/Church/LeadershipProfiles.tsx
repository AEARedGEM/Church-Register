import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';

interface Ministry {
    id: number;
    name: string;
}

interface LeadershipProfile {
    id: number;
    name: string;
    title: string;
    bio?: string;
    email?: string;
    phone?: string;
    is_active: boolean;
    ministry?: { name?: string } | null;
}

export default function LeadershipProfiles({ leadership, ministries, flash }: { leadership: LeadershipProfile[]; ministries: Ministry[]; flash?: { success?: string } }) {
    const { data, setData, post, processing } = useForm<{
        name: string;
        title: string;
        ministry_id: string;
        bio: string;
        email: string;
        phone: string;
        is_active: boolean;
    }>({
        name: '',
        title: '',
        ministry_id: '',
        bio: '',
        email: '',
        phone: '',
        is_active: true,
    });

    const submit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        post('/church-admin/leadership');
    };

    return (
        <AuthenticatedLayout>
            <Head title="Leadership Profiles" />
            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="mb-6">
                    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-red-600">Leadership</p>
                    <h1 className="mt-2 text-3xl font-bold text-slate-900">Leadership & Ministry Profiles</h1>
                </div>

                {flash?.success && (
                    <div className="mb-6 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
                        {flash.success}
                    </div>
                )}

                <div className="mb-8 rounded-3xl border border-red-100 bg-white p-5 shadow-sm">
                    <h2 className="mb-4 text-lg font-semibold text-slate-900">Add a leadership profile</h2>
                    <form onSubmit={submit} className="grid gap-4 md:grid-cols-2">
                        <label className="text-sm font-medium text-slate-700">
                            Full name
                            <input
                                value={data.name}
                                onChange={(event) => setData('name', event.target.value)}
                                className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm"
                                required
                            />
                        </label>
                        <label className="text-sm font-medium text-slate-700">
                            Title
                            <input
                                value={data.title}
                                onChange={(event) => setData('title', event.target.value)}
                                className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm"
                                required
                            />
                        </label>
                        <label className="text-sm font-medium text-slate-700">
                            Ministry
                            <select
                                value={data.ministry_id}
                                onChange={(event) => setData('ministry_id', event.target.value)}
                                className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm"
                            >
                                <option value="">Select a ministry</option>
                                {ministries.map((ministry) => (
                                    <option key={ministry.id} value={ministry.id}>{ministry.name}</option>
                                ))}
                            </select>
                        </label>
                        <label className="text-sm font-medium text-slate-700">
                            Email
                            <input
                                type="email"
                                value={data.email}
                                onChange={(event) => setData('email', event.target.value)}
                                className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm"
                            />
                        </label>
                        <label className="text-sm font-medium text-slate-700">
                            Phone
                            <input
                                value={data.phone}
                                onChange={(event) => setData('phone', event.target.value)}
                                className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm"
                            />
                        </label>
                        <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
                            <input
                                type="checkbox"
                                checked={data.is_active}
                                onChange={(event) => setData('is_active', Boolean(event.target.checked))}
                                className="h-4 w-4 rounded border-slate-300 text-red-600"
                            />
                            Active profile
                        </label>
                        <label className="text-sm font-medium text-slate-700 md:col-span-2">
                            Bio
                            <textarea
                                value={data.bio}
                                onChange={(event) => setData('bio', event.target.value)}
                                rows={3}
                                className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm"
                            />
                        </label>
                        <div className="md:col-span-2">
                            <button
                                type="submit"
                                disabled={processing}
                                className="rounded-full bg-red-600 px-5 py-2.5 text-sm font-semibold text-white disabled:bg-red-300"
                            >
                                {processing ? 'Saving...' : 'Add Profile'}
                            </button>
                        </div>
                    </form>
                </div>

                <div className="overflow-hidden rounded-3xl border border-red-100 bg-white shadow-sm">
                    <table className="min-w-full divide-y divide-red-100 text-left">
                        <thead className="bg-red-50">
                            <tr>
                                <th className="px-4 py-3 text-sm font-semibold text-slate-700">Name</th>
                                <th className="px-4 py-3 text-sm font-semibold text-slate-700">Title</th>
                                <th className="px-4 py-3 text-sm font-semibold text-slate-700">Ministry</th>
                                <th className="px-4 py-3 text-sm font-semibold text-slate-700">Contact</th>
                                <th className="px-4 py-3 text-sm font-semibold text-slate-700">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-red-50 bg-white">
                            {leadership.length > 0 ? leadership.map((leader) => (
                                <tr key={leader.id} className="hover:bg-red-50/40">
                                    <td className="px-4 py-3 text-sm font-medium text-slate-800">{leader.name}</td>
                                    <td className="px-4 py-3 text-sm text-slate-600">{leader.title}</td>
                                    <td className="px-4 py-3 text-sm text-slate-600">{leader.ministry?.name ?? '—'}</td>
                                    <td className="px-4 py-3 text-sm text-slate-600">{leader.email ?? leader.phone ?? '—'}</td>
                                    <td className="px-4 py-3 text-sm">
                                        <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${leader.is_active ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-700'}`}>
                                            {leader.is_active ? 'Active' : 'Inactive'}
                                        </span>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan={5} className="px-4 py-8 text-center text-sm text-slate-500">No leadership profiles have been added yet.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
