import { PageProps } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';
import ModernLayout from '@/Layouts/Training/TrainingLayout';
import {
  ArrowLeftIcon,
  UserIcon,
  EnvelopeIcon,
  PhoneIcon,
  CalendarIcon,
  ShieldCheckIcon,
  MapPinIcon,
  BriefcaseIcon,
  AcademicCapIcon,
  IdentificationIcon,
  LockClosedIcon,
  CheckCircleIcon,
  XCircleIcon,
} from '@heroicons/react/24/outline';
import { User, Role } from '@/types/user';
import toast from 'react-hot-toast';

interface UserEditProps extends PageProps {
  user: {
    id: number;
    name: string;
    firstname: string | null;
    lastname: string | null;
    email: string;
    phone: string | null;
    sector: string | null;
    address: string | null;
    date_of_birth: string | null;
    education_level: string | null;
    skills_of_interest: string[] | null;
    state: string | null;
    lga: string | null;
    nin: string | null;
    passport_number: string | null;
    registration_status: string;
    roles: number[];
  };
  roles: Role[];
}

const FormSection: React.FC<{
  title: string;
  description?: string;
  children: React.ReactNode;
}> = ({ title, description, children }) => {
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 sm:p-6 shadow-sm">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          {title}
        </h3>
        {description && (
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {description}
          </p>
        )}
      </div>
      {children}
    </div>
  );
};

const InputField: React.FC<{
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  icon?: React.ReactNode;
  placeholder?: string;
  required?: boolean;
}> = ({ label, name, type = 'text', value, onChange, error, icon, placeholder, required = false }) => {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <div className="text-gray-400">{icon}</div>
          </div>
        )}
        <input
          type={type}
          id={name}
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          className={`block w-full ${icon ? 'pl-10' : 'pl-3'} pr-3 py-2.5 border ${
            error
              ? 'border-red-300 dark:border-red-600 focus:ring-red-500 focus:border-red-500'
              : 'border-gray-300 dark:border-gray-600 focus:ring-emerald-500 focus:border-emerald-500'
          } rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 transition-colors`}
          placeholder={placeholder}
        />
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
          <XCircleIcon className="w-4 h-4" />
          {error}
        </p>
      )}
    </div>
  );
};

const SelectField: React.FC<{
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  error?: string;
  icon?: React.ReactNode;
  required?: boolean;
}> = ({ label, name, value, onChange, options, error, icon, required = false }) => {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <div className="text-gray-400">{icon}</div>
          </div>
        )}
        <select
          id={name}
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          className={`block w-full ${icon ? 'pl-10' : 'pl-3'} pr-10 py-2.5 border ${
            error
              ? 'border-red-300 dark:border-red-600 focus:ring-red-500 focus:border-red-500'
              : 'border-gray-300 dark:border-gray-600 focus:ring-emerald-500 focus:border-emerald-500'
          } rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 transition-colors`}
        >
          <option value="">Select {label}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
          <XCircleIcon className="w-4 h-4" />
          {error}
        </p>
      )}
    </div>
  );
};

const TextareaField: React.FC<{
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  placeholder?: string;
  rows?: number;
}> = ({ label, name, value, onChange, error, placeholder, rows = 3 }) => {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        {label}
      </label>
      <textarea
        id={name}
        rows={rows}
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        className={`block w-full px-3 py-2.5 border ${
          error
            ? 'border-red-300 dark:border-red-600 focus:ring-red-500 focus:border-red-500'
            : 'border-gray-300 dark:border-gray-600 focus:ring-emerald-500 focus:border-emerald-500'
        } rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 transition-colors`}
        placeholder={placeholder}
      />
      {error && (
        <p className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
          <XCircleIcon className="w-4 h-4" />
          {error}
        </p>
      )}
    </div>
  );
};

const SkillsInput: React.FC<{
  label: string;
  skills: string[];
  onChange: (skills: string[]) => void;
  error?: string;
}> = ({ label, skills, onChange, error }) => {
  const [inputValue, setInputValue] = useState('');

  const addSkill = () => {
    if (inputValue.trim() && !skills.includes(inputValue.trim())) {
      onChange([...skills, inputValue.trim()]);
      setInputValue('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    onChange(skills.filter(skill => skill !== skillToRemove));
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        {label}
      </label>
      <div className="flex gap-2 mb-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              addSkill();
            }
          }}
          className="flex-1 px-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
          placeholder="Type a skill and press Enter"
        />
        <button
          type="button"
          onClick={addSkill}
          className="px-4 py-2.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-medium"
        >
          Add
        </button>
      </div>
      {skills.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {skills.map((skill, index) => (
            <span
              key={index}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 text-sm rounded-full"
            >
              {skill}
              <button
                type="button"
                onClick={() => removeSkill(skill)}
                className="hover:text-emerald-900 dark:hover:text-emerald-100"
              >
                <XCircleIcon className="w-4 h-4" />
              </button>
            </span>
          ))}
        </div>
      )}
      {error && (
        <p className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
          <XCircleIcon className="w-4 h-4" />
          {error}
        </p>
      )}
    </div>
  );
};

