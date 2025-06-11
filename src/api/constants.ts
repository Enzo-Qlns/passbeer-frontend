const API_URL = import.meta.env.VITE_API_URL;
const DOMAIN = import.meta.env.VITE_DOMAIN;
const PREFIX_BASE_URL = "";

export const API_BASE_URL = `${API_URL}/api/v1`;

export const API_ENDPOINTS = {
  // Auth endpoints
  LOGIN: `${API_BASE_URL}/auth/token`,
  REGISTER: `${API_BASE_URL}/auth/register`,
  CHANGE_PASSWORD: `${API_BASE_URL}/auth/change-password`,
  
  // User endpoints
  USERS: `${API_BASE_URL}/users`,
  USER_ME: `${API_BASE_URL}/users/me`,
  
  // Vault endpoints
  VAULTS: `${API_BASE_URL}/vaults`,
  
  // Password endpoints
  PASSWORDS: `${API_BASE_URL}/passwords`,
  
  // Export endpoints
  EXPORT_CSV: `${API_BASE_URL}/exports/csv`,
  EXPORT_KDBX: `${API_BASE_URL}/exports/kbdx`,
  EXPORT_TXT: `${API_BASE_URL}/exports/txt`,
  
  // Import endpoints
  IMPORT_CSV: `${API_BASE_URL}/imports/csv`,
  IMPORT_KDBX: `${API_BASE_URL}/imports/kbdx`,
  IMPORT_TXT: `${API_BASE_URL}/imports/txt`,
} as const;

export {
    API_URL,
    DOMAIN,
    PREFIX_BASE_URL
};