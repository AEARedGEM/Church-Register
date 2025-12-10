import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import { useForm } from '@inertiajs/react';
import React, { useState, useEffect } from 'react';

interface RegistrationFormData {
    firstName: string;
    lastName: string;
    phone: string;
    state: string;
    lga: string;
    ward: string;
}

interface RegistrationFormComponentProps {
    states: string[];
    onSuccess: (formData: RegistrationFormData) => void;
}

export default function RegistrationFormComponent({ states, onSuccess }: RegistrationFormComponentProps) {
    const { data, setData, errors } = useForm({
        firstName: '',
        lastName: '',
        phone: '',
        state: '',
        lga: '',
        ward: '',
    });

    const [statesList, setStatesList] = useState<string[]>([]);
    const [lgasList, setLgasList] = useState<string[]>([]);
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
            setStatesList(result);
        } catch (error) {
            console.error('Error fetching states:', error);
        } finally {
            setLoadingStates(false);
        }
    };

    const fetchLGAs = async (selectedState: string) => {
        if (!selectedState) {
            setLgasList([]);
            setData('lga', '');
            return;
        }
        setLoadingLgas(true);
        try {
            const response = await fetch(`/api/lgas?state=${selectedState}`);
            const result = await response.json();
            setLgasList(result);
        } catch (error) {
            console.error('Error fetching LGAs:', error);
        } finally {
            setLoadingLgas(false);
        }
    };

    const handleStateChange = (value: string) => {
        setData('state', value);
        fetchLGAs(value);
    };

    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Just call onSuccess with form data - no server request needed
        if (isFormValid) {
            onSuccess(data);
        }
    };

    const isFormValid = data.firstName.trim() && data.lastName.trim() && data.phone.trim() && data.state && data.lga.trim() && data.ward.trim();

    return (
        <form onSubmit={submit} className="space-y-6">
            {/* Personal Information Section */}
            <div className="space-y-4">
                <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center text-emerald-700 dark:text-emerald-300 font-semibold text-sm">1</div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Personal Information</h3>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                    {/* First Name */}
                    <div>
                        <InputLabel htmlFor="firstName" value="First Name" />
                        <TextInput
                            id="firstName"
                            type="text"
                            name="firstName"
                            value={data.firstName}
                            onChange={(e) => setData('firstName', e.target.value)}
                            autoComplete="given-name"
                            placeholder="John"
                            className="mt-1 block w-full"
                            required
                        />
                        <InputError message={errors.firstName} className="mt-2" />
                    </div>

                    {/* Last Name */}
                    <div>
                        <InputLabel htmlFor="lastName" value="Last Name" />
                        <TextInput
                            id="lastName"
                            type="text"
                            name="lastName"
                            value={data.lastName}
                            onChange={(e) => setData('lastName', e.target.value)}
                            autoComplete="family-name"
                            placeholder="Doe"
                            className="mt-1 block w-full"
                            required
                        />
                        <InputError message={errors.lastName} className="mt-2" />
                    </div>
                </div>

                {/* Phone Number */}
                <div>
                    <InputLabel htmlFor="phone" value="Phone Number" />
                    <TextInput
                        id="phone"
                        type="tel"
                        name="phone"
                        value={data.phone}
                        onChange={(e) => setData('phone', e.target.value)}
                        autoComplete="tel"
                        placeholder="+234 801 234 5678"
                        className="mt-1 block w-full"
                        required
                    />
                    <InputError message={errors.phone} className="mt-2" />
                </div>
            </div>

            {/* Location Section */}
            <div className="space-y-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center text-emerald-700 dark:text-emerald-300 font-semibold text-sm">2</div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Location</h3>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                    {/* State */}
                    <div>
                        <InputLabel htmlFor="state" value="State" />
                        <select
                            id="state"
                            name="state"
                            value={data.state}
                            onChange={(e) => handleStateChange(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:border-emerald-500 dark:focus:border-emerald-400 focus:ring-emerald-500 dark:focus:ring-emerald-400 dark:bg-gray-700 dark:text-white disabled:opacity-50"
                            disabled={loadingStates}
                            required
                        >
                            <option value="">{loadingStates ? 'Loading states...' : 'Select State'}</option>
                            {statesList.map(state => (
                                <option key={state} value={state}>{state}</option>
                            ))}
                        </select>
                        <InputError message={errors.state} className="mt-2" />
                    </div>

                    {/* LGA */}
                    <div>
                        <InputLabel htmlFor="lga" value="Local Government Area" />
                        <select
                            id="lga"
                            name="lga"
                            value={data.lga}
                            onChange={(e) => setData('lga', e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:border-emerald-500 dark:focus:border-emerald-400 focus:ring-emerald-500 dark:focus:ring-emerald-400 dark:bg-gray-700 dark:text-white disabled:opacity-50"
                            disabled={!data.state || loadingLgas || lgasList.length === 0}
                            required
                        >
                            <option value="">
                                {!data.state ? 'Select state first' : loadingLgas ? 'Loading LGAs...' : 'Select LGA'}
                            </option>
                            {lgasList.map(lga => (
                                <option key={lga} value={lga}>{lga}</option>
                            ))}
                        </select>
                        <InputError message={errors.lga} className="mt-2" />
                    </div>

                    {/* Ward */}
                    <div>
                        <InputLabel htmlFor="ward" value="Ward" />
                        <TextInput
                            id="ward"
                            type="text"
                            name="ward"
                            value={data.ward}
                            onChange={(e) => setData('ward', e.target.value)}
                            placeholder="Ward"
                            className="mt-1 block w-full"
                            required
                        />
                        <InputError message={errors.ward} className="mt-2" />
                    </div>
                </div>
            </div>

            {/* Submit Button */}
            <div className="flex items-center gap-4 pt-4">
                <PrimaryButton disabled={!isFormValid}>
                    Continue to Survey
                </PrimaryButton>
            </div>

            {/* Progress Indicator */}
            <div className="mt-4 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                <span>Step 1 of 5</span>
                <div className="flex gap-1">
                    {[1,2,3,4,5].map(i => (
                        <div
                            key={i}
                            className={`h-1 w-3 rounded-full transition-all ${
                                i === 1 ? 'bg-emerald-500 w-6' : 'bg-gray-300 dark:bg-gray-600'
                            }`}
                        />
                    ))}
                </div>
            </div>
        </form>
    );
}
