import { AxiosError } from "axios";

import api from ".";

import { Password, PasswordHistory } from "@/types/password";
import { API_ENDPOINTS } from './constants';
import { PasswordCreate, PasswordUpdate } from '../types/api';

export const getPasswords = async (): Promise<Password[]> => {
  const response = await api.get<Password[]>(API_ENDPOINTS.PASSWORDS);
  return response.data;
};

export const getPassword = async (id: number): Promise<Password> => {
  const response = await api.get<Password>(`${API_ENDPOINTS.PASSWORDS}/${id}`);
  return response.data;
};

export const createPassword = async (data: PasswordCreate): Promise<Password> => {
  const response = await api.post<Password>(API_ENDPOINTS.PASSWORDS, data);
  return response.data;
};

export const updatePassword = async (id: number, data: PasswordUpdate): Promise<Password> => {
  const response = await api.put<Password>(`${API_ENDPOINTS.PASSWORDS}/${id}`, data);
  return response.data;
};

export const deletePassword = async (id: number): Promise<void> => {
  await api.delete(`${API_ENDPOINTS.PASSWORDS}/${id}`);
};

export const getPasswordHistory = async (id: number): Promise<Password[]> => {
  const response = await api.get<Password[]>(`${API_ENDPOINTS.PASSWORDS}/${id}/history`);
  return response.data;
};

export const getVaultPasswords = async (vaultId: number): Promise<Password[]> => {
  const response = await api.get<Password[]>(`${API_ENDPOINTS.VAULTS}/${vaultId}/passwords`);
  return response.data;
};

const passwordService = {
  getPasswords,
  getPassword,
  createPassword,
  updatePassword,
  deletePassword,
  getPasswordHistory,
  getVaultPasswords,

  /**
   * Get password share
   * @param pw_id Password id
   * @returns {Password | AxiosError}
   */
  getPasswordShare: async (
    pw_id: Password["id"]
  ): Promise<{ password: Password; history: PasswordHistory } | AxiosError> =>
    await api.get(`/passwords/${pw_id}/share`),

  /**
   * Add password share
   * @param pw_id Password id
   * @returns {Password | AxiosError}
   */
  addPasswordShare: async (
    pw_id: Password["id"]
  ): Promise<Password | AxiosError> =>
    await api.post("/passwords/share", pw_id),

  /**
   * Get generated password
   * @returns {Password | AxiosError}
   */
  getPasswordGenerate: async (): Promise<Password | AxiosError> =>
    await api.get("/passwords/generate"),

  /**
   * Import passwords
   * @param passwords Array of Password objects
   * @returns {void}
   */
  importPasswords: async (passwords: Array<Password>): Promise<void> =>
    await api.post("/passwords/import", passwords),

  /**
   * Export passwords
   * @returns {Array<Password> | AxiosError}
   */
  exportPasswords: async (): Promise<Array<Password> | AxiosError> =>
    await api.get("/passwords/export"),
};

export default passwordService;
