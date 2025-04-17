import { AxiosError } from "axios";

import api from ".";

import { Password, PasswordHistory } from "@/types/password";

const passwordService = {
  /**
   * Get all passwords
   * @returns {Array<Password> | AxiosError}
   */
  getPasswords: async (): Promise<Array<Password> | AxiosError> =>
    await api.get("/passwords"),

  /**
   * Get a password by id
   * @param pw_id
   * @returns {Password | AxiosError}
   */
  getPassword: async (
    pw_id: Password["id"]
  ): Promise<{ password: Password; history: PasswordHistory } | AxiosError> =>
    await api.get(`/passwords/${pw_id}`),

  /**
   * Delete password by id
   * @param pw_id
   * @returns {void}
   */
  deletePassword: async (pw_id: Password["id"]): Promise<void> =>
    await api.delete(`/passwords/${pw_id}`),

  /**
   * Add password
   * @param pw_id Password id
   * @returns {Password | AxiosError}
   */
  addPassword: async (password: Password): Promise<Password | AxiosError> =>
    await api.post("/passwords", password),

  /**
   * Update password
   * @param pw_id Password id
   * @param password Password object
   * @returns {Password | AxiosError}
   */
  updatePassword: async (
    pw_id: Password["id"],
    password: Password
  ): Promise<Password | AxiosError> =>
    await api.put(`/passwords/${pw_id}`, password),

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
