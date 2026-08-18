import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import { Eye, EyeOff, KeyRound, Shield, CheckCircle } from 'lucide-react';
import { useState } from 'react';

export default function ResetPassword({
    token,
    email,
}: {
    token: string;
    email: string;
}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        token: token,
        email: email,
        password: '',
        password_confirmation: '',
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('password.store'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Reset Password - OIP" />

            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4 transition-colors duration-300">
                <div className="w-full max-w-6xl flex bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">

                    {/* Left Side - Security Info Panel */}
                    <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-red-600 to-red-600 dark:from-red-700 dark:to-red-700 p-12 flex-col justify-center text-white relative overflow-hidden">
                        <div className="absolute inset-0 bg-black opacity-10 dark:opacity-20"></div>
                        <div className="relative z-10">
                            <div className="mb-8">
                                <div className="w-16 h-16 bg-white bg-opacity-20 dark:bg-white dark:bg-opacity-25 rounded-2xl flex items-center justify-center mb-6">
                                    <KeyRound className="w-8 h-8" />
                                </div>
                                <h1 className="text-4xl font-bold mb-2">Create New Password</h1>
                                <p className="text-xl opacity-90">Almost there! Set up your new secure password</p>
                                <p className="text-sm opacity-75 mt-2">Your account will be ready to use immediately</p>
                            </div>

                            <div className="space-y-6">
                                <div className="bg-white bg-opacity-10 dark:bg-white dark:bg-opacity-15 p-6 rounded-lg">
                                    <h3 className="font-semibold mb-4">Password Requirements:</h3>
                                    <ul className="space-y-3 text-sm">
                                        <li className="flex items-center space-x-3">
                                            <CheckCircle className="w-4 h-4 flex-shrink-0" />
                                            <span>At least 8 characters long</span>
                                        </li>
                                        <li className="flex items-center space-x-3">
                                            <CheckCircle className="w-4 h-4 flex-shrink-0" />
                                            <span>Include uppercase and lowercase letters</span>
                                        </li>
                                        <li className="flex items-center space-x-3">
                                            <CheckCircle className="w-4 h-4 flex-shrink-0" />
                                            <span>Include at least one number</span>
                                        </li>
                                        <li className="flex items-center space-x-3">
                                            <CheckCircle className="w-4 h-4 flex-shrink-0" />
                                            <span>Include a special character</span>
                                        </li>
                                    </ul>
                                </div>

                                <div className="bg-white bg-opacity-10 dark:bg-white dark:bg-opacity-15 p-4 rounded-lg">
                                    <div className="flex items-center space-x-3">
                                        <Shield className="w-5 h-5 flex-shrink-0" />
                                        <div>
                                            <h4 className="font-semibold text-sm">Security Tip</h4>
                                            <p className="text-xs opacity-75 mt-1">Use a unique password you haven't used elsewhere</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-12 p-4 bg-white bg-opacity-10 dark:bg-white dark:bg-opacity-15 rounded-lg">
                                <p className="text-sm font-medium">"Your security helps protect Nigeria's industrial ecosystem"</p>
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Reset Form */}
                    <div className="w-full lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center bg-white dark:bg-gray-800">
                        <div className="w-full max-w-md mx-auto">

                            <div className="text-center mb-8">
                                <div className="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                    <KeyRound className="w-8 h-8 text-red-600 dark:text-red-400" />
                                </div>
                                <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">Set New Password</h2>
                                <p className="text-gray-600 dark:text-gray-300">
                                    Create a strong password for your NYP-IP account
                                </p>
                            </div>

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
                                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                                        autoComplete="username"
                                        onChange={(e) => setData('email', e.target.value)}
                                        disabled
                                        readOnly
                                    />

                                    <InputError message={errors.email} className="mt-2 text-red-600 dark:text-red-400 text-sm" />
                                </div>

                                <div>
                                    <InputLabel
                                        htmlFor="password"
                                        value="New Password"
                                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                                    />

                                    <div className="relative">
                                        <TextInput
                                            id="password"
                                            type={showPassword ? "text" : "password"}
                                            name="password"
                                            value={data.password}
                                            className="w-full px-4 py-3 pr-12 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 dark:focus:ring-red-400 focus:border-transparent transition-all duration-200 bg-gray-50 dark:bg-gray-700 focus:bg-white dark:focus:bg-gray-600 text-gray-900 dark:text-gray-100"
                                            autoComplete="new-password"
                                            isFocused={true}
                                            onChange={(e) => setData('password', e.target.value)}
                                            placeholder="Enter your new password"
                                            required
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
                                        value="Confirm New Password"
                                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                                    />

                                    <div className="relative">
                                        <TextInput
                                            id="password_confirmation"
                                            type={showConfirmPassword ? "text" : "password"}
                                            name="password_confirmation"
                                            value={data.password_confirmation}
                                            className="w-full px-4 py-3 pr-12 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 dark:focus:ring-red-400 focus:border-transparent transition-all duration-200 bg-gray-50 dark:bg-gray-700 focus:bg-white dark:focus:bg-gray-600 text-gray-900 dark:text-gray-100"
                                            autoComplete="new-password"
                                            onChange={(e) =>
                                                setData('password_confirmation', e.target.value)
                                            }
                                            placeholder="Confirm your new password"
                                            required
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
                                    className="w-full bg-gradient-to-r from-red-600 to-purple-600 dark:from-red-500 dark:to-purple-500 text-white py-3 px-4 rounded-lg font-semibold hover:from-red-700 hover:to-purple-700 dark:hover:from-red-600 dark:hover:to-purple-600 focus:ring-2 focus:ring-red-500 dark:focus:ring-red-400 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg"
                                    disabled={processing}
                                >
                                    {processing ? 'Updating Password...' : 'Update Password'}
                                </PrimaryButton>
                            </form>

                            <div className="mt-8 text-center">
                                <p className="text-gray-600 dark:text-gray-300">
                                    Remember your password?{' '}
                                    <Link
                                        href={route('login')}
                                        className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 font-semibold focus:outline-none focus:underline transition-colors"
                                    >
                                        Sign In
                                    </Link>
                                </p>
                            </div>

                            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                                <div className="flex items-center justify-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                                    <Shield className="w-4 h-4" />
                                    <span>Secure • Encrypted • Protected</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
