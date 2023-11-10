import {View} from 'react-native';
import React from 'react';

import MapWithPolyline from '../../../components/general/Map';
import { useRoute } from '@react-navigation/native';

export default function Map() {
  const {params} = useRoute()
  const coordsArray = params?.coords.split(",")
  const destination = {latitude: +coordsArray[0], longitude: +coordsArray[1]};
 console.log(coordsArray,"params")
  return (
    <View style={{flex: 1}}>
      <MapWithPolyline destination={destination} />
    </View>
  );
}
