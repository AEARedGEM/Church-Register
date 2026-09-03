<?php

namespace App\Http\Requests;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Validation\Rule;

class ProfileUpdateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        $rules = [
            // Basic user information
            'name' => ['required', 'string', 'max:255'],
            'email' => [
                'required',
                'string',
                'lowercase',
                'email',
                'max:255',
                Rule::unique(User::class)->ignore($this->user()->id)
            ],
            'phone' => ['nullable', 'string', 'max:20', 'regex:/^[\+]?[0-9\-\(\)\s]*$/'],
            'address' => ['nullable', 'string', 'max:1000'],
            'sector' => ['nullable', 'string', 'max:100'],
            'referral_code' => [
                'nullable',
                'string',
                'size:10',
                Rule::exists(User::class, 'referral_code'),
                Rule::notIn([(string) $this->user()->referral_code]),
            ],

            // Common business profile information
            'business_name' => ['nullable', 'string', 'max:255'],
            'description' => ['nullable', 'string', 'max:5000'],
            'website' => ['nullable', 'url', 'max:255'],
            'profile_photo' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:5120'],
        ];

        // Add role-specific validation rules
        $currentRole = $this->user()->primary_role;
        $rules = array_merge($rules, $this->getRoleSpecificRules($currentRole));

        return $rules;
    }

    /**
     * Get role-specific validation rules
     */
    private function getRoleSpecificRules(?string $role): array
    {
        return match($role) {
            'startup' => [
                'cac_registration' => ['nullable', 'string', 'max:50'],
                'business_type' => ['nullable', 'string', 'max:100'],
                'business_stage' => ['nullable', 'string', 'max:50'],
                'years_in_business' => ['nullable', 'integer', 'min:0', 'max:100'],
                'employee_count' => ['nullable', 'integer', 'min:0', 'max:100000'],
                'annual_revenue' => ['nullable', 'numeric', 'min:0', 'max:999999999999.99'],
                'founded_date' => ['nullable', 'date', 'before_or_equal:today'],
                'funding_needs' => ['nullable', 'numeric', 'min:0', 'max:999999999999.99'],
            ],
            'sme_owner' => [
                'cac_registration' => ['required', 'string', 'max:50'],
                'business_type' => ['required', 'string', 'max:100'],
                'years_in_business' => ['nullable', 'integer', 'min:0', 'max:100'],
                'employee_count' => ['required', 'integer', 'min:1', 'max:100000'],
                'annual_turnover' => ['required', 'numeric', 'min:0', 'max:999999999999.99'],
                'market_reach' => ['required', 'string', Rule::in(['local', 'state', 'national', 'international'])],
            ],
            'investor' => [
                'investor_type' => ['required', 'string', 'max:50'],
                'preferred_sectors' => ['required', 'string', 'max:1000'],
                'ticket_sizes' => ['required', 'string', 'max:500'],
            ],
            'nyp_senator' => [
                'district' => ['required', 'string', 'max:100'],
                'office_address' => ['required', 'string', 'max:500'],
                'official_id' => ['required', 'string', 'max:50'],
            ],
            'institutional_partner' => [
                'institution_name' => ['required', 'string', 'max:255'],
                'institution_registration' => ['required', 'string', 'max:100'],
                'institution_sector' => ['required', 'string', 'max:100'],
            ],
            'trainer_mentor_expert' => [
                'bio' => ['required', 'string', 'max:2000'],
                'linkedin_profile' => ['nullable', 'url', 'max:255'],
                'expertise_areas' => ['required', 'string', 'max:1000'],
                'training_mode' => ['required', 'string', 'max:50'],
                'title' => ['nullable', 'string', 'max:255'],
                'specialization' => ['nullable', 'string', 'max:1000'],
            ],
            default => []
        };
    }

    /**
     * Get custom messages for validator errors.
     */
    public function messages(): array
    {
        return [
            'name.required' => 'Your full name is required.',
            'name.max' => 'Your name cannot exceed 255 characters.',

            'email.required' => 'Email address is required.',
            'email.email' => 'Please enter a valid email address.',
            'email.unique' => 'This email address is already taken.',

            'phone.regex' => 'Please enter a valid phone number.',
            'phone.max' => 'Phone number cannot exceed 20 characters.',

            'address.max' => 'Address cannot exceed 1000 characters.',
            'sector.max' => 'Sector name cannot exceed 100 characters.',

            'business_name.max' => 'Business name cannot exceed 255 characters.',
            'business_type.max' => 'Business type cannot exceed 100 characters.',
            'business_type.required' => 'Business type is required.',

            'cac_registration.required' => 'CAC registration number is required.',
            'cac_registration.max' => 'CAC registration number cannot exceed 50 characters.',

            'years_in_business.integer' => 'Years in business must be a number.',
            'years_in_business.min' => 'Years in business cannot be negative.',
            'years_in_business.max' => 'Years in business seems unrealistic.',

            'employee_count.integer' => 'Employee count must be a number.',
            'employee_count.min' => 'Employee count must be at least 1.',
            'employee_count.max' => 'Employee count seems unrealistic.',
            'employee_count.required' => 'Number of employees is required.',

            'annual_revenue.numeric' => 'Annual revenue must be a valid amount.',
            'annual_revenue.min' => 'Annual revenue cannot be negative.',
            'annual_revenue.max' => 'Annual revenue amount is too large.',

            'annual_turnover.numeric' => 'Annual turnover must be a valid amount.',
            'annual_turnover.min' => 'Annual turnover cannot be negative.',
            'annual_turnover.max' => 'Annual turnover amount is too large.',
            'annual_turnover.required' => 'Annual turnover is required.',

            'market_reach.required' => 'Market reach is required.',
            'market_reach.in' => 'Please select a valid market reach option.',

            'description.max' => 'Business description cannot exceed 5000 characters.',

            'website.url' => 'Please enter a valid website URL (e.g., https://example.com).',
            'website.max' => 'Website URL cannot exceed 255 characters.',

            'founded_date.date' => 'Please enter a valid founded date.',
            'founded_date.before_or_equal' => 'Founded date cannot be in the future.',

            'funding_needs.numeric' => 'Funding needs must be a valid amount.',
            'funding_needs.min' => 'Funding needs cannot be negative.',
            'funding_needs.max' => 'Funding needs amount is too large.',

            // Investor fields
            'investor_type.required' => 'Investor type is required.',
            'preferred_sectors.required' => 'Preferred sectors are required.',
            'ticket_sizes.required' => 'Investment sizes are required.',

            // Senator fields
            'district.required' => 'District/Constituency is required.',
            'office_address.required' => 'Office address is required.',
            'official_id.required' => 'Official ID is required.',

            // Institution fields
            'institution_name.required' => 'Institution name is required.',
            'institution_registration.required' => 'Institution registration number is required.',
            'institution_sector.required' => 'Institution sector is required.',

            // Trainer fields
            'bio.required' => 'Professional bio is required.',
            'bio.max' => 'Bio cannot exceed 2000 characters.',
            'linkedin_profile.url' => 'Please enter a valid LinkedIn URL.',
            'expertise_areas.required' => 'Areas of expertise are required.',
            'training_mode.required' => 'Training mode is required.',
        ];
    }

    /**
     * Get custom attributes for validator errors.
     */
    public function attributes(): array
    {
        return [
            'business_name' => 'business name',
            'business_type' => 'business type',
            'years_in_business' => 'years in business',
            'employee_count' => 'number of employees',
            'annual_revenue' => 'annual revenue',
            'annual_turnover' => 'annual turnover',
            'founded_date' => 'founded date',
            'funding_needs' => 'funding needs',
            'cac_registration' => 'CAC registration number',
            'market_reach' => 'market reach',
            'investor_type' => 'investor type',
            'preferred_sectors' => 'preferred sectors',
            'ticket_sizes' => 'investment sizes',
            'district' => 'district',
            'office_address' => 'office address',
            'official_id' => 'official ID',
            'institution_name' => 'institution name',
            'institution_registration' => 'institution registration',
            'institution_sector' => 'institution sector',
            'linkedin_profile' => 'LinkedIn profile',
            'expertise_areas' => 'areas of expertise',
            'training_mode' => 'training mode',
        ];
    }

    /**
     * Configure the validator instance.
     */
    public function withValidator(Validator $validator): void
    {
        $validator->after(function ($validator) {
            // Custom validation logic for cross-field validation
            $this->validateBusinessLogic($validator);
            $this->validateWebsiteFormat($validator);
            $this->validatePhoneFormat($validator);
        });
    }

    /**
     * Validate business logic rules
     */
    private function validateBusinessLogic(Validator $validator): void
    {
        // Validate employee count makes sense for business age
        if ($this->years_in_business && $this->employee_count) {
            if ($this->years_in_business < 1 && $this->employee_count > 50) {
                $validator->errors()->add(
                    'employee_count',
                    'Employee count seems high for a business less than 1 year old.'
                );
            }
        }

        // Validate revenue/turnover makes sense
        $revenue = $this->annual_revenue ?? $this->annual_turnover ?? 0;
        if ($revenue && $this->employee_count) {
            $revenuePerEmployee = $revenue / max($this->employee_count, 1);
            if ($revenuePerEmployee > 10000000) { // 10M per employee seems high
                $fieldName = $this->annual_revenue ? 'annual_revenue' : 'annual_turnover';
                $validator->errors()->add(
                    $fieldName,
                    'Revenue per employee seems unusually high.'
                );
            }
        }
    }

    /**
     * Validate website URL format
     */
    private function validateWebsiteFormat(Validator $validator): void
    {
        if ($this->website && !empty($this->website)) {
            $url = $this->website;
            if (!preg_match('/^https?:\/\//', $url)) {
                $validator->errors()->add(
                    'website',
                    'Website URL must start with http:// or https://'
                );
            }
        }
    }

    /**
     * Validate phone number format
     */
    private function validatePhoneFormat(Validator $validator): void
    {
        if ($this->phone && !empty($this->phone)) {
            $phone = preg_replace('/[^0-9+]/', '', $this->phone);
            if (str_starts_with($phone, '+234') && strlen($phone) !== 14) {
                $validator->errors()->add(
                    'phone',
                    'Nigerian phone numbers should be in format +234XXXXXXXXXX'
                );
            }
        }
    }

    /**
     * Prepare the data for validation.
     */
    protected function prepareForValidation(): void
    {
        // Clean and format phone number
        if ($this->phone) {
            $phone = preg_replace('/[^\d+]/', '', $this->phone);
            $this->merge(['phone' => $phone]);
        }

        // Format website URL
        if ($this->website && !empty($this->website)) {
            $website = $this->website;
            if (!preg_match('/^https?:\/\//', $website)) {
                $website = 'https://' . $website;
            }
            $this->merge(['website' => $website]);
        }

        // Ensure numeric fields are properly typed
        $numericFields = ['years_in_business', 'employee_count', 'annual_revenue', 'annual_turnover', 'funding_needs'];

        foreach ($numericFields as $field) {
            if ($this->has($field) && $this->input($field) !== null && $this->input($field) !== '') {
                $value = $this->input($field);
                if (in_array($field, ['annual_revenue', 'annual_turnover', 'funding_needs'])) {
                    $this->merge([$field => (float) $value]);
                } else {
                    $this->merge([$field => (int) $value]);
                }
            }
        }
    }
}
