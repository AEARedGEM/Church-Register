import { Head, Link, useForm } from '@inertiajs/react';
import { FormEvent } from 'react';

export default function PrayerRequests({ flash }: { flash?: { success?: string } }) {
    const { data, setData, post, processing, errors, reset } = useForm<{
        full_name: string;
        email: string;
        request_type: string;
        message: string;
        is_public: boolean;
    }>({
        full_name: '',
        email: '',
        request_type: 'healing',
        message: '',
        is_public: false,
    });

    const submitRequest = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        post(route('prayer-requests.store'), {
            onSuccess: () => reset(),
        });
    };

    return (
        <>
            <Head title="Prayer Requests - APGA Worldwide" />
            <div className="min-h-screen bg-slate-950 text-slate-100">
                <nav className="border-b border-red-800/70 bg-slate-950/95 backdrop-blur-sm">
                    <div className="container mx-auto flex items-center justify-between px-6 py-4">
                        <Link href="/" className="text-2xl font-bold text-red-400">APGA Worldwide</Link>
                        <Link href="/" className="text-red-200 transition hover:text-white">Back to Home</Link>
                    </div>
                </nav>
                <main className="container mx-auto max-w-5xl px-6 py-16">
                    <h1 className="mb-6 text-4xl font-bold text-white">Prayer Requests</h1>
                    <div className="space-y-6 text-slate-300">
                        <p>
                            The church family is committed to standing with you in prayer. We welcome requests for healing,
                            guidance, thanksgiving, and breakthrough.
                        </p>
                        {flash?.success && (
                            <div className="rounded-2xl border border-emerald-700/60 bg-emerald-950/50 p-5 text-emerald-100" role="status">
                                {flash.success}
                            </div>
                        )}

                        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
                            <div className="rounded-2xl border border-red-800/70 bg-slate-900/80 p-6">
                                <p className="text-red-100">Share what is on your heart. Our prayer support team will receive your request and handle it with care.</p>
                                <p className="mt-5 text-sm text-slate-400">Your request is private by default and is only shared publicly when you choose that option.</p>
                            </div>

                            <form onSubmit={submitRequest} className="rounded-2xl border border-red-800/70 bg-slate-900/80 p-6">
                                <div className="grid gap-5 sm:grid-cols-2">
                                    <div>
                                        <label htmlFor="full_name" className="text-sm font-semibold text-red-100">Full name</label>
                                        <input id="full_name" value={data.full_name} onChange={(event) => setData('full_name', event.target.value)} required className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none focus:border-red-400" />
                                        {errors.full_name && <p className="mt-1 text-xs text-red-300">{errors.full_name}</p>}
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="text-sm font-semibold text-red-100">Email address</label>
                                        <input id="email" type="email" value={data.email} onChange={(event) => setData('email', event.target.value)} className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none focus:border-red-400" />
                                        {errors.email && <p className="mt-1 text-xs text-red-300">{errors.email}</p>}
                                    </div>
                                </div>
                                <div className="mt-5">
                                    <label htmlFor="request_type" className="text-sm font-semibold text-red-100">Request type</label>
                                    <select id="request_type" value={data.request_type} onChange={(event) => setData('request_type', event.target.value)} className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none focus:border-red-400">
                                        <option value="healing">Healing</option>
                                        <option value="thanksgiving">Thanksgiving</option>
                                        <option value="guidance">Guidance</option>
                                        <option value="deliverance">Deliverance</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>
                                <div className="mt-5">
                                    <label htmlFor="message" className="text-sm font-semibold text-red-100">Your prayer request</label>
                                    <textarea id="message" value={data.message} onChange={(event) => setData('message', event.target.value)} required minLength={10} maxLength={2000} rows={6} className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none focus:border-red-400" />
                                    {errors.message && <p className="mt-1 text-xs text-red-300">{errors.message}</p>}
                                </div>
                                <label className="mt-5 flex items-start gap-3 text-sm text-slate-300">
                                    <input type="checkbox" checked={data.is_public} onChange={(event) => setData('is_public', event.target.checked)} className="mt-1 rounded border-slate-600 bg-slate-950 text-red-600 focus:ring-red-500" />
                                    <span>Allow the church to share this request publicly without displaying my email address.</span>
                                </label>
                                <button type="submit" disabled={processing} className="mt-6 rounded-full bg-red-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-red-500 disabled:cursor-not-allowed disabled:opacity-60">
                                    {processing ? 'Sending request...' : 'Send prayer request'}
                                </button>
                            </form>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}
