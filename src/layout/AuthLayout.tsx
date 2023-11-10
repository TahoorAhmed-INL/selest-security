import React, {FC} from 'react';
import {
  View,
  Image,
  StatusBar,
  ScrollView,
  ImageSourcePropType,
  SafeAreaView,
} from 'react-native';

import {UI} from '../styles/custom';

import {Map} from '../assets/images';
interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: FC<AuthLayoutProps> = ({children}) => {
  const statusBarHeight = StatusBar.currentHeight || 0;

  return (
    <SafeAreaView
      style={[
        UI.flexFull,
        {
          height: '100%',
        },
      ]}>
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        keyboardShouldPersistTaps="handled"
        contentInsetAdjustmentBehavior="automatic">
        <View
          style={[
            UI.paddingX,
            UI.flexFull,
            UI.justifyBetween,
            {
              paddingVertical: statusBarHeight,
            },
          ]}>
          <View style={{marginBottom: 0, flex: 1}}>
            <Image source={Map as ImageSourcePropType} style={[UI.logo]} />
          </View>
          {children}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AuthLayout;
