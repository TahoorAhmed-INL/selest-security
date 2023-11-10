import {NativeStackNavigationProp} from '@react-navigation/native-stack';
export interface LoginFormData {
  email: string;
  password: string;
}
export interface errorType {
  status: {
    code: number;
    success: boolean;
  };
  data: null | [];
  error: string;
  message: null | string;
}
export interface RegisterAsIndividual {
  email: string;
  phone: string;
  address: string;
  name: string;
  password: string;
  confirmPassword: string;
}

export interface RegisterAsGuard {
  name: string;
  licenseNo: string;
  address: string;
  email: string;
  phone: string;
  city: string;
  homeCoordinates: string;
  password: string;
  confirmPassword: string;
}

export interface RegisterAsBusinessOwner {
  representative: string;
  businessName: string;
  businessId: string;
  address: string;
  businessType: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

export interface editProfileGuard {
  name: string;
  phone: string;
  email: string;
  address: string;
  // city: string;
  gender: string;
  licenseNumber: string;
  qualification: string;
  previousExperience: string;
  yearsOfExperience: number | string;
  oldPassword: string;
  password?: string;
  confirmPassword?: string;
}
export interface editProfileIndividual {
  name: string;
  phone: string;
  email: string;
  address: string;
  oldPassword: string;
  password?: string;
  confirmPassword?: string;
}
export interface editProfileBusinessOwner {
  representative: string;
  businessName: string;
  businessId: string;
  address: string;
  businessType: string;
  email: string;
  phone: string;
  oldPassword: string;
  password: string;
  confirmPassword: string;
}

// STACK NAVIGATION TYPES

type UserStackParamList = {
  'user-dashboard': undefined;
  'hire-guard': undefined;
  'payment-info': undefined;
  'terms-and-conditions': undefined;
  'your-guards': {
    orderId: number | string;
    completed?: boolean;
  };
  'current-order': {
    orderId: number | string;
    completed?: boolean;
  };
  'previous-order': undefined;
  'order-detail': undefined;
  'job-description': undefined;
  'edit-job': any | undefined;
  'guard-profile': {guardId: number | string};
  'user-profile': undefined;
  'edit-profile': undefined;
  map: {dragable: boolean};
  feedback: {
    orderId: number | string;
    userId: number | string;
    completed?: boolean;
  };
  support: undefined;
  chat: undefined;
};

type GuardStackParamList = {
  'user-dashboard': undefined;
  'new-jobs': undefined;
  'my-hours': undefined;
  'terms-and-conditions': undefined;
  'user-detail': undefined;
  'your-guards': {
    orderId: number | string;
    completed?: boolean;
  };
  'current-order': undefined;
  'previous-order': undefined;
  'order-detail': undefined;
  'job-description': undefined;
  'user-profile': undefined;
  'edit-profile': undefined;
  map: undefined;
  feedback: undefined;
  support: undefined;
  chat: undefined;
};

type AuthStackParamList = {
  login: undefined;
  'forgot-password': undefined;
  'process-otp': {
    email: string;
  };
  'confirm-password': {
    token: string;
  };
  'sign-up': undefined;
};

type GuardStackNavigationProp = NativeStackNavigationProp<GuardStackParamList>;
type UserStackNavigationProp = NativeStackNavigationProp<UserStackParamList>;
type AuthStackNavigationProp = NativeStackNavigationProp<AuthStackParamList>;

export type {
  AuthStackNavigationProp,
  UserStackNavigationProp,
  GuardStackNavigationProp,
  UserStackParamList,
  AuthStackParamList,
  GuardStackParamList,
};
