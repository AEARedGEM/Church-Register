import { Head, Link } from '@inertiajs/react';

export default function Unsubscribe() {
    return (
        <>
            <Head title="Newsletter Preferences - APGA Worldwide" />
            <div className="flex min-h-screen items-center justify-center bg-slate-950 px-6 text-slate-100">
                <div className="max-w-lg rounded-3xl border border-red-800/70 bg-slate-900 p-8 text-center shadow-xl shadow-red-950/20">
                    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-red-300">Newsletter preferences</p>
                    <h1 className="mt-3 text-3xl font-bold text-white">You have been unsubscribed</h1>
                    <p className="mt-4 text-slate-300">You will no longer receive church newsletter updates at this address.</p>
                    <Link href="/" className="mt-8 inline-flex rounded-full bg-red-600 px-5 py-2.5 font-semibold text-white transition hover:bg-red-500">Return to APGA Worldwide</Link>
                </div>
            </div>
        </>
    );
}
