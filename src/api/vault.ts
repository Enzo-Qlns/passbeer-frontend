import { API_ENDPOINTS } from './constants';
import { Vault, VaultCreate, VaultUpdate } from '../types/api';
import api from './index';

export const getVaults = async (): Promise<Vault[]> => {
  const response = await api.get<Vault[]>(API_ENDPOINTS.VAULTS);
  return response.data;
};

export const getVault = async (id: number): Promise<Vault> => {
  const response = await api.get<Vault>(`${API_ENDPOINTS.VAULTS}/${id}`);
  return response.data;
};

export const createVault = async (data: VaultCreate): Promise<Vault> => {
  const response = await api.post<Vault>(API_ENDPOINTS.VAULTS, data);
  return response.data;
};

export const updateVault = async (id: number, data: VaultUpdate): Promise<Vault> => {
  const response = await api.put<Vault>(`${API_ENDPOINTS.VAULTS}/${id}`, data);
  return response.data;
};

export const deleteVault = async (id: number): Promise<void> => {
  await api.delete(`${API_ENDPOINTS.VAULTS}/${id}`);
};

const vaultService = {
  getVaults,
  getVault,
  createVault,
  updateVault,
  deleteVault,
};

export default vaultService; 