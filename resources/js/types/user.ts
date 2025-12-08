
export interface Role {
  id: number;
  name: string;
  guard_name: string;
  description: string | null;
  created_at: string;
  updated_at: string;
}

export interface Permission {
  id: number;
  name: string;
  guard_name: string;
  created_at: string;
  updated_at: string;
}

export type RegistrationStatus = 'pending' | 'verified' | 'suspended' | 'rejected';
export type EducationLevel = 'primary' | 'secondary' | 'diploma' | 'bachelors' | 'masters' | 'phd';

export interface User {
  id: number;
  name: string;
  email: string;
  sector: string | null;
  phone: string | null;
  address: string | null;
  date_of_birth: string | null;
  education_level: EducationLevel | null;
  skills_of_interest: string[] | null;
  state: string | null;
  lga: string | null;
  nin: string | null;
  passport_number: string | null;
  registration_status: RegistrationStatus;
  verified_at: string | null;
  verification_documents: string | null;
  community_rank: number;
  active_roles: string[] | null;
  email_verified_at: string | null;
  created_at: string;
  updated_at: string;
  roles: Role[];
  permissions: Permission[];
  profpix?: string | null;
  firstname?: string | null;
  lastname?: string | null;
}

export interface PaginatedUsers {
  data: User[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
  from: number;
  to: number;
  links: Array<{
    url: string | null;
    label: string;
    active: boolean;
  }>;
}

export interface UserFilterParams {
  search?: string;
  role?: string;
  status?: string;
  registration_status?: string;
  sector?: string;
  state?: string;
  date_from?: string;
  date_to?: string;
  sort_field?: string;
  sort_direction?: 'asc' | 'desc';
  per_page?: number;
  page?: number;
  [key: string]: string | number | undefined;
}


export interface UserFilterOptions {
  statuses: Array<{
    value: string;
    label: string;
  }>;
  registrationStatuses: Array<{
    value: RegistrationStatus;
    label: string;
  }>;
  sectors: string[];
  states: string[];
}

export interface UserStatistics {
  total_users: number;
  verified_users: number;
  unverified_users: number;
  today_users: number;
  pending_users: number;
  suspended_users: number;
  total_roles: number;
}

export interface UserFormData {
  name: string;
  email: string;
  firstname?: string;
  lastname?: string;
  phone?: string;
  password?: string;
  password_confirmation?: string;
  sector?: string;
  address?: string;
  date_of_birth?: string;
  education_level?: EducationLevel;
  skills_of_interest?: string[];
  state?: string;
  lga?: string;
  nin?: string;
  passport_number?: string;
  registration_status?: RegistrationStatus;
  roles?: number[];
}
