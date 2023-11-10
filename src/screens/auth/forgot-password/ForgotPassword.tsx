import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';

import { useForm } from 'react-hook-form';

import AuthLayout from '../../../layout/AuthLayout';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

import { Colors } from '../../../styles/custom';
import { emailRules } from '../../../lib/rules';

import { AuthStackNavigationProp } from '../../../lib/types';
import AuthOverlayHeader from '../../../components/general/AuthOverlayHeader';
import { forgotPass } from '../../../api-clients/apiServices';

interface forgotPassword {
  email: string;
}

const ForgotPassword = ({navigation,}: {navigation: AuthStackNavigationProp;}) => {
  const [isLoading, setIsLoading] = useState(false)
  const [servorError, setServorError] = useState<any>()


  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<forgotPassword>({
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (data: forgotPassword) => {
    console.log(data);
    try {
      setIsLoading(true)
      const res = await forgotPass({ email: data.email })
      navigation.navigate('process-otp',{email:data.email});
    } catch (err) {
      const error = err as Error; // Type assertion
      console.log(error.message,);
      setServorError(error.message);
    } finally {
      setIsLoading(false)
      reset()
      setTimeout(() => {
        setServorError('')
      }, 3000)
    }
  };

  return (
    <AuthLayout>
      <View style={{ flex: 1, marginVertical: 40 }}>
        <AuthOverlayHeader
          text="Enter your email, phone or username and we’ll send you a link to get
          back into your account"
        />
        <Input
          errors={errors}
          name="email"
          rules={emailRules}
          control={control}
          placeholder="Enter your email"
        />
        <View style={[styles.mt4]}>
          {servorError &&
            <Text style={styles.error}>
              {servorError}
            </Text>
          }
          <Button
            isLoading={isLoading}
            roundedFull={true}
            onPress={handleSubmit(onSubmit)}
            gradient={true}
            style={{ paddingHorizontal: 60 }}
            text="Next"
          />
        </View>
      </View>
      <View style={{ width: '100%' }}>
        <Button
          gradient={true}
          text="Back to login"
          onPress={() => navigation.navigate('login')}
        />
      </View>
    </AuthLayout>
  );
};

const styles = StyleSheet.create({
  text: {
    marginTop: 8,
    color: Colors.DarkGray,
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
});

export default ForgotPassword;
