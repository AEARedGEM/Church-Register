import { Head } from '@inertiajs/react';
import { useState } from 'react';
import RegistrationFormComponent from '@/Pages/Naps/Application/Partials/RegistrationFormComponent';

interface NapsProps {
    stats?: {
        totalRespondents: number;
        surveysCompleted: number;
        verifiedUsers: number;
        statesReached: number;
    };
    charts?: any;
}

export default function Naps({ stats }: NapsProps) {
    const [submitted, setSubmitted] = useState(false);
    const [formData, setFormData] = useState<any>(null);

    const handleSuccess = (data: any) => {
        setFormData(data);
        setSubmitted(true);
    };

    return (
        <>
            <Head title="NAP/S Survey" />

            <div className="min-h-screen bg-slate-50 py-10 dark:bg-slate-950">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-8 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                        <div className="max-w-3xl">
                            <p className="text-sm uppercase tracking-[0.3em] text-emerald-600">NAP/S Survey</p>
                            <h1 className="mt-3 text-4xl font-semibold text-slate-900 dark:text-white">Take the Needs Assessment Poll / Survey</h1>
                            <p className="mt-4 text-base leading-7 text-slate-600 dark:text-slate-300">
                                Help shape ward-level priorities by completing the first step of the public NAP/S survey. Your response will support product, funding, and governance planning for your community.
                            </p>
                        </div>
                    </div>

                    <div className="grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
                        <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                            <div className="space-y-6">
                                <div>
                                    <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Public Survey Entry</h2>
                                    <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                                        Start with your personal and location details, then continue through the NAP/S survey experience.
                                    </p>
                                </div>

                                {submitted ? (
                                    <div className="rounded-3xl border border-emerald-200 bg-emerald-50 p-6 text-slate-900 dark:border-emerald-800 dark:bg-emerald-950 dark:text-white">
                                        <p className="text-lg font-semibold">Thank you!</p>
                                        <p className="mt-2 text-sm text-slate-700 dark:text-slate-200">
                                            We received your registration details and are ready to continue with the next survey stage.
                                        </p>
                                        <pre className="mt-4 overflow-x-auto rounded-xl bg-slate-100 p-4 text-xs text-slate-700 dark:bg-slate-800 dark:text-slate-200">
                                            {JSON.stringify(formData, null, 2)}
                                        </pre>
                                    </div>
                                ) : (
                                    <RegistrationFormComponent onSuccess={handleSuccess} />
                                )}
                            </div>
                        </section>

                        <aside className="space-y-6">
                            <div className="rounded-3xl border border-emerald-200 bg-emerald-50 p-6 shadow-sm dark:border-emerald-800 dark:bg-emerald-950">
                                <h3 className="text-xl font-semibold text-emerald-900 dark:text-emerald-100">Why this matters</h3>
                                <p className="mt-4 text-sm leading-6 text-slate-700 dark:text-slate-300">
                                    NAP/S helps map local needs and product demand from ward to national level. Your participation directly improves the quality of decisions made for your community.
                                </p>
                            </div>

                            {stats ? (
                                <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950">
                                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Public metrics</h3>
                                    <dl className="mt-4 space-y-4 text-sm text-slate-600 dark:text-slate-300">
                                        <div>
                                            <dt className="font-medium text-slate-900 dark:text-white">Total respondents</dt>
                                            <dd>{stats.totalRespondents?.toLocaleString() ?? '—'}</dd>
                                        </div>
                                        <div>
                                            <dt className="font-medium text-slate-900 dark:text-white">Surveys completed</dt>
                                            <dd>{stats.surveysCompleted?.toLocaleString() ?? '—'}</dd>
                                        </div>
                                        <div>
                                            <dt className="font-medium text-slate-900 dark:text-white">Verified users</dt>
                                            <dd>{stats.verifiedUsers?.toLocaleString() ?? '—'}</dd>
                                        </div>
                                        <div>
                                            <dt className="font-medium text-slate-900 dark:text-white">States reached</dt>
                                            <dd>{stats.statesReached?.toLocaleString() ?? '—'}</dd>
                                        </div>
                                    </dl>
                                </div>
                            ) : null}
                        </aside>
                    </div>
                </div>
            </div>
        </>
    );
}