const RoleCheckbox: React.FC<{
  role: Role;
  checked: boolean;
  onChange: (checked: boolean) => void;
}> = ({ role, checked, onChange }) => {
  return (
    <label className="flex items-start gap-3 p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-1 h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 dark:border-gray-600 rounded"
      />
      <div className="flex-1 min-w-0">
        <div className="font-medium text-gray-900 dark:text-white">
          {role.name.replace('_', ' ').toUpperCase()}
        </div>
        {role.description && (
          <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {role.description}
          </div>
        )}
      </div>
    </label>
  );
};

const UserEdit: React.FC<UserEditProps> = ({ user, roles }) => {
  const { data, setData, put, processing, errors, reset } = useForm({
    name: user.name || '',
    firstname: user.firstname || '',
    lastname: user.lastname || '',
    email: user.email || '',
    phone: user.phone || '',
    password: '',
    password_confirmation: '',
    sector: user.sector || '',
    address: user.address || '',
    date_of_birth: user.date_of_birth || '',
    education_level: user.education_level || '',
    skills_of_interest: user.skills_of_interest || [],
    state: user.state || '',
    lga: user.lga || '',
    nin: user.nin || '',
    passport_number: user.passport_number || '',
    registration_status: user.registration_status || 'pending',
    roles: user.roles || [],
  });

  const [showPasswordFields, setShowPasswordFields] = useState(false);

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();

    put(route('users.update', user.id), {
      preserveScroll: true,
      onSuccess: () => {
        toast.success('User updated successfully!', {
          duration: 4000,
          position: 'top-right',
        });
        setShowPasswordFields(false);
        setData('password', '');
        setData('password_confirmation', '');
      },
      onError: (errors) => {
        toast.error('Please check the form for errors', {
          duration: 4000,
          position: 'top-right',
        });
      },
    });
  };

  const toggleRole = (roleId: number) => {
    const currentRoles = [...data.roles];
    const index = currentRoles.indexOf(roleId);
    
    if (index > -1) {
      currentRoles.splice(index, 1);
    } else {
      currentRoles.push(roleId);
    }
    
    setData('roles', currentRoles);
  };

  const educationLevels = [
    { value: 'primary', label: 'Primary Education' },
    { value: 'secondary', label: 'Secondary Education' },
    { value: 'diploma', label: 'Diploma' },
    { value: 'bachelors', label: "Bachelor's Degree" },
    { value: 'masters', label: "Master's Degree" },
    { value: 'phd', label: 'PhD/Doctorate' },
  ];

  const registrationStatuses = [
    { value: 'pending', label: 'Pending Review' },
    { value: 'verified', label: 'Verified Account' },
    { value: 'suspended', label: 'Account Suspended' },
    { value: 'rejected', label: 'Registration Rejected' },
  ];

  return (
    <ModernLayout>
      <Head title={`Edit ${user.name}`} />

      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Link
              href={route('users.show', user.id)}
              className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors text-sm sm:text-base"
            >
              <ArrowLeftIcon className="w-4 h-4 sm:w-5 sm:h-5" />
              Back to User Details
            </Link>
          </div>

          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              Edit User
            </h1>
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 mt-1">
              Update user information and settings
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-4 sm:space-y-6">
              {/* Basic Information */}
              <FormSection
                title="Basic Information"
                description="Update the user's basic profile information"
              >
                <div className="space-y-4">
                  <InputField
                    label="Username"
                    name="name"
                    value={data.name}
                    onChange={(value) => setData('name', value)}
                    error={errors.name}
                    icon={<UserIcon className="w-5 h-5" />}
                    placeholder="johndoe"
                    required
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <InputField
                      label="First Name"
                      name="firstname"
                      value={data.firstname}
                      onChange={(value) => setData('firstname', value)}
                      error={errors.firstname}
                      placeholder="John"
                    />

                    <InputField
                      label="Last Name"
                      name="lastname"
                      value={data.lastname}
                      onChange={(value) => setData('lastname', value)}
                      error={errors.lastname}
                      placeholder="Doe"
                    />
                  </div>

                  <InputField
                    label="Email Address"
                    name="email"
                    type="email"
                    value={data.email}
                    onChange={(value) => setData('email', value)}
                    error={errors.email}
                    icon={<EnvelopeIcon className="w-5 h-5" />}
                    placeholder="john@example.com"
                    required
                  />

                  <InputField
                    label="Phone Number"
                    name="phone"
                    type="tel"
                    value={data.phone}
                    onChange={(value) => setData('phone', value)}
                    error={errors.phone}
                    icon={<PhoneIcon className="w-5 h-5" />}
                    placeholder="+234 800 000 0000"
                  />

                  <InputField
                    label="Date of Birth"
                    name="date_of_birth"
                    type="date"
                    value={data.date_of_birth}
                    onChange={(value) => setData('date_of_birth', value)}
                    error={errors.date_of_birth}
                    icon={<CalendarIcon className="w-5 h-5" />}
                  />

                  <SelectField
                    label="Education Level"
                    name="education_level"
                    value={data.education_level}
                    onChange={(value) => setData('education_level', value)}
                    options={educationLevels}
                    error={errors.education_level}
                    icon={<AcademicCapIcon className="w-5 h-5" />}
                  />
                </div>
              </FormSection>

              {/* Password Update */}
              <FormSection
                title="Password"
                description="Change the user's password (leave blank to keep current password)"
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-4">
                    <input
                      type="checkbox"
                      id="change-password"
                      checked={showPasswordFields}
                      onChange={(e) => setShowPasswordFields(e.target.checked)}
                      className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 dark:border-gray-600 rounded"
                    />
                    <label htmlFor="change-password" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Change Password
                    </label>
                  </div>

                  {showPasswordFields && (
                    <>
                      <InputField
                        label="New Password"
                        name="password"
                        type="password"
                        value={data.password}
                        onChange={(value) => setData('password', value)}
                        error={errors.password}
                        icon={<LockClosedIcon className="w-5 h-5" />}
                        placeholder="••••••••"
                      />

                      <InputField
                        label="Confirm New Password"
                        name="password_confirmation"
                        type="password"
                        value={data.password_confirmation}
                        onChange={(value) => setData('password_confirmation', value)}
                        error={errors.password_confirmation}
                        icon={<LockClosedIcon className="w-5 h-5" />}
                        placeholder="••••••••"
                      />
                    </>
                  )}
                </div>
              </FormSection>

              {/* Location & Professional */}
              <FormSection
                title="Location & Professional Information"
                description="Update location and professional details"
              >
                <div className="space-y-4">
                  <InputField
                    label="Sector"
                    name="sector"
                    value={data.sector}
                    onChange={(value) => setData('sector', value)}
                    error={errors.sector}
                    icon={<BriefcaseIcon className="w-5 h-5" />}
                    placeholder="Technology, Healthcare, etc."
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <InputField
                      label="State"
                      name="state"
                      value={data.state}
                      onChange={(value) => setData('state', value)}
                      error={errors.state}
                      icon={<MapPinIcon className="w-5 h-5" />}
                      placeholder="Lagos"
                    />

                    <InputField
                      label="Local Government Area"
                      name="lga"
                      value={data.lga}
                      onChange={(value) => setData('lga', value)}
                      error={errors.lga}
                      placeholder="Ikeja"
                    />
                  </div>

                  <TextareaField
                    label="Address"
                    name="address"
                    value={data.address}
                    onChange={(value) => setData('address', value)}
                    error={errors.address}
                    placeholder="Enter full address"
                    rows={3}
                  />

                  <SkillsInput
                    label="Skills of Interest"
                    skills={data.skills_of_interest}
                    onChange={(skills) => setData('skills_of_interest', skills)}
                    error={errors.skills_of_interest}
                  />
                </div>
              </FormSection>

              {/* Identity Information */}
              <FormSection
                title="Identity Information"
                description="Update government-issued identification details"
              >
                <div className="space-y-4">
                  <InputField
                    label="National Identification Number (NIN)"
                    name="nin"
                    value={data.nin}
                    onChange={(value) => setData('nin', value)}
                    error={errors.nin}
                    icon={<IdentificationIcon className="w-5 h-5" />}
                    placeholder="12345678901"
                  />

                  <InputField
                    label="Passport Number"
                    name="passport_number"
                    value={data.passport_number}
                    onChange={(value) => setData('passport_number', value)}
                    error={errors.passport_number}
                    icon={<IdentificationIcon className="w-5 h-5" />}
                    placeholder="A12345678"
                  />
                </div>
              </FormSection>
            </div>

            {/* Sidebar */}
            <div className="space-y-4 sm:space-y-6">
              {/* Account Status */}
              <FormSection title="Account Status">
                <SelectField
                  label="Registration Status"
                  name="registration_status"
                  value={data.registration_status}
                  onChange={(value) => setData('registration_status', value)}
                  options={registrationStatuses}
                  error={errors.registration_status}
                  required
                />
              </FormSection>

              {/* Roles & Permissions */}
              <FormSection
                title="Roles & Permissions"
                description="Assign roles to this user"
              >
                <div className="space-y-3">
                  {roles.map((role) => (
                    <RoleCheckbox
                      key={role.id}
                      role={role}
                      checked={data.roles.includes(role.id)}
                      onChange={(checked) => toggleRole(role.id)}
                    />
                  ))}
                  {errors.roles && (
                    <p className="text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
                      <XCircleIcon className="w-4 h-4" />
                      {errors.roles}
                    </p>
                  )}
                </div>
              </FormSection>

              {/* Action Buttons */}
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 sm:p-6 shadow-sm sticky top-6">
                <div className="space-y-3">
                  <button
                    type="submit"
                    disabled={processing}
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm font-medium shadow-sm"
                  >
                    <CheckCircleIcon className="w-5 h-5" />
                    {processing ? 'Updating...' : 'Update User'}
                  </button>

                  <Link
                    href={route('users.show', user.id)}
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors text-sm font-medium"
                  >
                    <XCircleIcon className="w-5 h-5" />
                    Cancel
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </ModernLayout>
  );
};

export default UserEdit;