import { create } from 'zustand';
import { axiosInstance } from '../lib/axiosInstance';

interface UserSchema {
    _id: string;
    email: string;
    password: string;
    name: string;
    lastLogin: Date;
    isVerified: boolean;
    createdAt: Date;
}

interface StoreSchema {
    user: UserSchema | null;
    isAuthenticated: boolean;
    error: string | null;
    isLoading: boolean;
    isCheckingAuth: boolean;
    message: string | null;
    signup: ( email: string, password: string, name: string, confirmPassword: string) => void;
    login: ( email: string, password: string) => void;
    verifyEmail: (verificationToken: string) => void;
    checkAuth: () => void;
    forgotPassword: (email: string) => void;
    resetPassword: (token: string, password: string) => void;
}

export const useStore = create<StoreSchema>((set) => ({
    user: null,
    isAuthenticated: false,
    error: null,
    isLoading: false,
    isCheckingAuth: true,
    message: null,

    signup: async( name, email, password, confirmPassword ) => {
        set({ isLoading: true, error: null })
        try {
            const response = await axiosInstance.post('/signup', {
                email: email,
                password: password,
                name: name,
                confirmPassword: confirmPassword
            });
            set({ user: response.data.user, isAuthenticated: true, isLoading: false });
        } catch (error: any) {
            set({ error: error.response.data.message || "Error signing Up", isLoading: false });
            throw error;
        }
    },

    login: async( email, password ) => {
        set({ isLoading: true, error: null })
        try {
            const response = await axiosInstance.post('/login', {
                email,
                password,
            });
            set({ user: response.data.user, isAuthenticated: true, isLoading: false });
        } catch (error: any) {
            set({ error: error.response.data.message || "Error loging In", isLoading: false });
            throw error;
        }
    },

    logout: async() => {
        set({ isLoading: true, error: null })
        try {
            await axiosInstance.post('/logout');
            set({ user: null, isAuthenticated: false, isLoading: false });
        } catch (error: any) {
            set({ error: error.response.data.message || "Error loging Out", isLoading: false });
            throw error;
        }
    },

    verifyEmail: async(verificationToken) => {
        set({ isLoading: true, error: null })
        try {
            const response = await axiosInstance.post('/verify-email', {
                verificationToken
            });
            set({ user: response.data.user, isAuthenticated: true, isLoading: false });
            return response.data;
        } catch (error: any) {
            set({ error: error.response.data.message || "Error verifying email", isLoading: false });
        }
    },

    checkAuth: async() => {
        set({ isCheckingAuth: true, error: null })
        try {
            const response = await axiosInstance.get('/check-auth');
            set({ user: response.data.user, isAuthenticated: true, isCheckingAuth: false });
        } catch (error: any) {
            set({ error: error.response.data.message, isAuthenticated: false });
        }
    },

    forgotPassword: async(email) => {
        set({ isLoading: true, error: null })
        try {
            const response = await axiosInstance.post('/forgot-password', {
                email
            });
            set({ message: response.data.message, isLoading: false });
        } catch (error: any) {
            set({ error: error.response.data.message || "Error sending reset password email", isLoading: false });
            throw error;
        }
    },

    resetPassword: async( token, password ) => {
        set({ isLoading: true, error: null })
        try {
            const response = await axiosInstance.post(`/reset-password/${token}`, {
                password
            });
            set({ message: response.data.message, isLoading: false });
        } catch (error: any) {
            set({ error: error.response.data.message || "Error reseting password", isLoading: false });
            throw error;
        }
    }
}))