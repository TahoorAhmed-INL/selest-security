import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';

import { useForm } from 'react-hook-form';

import AuthLayout from '../../../layout/AuthLayout';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

import { Colors } from '../../../styles/custom';
import { defaultRules, passwordRules } from '../../../lib/rules';

import { AuthStackNavigationProp } from '../../../lib/types';
import AuthOverlayHeader from '../../../components/general/AuthOverlayHeader';
import { resetPass } from '../../../api-clients/apiServices';
import { capitalizeFirstLetter } from '../../../lib/helpers';
import { RouteProp, useRoute } from '@react-navigation/native';
import { axiosInstance } from '../../../api';

interface ConfirmPasswordProps {
  newPassword: string;
  confirmPassword: string;
}
interface Params {
  token: string;

}

const ConfirmPassword = ({ navigation, }: { navigation: AuthStackNavigationProp; }) => {

  const [isLoading, setIsLoading] = useState(false)
  const [isPassMatched, setIsPassMatched] = useState(false)
  const [servorError, setServorError] = useState<any>()
  const { params } = useRoute<RouteProp<Record<string, Params>, string>>();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ConfirmPasswordProps>({
    defaultValues: {
      newPassword: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: ConfirmPasswordProps) => {
    console.log(data);
    if (data.newPassword !== data.confirmPassword) {
      setIsPassMatched(true)
      return;
    } else {

      try {
        setIsLoading(true)
        const userInfo = {
          password: data?.newPassword,
        }
        // const res = await resetPass(userInfo)
        const res = await axiosInstance.post(`/api/auth/reset-password`, userInfo, {
          headers: {
            Authorization: params.token
          },
        });
        console.log(res)
        navigation.navigate('login');
      } catch (err) {
        const error = err as Error; // Type assertion
        console.log(error.message, "login function catch error*************");
        setServorError(error.message);
      } finally {
        setIsLoading(false)
      }
    }
  };

  return (
    <AuthLayout>
      <View style={{ flex: 1 }}>
        <AuthOverlayHeader />
        <Input
          label="Enter your new password"
          errors={errors}
          type="password"
          name="newPassword"
          rules={passwordRules}
          secureTextEntry={true}
          control={control}
          placeholder="Enter password"
        />
        <Input
          errors={errors}
          name="confirmPassword"
          type="password"
          secureTextEntry={true}
          rules={passwordRules}
          control={control}
          placeholder="Confirm Password"
        />
        {isPassMatched &&
          <Text style={styles.error}>
            {capitalizeFirstLetter("Password do not match.")}
          </Text>
        }
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
            text="Done"
          />
        </View>
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
    marginTop: 1,
  },
  mt4: {
    marginTop: 18,
  },
  signUpText: {
    position: 'absolute',
    bottom: -90,
    width: '100%',
  },
});

export default ConfirmPassword;
