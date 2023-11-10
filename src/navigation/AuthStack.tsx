import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {
  LoginScreen,
  ForgotPasswordScreen,
  ProcessOTP,
  ConfirmPassword,
  SignUpScreen,
} from '../screens/auth';

import {AuthStackParamList} from '../lib/types';

const Stack = createNativeStackNavigator<AuthStackParamList>();

const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="login">
      <Stack.Screen name="login" component={LoginScreen} />
      <Stack.Screen name="forgot-password" component={ForgotPasswordScreen} />
      <Stack.Screen name="process-otp" component={ProcessOTP} />
      <Stack.Screen name="confirm-password" component={ConfirmPassword} />
      <Stack.Screen name="sign-up" component={SignUpScreen} />
    </Stack.Navigator>
  );
};

export default AuthStack;
