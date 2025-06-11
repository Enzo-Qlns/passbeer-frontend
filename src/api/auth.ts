import { API_ENDPOINTS } from './constants';
import { Token, PasswordChangeRequest, User } from '../types/api';
import api from './index';

export const login = async (email: string, password: string): Promise<Token> => {
  const formData = new FormData();
  formData.append('username', email);
  formData.append('password', password);

  const response = await api.post<Token>(API_ENDPOINTS.LOGIN, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};

export const changePassword = async (data: PasswordChangeRequest): Promise<void> => {
  await api.post(API_ENDPOINTS.CHANGE_PASSWORD, data);
};

export const getCurrentUser = async (): Promise<User> => {
  const response = await api.get<User>(API_ENDPOINTS.USER_ME);
  return response.data;
};

export const register = async (email: string, password: string): Promise<void> => {
  const response = await api.post(API_ENDPOINTS.REGISTER, { email, password });
  return response.data;
};

const authService = {
  login,
  changePassword,
  getCurrentUser,
  register,
};

export default authService;