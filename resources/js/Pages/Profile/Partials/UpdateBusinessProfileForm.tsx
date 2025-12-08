import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Transition } from '@headlessui/react';
import { useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

interface User {
    id: number;
    name: string;
    email: string;
    primary_role: string;
    profile?: UserProfile;
}

// Create a unified form data type that includes all possible fields
type UnifiedFormData = {
    business_name: string;
    description: string;
    website: string;
    // Startup & SME fields
    cac_registration?: string;
    business_type?: string;
    business_stage?: string;
    years_in_business?: number | '';
    employee_count?: number | '';
    annual_revenue?: number | '';
    founded_date?: string;
    funding_needs?: number | '';
    annual_turnover?: number | '';
    market_reach?: string;
    // Investor fields
    investor_type?: string;
    preferred_sectors?: string;
    ticket_sizes?: string;
    // Senator fields
    district?: string;
    office_address?: string;
    official_id?: string;
    // Institution fields
    institution_name?: string;
    institution_registration?: string;
    institution_sector?: string;
    // Trainer fields
    bio?: string;
    linkedin_profile?: string;
    expertise_areas?: string;
    training_mode?: string;
    title?: string;
    specialization?: string;
    // Individual fields
    skills_of_interest?: string;
    profession?: string;
    experience_level?: string;
    availability?: string;
};

interface UserProfile {
    business_name?: string;
    cac_registration?: string;
    business_type?: string;
    business_stage?: string;
    years_in_business?: number;
    employee_count?: number;
    annual_revenue?: number;
    annual_turnover?: number;
    description?: string;
    website?: string;
    founded_date?: string;
    funding_needs?: number;
    funding_history?: any[];
    market_reach?: string;
    loan_request_details?: any[];
    investor_type?: string;
    preferred_sectors?: string[];
    ticket_sizes?: string[];
    district?: string;
    office_address?: string;
    official_id?: string;
    institution_name?: string;
    institution_registration?: string;
    institution_sector?: string;
    bio?: string;
    linkedin_profile?: string;
    expertise_areas?: string[];
    training_mode?: string;
    title?: string;
    specialization?: string[];
    // Individual profile fields
    skills_of_interest?: string[];
    profession?: string;
    experience_level?: string;
    availability?: string;
}

interface SelectOption {
    id: string;
    name: string;
}

interface UpdateBusinessProfileFormProps {
    className?: string;
    user: User;
    sectors: SelectOption[];
    businessTypes: string[];
    businessStages: SelectOption[];
    investorTypes: SelectOption[];
    institutionSectors: SelectOption[];
    trainingModes: SelectOption[];
}

export default function UpdateBusinessProfileForm({
    className = '',
    user,
    sectors,
    businessTypes,
    businessStages,
    investorTypes,
    institutionSectors,
    trainingModes,
}: UpdateBusinessProfileFormProps) {
    const profile = user.profile;
    const currentRole = user.primary_role;
    // const currentRole = 'admin';

    // Initialize form data based on current role
    const getInitialData = (): UnifiedFormData => {
        const baseData = {
            business_name: profile?.business_name || '',
            description: profile?.description || '',
            website: profile?.website || '',
        };

        switch (currentRole) {
            case 'startup':
                return {
                    ...baseData,
                    cac_registration: profile?.cac_registration || '',
                    business_type: profile?.business_type || '',
                    business_stage: profile?.business_stage || '',
                    years_in_business: profile?.years_in_business || '',
                    employee_count: profile?.employee_count || '',
                    annual_revenue: profile?.annual_revenue || '',
                    founded_date: profile?.founded_date || '',
                    funding_needs: profile?.funding_needs || '',
                };
            case 'sme_owner':
                return {
                    ...baseData,
                    cac_registration: profile?.cac_registration || '',
                    business_type: profile?.business_type || '',
                    years_in_business: profile?.years_in_business || '',
                    employee_count: profile?.employee_count || '',
                    annual_turnover: profile?.annual_turnover || '',
                    market_reach: profile?.market_reach || '',
                };
            case 'investor':
                return {
                    ...baseData,
                    investor_type: profile?.investor_type || '',
                    preferred_sectors: profile?.preferred_sectors?.join(', ') || '',
                    ticket_sizes: profile?.ticket_sizes?.join(', ') || '',
                };
            case 'nyp_senator':
                return {
                    ...baseData,
                    district: profile?.district || '',
                    office_address: profile?.office_address || '',
                    official_id: profile?.official_id || '',
                };
            case 'institutional_partner':
                return {
                    ...baseData,
                    institution_name: profile?.institution_name || '',
                    institution_registration: profile?.institution_registration || '',
                    institution_sector: profile?.institution_sector || '',
                };
            case 'trainer_mentor_expert':
                return {
                    ...baseData,
                    bio: profile?.bio || '',
                    linkedin_profile: profile?.linkedin_profile || '',
                    expertise_areas: profile?.expertise_areas?.join(', ') || '',
                    training_mode: profile?.training_mode || '',
                    title: profile?.title || '',
                    specialization: profile?.specialization?.join(', ') || '',
                };
            case 'individual':
                return {
                    ...baseData,
                    skills_of_interest: profile?.skills_of_interest?.join(', ') || '',
                    profession: profile?.profession || '',
                    experience_level: profile?.experience_level || '',
                    availability: profile?.availability || '',
                    bio: profile?.bio || '',
                    linkedin_profile: profile?.linkedin_profile || '',
                };
            default:
                return baseData;
        }
    };

    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm<UnifiedFormData>(getInitialData());

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        // Process arrays before sending
        const processedData: any = { ...data };

        if (data.preferred_sectors && typeof data.preferred_sectors === 'string') {
            processedData.preferred_sectors = data.preferred_sectors.split(',').map((s: string) => s.trim()).filter(Boolean);
        }
        if (data.ticket_sizes && typeof data.ticket_sizes === 'string') {
            processedData.ticket_sizes = data.ticket_sizes.split(',').map((s: string) => s.trim()).filter(Boolean);
        }
        if (data.expertise_areas && typeof data.expertise_areas === 'string') {
            processedData.expertise_areas = data.expertise_areas.split(',').map((s: string) => s.trim()).filter(Boolean);
        }
        if (data.specialization && typeof data.specialization === 'string') {
            processedData.specialization = data.specialization.split(',').map((s: string) => s.trim()).filter(Boolean);
        }
        if (data.skills_of_interest && typeof data.skills_of_interest === 'string') {
            processedData.skills_of_interest = data.skills_of_interest.split(',').map((s: string) => s.trim()).filter(Boolean);
        }

        patch(route('profile.update'), {
            ...processedData,
            preserveScroll: true,
            onSuccess: () => {
                // Handle success
            },
        });
    };

    const getRoleDisplayName = (role: string) => {
        const roleNames: Record<string, string> = {
            startup: 'Startup',
            sme_owner: 'SME Owner',
            investor: 'Investor',
            nyp_senator: 'NYP Senator',
            institutional_partner: 'Institutional Partner',
            trainer_mentor_expert: 'Trainer/Mentor/Expert',
            individual: 'Individual',
        };
        return roleNames[role] || role;
    };

    // Helper function to safely update form data
    const updateData = (key: string, value: string | number) => {
        setData(key as keyof UnifiedFormData, value as never);
    };

    const renderRoleSpecificFields = () => {
        switch (currentRole) {
            case 'startup':
                return (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <InputLabel htmlFor="cac_registration" value="CAC Registration Number" />
                                <TextInput
                                    id="cac_registration"
                                    className="mt-1 block w-full"
                                    value={data.cac_registration || ''}
                                    onChange={(e) => updateData('cac_registration', e.target.value)}
                                    placeholder="e.g., RC123456"
                                />
                                <InputError className="mt-2" message={errors.cac_registration} />
                            </div>

                            <div>
                                <InputLabel htmlFor="business_type" value="Business Type" />
                                <select
                                    id="business_type"
                                    className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 shadow-sm"
                                    value={data.business_type || ''}
                                    onChange={(e) => updateData('business_type', e.target.value)}
                                >
                                    <option value="">Select Business Type</option>
                                    {businessTypes.map((type) => (
                                        <option key={type} value={type}>
                                            {type.charAt(0).toUpperCase() + type.slice(1)}
                                        </option>
                                    ))}
                                </select>
                                <InputError className="mt-2" message={errors.business_type} />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <InputLabel htmlFor="business_stage" value="Business Stage" />
                                <select
                                    id="business_stage"
                                    className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 shadow-sm"
                                    value={data.business_stage || ''}
                                    onChange={(e) => updateData('business_stage', e.target.value)}
                                >
                                    <option value="">Select Business Stage</option>
                                    {businessStages.map((stage) => (
                                        <option key={stage.id} value={stage.id}>
                                            {stage.name}
                                        </option>
                                    ))}
                                </select>
                                <InputError className="mt-2" message={errors.business_stage} />
                            </div>

                            <div>
                                <InputLabel htmlFor="founded_date" value="Founded Date" />
                                <TextInput
                                    id="founded_date"
                                    type="date"
                                    className="mt-1 block w-full"
                                    value={data.founded_date || ''}
                                    onChange={(e) => updateData('founded_date', e.target.value)}
                                />
                                <InputError className="mt-2" message={errors.founded_date} />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <InputLabel htmlFor="employee_count" value="Number of Employees" />
                                <TextInput
                                    id="employee_count"
                                    type="number"
                                    className="mt-1 block w-full"
                                    value={data.employee_count || ''}
                                    onChange={(e) => updateData('employee_count', e.target.value)}
                                    min="0"
                                />
                                <InputError className="mt-2" message={errors.employee_count} />
                            </div>

                            <div>
                                <InputLabel htmlFor="funding_needs" value="Funding Needs (₦)" />
                                <TextInput
                                    id="funding_needs"
                                    type="number"
                                    className="mt-1 block w-full"
                                    value={data.funding_needs || ''}
                                    onChange={(e) => updateData('funding_needs', e.target.value)}
                                    min="0"
                                    step="0.01"
                                />
                                <InputError className="mt-2" message={errors.funding_needs} />
                            </div>
                        </div>
                    </>
                );

            case 'sme_owner':
                return (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <InputLabel htmlFor="cac_registration" value="CAC Registration Number *" />
                                <TextInput
                                    id="cac_registration"
                                    className="mt-1 block w-full"
                                    value={data.cac_registration || ''}
                                    onChange={(e) => updateData('cac_registration', e.target.value)}
                                    required
                                />
                                <InputError className="mt-2" message={errors.cac_registration} />
                            </div>

                            <div>
                                <InputLabel htmlFor="business_type" value="Business Type *" />
                                <select
                                    id="business_type"
                                    className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 shadow-sm"
                                    value={data.business_type || ''}
                                    onChange={(e) => updateData('business_type', e.target.value)}
                                    required
                                >
                                    <option value="">Select Business Type</option>
                                    {businessTypes.map((type) => (
                                        <option key={type} value={type}>
                                            {type.charAt(0).toUpperCase() + type.slice(1)}
                                        </option>
                                    ))}
                                </select>
                                <InputError className="mt-2" message={errors.business_type} />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                                <InputLabel htmlFor="years_in_business" value="Years in Business" />
                                <TextInput
                                    id="years_in_business"
                                    type="number"
                                    className="mt-1 block w-full"
                                    value={data.years_in_business || ''}
                                    onChange={(e) => updateData('years_in_business', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                                    min="0"
                                />
                                <InputError className="mt-2" message={errors.years_in_business} />
                            </div>

                            <div>
                                <InputLabel htmlFor="employee_count" value="Number of Employees *" />
                                <TextInput
                                    id="employee_count"
                                    type="number"
                                    className="mt-1 block w-full"
                                    value={data.employee_count || ''}
                                    onChange={(e) => updateData('employee_count', e.target.value)}
                                    min="1"
                                    required
                                />
                                <InputError className="mt-2" message={errors.employee_count} />
                            </div>

                            <div>
                                <InputLabel htmlFor="annual_turnover" value="Annual Turnover (₦) *" />
                                <TextInput
                                    id="annual_turnover"
                                    type="number"
                                    className="mt-1 block w-full"
                                    value={data.annual_turnover || ''}
                                    onChange={(e) => updateData('annual_turnover', e.target.value)}
                                    min="0"
                                    step="0.01"
                                    required
                                />
                                <InputError className="mt-2" message={errors.annual_turnover} />
                            </div>
                        </div>

                        <div>
                            <InputLabel htmlFor="market_reach" value="Market Reach *" />
                            <select
                                id="market_reach"
                                className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 shadow-sm"
                                value={data.market_reach || ''}
                                onChange={(e) => updateData('market_reach', e.target.value)}
                                required
                            >
                                <option value="">Select Market Reach</option>
                                <option value="local">Local</option>
                                <option value="state">State-wide</option>
                                <option value="national">National</option>
                                <option value="international">International</option>
                            </select>
                            <InputError className="mt-2" message={errors.market_reach} />
                        </div>
                    </>
                );

            case 'investor':
                return (
                    <>
                        <div>
                            <InputLabel htmlFor="investor_type" value="Investor Type *" />
                            <select
                                id="investor_type"
                                className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 shadow-sm"
                                value={data.investor_type || ''}
                                onChange={(e) => updateData('investor_type', e.target.value)}
                                required
                            >
                                <option value="">Select Investor Type</option>
                                {investorTypes.map((type) => (
                                    <option key={type.id} value={type.id}>
                                        {type.name}
                                    </option>
                                ))}
                            </select>
                            <InputError className="mt-2" message={errors.investor_type} />
                        </div>

                        <div>
                            <InputLabel htmlFor="preferred_sectors" value="Preferred Sectors *" />
                            <TextInput
                                id="preferred_sectors"
                                className="mt-1 block w-full"
                                value={data.preferred_sectors || ''}
                                onChange={(e) => updateData('preferred_sectors', e.target.value)}
                                placeholder="e.g., Technology, Healthcare, Finance (comma-separated)"
                                required
                            />
                            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                                Enter sectors separated by commas
                            </p>
                            <InputError className="mt-2" message={errors.preferred_sectors} />
                        </div>

                        <div>
                            <InputLabel htmlFor="ticket_sizes" value="Typical Investment Sizes *" />
                            <TextInput
                                id="ticket_sizes"
                                className="mt-1 block w-full"
                                value={data.ticket_sizes || ''}
                                onChange={(e) => updateData('ticket_sizes', e.target.value)}
                                placeholder="e.g., ₦1M-5M, ₦10M-50M (comma-separated)"
                                required
                            />
                            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                                Enter investment ranges separated by commas
                            </p>
                            <InputError className="mt-2" message={errors.ticket_sizes} />
                        </div>
                    </>
                );

            case 'nyp_senator':
                return (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <InputLabel htmlFor="district" value="District/Constituency *" />
                                <TextInput
                                    id="district"
                                    className="mt-1 block w-full"
                                    value={data.district || ''}
                                    onChange={(e) => updateData('district', e.target.value)}
                                    required
                                />
                                <InputError className="mt-2" message={errors.district} />
                            </div>

                            <div>
                                <InputLabel htmlFor="official_id" value="Official ID/Badge Number *" />
                                <TextInput
                                    id="official_id"
                                    className="mt-1 block w-full"
                                    value={data.official_id || ''}
                                    onChange={(e) => updateData('official_id', e.target.value)}
                                    required
                                />
                                <InputError className="mt-2" message={errors.official_id} />
                            </div>
                        </div>

                        <div>
                            <InputLabel htmlFor="office_address" value="Office Address *" />
                            <textarea
                                id="office_address"
                                className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 shadow-sm"
                                rows={3}
                                value={data.office_address || ''}
                                onChange={(e) => updateData('office_address', e.target.value)}
                                required
                            />
                            <InputError className="mt-2" message={errors.office_address} />
                        </div>
                    </>
                );

            case 'institutional_partner':
                return (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <InputLabel htmlFor="institution_name" value="Institution Name *" />
                                <TextInput
                                    id="institution_name"
                                    className="mt-1 block w-full"
                                    value={data.institution_name || ''}
                                    onChange={(e) => updateData('institution_name', e.target.value)}
                                    required
                                />
                                <InputError className="mt-2" message={errors.institution_name} />
                            </div>

                            <div>
                                <InputLabel htmlFor="institution_registration" value="Registration Number *" />
                                <TextInput
                                    id="institution_registration"
                                    className="mt-1 block w-full"
                                    value={data.institution_registration || ''}
                                    onChange={(e) => updateData('institution_registration', e.target.value)}
                                    required
                                />
                                <InputError className="mt-2" message={errors.institution_registration} />
                            </div>
                        </div>

                        <div>
                            <InputLabel htmlFor="institution_sector" value="Institution Sector *" />
                            <select
                                id="institution_sector"
                                className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 shadow-sm"
                                value={data.institution_sector || ''}
                                onChange={(e) => updateData('institution_sector', e.target.value)}
                                required
                            >
                                <option value="">Select Institution Sector</option>
                                {institutionSectors.map((sector) => (
                                    <option key={sector.id} value={sector.id}>
                                        {sector.name}
                                    </option>
                                ))}
                            </select>
                            <InputError className="mt-2" message={errors.institution_sector} />
                        </div>
                    </>
                );

            case 'trainer_mentor_expert':
                return (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <InputLabel htmlFor="title" value="Professional Title" />
                                <TextInput
                                    id="title"
                                    className="mt-1 block w-full"
                                    value={data.title || ''}
                                    onChange={(e) => updateData('title', e.target.value)}
                                    placeholder="e.g., Senior Software Engineer, Business Consultant"
                                />
                                <InputError className="mt-2" message={errors.title} />
                            </div>

                            <div>
                                <InputLabel htmlFor="linkedin_profile" value="LinkedIn Profile" />
                                <TextInput
                                    id="linkedin_profile"
                                    type="url"
                                    className="mt-1 block w-full"
                                    value={data.linkedin_profile || ''}
                                    onChange={(e) => updateData('linkedin_profile', e.target.value)}
                                    placeholder="https://linkedin.com/in/your-profile"
                                />
                                <InputError className="mt-2" message={errors.linkedin_profile} />
                            </div>
                        </div>

                        <div>
                            <InputLabel htmlFor="bio" value="Professional Bio *" />
                            <textarea
                                id="bio"
                                className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 shadow-sm"
                                rows={4}
                                value={data.bio || ''}
                                onChange={(e) => updateData('bio', e.target.value)}
                                placeholder="Describe your professional background, experience, and qualifications..."
                                required
                            />
                            <InputError className="mt-2" message={errors.bio} />
                        </div>

                        <div>
                            <InputLabel htmlFor="expertise_areas" value="Areas of Expertise *" />
                            <TextInput
                                id="expertise_areas"
                                className="mt-1 block w-full"
                                value={data.expertise_areas || ''}
                                onChange={(e) => updateData('expertise_areas', e.target.value)}
                                placeholder="e.g., Software Development, Digital Marketing, Business Strategy (comma-separated)"
                                required
                            />
                            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                                Enter your areas of expertise separated by commas
                            </p>
                            <InputError className="mt-2" message={errors.expertise_areas} />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <InputLabel htmlFor="training_mode" value="Preferred Training Mode *" />
                                <select
                                    id="training_mode"
                                    className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 shadow-sm"
                                    value={data.training_mode || ''}
                                    onChange={(e) => updateData('training_mode', e.target.value)}
                                    required
                                >
                                    <option value="">Select Training Mode</option>
                                    {trainingModes.map((mode) => (
                                        <option key={mode.id} value={mode.id}>
                                            {mode.name}
                                        </option>
                                    ))}
                                </select>
                                <InputError className="mt-2" message={errors.training_mode} />
                            </div>

                            <div>
                                <InputLabel htmlFor="specialization" value="Specialization" />
                                <TextInput
                                    id="specialization"
                                    className="mt-1 block w-full"
                                    value={data.specialization || ''}
                                    onChange={(e) => updateData('specialization', e.target.value)}
                                    placeholder="e.g., Frontend Development, Leadership (comma-separated)"
                                />
                                <InputError className="mt-2" message={errors.specialization} />
                            </div>
                        </div>
                    </>
                );

            case 'individual':
                return (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <InputLabel htmlFor="profession" value="Current Profession/Occupation" />
                                <TextInput
                                    id="profession"
                                    className="mt-1 block w-full"
                                    value={data.profession || ''}
                                    onChange={(e) => updateData('profession', e.target.value)}
                                    placeholder="e.g., Software Developer, Marketing Manager, Student"
                                />
                                <InputError className="mt-2" message={errors.profession} />
                            </div>

                            <div>
                                <InputLabel htmlFor="experience_level" value="Experience Level" />
                                <select
                                    id="experience_level"
                                    className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 shadow-sm"
                                    value={data.experience_level || ''}
                                    onChange={(e) => updateData('experience_level', e.target.value)}
                                >
                                    <option value="">Select Experience Level</option>
                                    <option value="entry">Entry Level (0-2 years)</option>
                                    <option value="mid">Mid Level (3-5 years)</option>
                                    <option value="senior">Senior Level (6-10 years)</option>
                                    <option value="expert">Expert Level (10+ years)</option>
                                    <option value="student">Student/Learning</option>
                                </select>
                                <InputError className="mt-2" message={errors.experience_level} />
                            </div>
                        </div>

                        <div>
                            <InputLabel htmlFor="skills_of_interest" value="Skills of Interest" />
                            <TextInput
                                id="skills_of_interest"
                                className="mt-1 block w-full"
                                value={data.skills_of_interest || ''}
                                onChange={(e) => updateData('skills_of_interest', e.target.value)}
                                placeholder="e.g., Digital Marketing, Web Development, Business Analysis (comma-separated)"
                            />
                            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                                Enter skills you're interested in learning or improving, separated by commas
                            </p>
                            <InputError className="mt-2" message={errors.skills_of_interest} />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <InputLabel htmlFor="availability" value="Availability for Training/Networking" />
                                <select
                                    id="availability"
                                    className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 shadow-sm"
                                    value={data.availability || ''}
                                    onChange={(e) => updateData('availability', e.target.value)}
                                >
                                    <option value="">Select Availability</option>
                                    <option value="weekdays">Weekdays</option>
                                    <option value="weekends">Weekends</option>
                                    <option value="evenings">Evenings</option>
                                    <option value="flexible">Flexible</option>
                                    <option value="limited">Limited Availability</option>
                                </select>
                                <InputError className="mt-2" message={errors.availability} />
                            </div>

                            <div>
                                <InputLabel htmlFor="linkedin_profile" value="LinkedIn Profile" />
                                <TextInput
                                    id="linkedin_profile"
                                    type="url"
                                    className="mt-1 block w-full"
                                    value={data.linkedin_profile || ''}
                                    onChange={(e) => updateData('linkedin_profile', e.target.value)}
                                    placeholder="https://linkedin.com/in/your-profile"
                                />
                                <InputError className="mt-2" message={errors.linkedin_profile} />
                            </div>
                        </div>

                        <div>
                            <InputLabel htmlFor="bio" value="Personal Bio" />
                            <textarea
                                id="bio"
                                className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 shadow-sm"
                                rows={4}
                                value={data.bio || ''}
                                onChange={(e) => updateData('bio', e.target.value)}
                                placeholder="Tell us about yourself, your interests, goals, and what you hope to achieve..."
                            />
                            <InputError className="mt-2" message={errors.bio} />
                        </div>
                    </>
                );

            default:
                return (
                    <div className="text-center py-8">
                        <p className="text-gray-500 dark:text-gray-400">
                            No specific profile fields are required for your current role.
                        </p>
                    </div>
                );
        }
    };

    return (
        <section className={className}>
            <header className="mb-6">
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                    Profile Information - {getRoleDisplayName(currentRole)}
                </h2>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    {currentRole === 'individual'
                        ? 'Update your personal information and interests.'
                        : `Update your business information specific to your role as a ${getRoleDisplayName(currentRole).toLowerCase()}.`
                    }
                </p>
            </header>

            <form onSubmit={submit} className="space-y-6">
                {/* Common Business Fields - Show for all roles except individual */}
                {currentRole !== 'individual' && (
                    <>
                        <div>
                            <InputLabel htmlFor="business_name" value="Business/Organization Name" />
                            <TextInput
                                id="business_name"
                                className="mt-1 block w-full"
                                value={data.business_name}
                                onChange={(e) => updateData('business_name', e.target.value)}
                                placeholder="Enter your business or organization name"
                            />
                            <InputError className="mt-2" message={errors.business_name} />
                        </div>

                        <div>
                            <InputLabel htmlFor="description" value="Description" />
                            <textarea
                                id="description"
                                className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 shadow-sm"
                                rows={4}
                                value={data.description}
                                onChange={(e) => updateData('description', e.target.value)}
                                placeholder="Describe your business, mission, and what you do..."
                            />
                            <InputError className="mt-2" message={errors.description} />
                        </div>

                        <div>
                            <InputLabel htmlFor="website" value="Website" />
                            <TextInput
                                id="website"
                                type="url"
                                className="mt-1 block w-full"
                                value={data.website}
                                onChange={(e) => updateData('website', e.target.value)}
                                placeholder="https://your-website.com"
                            />
                            <InputError className="mt-2" message={errors.website} />
                        </div>
                    </>
                )}

                {/* Individual specific common fields */}
                {currentRole === 'individual' && (
                    <>
                        <div>
                            <InputLabel htmlFor="business_name" value="Organization/Company Name (Optional)" />
                            <TextInput
                                id="business_name"
                                className="mt-1 block w-full"
                                value={data.business_name}
                                onChange={(e) => updateData('business_name', e.target.value)}
                                placeholder="Current employer or organization"
                            />
                            <InputError className="mt-2" message={errors.business_name} />
                        </div>

                        <div>
                            <InputLabel htmlFor="description" value="Personal Summary" />
                            <textarea
                                id="description"
                                className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 shadow-sm"
                                rows={4}
                                value={data.description}
                                onChange={(e) => updateData('description', e.target.value)}
                                placeholder="Brief summary about yourself, your background, and interests..."
                            />
                            <InputError className="mt-2" message={errors.description} />
                        </div>

                        <div>
                            <InputLabel htmlFor="website" value="Personal Website/Portfolio" />
                            <TextInput
                                id="website"
                                type="url"
                                className="mt-1 block w-full"
                                value={data.website}
                                onChange={(e) => updateData('website', e.target.value)}
                                placeholder="https://your-portfolio.com"
                            />
                            <InputError className="mt-2" message={errors.website} />
                        </div>
                    </>
                )}

                {/* Role-Specific Fields */}
                {renderRoleSpecificFields()}

                <div className="flex items-center gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <PrimaryButton disabled={processing}>
                        {processing ? 'Saving...' : `Save ${currentRole === 'individual' ? 'Profile' : 'Business Profile'}`}
                    </PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Saved.
                        </p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
