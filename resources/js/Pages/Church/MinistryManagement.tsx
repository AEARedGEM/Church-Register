import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';

interface Ministry {
    id: number;
    name: string;
    description?: string;
    leader_name?: string;
    is_active: boolean;
}

export default function MinistryManagement({ ministries, flash }: { ministries: Ministry[]; flash?: { success?: string } }) {
    const { data, setData, post, processing } = useForm<{
        name: string;
        description: string;
        leader_name: string;
        is_active: boolean;
    }>({
        name: '',
        description: '',
        leader_name: '',
        is_active: true,
    });

    const submit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        post('/church-admin/ministries');
    };

    return (
        <AuthenticatedLayout>
            <Head title="Church Ministries" />
            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="mb-6">
                    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-red-600">Ministries</p>
                    <h1 className="mt-2 text-3xl font-bold text-slate-900">Ministry Management</h1>
                </div>

                {flash?.success && (
                    <div className="mb-6 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
                        {flash.success}
                    </div>
                )}

                <div className="mb-8 rounded-3xl border border-red-100 bg-white p-5 shadow-sm">
                    <h2 className="mb-4 text-lg font-semibold text-slate-900">Add a ministry</h2>
                    <form onSubmit={submit} className="grid gap-4 md:grid-cols-2">
                        <label className="text-sm font-medium text-slate-700">
                            Ministry name
                            <input
                                value={data.name}
                                onChange={(event) => setData('name', event.target.value)}
                                className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm"
                                required
                            />
                        </label>
                        <label className="text-sm font-medium text-slate-700">
                            Leader name
                            <input
                                value={data.leader_name}
                                onChange={(event) => setData('leader_name', event.target.value)}
                                className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm"
                            />
                        </label>
                        <label className="text-sm font-medium text-slate-700 md:col-span-2">
                            Description
                            <textarea
                                value={data.description}
                                onChange={(event) => setData('description', event.target.value)}
                                rows={3}
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
                            Active ministry
                        </label>
                        <div className="md:col-span-2">
                            <button
                                type="submit"
                                disabled={processing}
                                className="rounded-full bg-red-600 px-5 py-2.5 text-sm font-semibold text-white disabled:bg-red-300"
                            >
                                {processing ? 'Saving...' : 'Add Ministry'}
                            </button>
                        </div>
                    </form>
                </div>

                <div className="overflow-hidden rounded-3xl border border-red-100 bg-white shadow-sm">
                    <table className="min-w-full divide-y divide-red-100 text-left">
                        <thead className="bg-red-50">
                            <tr>
                                <th className="px-4 py-3 text-sm font-semibold text-slate-700">Name</th>
                                <th className="px-4 py-3 text-sm font-semibold text-slate-700">Leader</th>
                                <th className="px-4 py-3 text-sm font-semibold text-slate-700">Description</th>
                                <th className="px-4 py-3 text-sm font-semibold text-slate-700">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-red-50 bg-white">
                            {ministries.length > 0 ? ministries.map((ministry) => (
                                <tr key={ministry.id} className="hover:bg-red-50/40">
                                    <td className="px-4 py-3 text-sm font-medium text-slate-800">{ministry.name}</td>
                                    <td className="px-4 py-3 text-sm text-slate-600">{ministry.leader_name ?? '—'}</td>
                                    <td className="px-4 py-3 text-sm text-slate-600">{ministry.description ?? '—'}</td>
                                    <td className="px-4 py-3 text-sm">
                                        <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${ministry.is_active ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-700'}`}>
                                            {ministry.is_active ? 'Active' : 'Inactive'}
                                        </span>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan={4} className="px-4 py-8 text-center text-sm text-slate-500">No ministries have been added yet.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
