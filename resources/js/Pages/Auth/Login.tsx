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
            <Head title="Log in - OIP" />

            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4 transition-colors duration-300">
                <div className="w-full max-w-6xl flex bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">

                    {/* Left Side - Brand/Info Panel */}
                    <div className="hidden lg:flex lg:w-1/2 bg-green-600 dark:from-emerald-700 dark:to-green-700 p-12 flex-col justify-center text-white relative overflow-hidden">
                        <div className="absolute inset-0 bg-black opacity-10 dark:opacity-20"></div>
                        <div className="relative z-10">
                            <div className="mb-8">
                                <h1 className="text-4xl font-bold mb-2">Welcome to NYP-IP</h1>
                                <p className="text-xl opacity-90">NYP Industrialization Portal</p>
                                <p className="text-sm opacity-75 mt-2">Complete Digital Ecosystem for Industrial Growth</p>
                            </div>

                            <div className="grid grid-cols-2 gap-4 mb-8">
                                <div className="bg-white bg-opacity-10 dark:bg-white dark:bg-opacity-15 p-4 rounded-lg hover:bg-opacity-20 transition-all">
                                    <div className="w-10 h-10 bg-white bg-opacity-20 rounded-lg flex items-center justify-center mb-2">
                                        <BarChart3 className="w-5 h-5" />
                                    </div>
                                    <h3 className="font-semibold text-sm">Needs Assessment</h3>
                                    <p className="text-xs opacity-75">NAP/S Survey</p>
                                </div>

                                <div className="bg-white bg-opacity-10 dark:bg-white dark:bg-opacity-15 p-4 rounded-lg hover:bg-opacity-20 transition-all">
                                    <div className="w-10 h-10 bg-white bg-opacity-20 rounded-lg flex items-center justify-center mb-2">
                                        <Users className="w-5 h-5" />
                                    </div>
                                    <h3 className="font-semibold text-sm">Skill Development</h3>
                                    <p className="text-xs opacity-75">Training Programs</p>
                                </div>

                                <div className="bg-white bg-opacity-10 dark:bg-white dark:bg-opacity-15 p-4 rounded-lg hover:bg-opacity-20 transition-all">
                                    <div className="w-10 h-10 bg-white bg-opacity-20 rounded-lg flex items-center justify-center mb-2">
                                        <Coins className="w-5 h-5" />
                                    </div>
                                    <h3 className="font-semibold text-sm">Tokenized Funding</h3>
                                    <p className="text-xs opacity-75">Capital & Liquidity</p>
                                </div>

                                <div className="bg-white bg-opacity-10 dark:bg-white dark:bg-opacity-15 p-4 rounded-lg hover:bg-opacity-20 transition-all">
                                    <div className="w-10 h-10 bg-white bg-opacity-20 rounded-lg flex items-center justify-center mb-2">
                                        <Users2 className="w-5 h-5" />
                                    </div>
                                    <h3 className="font-semibold text-sm">Community Hub</h3>
                                    <p className="text-xs opacity-75">Networking</p>
                                </div>
                            </div>

                            <div className="p-4 bg-white bg-opacity-10 dark:bg-white dark:bg-opacity-15 rounded-lg">
                                <p className="text-sm font-medium">"We Believe in You — We Empower Builders"</p>
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Login Form */}
                    <div className="w-full lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center bg-white dark:bg-gray-800">
                        <div className="w-full max-w-md mx-auto">
                            <div className="text-center mb-8">
                                <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">Welcome Back</h2>
                                <p className="text-gray-600 dark:text-gray-300">Sign in to your NYP-IP account</p>
                            </div>

                            {status && (
                                <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                                    <div className="text-sm font-medium text-green-800 dark:text-green-300">
                                        {status}
                                    </div>
                                </div>
                            )}

                            <form onSubmit={submit} className="space-y-6">
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
                                        isFocused={true}
                                        onChange={(e) => setData('email', e.target.value)}
                                        placeholder="Enter your email"
                                    />

                                    <InputError message={errors.email} className="mt-2 text-red-600 dark:text-red-400 text-sm" />
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
                                            autoComplete="current-password"
                                            onChange={(e) => setData('password', e.target.value)}
                                            placeholder="Enter your password"
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

                                <div className="flex items-center justify-between">
                                    <label className="flex items-center">
                                        <Checkbox
                                            name="remember"
                                            checked={data.remember}
                                            onChange={(e) =>
                                                setData(
                                                    'remember',
                                                    (e.target.checked || false) as false,
                                                )
                                            }
                                            className="w-4 h-4 text-emerald-600 dark:text-emerald-400 border-gray-300 dark:border-gray-600 rounded focus:ring-emerald-500 dark:focus:ring-emerald-400 bg-gray-50 dark:bg-gray-700"
                                        />
                                        <span className="ml-2 text-sm text-gray-600 dark:text-gray-300">
                                            Remember me
                                        </span>
                                    </label>

                                    {canResetPassword && (
                                        <Link
                                            href={route('password.request')}
                                            className="text-sm text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 font-medium focus:outline-none focus:underline transition-colors"
                                        >
                                            Forgot password?
                                        </Link>
                                    )}
                                </div>

                                <PrimaryButton
                                    className="w-full bg-gradient-to-r from-emerald-600 to-green-600 dark:from-emerald-500 dark:to-emerald-500 text-white py-3 px-4 rounded-lg font-semibold hover:from-emerald-700 hover:to-emerald-700 dark:hover:from-emerald-600 dark:hover:to-emerald-600 focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg"
                                    disabled={processing}
                                >
                                    {processing ? 'Signing in...' : 'Sign In'}
                                </PrimaryButton>
                            </form>

                            <div className="mt-8 text-center">
                                <p className="text-gray-600 dark:text-gray-300">
                                    Don't have an account?{' '}
                                    <Link
                                        href={route('register')}
                                        className="text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 font-semibold focus:outline-none focus:underline transition-colors"
                                    >
                                        Create Account
                                    </Link>
                                </p>
                            </div>

                            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                                <div className="flex items-center justify-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                                    <Shield className="w-4 h-4" />
                                    <span>Secure • Government-Backed • Trusted</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
