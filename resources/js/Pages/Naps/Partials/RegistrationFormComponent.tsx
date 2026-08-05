import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import { useForm } from '@inertiajs/react';
import React, { useState, useEffect } from 'react';

interface State {
    id: number | string;
    name: string;
    abbreviation: string;
}

interface LGA {
    id: number | string;
    name: string;
    sort_order: number;
}

interface Ward {
    id: number | string;
    name: string;
    sort_order: number;
}

interface RegistrationFormData {
    firstName: string;
    lastName: string;
    phone: string;
    state_id: number | string;
    lga_id: number | string;
    ward_id: number | string;
}

interface RegistrationFormComponentProps {
    states?: State[];
    onSuccess: (formData: RegistrationFormData) => void;
}

export default function RegistrationFormComponent({ onSuccess }: RegistrationFormComponentProps) {
    const { data, setData, errors } = useForm({
        firstName: '',
        lastName: '',
        phone: '',
        state_id: '',
        lga_id: '',
        ward_id: '',
    });

    const [statesList, setStatesList] = useState<State[]>([]);
    const [lgasList, setLgasList] = useState<LGA[]>([]);
    const [wardsList, setWardsList] = useState<Ward[]>([]);
    const [loadingStates, setLoadingStates] = useState(false);
    const [loadingLgas, setLoadingLgas] = useState(false);
    const [loadingWards, setLoadingWards] = useState(false);

    useEffect(() => {
        fetchStates();
    }, []);

    const fetchStates = async () => {
        setLoadingStates(true);
        try {
            const response = await fetch('/api/naps/states');
            const result = await response.json();
            if (result.success) {
                setStatesList(result.states);
            }
        } catch (error) {
            console.error('Error fetching states:', error);
        } finally {
            setLoadingStates(false);
        }
    };

    const fetchLGAs = async (stateId: number | string) => {
        if (!stateId) {
            setLgasList([]);
            setWardsList([]);
            setData('lga_id', '');
            setData('ward_id', '');
            return;
        }
        setLoadingLgas(true);
        try {
            const encodedStateId = encodeURIComponent(String(stateId));
            const response = await fetch(`/api/naps/states/${encodedStateId}/lgas`);
            const result = await response.json();
            if (result.success) {
                setLgasList(result.lgas);
            }
        } catch (error) {
            console.error('Error fetching LGAs:', error);
            setLgasList([]);
        } finally {
            setLoadingLgas(false);
        }
    };

    const fetchWards = async (lgaId: number | string) => {
        if (!lgaId) {
            setWardsList([]);
            setData('ward_id', '');
            return;
        }
        setLoadingWards(true);
        try {
            const encodedLgaId = encodeURIComponent(String(lgaId));
            const stateQuery = typeof data.state_id === 'string' && data.state_id !== '' ? `?state=${encodeURIComponent(data.state_id)}` : '';
            const response = await fetch(`/api/naps/lgas/${encodedLgaId}/wards${stateQuery}`);
            const result = await response.json();
            if (result.success) {
                setWardsList(result.wards);
            }
        } catch (error) {
            console.error('Error fetching wards:', error);
            setWardsList([]);
        } finally {
            setLoadingWards(false);
        }
    };

    const handleStateChange = (value: string) => {
        const stateId = value || '';
        setData('state_id', stateId as any);
        setData('lga_id', '');
        setData('ward_id', '');
        fetchLGAs(stateId as any);
    };

    const handleLgaChange = (value: string) => {
        const lgaId = value || '';
        setData('lga_id', lgaId as any);
        setData('ward_id', '');
        fetchWards(lgaId as any);
    };

    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Just call onSuccess with form data - no server request needed
        if (isFormValid) {
            onSuccess(data as RegistrationFormData);
        }
    };

    const isFormValid = data.firstName.trim() && data.lastName.trim() && data.phone.trim() && data.state_id && data.lga_id && data.ward_id;

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
                        <InputLabel htmlFor="state_id" value="State" />
                        <select
                            id="state_id"
                            value={data.state_id}
                            onChange={(e) => handleStateChange(e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300"
                            required
                        >
                            <option value="">Select a state</option>
                            {statesList.map((s) => (
                                <option key={s.id} value={s.id}>{s.name}</option>
                            ))}
                        </select>
                        <InputError message={errors.state_id} className="mt-2" />
                    </div>

                    {/* LGA */}
                    <div>
                        <InputLabel htmlFor="lga_id" value="LGA" />
                        <select
                            id="lga_id"
                            value={data.lga_id}
                            onChange={(e) => handleLgaChange(e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300"
                            required
                        >
                            <option value="">Select an LGA</option>
                            {lgasList.map((l) => (
                                <option key={l.id} value={l.id}>{l.name}</option>
                            ))}
                        </select>
                        <InputError message={errors.lga_id} className="mt-2" />
                    </div>

                    {/* Ward */}
                    <div>
                        <InputLabel htmlFor="ward_id" value="Ward" />
                        <select
                            id="ward_id"
                            value={data.ward_id}
                            onChange={(e) => setData('ward_id', e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300"
                            required
                        >
                            <option value="">Select a ward</option>
                            {wardsList.map((w) => (
                                <option key={w.id} value={w.id}>{w.name}</option>
                            ))}
                        </select>
                        <InputError message={errors.ward_id} className="mt-2" />
                    </div>
                </div>
            </div>

            <div className="pt-6">
                <PrimaryButton type="submit" disabled={!isFormValid}>Continue to survey</PrimaryButton>
            </div>
        </form>
    );
}
