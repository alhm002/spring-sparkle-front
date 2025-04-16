
import apiClient from './api';

interface LoginRequest {
  username: string;
  password: string;
}

interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
}

interface AuthResponse {
  token: string;
  type: string;
  id: string | number;
  username: string;
  email: string;
  roles: string[];
}

export const authService = {
  login: async (loginRequest: LoginRequest) => {
    try {
      const response = await apiClient.post<AuthResponse>('/auth/signin', loginRequest);
      if (response.data.token) {
        localStorage.setItem('user', JSON.stringify(response.data));
        localStorage.setItem('token', response.data.token);
      }
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  register: async (registerRequest: RegisterRequest) => {
    try {
      const response = await apiClient.post<{ message: string }>('/auth/signup', registerRequest);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  },

  getCurrentUser: () => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      return JSON.parse(userStr);
    }
    return null;
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  }
};
