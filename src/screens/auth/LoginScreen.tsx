import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View } from 'react-native';

import { Link } from '@react-navigation/native';

import { useForm } from 'react-hook-form';
import { Lock, User } from 'lucide-react-native';

import AuthLayout from '../../layout/AuthLayout';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';

import { Colors, UI, fontSizes } from '../../styles/custom';
import { LoginFormData } from '../../lib/types';
import { passwordRules, emailRules } from '../../lib/rules';
import { useAppContext } from '../../store/AppContext';
import AuthOverlayHeader from '../../components/general/AuthOverlayHeader';
import { Svg, Path } from 'react-native-svg';
import axios from 'axios';
import { api } from '../../api';
import { capitalizeFirstLetter } from '../../lib/helpers';

const LoginScreen = () => {
  const { dispatch } = useAppContext();
  const [isLoading, setIsLoading] = useState(false)
  const [servorError, setServorError] = useState<any>()
  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    console.log({ ...data }, "user dataas");
    try {
      setIsLoading(true)
      const res = await api('/api/auth/login', 'POST', data)
      console.log(res)
      dispatch({ type: 'LOGIN', payload: { userType: res?.role, token: res.token, id: res.id } });

    } catch (err) {
      const error = err as Error; // Type assertion
      console.log(error.message, "login function catch error*************");
      setServorError(error.message);
    } finally {
      setIsLoading(false)
      reset()
      setTimeout(() => {
        setServorError('')
      }, 3000)
    }
  };

  const onSubmit2 = (data: LoginFormData) => {
    console.log(data);
    dispatch({ type: 'LOGIN', payload: { userType: 'guard' } });
  };



  return (
    <AuthLayout>
      <View style={[UI.flexFull]}>
        <View>
          <AuthOverlayHeader text="Enter your email address and password to login to your account" />
          <Input
            errors={errors}
            name="email"
            rules={emailRules}
            control={control}
            icon={<User size={20} color={Colors.DarkGray} fill={Colors.DarkGray} />}
            placeholder="Email"
          />
          <Input
            errors={errors}
            name="password"
            rules={passwordRules}
            control={control}
            secureTextEntry
            type="password"
            icon={
              <Svg width="20" height="20" viewBox="0 0 17 22" fill="none" >
                <Path d="M8.5 16.7619C9.06359 16.7619 9.60409 16.5412 10.0026 16.1482C10.4011 15.7553 10.625 15.2224 10.625 14.6667C10.625 14.111 10.4011 13.578 10.0026 13.1851C9.60409 12.7922 9.06359 12.5714 8.5 12.5714C7.93641 12.5714 7.39591 12.7922 6.9974 13.1851C6.59888 13.578 6.375 14.111 6.375 14.6667C6.375 15.2224 6.59888 15.7553 6.9974 16.1482C7.39591 16.5412 7.93641 16.7619 8.5 16.7619ZM14.875 7.33333C15.4386 7.33333 15.9791 7.55408 16.3776 7.94702C16.7761 8.33995 17 8.87288 17 9.42857V19.9048C17 20.4605 16.7761 20.9934 16.3776 21.3863C15.9791 21.7793 15.4386 22 14.875 22H2.125C1.56141 22 1.02091 21.7793 0.622398 21.3863C0.223883 20.9934 0 20.4605 0 19.9048V9.42857C0 8.87288 0.223883 8.33995 0.622398 7.94702C1.02091 7.55408 1.56141 7.33333 2.125 7.33333H3.1875V5.2381C3.1875 3.84887 3.74721 2.51654 4.74349 1.5342C5.73978 0.551869 7.09104 0 8.5 0C9.19765 0 9.88846 0.135487 10.533 0.398726C11.1775 0.661965 11.7632 1.0478 12.2565 1.5342C12.7498 2.0206 13.1411 2.59805 13.4081 3.23356C13.6751 3.86908 13.8125 4.55022 13.8125 5.2381V7.33333H14.875ZM8.5 2.09524C7.65462 2.09524 6.84387 2.42636 6.2461 3.01576C5.64832 3.60516 5.3125 4.40456 5.3125 5.2381V7.33333H11.6875V5.2381C11.6875 4.40456 11.3517 3.60516 10.7539 3.01576C10.1561 2.42636 9.34538 2.09524 8.5 2.09524Z" fill={Colors.DarkGray} />
              </Svg>
            }
            placeholder="Password"
          />
          <View style={{ marginTop: 22 }}>
            {servorError &&
              <Text style={styles.error}>
                {servorError}
              </Text>
            }
            <Button
              isLoading={isLoading}
              roundedFull
              onPress={handleSubmit(onSubmit)}
              gradient={true}
              text="Log in"
            />
          </View>
          <View style={{ marginTop: 20 }}>
            <Button
              isLoading={false}
              roundedFull
              onPress={handleSubmit(onSubmit2)}
              gradient={true}
              text="Log in as Guard"
            />
          </View>
          <View style={UI.relative}>
            <Link
              to="/forgot-password"
              style={[
                UI.textCenter,
                styles.text,
                styles.paddingY,
                fontSizes.pri,
                { textDecorationLine: 'underline' },
              ]}>
              Forgot your password?
            </Link>
          </View>
        </View>
      </View>
      <View style={[UI.alignCenter, { marginTop: 20 }]}>
        <Text
          style={[
            UI.textCenter,
            styles.text,
            UI.flexFull,
            styles.signUpText,
            fontSizes.pri,
          ]}>
          Don't have account?
          <Link to="/sign-up" style={[UI.textBrown]}>
            Signup
          </Link>
        </Text>
      </View>
    </AuthLayout>
  );
};

const styles = StyleSheet.create({
  text: {
    marginTop: 8,
    color: Colors.DarkBlue,
  },
  error: {
    color: '#ff4e39',
    fontSize: 10,
    paddingLeft: 4,
    marginBottom: 4,
  },
  mt4: {
    marginTop: 18,
  },
  signUpText: {
    width: '100%',
  },
  paddingY: {
    paddingVertical: 3,
  },
});

export default LoginScreen;
