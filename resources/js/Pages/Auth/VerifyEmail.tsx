import PrimaryButton from '@/Components/PrimaryButton';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import { Mail, CheckCircle, RefreshCw, LogOut, Shield } from 'lucide-react';

export default function VerifyEmail({ status }: { status?: string }) {
    const { post, processing } = useForm({});

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('verification.send'));
    };

    return (
        <GuestLayout>
            <Head title="Email Verification - OIP" />

            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4 transition-colors duration-300">
                <div className="w-full max-w-6xl flex bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">

                    {/* Left Side - Verification Info Panel */}
                    <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-emerald-600 to-green-600 dark:from-emerald-700 dark:to-green-700 p-12 flex-col justify-center text-white relative overflow-hidden">
                        <div className="absolute inset-0 bg-black opacity-10 dark:opacity-20"></div>
                        <div className="relative z-10">
                            <div className="mb-8">
                                <div className="w-16 h-16 bg-white bg-opacity-20 dark:bg-white dark:bg-opacity-25 rounded-2xl flex items-center justify-center mb-6">
                                    <Mail className="w-8 h-8" />
                                </div>
                                <h1 className="text-4xl font-bold mb-2">Almost There!</h1>
                                <p className="text-xl opacity-90">Verify Your Email to Get Started</p>
                                <p className="text-sm opacity-75 mt-2">One final step to secure your account</p>
                            </div>

                            <div className="space-y-6">
                                <div className="flex items-start space-x-4">
                                    <div className="w-8 h-8 bg-white bg-opacity-20 dark:bg-white dark:bg-opacity-25 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                                        <span className="text-sm font-bold">1</span>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold">Check Your Email</h3>
                                        <p className="text-sm opacity-75">We've sent a verification link to your email address</p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4">
                                    <div className="w-8 h-8 bg-white bg-opacity-20 dark:bg-white dark:bg-opacity-25 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                                        <span className="text-sm font-bold">2</span>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold">Click the Link</h3>
                                        <p className="text-sm opacity-75">Click the verification link in your email to activate your account</p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4">
                                    <div className="w-8 h-8 bg-white bg-opacity-20 dark:bg-white dark:bg-opacity-25 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                                        <span className="text-sm font-bold">3</span>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold">Start Building</h3>
                                        <p className="text-sm opacity-75">Access your dashboard and begin your industrial journey</p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-12 p-4 bg-white bg-opacity-10 dark:bg-white dark:bg-opacity-15 rounded-lg">
                                <p className="text-sm font-medium">"Email verification helps protect your account and ensures important updates reach you"</p>
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Verification Form */}
                    <div className="w-full lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center bg-white dark:bg-gray-800">
                        <div className="w-full max-w-md mx-auto">

                            <div className="text-center mb-8">
                                <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                    <Mail className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
                                </div>
                                <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">Verify Your Email</h2>
                                <p className="text-gray-600 dark:text-gray-300">
                                    We need to verify your email address to complete your registration
                                </p>
                            </div>

                            {/* Welcome Message */}
                            <div className="mb-6 p-4 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-lg">
                                <div className="flex items-start">
                                    <CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5 mr-3" />
                                    <div className="text-sm">
                                        <p className="font-medium text-emerald-800 dark:text-emerald-300 mb-1">Welcome to OIP!</p>
                                        <p className="text-emerald-700 dark:text-emerald-400">
                                            Thanks for signing up! Before getting started, please verify your email address by clicking on the link we just emailed to you.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {status === 'verification-link-sent' && (
                                <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                                    <div className="flex items-center">
                                        <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                                            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M9 16.17L4.83 12L3.41 13.41L9 19L21 7L19.59 5.59L9 16.17Z"/>
                                            </svg>
                                        </div>
                                        <div className="text-sm font-medium text-green-800 dark:text-green-300">
                                            A new verification link has been sent to your email address.
                                        </div>
                                    </div>
                                </div>
                            )}

                            <form onSubmit={submit} className="space-y-6">
                                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                                    <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-2">Didn't receive the email?</h3>
                                    <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1 mb-4">
                                        <li>• Check your spam or junk folder</li>
                                        <li>• Make sure you entered the correct email address</li>
                                        <li>• Wait a few minutes for the email to arrive</li>
                                    </ul>

                                    <PrimaryButton
                                        className="w-full bg-gradient-to-r from-emerald-600 to-green-600 dark:from-emerald-500 dark:to-green-500 text-white py-3 px-4 rounded-lg font-semibold hover:from-emerald-700 hover:to-green-700 dark:hover:from-emerald-600 dark:hover:to-green-600 focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg"
                                        disabled={processing}
                                    >
                                        {processing ? (
                                            <span className="flex items-center justify-center">
                                                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                                                Sending...
                                            </span>
                                        ) : (
                                            <span className="flex items-center justify-center">
                                                <Mail className="w-4 h-4 mr-2" />
                                                Resend Verification Email
                                            </span>
                                        )}
                                    </PrimaryButton>
                                </div>
                            </form>

                            <div className="mt-8 text-center">
                                <Link
                                    href={route('logout')}
                                    method="post"
                                    as="button"
                                    className="inline-flex items-center text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 text-sm font-medium focus:outline-none focus:underline transition-colors group"
                                >
                                    <LogOut className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform" />
                                    Sign Out
                                </Link>
                            </div>

                            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                                <div className="flex items-center justify-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                                    <Shield className="w-4 h-4" />
                                    <span>Secure • Verified • Protected</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
