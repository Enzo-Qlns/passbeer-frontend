type Result = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: Array<any>;
  total: number;
};

type ApiResponse = {
  result: Result;
  error: string | null;
};

export type { ApiResponse };

export interface User {
  id: number;
  email: string;
  is_active: boolean;
  is_superuser: boolean;
  full_name: string | null;
}

export interface UserCreate {
  email: string;
  password: string;
  full_name?: string;
}

export interface UserUpdate {
  email?: string;
  full_name?: string;
  password?: string;
}

export interface Vault {
  id: number;
  name: string;
  description: string | null;
  user_id: number;
}

export interface VaultCreate {
  name: string;
}

export interface VaultUpdate {
  name?: string;
  description?: string;
}

export interface Password {
  id: number;
  name: string;
  username: string;
  password: string;
  url: string | null;
  notes: string | null;
  vault_id: number;
  created_at: string;
  updated_at: string;
}

export interface PasswordCreate {
  name: string;
  password: string;
  comment: string;
  url: string;
  vault_id: number;
}

export interface PasswordUpdate {
  name?: string;
  username?: string;
  password?: string;
  comment?: string;
  url?: string;
  notes?: string;
  vault_id?: number;
}

export interface Token {
  access_token: string;
  token_type: string;
}

export interface PasswordChangeRequest {
  current_password: string;
  new_password: string;
}

export interface ApiError {
  detail: string;
}
