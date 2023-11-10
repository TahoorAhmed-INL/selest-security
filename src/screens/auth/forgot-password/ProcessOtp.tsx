import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';

import { useForm } from 'react-hook-form';

import AuthLayout from '../../../layout/AuthLayout';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

import { Colors, UI } from '../../../styles/custom';
import { defaultRules, otpRule } from '../../../lib/rules';

import { AuthStackNavigationProp } from '../../../lib/types';
import AuthOverlayHeader from '../../../components/general/AuthOverlayHeader';
import { RouteProp, useRoute } from '@react-navigation/native';
import { otpVerify } from '../../../api-clients/apiServices';

interface processOTP {
  otp: string;
}
interface Params {
  email: string;

}

const ProcessOTP = ({ navigation }: { navigation: AuthStackNavigationProp }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<processOTP>({
    defaultValues: {
      otp: '',
    },
  });
  const [isLoading, setIsLoading] = useState(false)
  const [servorError, setServorError] = useState<any>()

  const { params } = useRoute<RouteProp<Record<string, Params>, string>>();


  const onSubmit = async (data: processOTP) => {
    console.log(data);

    try {
      setIsLoading(true)
      const userInfo = {
        email: params.email,
        otp: data?.otp
      }
      const res = await otpVerify(userInfo)
      navigation.navigate('confirm-password', { token: res });
    } catch (err) {
      const error = err as Error; // Type assertion
      console.log(error.message, "otp verification submit function function catch error*************");
      setServorError(error.message);
    } finally {
      setIsLoading(false)
    }

  };

  return (
    <AuthLayout>
      <View style={[UI.flexFull]}>
        <AuthOverlayHeader />
        <Input
          errors={errors}
          name="otp"
          label="Enter the received code"
          rules={otpRule}
          control={control}
          placeholder="Enter your code"
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
});

export default ProcessOTP;
