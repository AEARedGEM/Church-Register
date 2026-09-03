import { Head, Link, useForm } from '@inertiajs/react';

interface SmallGroup {
    id: number;
    name: string;
    description?: string | null;
    meeting_day?: string | null;
    meeting_time?: string | null;
    location?: string | null;
    leader_name?: string | null;
    contact_email?: string | null;
    active_member_count?: number;
    meetings?: SmallGroupMeeting[];
}

interface SmallGroupMeeting {
    id: number;
    title: string;
    starts_at: string;
    ends_at?: string | null;
    location?: string | null;
}

export default function SmallGroups({ groups = [], authenticated = false, joinedGroupIds = [], flash }: { groups?: SmallGroup[]; authenticated?: boolean; joinedGroupIds?: number[]; flash?: { success?: string } }) {
    const { post, processing } = useForm();

    const joinGroup = (groupId: number) => {
        post(`/small-groups/${groupId}/join`);
    };

    return (
        <>
            <Head title="Small Groups - APGA Worldwide" />
            <div className="min-h-screen bg-slate-950 text-slate-100">
                <nav className="border-b border-red-800/70 bg-slate-950/95 backdrop-blur-sm">
                    <div className="container mx-auto flex items-center justify-between px-6 py-4">
                        <Link href="/" className="text-2xl font-bold text-red-400">APGA Worldwide</Link>
                        <Link href="/" className="text-red-200 transition hover:text-white">Back to Home</Link>
                    </div>
                </nav>
                <div className="container mx-auto max-w-4xl px-6 py-16">
                    {flash?.success && <div className="mb-6 rounded-2xl border border-emerald-700/50 bg-emerald-900/40 px-4 py-3 text-sm text-emerald-100">{flash.success}</div>}
                    <h1 className="mb-6 text-4xl font-bold text-white">Small Groups</h1>
                    <div className="space-y-6 text-slate-300">
                        <p>
                            Small groups are where deeper relationships and spiritual growth happen. Through prayer,
                            discussion, and accountability, members build lasting Christian community.
                        </p>
                        <ul className="list-disc space-y-2 pl-6">
                            <li>Weekly Bible study and prayer</li>
                            <li>Discipleship and spiritual mentoring</li>
                            <li>Support for individuals and families</li>
                            <li>Mission-focused outreach and service</li>
                        </ul>
                    </div>

                    <section className="mt-12">
                        <div className="mb-5">
                            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-red-300">Find your community</p>
                            <h2 className="mt-2 text-2xl font-bold text-white">Active groups</h2>
                        </div>

                        {groups.length > 0 ? (
                            <div className="grid gap-5 md:grid-cols-2">
                                {groups.map((group) => (
                                    <article key={group.id} className="rounded-2xl border border-red-800/70 bg-slate-900/80 p-5 shadow-lg shadow-red-950/20">
                                        <h3 className="text-xl font-semibold text-white">{group.name}</h3>
                                        {group.description && <p className="mt-3 text-sm leading-relaxed text-slate-300">{group.description}</p>}
                                        <dl className="mt-5 space-y-2 text-sm text-slate-400">
                                            {(group.meeting_day || group.meeting_time) && (
                                                <div><dt className="inline font-semibold text-slate-200">Meeting: </dt><dd className="inline">{[group.meeting_day, group.meeting_time].filter(Boolean).join(' at ')}</dd></div>
                                            )}
                                            {group.location && <div><dt className="inline font-semibold text-slate-200">Location: </dt><dd className="inline">{group.location}</dd></div>}
                                            {group.leader_name && <div><dt className="inline font-semibold text-slate-200">Leader: </dt><dd className="inline">{group.leader_name}</dd></div>}
                                            <div><dt className="inline font-semibold text-slate-200">Members: </dt><dd className="inline">{group.active_member_count ?? 0}</dd></div>
                                        </dl>
                                        {group.meetings?.[0] && (
                                            <div className="mt-5 rounded-xl border border-red-900/60 bg-slate-950/60 p-3 text-sm text-slate-300">
                                                <p className="font-semibold text-red-200">Next meeting: {group.meetings[0].title}</p>
                                                <p className="mt-1">{new Date(group.meetings[0].starts_at).toLocaleString()}</p>
                                                {group.meetings[0].location && <p className="mt-1 text-slate-400">{group.meetings[0].location}</p>}
                                            </div>
                                        )}
                                        {authenticated && joinedGroupIds.includes(group.id) ? (
                                            <Link href={route('small-groups.messages', group.id)} className="mt-5 inline-block rounded-full bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-500">Open group conversation</Link>
                                        ) : authenticated ? (
                                            <button type="button" onClick={() => joinGroup(group.id)} disabled={processing} className="mt-5 rounded-full bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-500 disabled:bg-red-800">
                                                {processing ? 'Joining...' : 'Join group'}
                                            </button>
                                        ) : (
                                            <Link href={route('login')} className="mt-5 inline-block text-sm font-semibold text-red-300 hover:text-red-200">Sign in to join</Link>
                                        )}
                                        {group.contact_email && (
                                            <a href={`mailto:${group.contact_email}`} className="mt-5 inline-block text-sm font-semibold text-red-300 hover:text-red-200">
                                                Contact group
                                            </a>
                                        )}
                                    </article>
                                ))}
                            </div>
                        ) : (
                            <div className="rounded-2xl border border-red-800/70 bg-slate-900/70 p-6 text-sm text-slate-300">
                                Group details will be published here as leaders confirm their meeting schedules.
                            </div>
                        )}
                    </section>
                </div>
            </div>
        </>
    );
}
