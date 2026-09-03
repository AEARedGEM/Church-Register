import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import { ArrowLeft, Mail, Shield, Lock } from 'lucide-react';

export default function ForgotPassword({ status }: { status?: string }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('password.email'));
    };

    return (
        <GuestLayout>
            <Head title="Forgot Password - OIP" />

            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4 transition-colors duration-300">
                <div className="w-full max-w-6xl flex bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">

                    {/* Left Side - Info Panel */}
                    <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-red-600 to-red-600 dark:from-red-700 dark:to-red-700 p-12 flex-col justify-center text-white relative overflow-hidden">
                        <div className="absolute inset-0 bg-black opacity-10 dark:opacity-20"></div>
                        <div className="relative z-10">
                            <div className="mb-8">
                                <div className="w-16 h-16 bg-white bg-opacity-20 dark:bg-white dark:bg-opacity-25 rounded-2xl flex items-center justify-center mb-6">
                                    <Lock className="w-8 h-8" />
                                </div>
                                <h1 className="text-4xl font-bold mb-2">Password Recovery</h1>
                                <p className="text-xl opacity-90">Secure & Simple Reset Process</p>
                                <p className="text-sm opacity-75 mt-2">Continue serving and growing with your church community</p>
                            </div>

                            <div className="space-y-6">
                                <div className="flex items-start space-x-4">
                                    <div className="w-8 h-8 bg-white bg-opacity-20 dark:bg-white dark:bg-opacity-25 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                                        <span className="text-sm font-bold">1</span>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold">Enter Your Email</h3>
                                        <p className="text-sm opacity-75">Provide the email address associated with your account</p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4">
                                    <div className="w-8 h-8 bg-white bg-opacity-20 dark:bg-white dark:bg-opacity-25 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                                        <span className="text-sm font-bold">2</span>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold">Check Your Inbox</h3>
                                        <p className="text-sm opacity-75">We'll send you a secure password reset link</p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4">
                                    <div className="w-8 h-8 bg-white bg-opacity-20 dark:bg-white dark:bg-opacity-25 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                                        <span className="text-sm font-bold">3</span>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold">Create New Password</h3>
                                        <p className="text-sm opacity-75">Follow the link to set up a new secure password</p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-12 p-4 bg-white bg-opacity-10 dark:bg-white dark:bg-opacity-15 rounded-lg">
                                <p className="text-sm font-medium">"Your account security is our priority"</p>
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Reset Form */}
                    <div className="w-full lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center bg-white dark:bg-gray-800">
                        <div className="w-full max-w-md mx-auto">

                            {/* Back Button */}
                            <div className="mb-6">
                                <Link
                                    href={route('login')}
                                    className="inline-flex items-center text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors group"
                                >
                                    <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                                    Back to Sign In
                                </Link>
                            </div>

                            <div className="text-center mb-8">
                                <div className="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                    <Mail className="w-8 h-8 text-red-600 dark:text-red-400" />
                                </div>
                                <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">Reset Password</h2>
                                <p className="text-gray-600 dark:text-gray-300">
                                    Enter your email address and we'll send you a link to reset your password
                                </p>
                            </div>

                            {status && (
                                <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                                    <div className="flex items-center">
                                        <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                                            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M9 16.17L4.83 12L3.41 13.41L9 19L21 7L19.59 5.59L9 16.17Z"/>
                                            </svg>
                                        </div>
                                        <div className="text-sm font-medium text-red-800 dark:text-red-300">
                                            {status}
                                        </div>
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
                                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 dark:focus:ring-red-400 focus:border-transparent transition-all duration-200 bg-gray-50 dark:bg-gray-700 focus:bg-white dark:focus:bg-gray-600 text-gray-900 dark:text-gray-100"
                                        isFocused={true}
                                        onChange={(e) => setData('email', e.target.value)}
                                        placeholder="Enter your email address"
                                        required
                                    />

                                    <InputError message={errors.email} className="mt-2 text-red-600 dark:text-red-400 text-sm" />
                                </div>

                                <PrimaryButton
                                    className="w-full bg-gradient-to-r from-red-600 to-red-600 dark:from-red-500 dark:to-red-500 text-white py-3 px-4 rounded-lg font-semibold hover:from-red-700 hover:to-red-700 dark:hover:from-red-600 dark:hover:to-red-600 focus:ring-2 focus:ring-red-500 dark:focus:ring-red-400 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg"
                                    disabled={processing}
                                >
                                    {processing ? 'Sending Reset Link...' : 'Send Password Reset Link'}
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
                                    <span>Secure • Encrypted • Trusted</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
