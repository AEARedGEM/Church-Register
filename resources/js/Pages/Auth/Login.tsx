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

            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-3 transition-colors duration-300">
                <div className="w-full max-w-5xl flex bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-sm">

                    {/* Left Side - Brand/Info Panel */}
                    <div className="hidden lg:flex lg:w-2/5 bg-gradient-to-br from-blue-600 to-blue-700 dark:from-blue-700 dark:to-blue-800 p-8 flex-col justify-between text-white relative overflow-hidden">
                        <div className="absolute inset-0 bg-black opacity-15 dark:opacity-25"></div>
                        <div className="absolute top-0 right-0 w-40 h-40 bg-white opacity-5 rounded-full -mr-20 -mt-20"></div>
                        <div className="absolute bottom-0 left-0 w-32 h-32 bg-white opacity-5 rounded-full -ml-16 -mb-16"></div>
                        <div className="relative z-10">
                            <div className="mb-7">
                                <h1 className="text-3xl font-bold mb-1 leading-tight">Welcome Back</h1>
                                <p className="text-sm opacity-90 font-medium">APGA Worldwide</p>
                                <p className="text-xs opacity-70 mt-2">Growing God's Kingdom Together in Faith</p>
                            </div>

                            <div className="grid grid-cols-2 gap-2.5 mb-6">
                                <div className="bg-white bg-opacity-10 backdrop-blur-sm p-3 rounded-lg hover:bg-opacity-20 transition-all duration-300 group cursor-default">
                                    <div className="w-8 h-8 bg-white bg-opacity-20 rounded-md flex items-center justify-center mb-1.5 group-hover:scale-110 transition-transform">
                                        <Users className="w-4 h-4" />
                                    </div>
                                    <h3 className="font-semibold text-xs leading-tight">Attendance</h3>
                                    <p className="text-xs opacity-70">Track</p>
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
                                        <Users2 className="w-4 h-4" />
                                    </div>
                                    <h3 className="font-semibold text-xs leading-tight">Community</h3>
                                    <p className="text-xs opacity-70">Connect</p>
                                </div>

                                <div className="bg-white bg-opacity-10 backdrop-blur-sm p-3 rounded-lg hover:bg-opacity-20 transition-all duration-300 group cursor-default">
                                    <div className="w-8 h-8 bg-white bg-opacity-20 rounded-md flex items-center justify-center mb-1.5 group-hover:scale-110 transition-transform">
                                        <Zap className="w-4 h-4" />
                                    </div>
                                    <h3 className="font-semibold text-xs leading-tight">Prayer</h3>
                                    <p className="text-xs opacity-70">Request</p>
                                </div>
                            </div>

                            <div className="p-3 bg-white bg-opacity-10 backdrop-blur-sm rounded-lg border border-white border-opacity-20">
                                <p className="text-xs font-medium leading-relaxed italic opacity-95">"Therefore if any man be in Christ, he is a new creature." — 2 Corinthians 5:17</p>
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
                                <div className="mb-5 p-3 bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-lg animate-pulse">
                                    <div className="text-xs font-medium text-blue-800 dark:text-blue-300">
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
                                        className="w-full px-3.5 py-2.5 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-300 dark:focus:border-blue-500 transition-all duration-200 bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 focus:bg-white dark:focus:bg-gray-600 text-gray-900 dark:text-gray-100 text-sm shadow-sm"
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
                                            className="w-full px-3.5 py-2.5 pr-10 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-300 dark:focus:border-blue-500 transition-all duration-200 bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 focus:bg-white dark:focus:bg-gray-600 text-gray-900 dark:text-gray-100 text-sm shadow-sm"
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
                                            className="w-4 h-4 text-blue-600 dark:text-blue-400 border-gray-300 dark:border-gray-600 rounded focus:ring-blue-500 dark:focus:ring-blue-400 bg-gray-50 dark:bg-gray-700"
                                        />
                                        <span className="ml-2 text-xs text-gray-600 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors">
                                            Remember me
                                        </span>
                                    </label>

                                    {canResetPassword && (
                                        <Link
                                            href={route('password.request')}
                                            className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium focus:outline-none hover:underline transition-colors"
                                        >
                                            Forgot?
                                        </Link>
                                    )}
                                </div>

                                <PrimaryButton
                                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-500 dark:to-blue-600 text-white py-2.5 px-4 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 dark:hover:from-blue-600 dark:hover:to-blue-700 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-all duration-300 transform hover:shadow-lg active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-md text-sm font-medium"
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
                                        className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold focus:outline-none hover:underline transition-colors"
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
