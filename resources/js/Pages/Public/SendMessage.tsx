import { Head, Link, useForm } from '@inertiajs/react';

export default function SendMessage({ flash }: { flash?: { success?: string } }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        full_name: '',
        email: '',
        subject: '',
        message: '',
    });

    const submit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        post(route('send-message.store'), { onSuccess: () => reset() });
    };

    return (
        <>
            <Head title="Send Message - APGA Worldwide" />
            <div className="min-h-screen bg-slate-950 text-slate-100">
                <nav className="border-b border-red-800/70 bg-slate-950/95 backdrop-blur-sm">
                    <div className="container mx-auto flex items-center justify-between px-6 py-4">
                        <Link href="/" className="text-2xl font-bold text-red-400">APGA Worldwide</Link>
                        <Link href="/" className="text-red-200 transition hover:text-white">Back to Home</Link>
                    </div>
                </nav>
                <main className="container mx-auto max-w-3xl px-6 py-16">
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-red-300">Church contact</p>
                    <h1 className="mt-3 text-4xl font-bold text-white">Send a message to the church</h1>
                    <p className="mt-4 text-slate-300">Share a question, ministry enquiry, or message for the church team.</p>
                    {flash?.success && <div className="mt-6 rounded-2xl border border-emerald-700/50 bg-emerald-900/40 px-4 py-3 text-sm text-emerald-100">{flash.success}</div>}
                    <form onSubmit={submit} className="mt-8 space-y-5 rounded-3xl border border-red-800/70 bg-slate-900/80 p-6 shadow-xl shadow-red-950/20 sm:p-8">
                        <div className="grid gap-5 sm:grid-cols-2">
                            <label className="text-sm text-slate-200">Full name<input value={data.full_name} onChange={(event) => setData('full_name', event.target.value)} className="mt-1 w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 text-white" required />{errors.full_name && <span className="mt-1 block text-xs text-red-300">{errors.full_name}</span>}</label>
                            <label className="text-sm text-slate-200">Email<input type="email" value={data.email} onChange={(event) => setData('email', event.target.value)} className="mt-1 w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 text-white" required />{errors.email && <span className="mt-1 block text-xs text-red-300">{errors.email}</span>}</label>
                        </div>
                        <label className="block text-sm text-slate-200">Subject<input value={data.subject} onChange={(event) => setData('subject', event.target.value)} className="mt-1 w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 text-white" required />{errors.subject && <span className="mt-1 block text-xs text-red-300">{errors.subject}</span>}</label>
                        <label className="block text-sm text-slate-200">Message<textarea rows={7} value={data.message} onChange={(event) => setData('message', event.target.value)} className="mt-1 w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 text-white" required />{errors.message && <span className="mt-1 block text-xs text-red-300">{errors.message}</span>}</label>
                        <button type="submit" disabled={processing} className="rounded-full bg-red-600 px-6 py-3 font-semibold text-white transition hover:bg-red-500 disabled:bg-red-400">{processing ? 'Sending...' : 'Send message'}</button>
                    </form>
                </main>
            </div>
        </>
    );
}
