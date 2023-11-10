import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';

import { AtSign, Lock, Phone, MapPinIcon } from 'lucide-react-native';

import { useForm } from 'react-hook-form';

import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

import { Colors } from '../../../styles/custom';

import { defaultRules, emailRules, passwordRules, phoneRules } from '../../../lib/rules';

import { RegisterAsIndividual } from '../../../lib/types';
import { api } from '../../../api';
import { useAppContext } from '../../../store/AppContext';
import { capitalizeFirstLetter } from '../../../lib/helpers';

const SignUpIndividual = ({ signUpAs, setIsSignUpAs }: { signUpAs: string, setIsSignUpAs: any }) => {

  const { dispatch } = useAppContext()
  const [isLoading, setIsLoading] = useState(false)
  const [isPassMatched, setIsPassMatched] = useState(false)
  const [servorError, setServorError] = useState<any>()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterAsIndividual>({
    defaultValues: {
      email: '',
      phone: '',
      password: '',
      address: '',
      confirmPassword: '',
    },
  });


  const onSubmit = async (data: RegisterAsIndividual) => {
    console.log(data, "indivisual signup data");
    console.log(signUpAs, "role **&*&*&*&");
    if (signUpAs == '') {
      setIsSignUpAs(true)
    } else {
      if (data.password !== data.confirmPassword) {
        setIsPassMatched(true)
        return;
      }
      try {
        setIsLoading(true)
        const userInfo = {
          name: data.name, //max 50 char
          email: data.email, //max 100 char
          contact: data.phone, // max 20 char
          address: data.address, // max 100 char
          password: data.password
        }
        console.log(userInfo, "post userInfo data *&*&*&*&*&*&")
        const res = await api(`/api/auth/signup?role=${signUpAs}`, "POST", userInfo)
        console.log(res)
        dispatch({ type: 'LOGIN', payload: { userType: res?.role, token: res.token,id:res.id } });

      } catch (err) {
        const error = err as Error; // Type assertion
        console.log(error.message, "indiviual signUp function catch error*************");
        setServorError(error.message);
      } finally {
        setIsLoading(false)
      }

    }
  };

  return (
    <>
      <Input
        errors={errors}
        name="name"
        rules={defaultRules({ fieldName: "Address" })}
        icon={<MapPinIcon size={20} color={Colors.DarkGray} />}
        control={control}
        placeholder="Enter your name"
      />
      <Input
        errors={errors}
        name="email"
        rules={emailRules}
        icon={<AtSign size={20} color={Colors.DarkGray} />}
        control={control}
        placeholder="Enter your email"
      />
      <Input
        errors={errors}
        name="phone"
        rules={phoneRules}
        icon={<Phone size={20} color={Colors.DarkGray} />}
        control={control}
        placeholder="Enter your phone"
      />
      <Input
        errors={errors}
        name="address"
        rules={defaultRules({ fieldName: "Address" })}
        icon={<MapPinIcon size={20} color={Colors.DarkGray} />}
        control={control}
        placeholder="Enter your address"
      />
      <Input
        errors={errors}
        name="password"
        type="password"
        secureTextEntry={true}
        rules={passwordRules}
        icon={<Lock size={20} color={Colors.DarkGray} />}
        control={control}
        placeholder="Enter password"
      />
      <Input
        errors={errors}
        name="confirmPassword"
        type="password"
        secureTextEntry={true}
        rules={passwordRules}
        icon={<Lock size={20} color={Colors.DarkGray} />}
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
          text="Sign Up"
        />
      </View>
    </>
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
  signUpText: {
    position: 'absolute',
    bottom: -90,
    width: '100%',
  },
});

export default SignUpIndividual;
