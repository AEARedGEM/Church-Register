import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router, useForm } from '@inertiajs/react';
import jsPDF from 'jspdf';
import { useMemo } from 'react';

interface Report {
    id: number;
    period_type: string;
    title: string;
    report_date: string;
    summary?: string;
    attendance_count: number;
    first_timers_count: number;
    new_members_count: number;
    prayer_requests_count: number;
}

interface ReportAnalytics {
    totalAttendance: number;
    totalFirstTimers: number;
    totalNewMembers: number;
    totalPrayerRequests: number;
    averageAttendance: number;
    latestReport?: Report;
    weeklyReports: number;
    monthlyReports: number;
    quarterlyReports: number;
    annualReports: number;
    attendanceTrend: string;
    weeklyGrowth: string;
    attendanceSeries: { id: number; label: string; period: string; value: number; width: number }[];
    strongestPeriod: string;
    leadershipSummary: string;
    leadershipInsight: string;
    totalInvitations: number;
    totalVisitors: number;
    totalConversions: number;
    conversionRate: string;
    scoreTrend: string;
    attendanceComparison: string;
    invitationComparison: string;
}

export default function ReportsDashboard({
    reports,
    flash,
    analyticsLabels,
    periodType = 'all',
    analytics: serverAnalytics,
}: {
    reports: Report[];
    flash?: { success?: string };
    periodType?: string;
    analyticsLabels?: {
        attendanceTrend?: string;
        weeklyGrowth?: string;
        strongestPeriod?: string;
    };
    analytics?: Partial<ReportAnalytics>;
}) {
    const { data, setData, post, processing } = useForm({
        period_type: 'weekly',
        title: '',
        report_date: new Date().toISOString().slice(0, 10),
        summary: '',
        new_members_count: 0,
        prayer_requests_count: 0,
    });

    const getLocalAnalytics = () => {
        const totalAttendance = reports.reduce((sum, report) => sum + Number(report.attendance_count ?? 0), 0);
        const totalFirstTimers = reports.reduce((sum, report) => sum + Number(report.first_timers_count ?? 0), 0);
        const totalNewMembers = reports.reduce((sum, report) => sum + Number(report.new_members_count ?? 0), 0);
        const totalPrayerRequests = reports.reduce((sum, report) => sum + Number(report.prayer_requests_count ?? 0), 0);
        const averageAttendance = reports.length ? Math.round(totalAttendance / reports.length) : 0;
        const latestReport = reports[0];
        const weeklyReports = reports.filter((report) => report.period_type === 'weekly');
        const monthlyReports = reports.filter((report) => report.period_type === 'monthly');
        const quarterlyReports = reports.filter((report) => report.period_type === 'quarterly');
        const annualReports = reports.filter((report) => report.period_type === 'annual');

        const sortedReports = [...reports].sort((a, b) => new Date(a.report_date).getTime() - new Date(b.report_date).getTime());
        const attendanceTrendValue = sortedReports.length > 1
            ? Number(sortedReports[sortedReports.length - 1].attendance_count ?? 0) - Number(sortedReports[0].attendance_count ?? 0)
            : Number(sortedReports[0]?.attendance_count ?? 0);
        const growthReports = weeklyReports.length > 1 ? weeklyReports : sortedReports;
        const previousAttendance = growthReports.length > 1 ? Number(growthReports[growthReports.length - 2].attendance_count ?? 0) : Number(growthReports[0]?.attendance_count ?? 0);
        const latestAttendance = Number(growthReports[growthReports.length - 1]?.attendance_count ?? 0);
        const weeklyGrowth = previousAttendance > 0 ? Math.round(((latestAttendance - previousAttendance) / previousAttendance) * 100) : 0;
        const maxAttendance = Math.max(...sortedReports.map((report) => Number(report.attendance_count ?? 0)), 0);
        const attendanceSeries = sortedReports.map((report) => ({
            id: report.id,
            label: new Date(report.report_date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
            period: report.period_type,
            value: Number(report.attendance_count ?? 0),
            width: maxAttendance ? Math.max((Number(report.attendance_count ?? 0) / maxAttendance) * 100, 4) : 4,
        }));
        const strongestPeriod = reports.reduce<Record<string, number>>((acc, report) => {
            acc[report.period_type] = (acc[report.period_type] ?? 0) + Number(report.attendance_count ?? 0);
            return acc;
        }, {});
        const strongestPeriodLabel = Object.entries(strongestPeriod).sort((a, b) => b[1] - a[1])[0];

        return {
            totalAttendance,
            totalFirstTimers,
            totalNewMembers,
            totalPrayerRequests,
            averageAttendance,
            latestReport,
            weeklyReports: weeklyReports.length,
            monthlyReports: monthlyReports.length,
            quarterlyReports: quarterlyReports.length,
            annualReports: annualReports.length,
            attendanceTrend: attendanceTrendValue >= 0 ? `+${attendanceTrendValue}` : `${attendanceTrendValue}`,
            weeklyGrowth: `${weeklyGrowth >= 0 ? '+' : ''}${weeklyGrowth}%`,
            attendanceSeries,
            strongestPeriod: strongestPeriodLabel ? `${strongestPeriodLabel[0].toUpperCase()}${strongestPeriodLabel[0].slice(1)} (${strongestPeriodLabel[1]})` : 'No data',
            leadershipSummary: latestReport
                ? `Latest church pulse: ${latestReport.title} (${latestReport.report_date}) - attendance ${latestReport.attendance_count}, first timers ${latestReport.first_timers_count}, prayer requests ${latestReport.prayer_requests_count}.`
                : 'No church reports are available yet.',
            leadershipInsight: strongestPeriodLabel
                ? `The strongest reporting period is ${strongestPeriodLabel[0]} with ${strongestPeriodLabel[1]} recorded attendees.`
                : 'No attendance trend data yet.',
        };
    };

    const analytics = { ...useMemo(getLocalAnalytics, [reports]), ...serverAnalytics };

    const submit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        post('/church-admin/reports');
    };

    const exportReportsPdf = () => {
        const pdf = new jsPDF({ unit: 'pt', format: 'a4' });
        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();

        const drawHeader = () => {
            pdf.setFillColor(120, 16, 23);
            pdf.rect(0, 0, pageWidth, 64, 'F');
            pdf.setTextColor(255, 255, 255);
            pdf.setFont('helvetica', 'bold');
            pdf.setFontSize(20);
            pdf.text('APGA Worldwide Church Leadership Report', 40, 38);
            pdf.setFont('helvetica', 'normal');
        };

        drawHeader();

        pdf.setTextColor(30, 41, 59);
        pdf.setFontSize(11);

        const summaryLines = [
            `Report scope: ${periodType === 'all' ? 'All periods' : periodType.charAt(0).toUpperCase() + periodType.slice(1)}`,
            `Total attendance: ${analytics.totalAttendance}`,
            `First timers: ${analytics.totalFirstTimers}`,
            `New members: ${analytics.totalNewMembers}`,
            `Prayer requests: ${analytics.totalPrayerRequests}`,
            `Average attendance: ${analytics.averageAttendance}`,
            `Attendance trend: ${analytics.attendanceTrend}`,
            `Weekly growth: ${analytics.weeklyGrowth}`,
            `Strongest period: ${analytics.strongestPeriod}`,
        ];

        let y = 90;
        summaryLines.forEach((line) => {
            if (y > 760) {
                pdf.addPage();
                drawHeader();
                y = 60;
            }
            pdf.text(line, 40, y);
            y += 16;
        });

        y += 12;
        pdf.setFont('helvetica', 'bold');
        pdf.text('Executive summary', 40, y);
        y += 18;
        pdf.setFont('helvetica', 'normal');
        const summaryText = pdf.splitTextToSize(analytics.leadershipSummary || 'No report summary available yet.', 500);
        summaryText.forEach((line: string) => {
            if (y > 760) {
                pdf.addPage();
                drawHeader();
                y = 60;
            }
            pdf.text(line, 40, y);
            y += 14;
        });

        y += 12;
        pdf.setFont('helvetica', 'bold');
        pdf.text('Report detail', 40, y);
        y += 18;
        pdf.setFont('helvetica', 'normal');

        reports.forEach((report, index) => {
            if (y > 720) {
                pdf.addPage();
                drawHeader();
                y = 60;
            }

            pdf.setFont('helvetica', 'bold');
            pdf.text(`${index + 1}. ${report.title}`, 40, y);
            y += 18;

            pdf.setFont('helvetica', 'normal');
            pdf.text(`Period: ${report.period_type.toUpperCase()}`, 40, y);
            pdf.text(`Date: ${report.report_date}`, 220, y);
            y += 16;
            pdf.text(`Attendance: ${report.attendance_count}`, 40, y);
            pdf.text(`First Timers: ${report.first_timers_count}`, 180, y);
            pdf.text(`New Members: ${report.new_members_count}`, 300, y);
            pdf.text(`Prayer Requests: ${report.prayer_requests_count}`, 430, y);
            y += 22;

            if (report.summary) {
                const summaryLines = pdf.splitTextToSize(report.summary, 500);
                summaryLines.forEach((line: string) => {
                    if (y > 760) {
                        pdf.addPage();
                        drawHeader();
                        y = 60;
                    }
                    pdf.text(line, 40, y);
                    y += 14;
                });
            }

            y += 12;
        });

        if (!reports.length) {
            pdf.setFontSize(12);
            pdf.text('No church reports available yet.', 40, 120);
        }

        const totalPages = pdf.getNumberOfPages();
        for (let page = 1; page <= totalPages; page += 1) {
            pdf.setPage(page);
            pdf.setDrawColor(226, 232, 240);
            pdf.line(40, pageHeight - 42, pageWidth - 40, pageHeight - 42);
            pdf.setTextColor(100, 116, 139);
            pdf.setFont('helvetica', 'normal');
            pdf.setFontSize(9);
            pdf.text('APGA Worldwide | Church Leadership and Stewardship', 40, pageHeight - 25);
            pdf.text(`Page ${page} of ${totalPages}`, pageWidth - 100, pageHeight - 25);
        }

        pdf.save('apga-church-leadership-summary.pdf');
    };

    return (
        <AuthenticatedLayout>
            <Head title="Church Reports" />
            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="mb-6">
                    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-red-600">Reports</p>
                    <h1 className="mt-2 text-3xl font-bold text-slate-900">Church Report Center</h1>
                </div>

                {flash?.success && (
                    <div className="mb-6 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
                        {flash.success}
                    </div>
                )}

                <div className="mb-6 flex justify-end">
                    <label className="mr-auto text-sm font-medium text-slate-700">
                        Report scope
                        <select
                            value={periodType}
                            onChange={(event) => router.get('/church-admin/reports', { period_type: event.target.value }, { preserveState: true, replace: true })}
                            className="ml-3 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm"
                        >
                            <option value="all">All periods</option>
                            <option value="weekly">Weekly</option>
                            <option value="monthly">Monthly</option>
                            <option value="quarterly">Quarterly</option>
                            <option value="annual">Annual</option>
                        </select>
                    </label>
                    <button
                        type="button"
                        onClick={exportReportsPdf}
                        className="rounded-full border border-red-200 bg-white px-5 py-2.5 text-sm font-semibold text-red-700 shadow-sm transition hover:bg-red-50"
                    >
                        Export Leadership PDF
                    </button>
                </div>

                <div className="mb-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                    <div className="rounded-2xl border border-red-100 bg-white p-5 shadow-sm">
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Total attendance</p>
                        <p className="mt-3 text-3xl font-bold text-slate-900">{analytics.totalAttendance}</p>
                    </div>
                    <div className="rounded-2xl border border-red-100 bg-white p-5 shadow-sm">
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">First timers</p>
                        <p className="mt-3 text-3xl font-bold text-slate-900">{analytics.totalFirstTimers}</p>
                    </div>
                    <div className="rounded-2xl border border-red-100 bg-white p-5 shadow-sm">
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">New members</p>
                        <p className="mt-3 text-3xl font-bold text-slate-900">{analytics.totalNewMembers}</p>
                    </div>
                    <div className="rounded-2xl border border-red-100 bg-white p-5 shadow-sm">
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Avg. attendance</p>
                        <p className="mt-3 text-3xl font-bold text-slate-900">{analytics.averageAttendance}</p>
                    </div>
                </div>

                <div className="mb-8 rounded-3xl border border-slate-200 bg-slate-50 p-5">
                    <div className="flex flex-wrap items-end justify-between gap-3">
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Period comparison</p>
                            <h2 className="mt-2 text-xl font-bold text-slate-900">Latest report against the previous report</h2>
                        </div>
                        <p className="text-xs text-slate-500">{periodType === 'all' ? 'Across all report periods' : `Within ${periodType} reports`}</p>
                    </div>
                    <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        <div className="rounded-2xl bg-white p-4"><p className="text-xs uppercase tracking-[0.16em] text-slate-500">Attendance change</p><p className="mt-2 text-2xl font-bold text-slate-900">{analytics.attendanceComparison}</p></div>
                        <div className="rounded-2xl bg-white p-4"><p className="text-xs uppercase tracking-[0.16em] text-slate-500">Invitation change</p><p className="mt-2 text-2xl font-bold text-slate-900">{analytics.invitationComparison}</p></div>
                        <div className="rounded-2xl bg-white p-4"><p className="text-xs uppercase tracking-[0.16em] text-slate-500">Conversion rate</p><p className="mt-2 text-2xl font-bold text-slate-900">{analytics.conversionRate}</p></div>
                        <div className="rounded-2xl bg-white p-4"><p className="text-xs uppercase tracking-[0.16em] text-slate-500">Score movement</p><p className="mt-2 text-2xl font-bold text-slate-900">{analytics.scoreTrend}</p></div>
                    </div>
                </div>

                <div className="mb-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                    <div className="rounded-2xl border border-orange-100 bg-orange-50 p-4">
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-700">Invitations</p>
                        <p className="mt-3 text-2xl font-bold text-slate-900">{analytics.totalInvitations}</p>
                    </div>
                    <div className="rounded-2xl border border-cyan-100 bg-cyan-50 p-4">
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-700">New visitors</p>
                        <p className="mt-3 text-2xl font-bold text-slate-900">{analytics.totalVisitors}</p>
                    </div>
                    <div className="rounded-2xl border border-lime-100 bg-lime-50 p-4">
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-lime-700">Conversions</p>
                        <p className="mt-3 text-2xl font-bold text-slate-900">{analytics.totalConversions}</p>
                    </div>
                    <div className="rounded-2xl border border-fuchsia-100 bg-fuchsia-50 p-4">
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-fuchsia-700">Conversion rate</p>
                        <p className="mt-3 text-2xl font-bold text-slate-900">{analytics.conversionRate}</p>
                        <p className="mt-2 text-xs text-fuchsia-800">Score trend: {analytics.scoreTrend}</p>
                    </div>
                </div>

                <div className="mb-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                    <div className="rounded-2xl border border-amber-100 bg-amber-50 p-4">
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-700">{analyticsLabels?.attendanceTrend ?? 'Attendance trend'}</p>
                        <p className="mt-3 text-2xl font-bold text-slate-900">{analytics.attendanceTrend}</p>
                        <p className="mt-2 text-xs text-amber-800">vs earliest report</p>
                    </div>
                    <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-4">
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">{analyticsLabels?.weeklyGrowth ?? 'Weekly growth'}</p>
                        <p className="mt-3 text-2xl font-bold text-slate-900">{analytics.weeklyGrowth}</p>
                        <p className="mt-2 text-xs text-emerald-800">recent trend</p>
                    </div>
                    <div className="rounded-2xl border border-sky-100 bg-sky-50 p-4">
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-700">Prayer requests</p>
                        <p className="mt-3 text-2xl font-bold text-slate-900">{analytics.totalPrayerRequests}</p>
                    </div>
                    <div className="rounded-2xl border border-violet-100 bg-violet-50 p-4">
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-700">{analyticsLabels?.strongestPeriod ?? 'Strongest period'}</p>
                        <p className="mt-3 text-sm font-bold text-slate-900">{analytics.strongestPeriod}</p>
                    </div>
                </div>

                <div className="mb-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                    <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-4">
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">Weekly reports</p>
                        <p className="mt-3 text-2xl font-bold text-slate-900">{analytics.weeklyReports}</p>
                    </div>
                    <div className="rounded-2xl border border-sky-100 bg-sky-50 p-4">
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-700">Monthly reports</p>
                        <p className="mt-3 text-2xl font-bold text-slate-900">{analytics.monthlyReports}</p>
                    </div>
                    <div className="rounded-2xl border border-indigo-100 bg-indigo-50 p-4">
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-700">Quarterly reports</p>
                        <p className="mt-3 text-2xl font-bold text-slate-900">{analytics.quarterlyReports}</p>
                    </div>
                    <div className="rounded-2xl border border-rose-100 bg-rose-50 p-4">
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-rose-700">Annual reports</p>
                        <p className="mt-3 text-2xl font-bold text-slate-900">{analytics.annualReports}</p>
                    </div>
                </div>

                {analytics.latestReport && (
                    <div className="mb-8 grid gap-4 lg:grid-cols-2">
                        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
                            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-700">Leadership summary</p>
                            <p className="mt-3 font-medium">{analytics.leadershipSummary}</p>
                        </div>
                        <div className="rounded-2xl border border-violet-200 bg-violet-50 p-4 text-sm text-violet-900">
                            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-700">Insight</p>
                            <p className="mt-3 font-medium">{analytics.leadershipInsight}</p>
                        </div>
                    </div>
                )}

                <section className="mb-8 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                    <div className="flex flex-wrap items-end justify-between gap-3">
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-red-600">Attendance movement</p>
                            <h2 className="mt-2 text-xl font-bold text-slate-900">Reported attendance by period</h2>
                        </div>
                        <p className="text-sm text-slate-500">Oldest to latest report</p>
                    </div>

                    {analytics.attendanceSeries.length ? (
                        <div className="mt-6 space-y-4">
                            {analytics.attendanceSeries.map((point) => (
                                <div key={point.id} className="grid grid-cols-[76px_1fr_44px] items-center gap-3 text-sm">
                                    <div className="text-slate-500">
                                        <div className="font-medium text-slate-700">{point.label}</div>
                                        <div className="text-xs capitalize">{point.period}</div>
                                    </div>
                                    <div className="h-3 overflow-hidden rounded-full bg-slate-100">
                                        <div className="h-full rounded-full bg-gradient-to-r from-red-600 to-amber-400" style={{ width: `${point.width}%` }} />
                                    </div>
                                    <div className="text-right font-semibold text-slate-900">{point.value}</div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="mt-6 text-sm text-slate-500">Attendance trends will appear after the first church report is recorded.</p>
                    )}
                </section>

                <div className="mb-8 rounded-3xl border border-red-100 bg-white p-5 shadow-sm">
                    <h2 className="mb-4 text-lg font-semibold text-slate-900">Add a report</h2>
                    <form onSubmit={submit} className="grid gap-4 md:grid-cols-2">
                        <label className="text-sm font-medium text-slate-700">
                            Period type
                            <select
                                value={data.period_type}
                                onChange={(event) => setData('period_type', event.target.value)}
                                className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm"
                            >
                                <option value="weekly">Weekly</option>
                                <option value="monthly">Monthly</option>
                                <option value="quarterly">Quarterly</option>
                                <option value="annual">Annual</option>
                            </select>
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
                            Report date
                            <input
                                type="date"
                                value={data.report_date}
                                onChange={(event) => setData('report_date', event.target.value)}
                                className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm"
                                required
                            />
                        </label>
                        <div className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-slate-700">
                            <p className="font-semibold text-red-700">Attendance totals are calculated automatically</p>
                            <p className="mt-1 text-xs text-slate-600">Present and late records within the selected period are used when this report is created.</p>
                        </div>
                        <label className="text-sm font-medium text-slate-700">
                            New members
                            <input
                                type="number"
                                min={0}
                                value={data.new_members_count}
                                onChange={(event) => setData('new_members_count', Number(event.target.value) || 0)}
                                className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm"
                            />
                        </label>
                        <label className="text-sm font-medium text-slate-700">
                            Prayer requests
                            <input
                                type="number"
                                min={0}
                                value={data.prayer_requests_count}
                                onChange={(event) => setData('prayer_requests_count', Number(event.target.value) || 0)}
                                className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm"
                            />
                        </label>
                        <label className="text-sm font-medium text-slate-700 md:col-span-2">
                            Summary
                            <textarea
                                value={data.summary}
                                onChange={(event) => setData('summary', event.target.value)}
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
                                {processing ? 'Saving...' : 'Create Report'}
                            </button>
                        </div>
                    </form>
                </div>

                <div className="overflow-hidden rounded-3xl border border-red-100 bg-white shadow-sm">
                    <table className="min-w-full divide-y divide-red-100 text-left">
                        <thead className="bg-red-50">
                            <tr>
                                <th className="px-4 py-3 text-sm font-semibold text-slate-700">Period</th>
                                <th className="px-4 py-3 text-sm font-semibold text-slate-700">Title</th>
                                <th className="px-4 py-3 text-sm font-semibold text-slate-700">Date</th>
                                <th className="px-4 py-3 text-sm font-semibold text-slate-700">Attendance</th>
                                <th className="px-4 py-3 text-sm font-semibold text-slate-700">First Timers</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-red-50 bg-white">
                            {reports.length > 0 ? reports.map((report) => (
                                <tr key={report.id} className="hover:bg-red-50/40">
                                    <td className="px-4 py-3 text-sm font-medium text-slate-800 capitalize">{report.period_type}</td>
                                    <td className="px-4 py-3 text-sm text-slate-600">{report.title}</td>
                                    <td className="px-4 py-3 text-sm text-slate-600">{report.report_date}</td>
                                    <td className="px-4 py-3 text-sm text-slate-600">{report.attendance_count}</td>
                                    <td className="px-4 py-3 text-sm text-slate-600">{report.first_timers_count}</td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan={5} className="px-4 py-8 text-center text-sm text-slate-500">No church reports have been created yet.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
