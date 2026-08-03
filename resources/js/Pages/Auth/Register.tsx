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
            <Head title="Register - NYP-IP" />

            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4 transition-colors duration-300">
                <div className="w-full max-w-6xl flex bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
                    {/* Left Side - NYP-P Branding */}
                    <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-emerald-600 to-green-600 dark:from-emerald-700 dark:to-green-700 p-12 flex-col justify-center text-white relative overflow-hidden">
                        <div className="absolute inset-0 bg-black opacity-10 dark:opacity-20"></div>
                        <div className="relative z-10">
                            <div className="mb-8">
                                <h1 className="text-4xl font-bold mb-2">Join NYP-IP Today</h1>
                                <p className="text-xl opacity-90">Start Your Industrial Journey</p>
                                <p className="text-sm opacity-75 mt-2">Complete Digital Ecosystem for Growth</p>
                            </div>

                            <div className="grid grid-cols-2 gap-3 mb-8">
                                <div className="bg-white bg-opacity-10 dark:bg-white dark:bg-opacity-15 p-3 rounded-lg hover:bg-opacity-20 transition-all">
                                    <div className="w-9 h-9 bg-white bg-opacity-20 rounded flex items-center justify-center mb-2">
                                        <BarChart3 className="w-4 h-4" />
                                    </div>
                                    <h3 className="font-semibold text-xs">Needs Assessment</h3>
                                    <p className="text-xs opacity-75">Survey</p>
                                </div>

                                <div className="bg-white bg-opacity-10 dark:bg-white dark:bg-opacity-15 p-3 rounded-lg hover:bg-opacity-20 transition-all">
                                    <div className="w-9 h-9 bg-white bg-opacity-20 rounded flex items-center justify-center mb-2">
                                        <Users className="w-4 h-4" />
                                    </div>
                                    <h3 className="font-semibold text-xs">Skill Development</h3>
                                    <p className="text-xs opacity-75">Training</p>
                                </div>

                                <div className="bg-white bg-opacity-10 dark:bg-white dark:bg-opacity-15 p-3 rounded-lg hover:bg-opacity-20 transition-all">
                                    <div className="w-9 h-9 bg-white bg-opacity-20 rounded flex items-center justify-center mb-2">
                                        <Coins className="w-4 h-4" />
                                    </div>
                                    <h3 className="font-semibold text-xs">Tokenized Funding</h3>
                                    <p className="text-xs opacity-75">Capital</p>
                                </div>

                                <div className="bg-white bg-opacity-10 dark:bg-white dark:bg-opacity-15 p-3 rounded-lg hover:bg-opacity-20 transition-all">
                                    <div className="w-9 h-9 bg-white bg-opacity-20 rounded flex items-center justify-center mb-2">
                                        <Users2 className="w-4 h-4" />
                                    </div>
                                    <h3 className="font-semibold text-xs">Community Hub</h3>
                                    <p className="text-xs opacity-75">Network</p>
                                </div>
                            </div>

                            <div className="p-4 bg-white bg-opacity-10 dark:bg-white dark:bg-opacity-15 rounded-lg">
                                <p className="text-sm font-medium">"Catalyzing Innovation & Financial Empowerment Nationwide"</p>
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Register Form */}
                    <div className="w-full lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center bg-white dark:bg-gray-800">
                        <div className="w-full max-w-md mx-auto">
                            <div className="text-center mb-8">
                                <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">Create Account</h2>
                                <p className="text-gray-600 dark:text-gray-300">Join The Leading Industrial Ecosystem</p>
                            </div>

                            <form onSubmit={submit} className="space-y-6">
                                <div>
                                    <InputLabel
                                        htmlFor="name"
                                        value="Full Name"
                                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                                    />

                                    <TextInput
                                        id="name"
                                        name="name"
                                        value={data.name}
                                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400 focus:border-transparent transition-all duration-200 bg-gray-50 dark:bg-gray-700 focus:bg-white dark:focus:bg-gray-600 text-gray-900 dark:text-gray-100"
                                        autoComplete="name"
                                        isFocused={true}
                                        onChange={(e) => setData('name', e.target.value)}
                                        required
                                        placeholder="Enter your full name"
                                    />

                                    <InputError message={errors.name} className="mt-2 text-red-600 dark:text-red-400 text-sm" />
                                </div>

                                <div>
                                    <InputLabel
                                        htmlFor="email"
                                        value="Email Address"
                                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                                    />

                                    <TextInput
                                        id="email"
                                        type="email"
                                        name="email"
                                        value={data.email}
                                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400 focus:border-transparent transition-all duration-200 bg-gray-50 dark:bg-gray-700 focus:bg-white dark:focus:bg-gray-600 text-gray-900 dark:text-gray-100"
                                        autoComplete="username"
                                        onChange={(e) => setData('email', e.target.value)}
                                        required
                                        placeholder="Enter your email"
                                    />

                                    <InputError message={errors.email} className="mt-2 text-red-600 dark:text-red-400 text-sm" />
                                </div>

                                <div>
                                    <InputLabel
                                        htmlFor="state"
                                        value="State (Optional)"
                                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                                    />

                                    <select
                                        id="state"
                                        name="state"
                                        value={data.state}
                                        onChange={(e) => handleStateChange(e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400 focus:border-transparent transition-all duration-200 bg-gray-50 dark:bg-gray-700 focus:bg-white dark:focus:bg-gray-600 text-gray-900 dark:text-gray-100"
                                    >
                                        <option value="">{loadingStates ? 'Loading states...' : 'Select a state'}</option>
                                        {states.map((state) => (
                                            <option key={state} value={state}>
                                                {state}
                                            </option>
                                        ))}
                                    </select>

                                    <InputError message={errors.state} className="mt-2 text-red-600 dark:text-red-400 text-sm" />
                                </div>

                                <div>
                                    <InputLabel
                                        htmlFor="lga"
                                        value="Local Government / Ward (Optional)"
                                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                                    />

                                    <select
                                        id="lga"
                                        name="lga"
                                        value={data.lga}
                                        onChange={(e) => setData('lga', e.target.value)}
                                        disabled={!data.state || loadingLgas}
                                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400 focus:border-transparent transition-all duration-200 bg-gray-50 dark:bg-gray-700 focus:bg-white dark:focus:bg-gray-600 text-gray-900 dark:text-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <option value="">
                                            {!data.state ? 'Select a state first' : loadingLgas ? 'Loading LGAs...' : 'Select a Local Government'}
                                        </option>
                                        {lgas.map((lga) => (
                                            <option key={lga} value={lga}>
                                                {lga}
                                            </option>
                                        ))}
                                    </select>

                                    <InputError message={errors.lga} className="mt-2 text-red-600 dark:text-red-400 text-sm" />
                                </div>

                                <div>
                                    <InputLabel
                                        htmlFor="password"
                                        value="Password"
                                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                                    />

                                    <div className="relative">
                                        <TextInput
                                            id="password"
                                            type={showPassword ? "text" : "password"}
                                            name="password"
                                            value={data.password}
                                            className="w-full px-4 py-3 pr-12 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400 focus:border-transparent transition-all duration-200 bg-gray-50 dark:bg-gray-700 focus:bg-white dark:focus:bg-gray-600 text-gray-900 dark:text-gray-100"
                                            autoComplete="new-password"
                                            onChange={(e) => setData('password', e.target.value)}
                                            required
                                            placeholder="Create a strong password"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none transition-colors"
                                        >
                                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                        </button>
                                    </div>

                                    <InputError message={errors.password} className="mt-2 text-red-600 dark:text-red-400 text-sm" />
                                </div>

                                <div>
                                    <InputLabel
                                        htmlFor="password_confirmation"
                                        value="Confirm Password"
                                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                                    />

                                    <div className="relative">
                                        <TextInput
                                            id="password_confirmation"
                                            type={showConfirmPassword ? "text" : "password"}
                                            name="password_confirmation"
                                            value={data.password_confirmation}
                                            className="w-full px-4 py-3 pr-12 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400 focus:border-transparent transition-all duration-200 bg-gray-50 dark:bg-gray-700 focus:bg-white dark:focus:bg-gray-600 text-gray-900 dark:text-gray-100"
                                            autoComplete="new-password"
                                            onChange={(e) =>
                                                setData('password_confirmation', e.target.value)
                                            }
                                            required
                                            placeholder="Confirm your password"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none transition-colors"
                                        >
                                            {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                        </button>
                                    </div>

                                    <InputError
                                        message={errors.password_confirmation}
                                        className="mt-2 text-red-600 dark:text-red-400 text-sm"
                                    />
                                </div>

                                <PrimaryButton
                                    className="w-full bg-gradient-to-r from-emerald-600 to-green-600 dark:from-emerald-500 dark:to-green-500 text-white py-3 px-4 rounded-lg font-semibold hover:from-emerald-700 hover:to-emerald-700 dark:hover:from-emerald-600 dark:hover:to-emerald-600 focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg"
                                    disabled={processing}
                                >
                                    {processing ? 'Creating Account...' : 'Create Account'}
                                </PrimaryButton>
                            </form>

                            <div className="mt-8 text-center">
                                <p className="text-gray-600 dark:text-gray-300">
                                    Already have an account?{' '}
                                    <Link
                                        href={route('login')}
                                        className="text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 font-semibold focus:outline-none focus:underline transition-colors"
                                    >
                                        Sign In
                                    </Link>
                                </p>
                            </div>

                            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                                <div className="flex items-center justify-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                                    <Shield className="w-4 h-4" />
                                    <span>Government-Backed • Secure • Trusted Platform</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
