import React, {useEffect, useRef} from 'react';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {Colors} from '../../styles/custom';

const GooglePlacesInput = ({setUserLocation, setCity}: any) => {

  return (
    <GooglePlacesAutocomplete
      disableScroll
      placeholder="Search "
      fetchDetails={true}
      onPress={(data, details = null) => {
        // 'details' is provided when fetchDetails = true
        let arr = data?.description.split(',');
        setCity(arr[arr.length - 2]);
        setUserLocation((prev: any) => ({
          ...prev,
          latitude: details?.geometry?.location?.lat,
          longitude: details?.geometry?.location?.lng,
        }));
      }}
      query={{
        key: 'AIzaSyAMnCr9yLPHekNsJVDiwaj6pFqKVvN1XWo',
        language: 'en',
      }}
      debounce={200}
      enablePoweredByContainer={true}
      listViewDisplayed="auto"
      styles={{
        textInputContainer: {
        },
        textInput: {
          fontSize: 16,
          backgroundColor: Colors?.LightGray,
        },
        predefinedPlacesDescription: {
          color: '#1faadb',
        },
      }}
    />
  );
};

export default GooglePlacesInput;
