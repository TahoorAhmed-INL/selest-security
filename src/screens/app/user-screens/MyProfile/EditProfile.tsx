import React from 'react';

import {View, SafeAreaView, ScrollView} from 'react-native';

import {UI} from '../../../../styles/custom';

import LogoBackground from '../../../../components/general/LogoBackground';

import {UserStackNavigationProp} from '../../../../lib/types';

import EditUserForm from '../../../../components/screens/edit-profile/EditUserForm';
import EditGuardForm from '../../../../components/screens/edit-profile/EditGuardForm';
import EditBusinessOwnerForm from '../../../../components/screens/edit-profile/EditBusinessOwnerForm';

import {useAppContext} from '../../../../store/AppContext';

export default function MyProfile({
  navigation,
}: {
  navigation: UserStackNavigationProp;
}) {
  const {state} = useAppContext();

  const {userType} = state;

  return (
    <SafeAreaView style={[UI.flexFull, {backgroundColor: '#fff'}]}>
      <LogoBackground />
      <View style={UI.flexFull}>
        <ScrollView keyboardShouldPersistTaps="handled">
          <View style={[UI.paddingX, {paddingBottom: 16}]}>
            {userType === 'individual' && <EditUserForm navigation={navigation}/>}
            {userType === 'business' && <EditBusinessOwnerForm navigation={navigation}/>}
            {userType === 'guard' && <EditGuardForm navigation={navigation}/>}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
