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

            <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-3 transition-colors duration-300">
                <div className="w-full max-w-5xl flex bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-sm">
                    {/* Left Side - APGA Branding */}
                    <div className="hidden lg:flex lg:w-2/5 bg-gradient-to-br from-red-600 to-red-700 dark:from-red-700 dark:to-red-800 p-8 flex-col justify-between text-white relative overflow-hidden">
                        <div className="absolute inset-0 bg-black opacity-15 dark:opacity-25"></div>
                        <div className="absolute top-0 right-0 w-40 h-40 bg-white opacity-5 rounded-full -mr-20 -mt-20"></div>
                        <div className="absolute bottom-0 left-0 w-32 h-32 bg-white opacity-5 rounded-full -ml-16 -mb-16"></div>
                        <div className="relative z-10">
                            <div className="mb-6">
                                <h1 className="text-3xl font-bold mb-1 leading-tight">Join APGA</h1>
                                <p className="text-sm opacity-90 font-medium">Apostolic Power Glorious Assembly</p>
                                <p className="text-xs opacity-70 mt-2">A Faith Community Growing Together</p>
                            </div>

                            <div className="grid grid-cols-2 gap-2.5 mb-6">
                                <div className="bg-white bg-opacity-10 backdrop-blur-sm p-3 rounded-lg hover:bg-opacity-20 transition-all duration-300 group cursor-default">
                                    <div className="w-8 h-8 bg-white bg-opacity-20 rounded-md flex items-center justify-center mb-1.5 group-hover:scale-110 transition-transform">
                                        <Users className="w-4 h-4" />
                                    </div>
                                    <h3 className="font-semibold text-xs leading-tight">Attendance</h3>
                                    <p className="text-xs opacity-70">Services</p>
                                </div>

                                <div className="bg-white bg-opacity-10 backdrop-blur-sm p-3 rounded-lg hover:bg-opacity-20 transition-all duration-300 group cursor-default">
                                    <div className="w-8 h-8 bg-white bg-opacity-20 rounded-md flex items-center justify-center mb-1.5 group-hover:scale-110 transition-transform">
                                        <BarChart3 className="w-4 h-4" />
                                    </div>
                                    <h3 className="font-semibold text-xs leading-tight">Events</h3>
                                    <p className="text-xs opacity-70">Calendar</p>
                                </div>

                                <div className="bg-white bg-opacity-10 backdrop-blur-sm p-3 rounded-lg hover:bg-opacity-20 transition-all duration-300 group cursor-default">
                                    <div className="w-8 h-8 bg-white bg-opacity-20 rounded-md flex items-center justify-center mb-1.5 group-hover:scale-110 transition-transform">
                                        <TrendingUp className="w-4 h-4" />
                                    </div>
                                    <h3 className="font-semibold text-xs leading-tight">Invitations</h3>
                                    <p className="text-xs opacity-70">Grow</p>
                                </div>

                                <div className="bg-white bg-opacity-10 backdrop-blur-sm p-3 rounded-lg hover:bg-opacity-20 transition-all duration-300 group cursor-default">
                                    <div className="w-8 h-8 bg-white bg-opacity-20 rounded-md flex items-center justify-center mb-1.5 group-hover:scale-110 transition-transform">
                                        <Users2 className="w-4 h-4" />
                                    </div>
                                    <h3 className="font-semibold text-xs leading-tight">Community</h3>
                                    <p className="text-xs opacity-70">Connect</p>
                                </div>
                            </div>

                            <div className="p-3 bg-white bg-opacity-10 backdrop-blur-sm rounded-lg border border-white border-opacity-20">
                                <p className="text-xs font-medium leading-relaxed italic opacity-95">"Come to me, all you who are weary." — Matthew 11:28</p>
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
