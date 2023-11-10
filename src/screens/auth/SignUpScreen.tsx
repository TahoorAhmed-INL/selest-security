import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Image,
  ImageSourcePropType,
  SafeAreaView,
  ScrollView,
  useWindowDimensions,
  StatusBar,
  Text,
} from 'react-native';

import { Link } from '@react-navigation/native';

import { Colors, UI, fontSizes } from '../../styles/custom';

import SignUpIndividual from '../../components/screens/register/SignupAsIndividial';
import SignUpAsGuard from '../../components/screens/register/SignupAsGuard';
import SignUpAsBusinessOwner from '../../components/screens/register/SignupAsBusinessOwner';

import { Logo } from '../../assets/images';
import Dropdown from '../../components/ui/Dropdown';
import { capitalizeFirstLetter } from '../../lib/helpers';

const SignUpScreen = () => {
  const { height } = useWindowDimensions();
  const statusBarHeight = StatusBar.currentHeight || 0;

  const [signUpAs, setSignUpAs] = useState('');
  const [isSignUpAs, setIsSignUpAs] = useState(false);

  const [items, setItems] = useState([
    { label: 'Guard', value: 'guard' },
    { label: 'Individual', value: 'individual' },
    { label: 'Business Owner', value: 'business' },
  ]);

  useEffect(() => {
    setIsSignUpAs(false)
  }, [signUpAs])

  return (
    <SafeAreaView
      style={[
        UI.flexFull,
        {
          // backgroundColor: '#fff',
          height: height - statusBarHeight,
        },
      ]}>
      <ScrollView
        nestedScrollEnabled={true}
        keyboardShouldPersistTaps="handled"
        contentInsetAdjustmentBehavior="automatic">
        <View
          style={[UI.paddingX, UI.flexFull, UI.paddingY, { marginBottom: 60 }]}>
          <View style={styles.logoContainer}>
            <Image source={Logo as ImageSourcePropType} style={UI.logo} />
          </View>
          <View style={{ position: 'relative', zIndex: 10 }}>
            <Dropdown
              highlighted
              flatBottom
              value={signUpAs}
              setValue={setSignUpAs}
              items={items}
              setItems={setItems}
              placeholder="Sign up as a"
              isSignup={true}
            />
            {isSignUpAs ?
              <Text style={styles.error}>
                {capitalizeFirstLetter("This field is required")}
              </Text> : null
            }
          </View>
          {signUpAs === 'individual' ? (
            <SignUpIndividual signUpAs={signUpAs} setIsSignUpAs={setIsSignUpAs} />
          ) : signUpAs === 'guard' ? (
            <SignUpAsGuard signUpAs={signUpAs} setIsSignUpAs={setIsSignUpAs}/>
          ) : (
            <SignUpAsBusinessOwner signUpAs={signUpAs} setIsSignUpAs={setIsSignUpAs}/>
          )}
        </View>
        <Text
          style={[
            UI.textCenter,
            styles.text,
            styles.signInText,
            fontSizes.pri,
          ]}>
          Already have an account?{' '}
          <Link to="/login" style={[UI.textBrown]}>
            Login
          </Link>
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  text: {
    marginTop: 8,
    color: Colors.DarkGray,
  },
  error: {
    color: '#ff4e39',
    fontSize: 8,
    paddingLeft: 4,
    marginTop: 1,
  },
  mt4: {
    marginTop: 18,
  },
  signInText: {
    position: 'absolute',
    bottom: 30,
    width: '100%',
    marginTop: 30,
  },
  logoContainer: {
    width: '100%',
    ...UI.justifyCenter,
    ...UI.alignCenter,
    paddingVertical: 25,
  },
});

export default SignUpScreen;
