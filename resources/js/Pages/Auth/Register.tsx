import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler, useState, useEffect } from 'react';
import { Eye, EyeOff, Building2, TrendingUp, Users, Shield, BarChart3, Zap, Coins, Users2 } from 'lucide-react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        phone: '',
        date_of_birth: '',
        gender: '',
        membership_status: '1',
        workforce_status: '',
        password: '',
        password_confirmation: '',
        state: '',
        lga: '',
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [states, setStates] = useState<string[]>([]);
    const [lgas, setLgas] = useState<string[]>([]);
    const [loadingStates, setLoadingStates] = useState(false);
    const [loadingLgas, setLoadingLgas] = useState(false);

    useEffect(() => {
        fetchStates();
    }, []);

    const fetchStates = async () => {
        setLoadingStates(true);
        try {
            const response = await fetch('/api/states');
            const result = await response.json();
            setStates(result);
        } catch (error) {
            console.error('Error fetching states:', error);
        } finally {
            setLoadingStates(false);
        }
    };

    const fetchLGAs = async (selectedState: string) => {
        if (!selectedState) {
            setLgas([]);
            return;
        }
        setLoadingLgas(true);
        try {
            const response = await fetch(`/api/lgas?state=${selectedState}`);
            const result = await response.json();
            setLgas(result);
        } catch (error) {
            console.error('Error fetching LGAs:', error);
        } finally {
            setLoadingLgas(false);
        }
    };

    const handleStateChange = (value: string) => {
        setData('state', value);
        setData('lga', '');
        fetchLGAs(value);
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Register - APGA Worldwide" />

            <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.18),_transparent_24%),radial-gradient(circle_at_bottom,_rgba(168,85,247,0.14),_transparent_25%),linear-gradient(135deg,#f5f7ff_0%,#eef2ff_28%,#fdf2f8_100%)] dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-3 transition-colors duration-300">
                <div className="w-full max-w-5xl flex overflow-hidden rounded-[28px] border border-white/30 bg-white shadow-[0_30px_80px_rgba(15,23,42,0.18)] backdrop-blur-sm dark:bg-gray-800">
                    {/* Left Side - APGA Branding */}
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
                                        <h1 className="mt-1 text-3xl font-black tracking-tight">Join APGA</h1>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <p className="text-lg font-semibold text-cyan-100">Apostolic Power Glorious Assembly</p>
                                    <p className="max-w-xs text-sm text-slate-200/85">A faith community growing together in grace, service, and purpose.</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                {[
                                    { label: 'Attendance', meta: 'Services', icon: Users },
                                    { label: 'Events', meta: 'Calendar', icon: BarChart3 },
                                    { label: 'Invitations', meta: 'Grow', icon: TrendingUp },
                                    { label: 'Community', meta: 'Connect', icon: Users2 },
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
                                <p className="text-xs font-medium leading-relaxed italic text-slate-100/95">"Come to me, all you who are weary." — Matthew 11:28</p>
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Register Form */}
                    <div className="w-full lg:w-3/5 p-7 lg:p-10 flex flex-col justify-center bg-white dark:bg-gray-800 overflow-y-auto max-h-screen lg:max-h-none">
                        <div className="w-full max-w-sm mx-auto">
                            <div className="text-center mb-5">
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">Create Account</h2>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Join our faith community</p>
                            </div>

                            <form onSubmit={submit} className="space-y-3.5">
                                <div>
                                    <InputLabel
                                        htmlFor="name"
                                        value="Full Name"
                                        className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5 uppercase tracking-wider"
                                    />

                                    <TextInput
                                        id="name"
                                        name="name"
                                        value={data.name}
                                        className="w-full px-3.5 py-2.5 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 dark:focus:ring-red-400 focus:border-red-300 dark:focus:border-red-500 transition-all duration-200 bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 focus:bg-white dark:focus:bg-gray-600 text-gray-900 dark:text-gray-100 text-sm shadow-sm"
                                        autoComplete="name"
                                        isFocused={true}
                                        onChange={(e) => setData('name', e.target.value)}
                                        required
                                        placeholder="John Doe"
                                    />

                                    <InputError message={errors.name} className="mt-1.5 text-red-600 dark:text-red-400 text-xs" />
                                </div>

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
                                        onChange={(e) => setData('email', e.target.value)}
                                        required
                                        placeholder="your@email.com"
                                    />

                                    <InputError message={errors.email} className="mt-1.5 text-red-600 dark:text-red-400 text-xs" />
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <InputLabel
                                            htmlFor="phone"
                                            value="Phone Number"
                                            className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5 uppercase tracking-wider"
                                        />

                                        <TextInput
                                            id="phone"
                                            type="tel"
                                            name="phone"
                                            value={data.phone}
                                            className="w-full px-3.5 py-2.5 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 dark:focus:ring-red-400 focus:border-red-300 dark:focus:border-red-500 transition-all duration-200 bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 focus:bg-white dark:focus:bg-gray-600 text-gray-900 dark:text-gray-100 text-sm shadow-sm"
                                            onChange={(e) => setData('phone', e.target.value)}
                                            required
                                            placeholder="+234 800 000 0000"
                                        />

                                        <InputError message={errors.phone} className="mt-1.5 text-red-600 dark:text-red-400 text-xs" />
                                    </div>

                                    <div>
                                        <InputLabel
                                            htmlFor="date_of_birth"
                                            value="Birthday"
                                            className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5 uppercase tracking-wider"
                                        />

                                        <TextInput
                                            id="date_of_birth"
                                            type="date"
                                            name="date_of_birth"
                                            value={data.date_of_birth}
                                            className="w-full px-3.5 py-2.5 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 dark:focus:ring-red-400 focus:border-red-300 dark:focus:border-red-500 transition-all duration-200 bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 focus:bg-white dark:focus:bg-gray-600 text-gray-900 dark:text-gray-100 text-sm shadow-sm"
                                            onChange={(e) => setData('date_of_birth', e.target.value)}
                                            required
                                        />

                                        <InputError message={errors.date_of_birth} className="mt-1.5 text-red-600 dark:text-red-400 text-xs" />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <InputLabel
                                            htmlFor="membership_status"
                                            value="Membership Type"
                                            className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5 uppercase tracking-wider"
                                        />

                                        <select
                                            id="membership_status"
                                            name="membership_status"
                                            value={data.membership_status}
                                            onChange={(e) => {
                                                setData('membership_status', e.target.value);
                                                if (e.target.value === '2') {
                                                    setData('workforce_status', '');
                                                }
                                            }}
                                            className="w-full px-3.5 py-2.5 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 dark:focus:ring-red-400 focus:border-red-300 dark:focus:border-red-500 transition-all duration-200 bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 focus:bg-white dark:focus:bg-gray-600 text-gray-900 dark:text-gray-100 text-sm shadow-sm"
                                        >
                                            <option value="1">Regular Member</option>
                                            <option value="2">First-Timer</option>
                                        </select>

                                        <InputError message={errors.membership_status} className="mt-1.5 text-red-600 dark:text-red-400 text-xs" />
                                    </div>

                                    <div>
                                        <InputLabel
                                            htmlFor="gender"
                                            value="Gender"
                                            className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5 uppercase tracking-wider"
                                        />

                                        <select
                                            id="gender"
                                            name="gender"
                                            value={data.gender}
                                            onChange={(e) => setData('gender', e.target.value)}
                                            className="w-full px-3.5 py-2.5 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 dark:focus:ring-red-400 focus:border-red-300 dark:focus:border-red-500 transition-all duration-200 bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 focus:bg-white dark:focus:bg-gray-600 text-gray-900 dark:text-gray-100 text-sm shadow-sm"
                                        >
                                            <option value="">Select</option>
                                            <option value="1">Male</option>
                                            <option value="2">Female</option>
                                        </select>

                                        <InputError message={errors.gender} className="mt-1.5 text-red-600 dark:text-red-400 text-xs" />
                                    </div>
                                </div>

                                {data.membership_status === '1' && (
                                    <div>
                                        <InputLabel
                                            htmlFor="workforce_status"
                                            value="Workforce Status"
                                            className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5 uppercase tracking-wider"
                                        />

                                        <select
                                            id="workforce_status"
                                            name="workforce_status"
                                            value={data.workforce_status}
                                            onChange={(e) => setData('workforce_status', e.target.value)}
                                            className="w-full px-3.5 py-2.5 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 dark:focus:ring-red-400 focus:border-red-300 dark:focus:border-red-500 transition-all duration-200 bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 focus:bg-white dark:focus:bg-gray-600 text-gray-900 dark:text-gray-100 text-sm shadow-sm"
                                        >
                                            <option value="">Select</option>
                                            <option value="1">I Belong To A Unit</option>
                                            <option value="2">I Don&apos;t Belong To A Unit</option>
                                        </select>

                                        <InputError message={errors.workforce_status} className="mt-1.5 text-red-600 dark:text-red-400 text-xs" />
                                    </div>
                                )}

                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <InputLabel
                                            htmlFor="state"
                                            value="State"
                                            className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5 uppercase tracking-wider"
                                        />

                                        <select
                                            id="state"
                                            name="state"
                                            value={data.state}
                                            onChange={(e) => handleStateChange(e.target.value)}
                                            className="w-full px-3.5 py-2.5 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 dark:focus:ring-red-400 focus:border-red-300 dark:focus:border-red-500 transition-all duration-200 bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 focus:bg-white dark:focus:bg-gray-600 text-gray-900 dark:text-gray-100 text-sm shadow-sm"
                                        >
                                            <option value="">{loadingStates ? 'Loading...' : 'State'}</option>
                                            {states.map((state) => (
                                                <option key={state} value={state}>
                                                    {state}
                                                </option>
                                            ))}
                                        </select>

                                        <InputError message={errors.state} className="mt-1.5 text-red-600 dark:text-red-400 text-xs" />
                                    </div>

                                    <div>
                                        <InputLabel
                                            htmlFor="lga"
                                            value="Local Gov."
                                            className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5 uppercase tracking-wider"
                                        />

                                        <select
                                            id="lga"
                                            name="lga"
                                            value={data.lga}
                                            onChange={(e) => setData('lga', e.target.value)}
                                            disabled={!data.state || loadingLgas}
                                            className="w-full px-3.5 py-2.5 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 dark:focus:ring-red-400 focus:border-red-300 dark:focus:border-red-500 transition-all duration-200 bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 focus:bg-white dark:focus:bg-gray-600 text-gray-900 dark:text-gray-100 text-sm shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            <option value="">
                                                {!data.state ? 'State first' : loadingLgas ? 'Loading...' : 'LGA'}
                                            </option>
                                            {lgas.map((lga) => (
                                                <option key={lga} value={lga}>
                                                    {lga}
                                                </option>
                                            ))}
                                        </select>

                                        <InputError message={errors.lga} className="mt-1.5 text-red-600 dark:text-red-400 text-xs" />
                                    </div>
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
                                            autoComplete="new-password"
                                            onChange={(e) => setData('password', e.target.value)}
                                            required
                                            placeholder="Strong password"
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

                                <div>
                                    <InputLabel
                                        htmlFor="password_confirmation"
                                        value="Confirm Password"
                                        className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5 uppercase tracking-wider"
                                    />

                                    <div className="relative">
                                        <TextInput
                                            id="password_confirmation"
                                            type={showConfirmPassword ? "text" : "password"}
                                            name="password_confirmation"
                                            value={data.password_confirmation}
                                            className="w-full px-3.5 py-2.5 pr-10 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 dark:focus:ring-red-400 focus:border-red-300 dark:focus:border-red-500 transition-all duration-200 bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 focus:bg-white dark:focus:bg-gray-600 text-gray-900 dark:text-gray-100 text-sm shadow-sm"
                                            autoComplete="new-password"
                                            onChange={(e) =>
                                                setData('password_confirmation', e.target.value)
                                            }
                                            required
                                            placeholder="Confirm password"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 focus:outline-none transition-colors"
                                        >
                                            {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                        </button>
                                    </div>

                                    <InputError
                                        message={errors.password_confirmation}
                                        className="mt-1.5 text-red-600 dark:text-red-400 text-xs"
                                    />
                                </div>

                                <PrimaryButton
                                    className="w-full bg-gradient-to-r from-red-600 to-red-700 dark:from-red-500 dark:to-red-600 text-white py-2.5 px-4 rounded-lg font-semibold hover:from-red-700 hover:to-red-800 dark:hover:from-red-600 dark:hover:to-red-700 focus:ring-2 focus:ring-red-500 dark:focus:ring-red-400 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-all duration-300 transform hover:shadow-lg active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-md text-sm font-medium"
                                    disabled={processing}
                                >
                                    {processing ? 'Creating Account...' : 'Create Account'}
                                </PrimaryButton>

                            </form>

                            <div className="mt-4 text-center">
                                <p className="text-gray-600 dark:text-gray-400 text-sm">
                                    Already a member?{' '}
                                    <Link
                                        href={route('login')}
                                        className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 font-semibold focus:outline-none hover:underline transition-colors"
                                    >
                                        Sign In
                                    </Link>
                                </p>
                            </div>

                            <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-700">
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
