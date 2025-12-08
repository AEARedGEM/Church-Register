import { Config } from 'ziggy-js';


export interface User {
    id: number;
    name: string;
    email: string;
    roles?: string[]; // Optional roles array
    permissions?: string[]; // Optional permissions array
    email_verified_at?: string;
}


export interface BasePageProps {
  auth: {
    user: {
      id: number;
      name: string;
      email: string;
      roles?: string[]; // Optional roles array
      permissions?: string[]; // Optional permissions array
    };
  };
  ziggy: Config & { location: string };
  flash?: {
    success?: string;
    error?: string;
  };
}
export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
    };
    ziggy: Config & { location: string };
};
