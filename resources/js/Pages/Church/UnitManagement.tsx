import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';

function UnitFormRow({ unitId, resourceType }: { unitId: number; resourceType: 'leaders' | 'members' }) {
    const form = useForm<{
        name: string;
        role: string;
        is_active: boolean;
    }>({
        name: '',
        role: '',
        is_active: true,
    });

    const submit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        form.post(`/church-admin/units/${unitId}/${resourceType}`);
    };

    return (
        <form onSubmit={submit} className="mt-4 rounded-2xl border border-red-100 bg-white p-4">
            <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
                Add {resourceType === 'leaders' ? 'Leader' : 'Member'}
            </h4>
            <div className="mt-3 grid gap-3 md:grid-cols-2">
                <label className="text-sm font-medium text-slate-700">
                    Name
                    <input
                        value={form.data.name}
                        onChange={(event) => form.setData('name', event.target.value)}
                        className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm"
                        required
                    />
                </label>
                <label className="text-sm font-medium text-slate-700">
                    Role
                    <input
                        value={form.data.role}
                        onChange={(event) => form.setData('role', event.target.value)}
                        className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm"
                    />
                </label>
            </div>
            <div className="mt-3 flex items-center gap-3">
                <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
                    <input
                        type="checkbox"
                        checked={form.data.is_active}
                        onChange={(event) => form.setData('is_active', Boolean(event.target.checked))}
                        className="h-4 w-4 rounded border-slate-300 text-red-600"
                    />
                    Active
                </label>
                <button type="submit" disabled={form.processing} className="rounded-full bg-red-600 px-4 py-2 text-sm font-semibold text-white disabled:bg-red-300">
                    {form.processing ? 'Saving...' : 'Save'}
                </button>
            </div>
        </form>
    );
}

interface UnitLeader {
    id: number;
    name: string;
    role?: string | null;
    is_active: boolean;
}

interface UnitMember {
    id: number;
    name: string;
    role?: string | null;
    is_active: boolean;
}

interface ChurchUnit {
    id: number;
    slug: string;
    name: string;
    category: string;
    summary?: string | null;
    aim?: string | null;
    objectives?: string[];
    duties?: string[];
    highlights?: string[];
    is_active: boolean;
    leaders: UnitLeader[];
    members: UnitMember[];
}

