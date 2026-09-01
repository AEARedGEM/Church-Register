import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import { Eye, EyeOff, Building2, Users, TrendingUp, Shield, BarChart3, Zap, Coins, Users2 } from 'lucide-react';
import { useState } from 'react';

export default function Login({
    status,
    canResetPassword,
}: {
    status?: string;
    canResetPassword: boolean;
}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false as boolean,
    });

    const [showPassword, setShowPassword] = useState(false);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Log in - APGA Worldwide" />

            <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.18),_transparent_24%),radial-gradient(circle_at_bottom,_rgba(168,85,247,0.14),_transparent_25%),linear-gradient(135deg,#f5f7ff_0%,#eef2ff_28%,#fdf2f8_100%)] dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-3 transition-colors duration-300">
                <div className="w-full max-w-5xl flex overflow-hidden rounded-[28px] border border-white/30 bg-white shadow-[0_30px_80px_rgba(15,23,42,0.18)] backdrop-blur-sm dark:bg-gray-800">

                    {/* Left Side - Brand/Info Panel */}
                    <div className="hidden lg:flex lg:w-2/5 flex-col justify-between overflow-hidden p-8 text-white relative bg-[linear-gradient(135deg,#0b1735_0%,#102a4b_18%,#153b5f_42%,#0f3d74_70%,#1a1e5a_100%)]">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.28),_transparent_22%),radial-gradient(circle_at_bottom_right,_rgba(236,72,153,0.22),_transparent_26%)]"></div>
                        <div className="absolute -left-12 top-12 h-40 w-40 rounded-full bg-cyan-400/15 blur-3xl animate-pulse"></div>
                        <div className="absolute right-0 top-0 h-52 w-52 rounded-full bg-fuchsia-400/20 blur-3xl animate-[spin_18s_linear_infinite]"></div>
                        <div className="absolute bottom-6 right-16 h-44 w-44 rounded-full bg-indigo-400/20 blur-3xl animate-pulse"></div>

                        <div className="relative z-10 flex h-full flex-col justify-between">
                            <div className="space-y-6">
                                <div className="flex items-center gap-4">
                                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/20 bg-white/10 shadow-[0_20px_40px_rgba(14,116,144,0.25)] backdrop-blur-md">
                                        <img src="/images/logo.png" alt="APGA logo" className="h-10 w-10 object-contain" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-cyan-100/80">APGA Worldwide</p>
                                        <h1 className="mt-1 text-3xl font-black tracking-tight">Welcome Back</h1>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <p className="text-lg font-semibold text-cyan-100">Apostolic Power Glorious Assembly</p>
                                    <p className="max-w-xs text-sm text-slate-200/85">Growing God’s Kingdom together in faith, purpose, and community.</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                {[
                                    { label: 'Attendance', meta: 'Track', icon: Users },
                                    { label: 'Events', meta: 'Calendar', icon: BarChart3 },
                                    { label: 'Community', meta: 'Connect', icon: Users2 },
                                    { label: 'Prayer', meta: 'Request', icon: Zap },
                                ].map(({ label, meta, icon: Icon }) => (
                                    <div key={label} className="group rounded-2xl border border-white/10 bg-white/8 p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.15)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:bg-white/12">
                                        <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-white/12 text-white transition-transform duration-300 group-hover:scale-110">
                                            <Icon className="h-4 w-4" />
                                        </div>
                                        <h3 className="text-sm font-semibold text-white">{label}</h3>
                                        <p className="text-[11px] text-slate-200/80">{meta}</p>
                                    </div>
                                ))}
                            </div>

                            <div className="rounded-2xl border border-white/15 bg-white/8 p-4 shadow-[0_20px_40px_rgba(8,47,95,0.2)] backdrop-blur-sm">
                                <p className="text-xs font-medium leading-relaxed italic text-slate-100/95">"Therefore if any man be in Christ, he is a new creature." — 2 Corinthians 5:17</p>
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Login Form */}
                    <div className="w-full lg:w-3/5 p-7 lg:p-10 flex flex-col justify-center bg-white dark:bg-gray-800">
                        <div className="w-full max-w-sm mx-auto">
                            <div className="text-center mb-6">
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">Sign In</h2>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Access your account</p>
                            </div>

                            {status && (
                                <div className="mb-5 p-3 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg animate-pulse">
                                    <div className="text-xs font-medium text-red-800 dark:text-red-300">
                                        {status}
                                    </div>
                                </div>
                            )}

                            <form onSubmit={submit} className="space-y-4">
                                <div>
                                    <InputLabel
                                        htmlFor="email"
                                        value="Email"
                                        className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5 uppercase tracking-wider"
                                    />

                                    <TextInput
                                        id="email"
                                        type="email"
                                        name="email"
                                        value={data.email}
                                        className="w-full px-3.5 py-2.5 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 dark:focus:ring-red-400 focus:border-red-300 dark:focus:border-red-500 transition-all duration-200 bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 focus:bg-white dark:focus:bg-gray-600 text-gray-900 dark:text-gray-100 text-sm shadow-sm"
                                        autoComplete="username"
                                        isFocused={true}
                                        onChange={(e) => setData('email', e.target.value)}
                                        placeholder="your@email.com"
                                    />

                                    <InputError message={errors.email} className="mt-1.5 text-red-600 dark:text-red-400 text-xs" />
                                </div>

                                <div>
                                    <InputLabel
                                        htmlFor="password"
                                        value="Password"
                                        className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5 uppercase tracking-wider"
                                    />

                                    <div className="relative">
                                        <TextInput
                                            id="password"
                                            type={showPassword ? "text" : "password"}
                                            name="password"
                                            value={data.password}
                                            className="w-full px-3.5 py-2.5 pr-10 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 dark:focus:ring-red-400 focus:border-red-300 dark:focus:border-red-500 transition-all duration-200 bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 focus:bg-white dark:focus:bg-gray-600 text-gray-900 dark:text-gray-100 text-sm shadow-sm"
                                            autoComplete="current-password"
                                            onChange={(e) => setData('password', e.target.value)}
                                            placeholder="Enter password"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 focus:outline-none transition-colors"
                                        >
                                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                        </button>
                                    </div>

                                    <InputError message={errors.password} className="mt-1.5 text-red-600 dark:text-red-400 text-xs" />
                                </div>

                                <div className="flex items-center justify-between pt-1">
                                    <label className="flex items-center cursor-pointer group">
                                        <Checkbox
                                            name="remember"
                                            checked={data.remember}
                                            onChange={(e) =>
                                                setData(
                                                    'remember',
                                                    (e.target.checked || false) as false,
                                                )
                                            }
                                            className="w-4 h-4 text-red-600 dark:text-red-400 border-gray-300 dark:border-gray-600 rounded focus:ring-red-500 dark:focus:ring-red-400 bg-gray-50 dark:bg-gray-700"
                                        />
                                        <span className="ml-2 text-xs text-gray-600 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors">
                                            Remember me
                                        </span>
                                    </label>

                                    {canResetPassword && (
                                        <Link
                                            href={route('password.request')}
                                            className="text-xs text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 font-medium focus:outline-none hover:underline transition-colors"
                                        >
                                            Forgot?
                                        </Link>
                                    )}
                                </div>

                                <PrimaryButton
                                    className="w-full bg-gradient-to-r from-red-600 to-red-700 dark:from-red-500 dark:to-red-600 text-white py-2.5 px-4 rounded-lg font-semibold hover:from-red-700 hover:to-red-800 dark:hover:from-red-600 dark:hover:to-red-700 focus:ring-2 focus:ring-red-500 dark:focus:ring-red-400 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-all duration-300 transform hover:shadow-lg active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-md text-sm font-medium"
                                    disabled={processing}
                                >
                                    {processing ? 'Signing in...' : 'Sign In'}
                                </PrimaryButton>
                            </form>

                            <div className="mt-5 text-center">
                                <p className="text-gray-600 dark:text-gray-400 text-sm">
                                    New member?{' '}
                                    <Link
                                        href={route('register')}
                                        className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 font-semibold focus:outline-none hover:underline transition-colors"
                                    >
                                        Create account
                                    </Link>
                                </p>
                            </div>

                            <div className="mt-5 pt-4 border-t border-gray-200 dark:border-gray-700">
                                <div className="flex items-center justify-center space-x-1.5 text-xs text-gray-500 dark:text-gray-400">
                                    <Shield className="w-3.5 h-3.5" />
                                    <span>Secure • Private • Faith-Based</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
