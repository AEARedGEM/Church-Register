import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import { Eye, EyeOff, ShieldCheck, Lock, AlertTriangle } from 'lucide-react';
import { useState } from 'react';

export default function ConfirmPassword() {
    const { data, setData, post, processing, errors, reset } = useForm({
        password: '',
    });

    const [showPassword, setShowPassword] = useState(false);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('password.confirm'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Confirm Password - OIP" />

            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4 transition-colors duration-300">
                <div className="w-full max-w-6xl flex bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">

                    {/* Left Side - Security Info Panel */}
                    <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-red-600 to-orange-600 dark:from-red-700 dark:to-orange-700 p-12 flex-col justify-center text-white relative overflow-hidden">
                        <div className="absolute inset-0 bg-black opacity-10 dark:opacity-20"></div>
                        <div className="relative z-10">
                            <div className="mb-8">
                                <div className="w-16 h-16 bg-white bg-opacity-20 dark:bg-white dark:bg-opacity-25 rounded-2xl flex items-center justify-center mb-6">
                                    <ShieldCheck className="w-8 h-8" />
                                </div>
                                <h1 className="text-4xl font-bold mb-2">Secure Access Required</h1>
                                <p className="text-xl opacity-90">Protecting Your Account & Data</p>
                                <p className="text-sm opacity-75 mt-2">Additional verification for sensitive operations</p>
                            </div>

                            <div className="space-y-6">
                                <div className="flex items-start space-x-4">
                                    <div className="w-12 h-12 bg-white bg-opacity-20 dark:bg-white dark:bg-opacity-25 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <AlertTriangle className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold">Sensitive Area</h3>
                                        <p className="text-sm opacity-75">You're accessing a protected section that requires additional verification for your security</p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4">
                                    <div className="w-12 h-12 bg-white bg-opacity-20 dark:bg-white dark:bg-opacity-25 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <Lock className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold">Password Confirmation</h3>
                                        <p className="text-sm opacity-75">Enter your current password to verify your identity and proceed</p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4">
                                    <div className="w-12 h-12 bg-white bg-opacity-20 dark:bg-white dark:bg-opacity-25 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <ShieldCheck className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold">Data Protection</h3>
                                        <p className="text-sm opacity-75">This extra step helps protect your business data and account settings</p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-12 p-4 bg-white bg-opacity-10 dark:bg-white dark:bg-opacity-15 rounded-lg">
                                <p className="text-sm font-medium">"Security is the foundation of trust in digital business"</p>
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Confirmation Form */}
                    <div className="w-full lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center bg-white dark:bg-gray-800">
                        <div className="w-full max-w-md mx-auto">

                            <div className="text-center mb-8">
                                <div className="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                    <Lock className="w-8 h-8 text-red-600 dark:text-red-400" />
                                </div>
                                <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">Confirm Password</h2>
                                <p className="text-gray-600 dark:text-gray-300">
                                    Please confirm your password to access this secure area
                                </p>
                            </div>

                            {/* Security Notice */}
                            <div className="mb-6 p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg">
                                <div className="flex items-start">
                                    <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5 mr-3" />
                                    <div className="text-sm">
                                        <p className="font-medium text-amber-800 dark:text-amber-300 mb-1">Security Check Required</p>
                                        <p className="text-amber-700 dark:text-amber-400">
                                            This is a secure area of the application. Please confirm your password before continuing.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <form onSubmit={submit} className="space-y-6">
                                <div>
                                    <InputLabel
                                        htmlFor="password"
                                        value="Current Password"
                                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                                    />

                                    <div className="relative">
                                        <TextInput
                                            id="password"
                                            type={showPassword ? "text" : "password"}
                                            name="password"
                                            value={data.password}
                                            className="w-full px-4 py-3 pr-12 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 dark:focus:ring-red-400 focus:border-transparent transition-all duration-200 bg-gray-50 dark:bg-gray-700 focus:bg-white dark:focus:bg-gray-600 text-gray-900 dark:text-gray-100"
                                            isFocused={true}
                                            onChange={(e) => setData('password', e.target.value)}
                                            placeholder="Enter your current password"
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

                                <PrimaryButton
                                    className="w-full bg-gradient-to-r from-red-600 to-orange-600 dark:from-red-500 dark:to-orange-500 text-white py-3 px-4 rounded-lg font-semibold hover:from-red-700 hover:to-orange-700 dark:hover:from-red-600 dark:hover:to-orange-600 focus:ring-2 focus:ring-red-500 dark:focus:ring-red-400 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg"
                                    disabled={processing}
                                >
                                    {processing ? 'Confirming...' : 'Confirm Password'}
                                </PrimaryButton>
                            </form>

                            <div className="mt-8 text-center">
                                <p className="text-gray-600 dark:text-gray-300 text-sm">
                                    Having trouble? Contact{' '}
                                    <a
                                        href="#"
                                        className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 font-semibold focus:outline-none focus:underline transition-colors"
                                    >
                                        Support
                                    </a>
                                </p>
                            </div>

                            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                                <div className="flex items-center justify-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                                    <ShieldCheck className="w-4 h-4" />
                                    <span>Protected • Verified • Secure</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