export default function UnitManagement({ units, flash }: { units: ChurchUnit[]; flash?: { success?: string } }) {
    const { data, setData, post, processing } = useForm<{
        name: string;
        category: string;
        summary: string;
        aim: string;
        objectives: string;
        duties: string;
        highlights: string;
        is_active: boolean;
    }>({
        name: '',
        category: '',
        summary: '',
        aim: '',
        objectives: '',
        duties: '',
        highlights: '',
        is_active: true,
    });

    const submit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        post('/church-admin/units');
    };

    return (
        <AuthenticatedLayout>
            <Head title="Church Unit Management" />
            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="mb-6">
                    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-red-600">Units</p>
                    <h1 className="mt-2 text-3xl font-bold text-slate-900">Church Units & Department Management</h1>
                </div>

                {flash?.success && (
                    <div className="mb-6 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
                        {flash.success}
                    </div>
                )}

                <div className="mb-8 rounded-3xl border border-red-100 bg-white p-5 shadow-sm">
                    <h2 className="mb-4 text-lg font-semibold text-slate-900">Add a church unit</h2>
                    <form onSubmit={submit} className="grid gap-4 md:grid-cols-2">
                        <label className="text-sm font-medium text-slate-700">
                            Unit name
                            <input
                                value={data.name}
                                onChange={(event) => setData('name', event.target.value)}
                                className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm"
                                required
                            />
                        </label>
                        <label className="text-sm font-medium text-slate-700">
                            Category
                            <input
                                value={data.category}
                                onChange={(event) => setData('category', event.target.value)}
                                className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm"
                                placeholder="e.g. Worship, Youth, Outreach"
                                required
                            />
                        </label>
                        <label className="text-sm font-medium text-slate-700 md:col-span-2">
                            Summary
                            <textarea
                                value={data.summary}
                                onChange={(event) => setData('summary', event.target.value)}
                                rows={2}
                                className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm"
                            />
                        </label>
                        <label className="text-sm font-medium text-slate-700 md:col-span-2">
                            Aim
                            <textarea
                                value={data.aim}
                                onChange={(event) => setData('aim', event.target.value)}
                                rows={2}
                                className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm"
                            />
                        </label>
                        <label className="text-sm font-medium text-slate-700">
                            Objectives (one per line)
                            <textarea
                                value={data.objectives}
                                onChange={(event) => setData('objectives', event.target.value)}
                                rows={4}
                                className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm"
                            />
                        </label>
                        <label className="text-sm font-medium text-slate-700">
                            Duties (one per line)
                            <textarea
                                value={data.duties}
                                onChange={(event) => setData('duties', event.target.value)}
                                rows={4}
                                className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm"
                            />
                        </label>
                        <label className="text-sm font-medium text-slate-700 md:col-span-2">
                            Highlights (one per line)
                            <textarea
                                value={data.highlights}
                                onChange={(event) => setData('highlights', event.target.value)}
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
                            Active unit
                        </label>
                        <div className="md:col-span-2">
                            <button
                                type="submit"
                                disabled={processing}
                                className="rounded-full bg-red-600 px-5 py-2.5 text-sm font-semibold text-white disabled:bg-red-300"
                            >
                                {processing ? 'Saving...' : 'Add Unit'}
                            </button>
                        </div>
                    </form>
                </div>

                <div className="space-y-8">
                    {units.length > 0 ? units.map((unit) => (
                        <div key={unit.id} className="rounded-3xl border border-red-100 bg-white p-5 shadow-sm">
                            <div className="flex flex-col gap-3 border-b border-red-100 pb-4 md:flex-row md:items-center md:justify-between">
                                <div>
                                    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-red-600">{unit.category}</p>
                                    <h2 className="mt-2 text-2xl font-bold text-slate-900">{unit.name}</h2>
                                </div>
                                <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${unit.is_active ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-700'}`}>
                                    {unit.is_active ? 'Active' : 'Inactive'}
                                </span>
                            </div>

                            <div className="mt-5 grid gap-5 lg:grid-cols-2">
                                <div>
                                    <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Summary</h3>
                                    <p className="mt-2 text-sm leading-relaxed text-slate-600">{unit.summary || 'No summary added yet.'}</p>
                                </div>
                                <div>
                                    <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Aim</h3>
                                    <p className="mt-2 text-sm leading-relaxed text-slate-600">{unit.aim || 'No aim added yet.'}</p>
                                </div>
                            </div>

                            <div className="mt-5 grid gap-6 lg:grid-cols-3">
                                <div>
                                    <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Objectives</h3>
                                    <ul className="mt-2 list-disc space-y-2 pl-5 text-sm text-slate-600">
                                        {(unit.objectives && unit.objectives.length > 0) ? unit.objectives.map((objective) => <li key={objective}>{objective}</li>) : <li>No objectives listed.</li>}
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Duties</h3>
                                    <ul className="mt-2 list-disc space-y-2 pl-5 text-sm text-slate-600">
                                        {(unit.duties && unit.duties.length > 0) ? unit.duties.map((duty) => <li key={duty}>{duty}</li>) : <li>No duties listed.</li>}
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Highlights</h3>
                                    <ul className="mt-2 list-disc space-y-2 pl-5 text-sm text-slate-600">
                                        {(unit.highlights && unit.highlights.length > 0) ? unit.highlights.map((highlight) => <li key={highlight}>{highlight}</li>) : <li>No highlights listed.</li>}
                                    </ul>
                                </div>
                            </div>

                            <div className="mt-6 grid gap-5 lg:grid-cols-2">
                                <div className="rounded-2xl bg-red-50 p-4">
                                    <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Leadership</h3>
                                    <ul className="mt-3 space-y-2 text-sm text-slate-700">
                                        {unit.leaders.length > 0 ? unit.leaders.map((leader) => (
                                            <li key={leader.id} className="rounded-xl bg-white px-3 py-2">
                                                <span className="font-semibold text-slate-800">{leader.name}</span>
                                                {leader.role && <span className="text-slate-500"> — {leader.role}</span>}
                                            </li>
                                        )) : <li>No leaders have been added yet.</li>}
                                    </ul>
                                    <UnitFormRow unitId={unit.id} resourceType="leaders" />
                                </div>
                                <div className="rounded-2xl bg-slate-50 p-4">
                                    <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Members</h3>
                                    <ul className="mt-3 space-y-2 text-sm text-slate-700">
                                        {unit.members.length > 0 ? unit.members.map((member) => (
                                            <li key={member.id} className="rounded-xl bg-white px-3 py-2">
                                                <span className="font-semibold text-slate-800">{member.name}</span>
                                                {member.role && <span className="text-slate-500"> — {member.role}</span>}
                                            </li>
                                        )) : <li>No members have been added yet.</li>}
                                    </ul>
                                    <UnitFormRow unitId={unit.id} resourceType="members" />
                                </div>
                            </div>
                        </div>
                    )) : (
                        <div className="rounded-3xl border border-dashed border-red-200 bg-white p-10 text-center text-slate-500">
                            No church units have been added yet.
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
