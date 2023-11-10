import React, { useEffect, useState } from 'react';

import { View, StyleSheet } from 'react-native';

import Button from '../../ui/Button';

import { Colors, UI, boxShadow } from '../../../styles/custom';

import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';

import { GuardStackNavigationProp } from '../../../lib/types';

export default function StartJob({ startJobHandler, hasStartedJob, hasCompletedJob ,hasAcceptedJob,coords}) {
  const { navigate } = useNavigation<GuardStackNavigationProp>();




console.log(coords,"767868768")


  return (
    <View style={[UI.flexRow,
    UI.flexFull, { flexDirection: 'row', gap: 12, marginTop: 4 }]}>
      <View style={{ flex: 1 }}>

        <Button
          isLoading={false}
          roundedFull
          style={{ paddingHorizontal: '15%' }}
          onPress={() => navigate('map',{coords:coords})}
          gradient={true}
          text="Job Location"
        />
      </View>
      <View style={{ flex: 1 }}>
        <Button
          isLoading={false}
          roundedFull
          style={{
            paddingHorizontal: '19%',
            backgroundColor: '#fff',
            ...boxShadow.pri,
          }}
          textStyles={{ color: Colors.Brown }}
          onPress={hasCompletedJob || !hasAcceptedJob ? () => { } : startJobHandler}
          gradient={false}
          text={`${hasStartedJob ? "Complete Job" : "Start Job"} `}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mt4: {
    marginTop: 20,
  },
});
