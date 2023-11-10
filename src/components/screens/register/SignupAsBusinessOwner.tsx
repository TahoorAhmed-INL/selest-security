import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';

import {
  AtSign,
  Lock,
  Phone,
  User,
  MapPin,
  CreditCard,
  Building2,
  ShieldQuestion,
} from 'lucide-react-native';

import { useForm } from 'react-hook-form';

import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

import { Colors } from '../../../styles/custom';

import {
  emailRules,
  passwordRules,
  phoneRules,
  requiredRule,
} from '../../../lib/rules';

import { RegisterAsBusinessOwner } from '../../../lib/types';
import { useAppContext } from '../../../store/AppContext';
import { api } from '../../../api';
import { capitalizeFirstLetter } from '../../../lib/helpers';

const SignUpAsBusinessOwner = ({ signUpAs, setIsSignUpAs }: { signUpAs: string, setIsSignUpAs: any }) => {


  const { dispatch } = useAppContext()
  const [isLoading, setIsLoading] = useState(false)
  const [isPassMatched, setIsPassMatched] = useState(false)
  const [servorError, setServorError] = useState<any>()




  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterAsBusinessOwner>({
    defaultValues: {
      businessName: '',
      representative: '',
      businessId: '',
      businessType: '',
      address: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: RegisterAsBusinessOwner) => {
    console.log(data, " (*(*(*(*(*");
    console.log(signUpAs, "role **&*&*&*&");
    if (!signUpAs) {
      setIsSignUpAs(true)
    } else {
      setIsLoading(true)
      if (data.password !== data.confirmPassword) {
        setIsLoading(false)
        setIsPassMatched(true)
        return;
      }
      try {
        const busines = {
          email: data.email, //max 100 char
          contact: data.phone, // max 20 char
          address: data.address, // max 100 char
          password: data.password, // max 20 char
          businessRepresentative: data.representative,
          businessId: data.businessId,
          businessType: data.businessType,
          businessName: data.businessName
        }
        const res = await api(`/api/auth/signup?role=${signUpAs}`, "POST", busines)
        console.log(res)
        dispatch({ type: 'LOGIN', payload: { userType: res?.role, token: res.token ,id:res.id} });

      } catch (err) {
        const error = err as Error; // Type assertion
        console.log(error, "signUp guadr function catch error*************");
        setServorError(error.message);
      } finally {
        setIsLoading(false)
      }

    }

  };
  console.log(signUpAs, "asdasdasdasd(*(*(*(*(*")
  return (
    <>
      <Input
        errors={errors}
        name="representative"
        rules={requiredRule}
        icon={<User size={20} color={Colors.DarkGray} />}
        control={control}
        placeholder="Business representative"
      // editable
      // eyeBg
      />
      <Input
        errors={errors}
        name="businessName"
        rules={requiredRule}
        icon={<Building2 size={20} color={Colors.DarkGray} />}
        control={control}
        placeholder="Business name"
      />
      <Input
        errors={errors}
        name="businessId"
        rules={requiredRule}
        icon={<CreditCard size={20} color={Colors.DarkGray} />}
        control={control}
        placeholder="Business ID"
      />
      <Input
        errors={errors}
        name="businessType"
        rules={requiredRule}
        icon={<ShieldQuestion size={20} color={Colors.DarkGray} />}
        control={control}
        placeholder="Business Type"
      />
      <Input
        errors={errors}
        name="address"
        rules={requiredRule}
        icon={<MapPin size={20} color={Colors.DarkGray} />}
        control={control}
        placeholder="Enter your location"
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
  mt4: {
    marginTop: 18,
  },
  error: {
    color: '#ff4e39',
    fontSize: 10,
    paddingLeft: 4,
    marginBottom: 4,
  },
  signUpText: {
    position: 'absolute',
    bottom: -90,
    width: '100%',
  },
});

export default SignUpAsBusinessOwner;
