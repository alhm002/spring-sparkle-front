
import apiClient from './api';

interface User {
  id: number | string;
  username: string;
  email: string;
  firstName?: string;
  lastName?: string;
  roles?: string[];
}

export const userService = {
  getCurrentUserProfile: async () => {
    try {
      const response = await apiClient.get<User>('/users/profile');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  updateProfile: async (userData: Partial<User>) => {
    try {
      const response = await apiClient.put<User>('/users/profile', userData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getAllUsers: async () => {
    try {
      const response = await apiClient.get<User[]>('/users');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getUserById: async (id: string | number) => {
    try {
      const response = await apiClient.get<User>(`/users/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  deleteUser: async (id: string | number) => {
    try {
      const response = await apiClient.delete(`/users/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
