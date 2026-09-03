import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';

interface SmallGroup {
    id: number;
    name: string;
    description?: string | null;
    meeting_day?: string | null;
    meeting_time?: string | null;
    location?: string | null;
    leader_name?: string | null;
    contact_email?: string | null;
    is_active: boolean;
    active_member_count: number;
    meetings: SmallGroupMeeting[];
    memberships: SmallGroupMembership[];
}

interface SmallGroupMeeting {
    id: number;
    title: string;
    starts_at: string;
    ends_at?: string | null;
    location?: string | null;
    status: string;
}

interface SmallGroupMembership {
    id: number;
    user?: { name?: string | null; email?: string | null };
}

export default function SmallGroupManagement({ groups, flash }: { groups: SmallGroup[]; flash?: { success?: string } }) {
    const { data, setData, post, processing } = useForm<{
        name: string;
        description: string;
        meeting_day: string;
        meeting_time: string;
        location: string;
        leader_name: string;
        contact_email: string;
        is_active: boolean;
    }>({
        name: '',
        description: '',
        meeting_day: '',
        meeting_time: '',
        location: '',
        leader_name: '',
        contact_email: '',
        is_active: true,
    });
    const meetingForm = useForm<{
        small_group_id: string;
        title: string;
        starts_at: string;
        ends_at: string;
        location: string;
        notes: string;
        status: string;
    }>({
        small_group_id: '',
        title: '',
        starts_at: '',
        ends_at: '',
        location: '',
        notes: '',
        status: 'scheduled',
    });
    const attendanceForm = useForm<{
        small_group_meeting_id: string;
        small_group_membership_id: string;
        status: string;
        notes: string;
    }>({
        small_group_meeting_id: '',
        small_group_membership_id: '',
        status: 'present',
        notes: '',
    });

    const submit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        post('/church-admin/small-groups');
    };

    const submitMeeting = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        meetingForm.post('/church-admin/small-groups/meetings');
    };

    const selectedMeeting = groups.flatMap((group) => group.meetings.map((meeting) => ({ ...meeting, groupId: group.id })));
    const selectedMeetingGroupId = selectedMeeting.find((meeting) => String(meeting.id) === attendanceForm.data.small_group_meeting_id)?.groupId;
    const attendanceMembers = groups.find((group) => group.id === selectedMeetingGroupId)?.memberships ?? [];

    const submitAttendance = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        attendanceForm.post('/church-admin/small-groups/attendance');
    };

    return (
        <AuthenticatedLayout>
            <Head title="Small Group Management" />
            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="mb-6">
                    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-red-600">Community</p>
                    <h1 className="mt-2 text-3xl font-bold text-slate-900">Small Group Management</h1>
                </div>

                {flash?.success && <div className="mb-6 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">{flash.success}</div>}

                <div className="mb-8 rounded-3xl border border-red-100 bg-white p-5 shadow-sm">
                    <h2 className="mb-4 text-lg font-semibold text-slate-900">Add a small group</h2>
                    <form onSubmit={submit} className="grid gap-4 md:grid-cols-2">
                        <label className="text-sm font-medium text-slate-700">Group name<input value={data.name} onChange={(event) => setData('name', event.target.value)} className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm" required /></label>
                        <label className="text-sm font-medium text-slate-700">Leader name<input value={data.leader_name} onChange={(event) => setData('leader_name', event.target.value)} className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm" /></label>
                        <label className="text-sm font-medium text-slate-700">Meeting day<input value={data.meeting_day} onChange={(event) => setData('meeting_day', event.target.value)} placeholder="Thursday" className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm" /></label>
                        <label className="text-sm font-medium text-slate-700">Meeting time<input value={data.meeting_time} onChange={(event) => setData('meeting_time', event.target.value)} placeholder="6:30 PM" className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm" /></label>
                        <label className="text-sm font-medium text-slate-700">Location<input value={data.location} onChange={(event) => setData('location', event.target.value)} className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm" /></label>
                        <label className="text-sm font-medium text-slate-700">Contact email<input type="email" value={data.contact_email} onChange={(event) => setData('contact_email', event.target.value)} className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm" /></label>
                        <label className="text-sm font-medium text-slate-700 md:col-span-2">Description<textarea value={data.description} onChange={(event) => setData('description', event.target.value)} rows={3} className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm" /></label>
                        <label className="flex items-center gap-2 text-sm font-medium text-slate-700"><input type="checkbox" checked={data.is_active} onChange={(event) => setData('is_active', Boolean(event.target.checked))} className="h-4 w-4 rounded border-slate-300 text-red-600" />Active group</label>
                        <div className="md:col-span-2"><button type="submit" disabled={processing} className="rounded-full bg-red-600 px-5 py-2.5 text-sm font-semibold text-white disabled:bg-red-300">{processing ? 'Saving...' : 'Save Group'}</button></div>
                    </form>
                </div>

                <div className="mb-8 rounded-3xl border border-red-100 bg-white p-5 shadow-sm">
                    <h2 className="mb-4 text-lg font-semibold text-slate-900">Record group attendance</h2>
                    <form onSubmit={submitAttendance} className="grid gap-4 md:grid-cols-2">
                        <label className="text-sm font-medium text-slate-700">Meeting<select value={attendanceForm.data.small_group_meeting_id} onChange={(event) => { attendanceForm.setData('small_group_meeting_id', event.target.value); attendanceForm.setData('small_group_membership_id', ''); }} className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm" required><option value="">Select meeting</option>{selectedMeeting.map((meeting) => <option key={meeting.id} value={meeting.id}>{meeting.title}</option>)}</select></label>
                        <label className="text-sm font-medium text-slate-700">Member<select value={attendanceForm.data.small_group_membership_id} onChange={(event) => attendanceForm.setData('small_group_membership_id', event.target.value)} className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm" required disabled={!selectedMeetingGroupId}><option value="">Select member</option>{attendanceMembers.map((membership) => <option key={membership.id} value={membership.id}>{membership.user?.name || membership.user?.email || 'Member'}</option>)}</select></label>
                        <label className="text-sm font-medium text-slate-700">Status<select value={attendanceForm.data.status} onChange={(event) => attendanceForm.setData('status', event.target.value)} className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm"><option value="present">Present</option><option value="absent">Absent</option><option value="excused">Excused</option></select></label>
                        <label className="text-sm font-medium text-slate-700">Notes<input value={attendanceForm.data.notes} onChange={(event) => attendanceForm.setData('notes', event.target.value)} className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm" /></label>
                        <div className="md:col-span-2"><button type="submit" disabled={attendanceForm.processing} className="rounded-full bg-red-600 px-5 py-2.5 text-sm font-semibold text-white disabled:bg-red-300">{attendanceForm.processing ? 'Saving...' : 'Save Attendance'}</button></div>
                    </form>
                </div>

                <div className="mb-8 rounded-3xl border border-red-100 bg-white p-5 shadow-sm">
                    <h2 className="mb-4 text-lg font-semibold text-slate-900">Schedule a group meeting</h2>
                    <form onSubmit={submitMeeting} className="grid gap-4 md:grid-cols-2">
                        <label className="text-sm font-medium text-slate-700">Group<select value={meetingForm.data.small_group_id} onChange={(event) => meetingForm.setData('small_group_id', event.target.value)} className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm" required><option value="">Select group</option>{groups.map((group) => <option key={group.id} value={group.id}>{group.name}</option>)}</select></label>
                        <label className="text-sm font-medium text-slate-700">Meeting title<input value={meetingForm.data.title} onChange={(event) => meetingForm.setData('title', event.target.value)} className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm" required /></label>
                        <label className="text-sm font-medium text-slate-700">Starts<input type="datetime-local" value={meetingForm.data.starts_at} onChange={(event) => meetingForm.setData('starts_at', event.target.value)} className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm" required /></label>
                        <label className="text-sm font-medium text-slate-700">Ends<input type="datetime-local" value={meetingForm.data.ends_at} onChange={(event) => meetingForm.setData('ends_at', event.target.value)} className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm" /></label>
                        <label className="text-sm font-medium text-slate-700">Location<input value={meetingForm.data.location} onChange={(event) => meetingForm.setData('location', event.target.value)} className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm" /></label>
                        <label className="text-sm font-medium text-slate-700">Status<select value={meetingForm.data.status} onChange={(event) => meetingForm.setData('status', event.target.value)} className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm"><option value="scheduled">Scheduled</option><option value="completed">Completed</option><option value="cancelled">Cancelled</option></select></label>
                        <label className="text-sm font-medium text-slate-700 md:col-span-2">Notes<textarea value={meetingForm.data.notes} onChange={(event) => meetingForm.setData('notes', event.target.value)} rows={2} className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm" /></label>
                        <div className="md:col-span-2"><button type="submit" disabled={meetingForm.processing} className="rounded-full bg-red-600 px-5 py-2.5 text-sm font-semibold text-white disabled:bg-red-300">{meetingForm.processing ? 'Scheduling...' : 'Schedule Meeting'}</button></div>
                    </form>
                </div>

                <div className="overflow-hidden rounded-3xl border border-red-100 bg-white shadow-sm">
                    <div className="overflow-x-auto"><table className="min-w-full divide-y divide-red-100 text-left">
                        <thead className="bg-red-50"><tr><th className="px-4 py-3 text-sm font-semibold text-slate-700">Group</th><th className="px-4 py-3 text-sm font-semibold text-slate-700">Meeting</th><th className="px-4 py-3 text-sm font-semibold text-slate-700">Leader</th><th className="px-4 py-3 text-sm font-semibold text-slate-700">Members</th><th className="px-4 py-3 text-sm font-semibold text-slate-700">Status</th></tr></thead>
                        <tbody className="divide-y divide-red-50 bg-white">
                            {groups.length > 0 ? groups.map((group) => <tr key={group.id}><td className="px-4 py-3 text-sm font-medium text-slate-800">{group.name}<span className="mt-1 block text-xs font-normal text-slate-500">{group.location || 'Location not set'}</span></td><td className="px-4 py-3 text-sm text-slate-600">{[group.meeting_day, group.meeting_time].filter(Boolean).join(' at ') || 'Schedule not set'}{group.meetings?.[0] && <span className="mt-1 block text-xs text-red-600">Next: {group.meetings[0].title}</span>}</td><td className="px-4 py-3 text-sm text-slate-600">{group.leader_name || '—'}</td><td className="px-4 py-3 text-sm text-slate-600">{group.active_member_count}</td><td className="px-4 py-3 text-sm"><span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${group.is_active ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-700'}`}>{group.is_active ? 'Active' : 'Inactive'}</span></td></tr>) : <tr><td colSpan={5} className="px-4 py-8 text-center text-sm text-slate-500">No small groups have been added yet.</td></tr>}
                        </tbody>
                    </table></div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
