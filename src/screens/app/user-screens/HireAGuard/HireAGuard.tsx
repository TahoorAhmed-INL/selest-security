import React, {useState, useEffect} from 'react';

import {
  Text,
  View,
  SafeAreaView,
  useWindowDimensions,
  StatusBar,
  ScrollView,
  StyleSheet,
  ImageURISource,
  Image,
  TouchableOpacity,
} from 'react-native';

import {useForm} from 'react-hook-form';

import Input from '../../../../components/ui/Input';
import {
  hourPickerRules,
  minutePickerRules,
  numericOnlyRules,
  requiredRule,
} from '../../../../lib/rules';
import {Colors, UI} from '../../../../styles/custom';
import Button from '../../../../components/ui/Button';
import DatePicker from '../../../../components/ui/DatePicker';
import LogoBackground from '../../../../components/general/LogoBackground';
import Geolocation from 'react-native-geolocation-service';

import {UserStackNavigationProp} from '../../../../lib/types';
import {capitalizeFirstLetter, getCityName} from '../../../../lib/helpers';
import {createJob} from '../../../../api-clients/apiServices';
import Toast from 'react-native-toast-message';
import {useToast} from '../../../../hooks/useToast';

import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import {GreenMarker} from '../../../../assets/images';
import {requestLocationPermission} from '../../../../lib/permissionHelpers';
import {Edit} from 'lucide-react-native';
import GooglePlacesInput from '../../../../components/general/GooglePlacesInput';

export interface HireGuard {
  eventType: string;
  address: string;
  message: string;
  state: string;
  city: string;
  hours: number;
  minutes: number;
}
interface Location {
  latitude: number;
  longitude: number;
}
export default function HireAGuard({
  navigation,
}: {
  navigation: UserStackNavigationProp;
}) {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<HireGuard>({
    defaultValues: {
      eventType: '',
      address: '',
    },
  });

  const {height} = useWindowDimensions();
  const statusBarHeight = StatusBar.currentHeight || 0;

  const [selectedDate, setSelectedDate] = useState<null | any>(null);
  const [isDate, setIsDate] = useState<boolean>(false);
  const [dateError, setDateError] = useState<string>('');
  const [city, setCity] = useState<string | undefined>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [userLocation, setUserLocation] = useState<Location | null>(null);
  const [updateLocation, setUpdateLOcation] = useState(false);
  const {resolveToast, rejectToast} = useToast();

  const onSubmit = async (data: HireGuard) => {
    console.log(data);
    const duration =
      data.minutes >= 15 ? data.hours * 60 + +data.minutes : data.hours * 60;
    if (!selectedDate) {
      setDateError('This field is required');
      setIsDate(true);
    } else {
      const body = {
        startTime: selectedDate,
        timeDuration: +duration,
        type: data.eventType,
        guardCount: 4,
        state: data.state,
        city: city,
        address: data.address,
        coordinates: `${userLocation?.latitude},${userLocation?.longitude}`,
        message: data.message,
        amount: 100,
      };
      // No errors, proceed with submission
      console.log(body, 'if hire a guard');
      try {
        setIsLoading(true);
        const res = await createJob('POST', body);
        console.log(res);
        resolveToast('Job created successfully.', '');
        setTimeout(() => {
          navigation.navigate('user-dashboard');
        }, 1500);
      } catch (err) {
        console.log(err, 'job was not created');
        rejectToast('job was not created');
      } finally {
        setIsLoading(false);
      }
    }
  };

  const setCurrentLocation = (position: any) => {
    const {latitude, longitude} = position.coords;
    const updatedUserLocation = {latitude, longitude};
    setUserLocation(updatedUserLocation);
  };

  const getInitialLocation = async () => {
    try {
      Geolocation.getCurrentPosition(
        position => setCurrentLocation(position),
        error => {
          console.error(error);
        },
        {enableHighAccuracy: true},
      );
    } catch (error) {
      console.error(error);
    }
  };

  const onRegionChangeComplete = (newRegion: any) => {
    setUserLocation(newRegion);
  };

  useEffect(() => {
    requestLocationPermission(
      () => {
        getInitialLocation();
      },
      () => console.log('Access denied'),
    );
  }, []);

  useEffect(() => {
    if (selectedDate) {
      setIsDate(false);
      const currentDate = new Date();
      if (!selectedDate) {
        setDateError('This field is required');
      } else if (selectedDate < currentDate) {
        setDateError('Job creation is not allowed on a past date.');
        setSelectedDate(null);
        setIsDate(true);
      }
    }
  }, [selectedDate]);

  const getCityNameHandler = async () => {
    const cityName = await getCityName(userLocation);
    if (cityName) {
      setCity(cityName);
    }
  };

  useEffect(() => {
    getCityNameHandler();
  }, [userLocation]);

  return (
    <SafeAreaView
      style={[
        UI.flexFull,
        {backgroundColor: '#fff', height: height - statusBarHeight},
      ]}>
      <LogoBackground />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: 13,
          paddingHorizontal: 13,
        }}>
        {updateLocation ? (
          <GooglePlacesInput
            setUserLocation={setUserLocation}
            setCity={setCity}
          />
        ) : (
          <>
            <View style={{flexDirection: 'row', gap: 12}}>
              <Image
                source={GreenMarker as ImageURISource}
                style={{width: 20, height: 20}}
              />
              <Text style={{color: Colors.DarkBlue}}>Job Address</Text>
            </View>
            <TouchableOpacity
              onPress={() => setUpdateLOcation(!updateLocation)}>
              <Edit size={18} color={Colors.Brown} />
            </TouchableOpacity>
          </>
        )}
      </View>
      <ScrollView style={UI.flexFull} nestedScrollEnabled={true}>
        <View style={[UI.flexFull, UI.paddingY, UI.paddingX]}>
          <View style={{flex: 1, height: '100%'}}>
            {userLocation !== null && (
              <View style={{flex: 1, position: 'relative', height: '100%'}}>
                <MapView
                  scrollEnabled={updateLocation}
                  showsUserLocation={true}
                  provider={PROVIDER_GOOGLE}
                  style={{
                    flex: 1,
                    height: updateLocation
                      ? height - (statusBarHeight + 300)
                      : 130,
                  }}
                  region={{
                    latitude: userLocation?.latitude,
                    longitude: userLocation?.longitude,
                    latitudeDelta: 0.025,
                    longitudeDelta: 0.025,
                  }}
                  onRegionChangeComplete={onRegionChangeComplete}></MapView>
                <View
                  style={{
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    transform: [{translateX: -15}, {translateY: -30}],
                  }}>
                  <Image
                    source={GreenMarker as ImageURISource}
                    style={{width: 30, height: 30}}
                  />
                </View>
              </View>
            )}
            {updateLocation && (
              <View style={[{paddingHorizontal: 12}, styles.mt4]}>
                <Button
                  roundedFull
                  isLoading={isLoading}
                  onPress={() => setUpdateLOcation(false)}
                  gradient={true}
                  text="Update Location"
                />
              </View>
            )}
          </View>
          {!updateLocation && <View style={styles?.mt4}></View>}

          {!updateLocation && (
            <>
              <DatePicker
                date={selectedDate}
                setDate={setSelectedDate}
                inputStyles={false}
              />
              {isDate ? (
                <Text style={styles.error}>
                  {capitalizeFirstLetter(dateError)}
                </Text>
              ) : null}
              <Input
                editable
                eyeBg
                errors={errors}
                name="eventType"
                style={styles.input}
                rules={requiredRule}
                control={control}
                placeholder="Type of Event"
              />
              <View style={{position: 'relative', zIndex: 10, marginBottom: 2}}>
                {/* <Dropdown
              value={noOfGuards}
              setValue={setNoOfGuards}
              items={guardsCount}
              setItems={setGuardsCount}
              placeholder="How Many Guards Needed"
            /> */}
                <Input
                  errors={errors}
                  name="guard"
                  style={styles.input}
                  rules={numericOnlyRules}
                  control={control}
                  placeholder="How Many Guards Needed"
                  keyboardType="numeric"
                />
              </View>
              <Input
                editable
                eyeBg
                errors={errors}
                name="state"
                style={styles.input}
                rules={requiredRule}
                control={control}
                placeholder="State"
              />
              <Input
                errors={errors}
                editable={false}
                eyeBg
                name="city"
                defaultValue={city}
                style={styles.input}
                // rules={requiredRule}
                control={control}
                placeholder="City"
              />
              <Input
                editable
                eyeBg
                errors={errors}
                name="address"
                style={styles.input}
                rules={requiredRule}
                control={control}
                placeholder="Address"
              />
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  width: '100%',
                  gap: 18,
                }}>
                <View style={{flex: 1}}>
                  <Input
                    errors={errors}
                    name="hours"
                    style={styles.input}
                    rules={hourPickerRules}
                    control={control}
                    placeholder="How many hours"
                  />
                </View>
                <View style={{flex: 1}}>
                  <Input
                    errors={errors}
                    name="minutes"
                    style={styles.input}
                    rules={minutePickerRules}
                    control={control}
                    placeholder="How many Minutes"
                  />
                </View>
              </View>
              <Input
                editable
                eyeBg
                multiline
                numberOfLines={4}
                editable
                inputStyles={{textAlignVertical: 'top'}}
                name="message"
                style={styles.input}
                rules={undefined}
                control={control}
                placeholder="Message"
              />
            </>
          )}
        </View>
        {!updateLocation && (
          <View style={[styles.mb5, {paddingHorizontal: 12}]}>
            <Button
              roundedFull
              isLoading={isLoading}
              onPress={
                updateLocation
                  ? () => {
                      rejectToast('Select your location');
                    }
                  : handleSubmit(onSubmit)
              }
              gradient={true}
              text="Create Job"
            />
          </View>
        )}

        {/* } */}
      </ScrollView>
      <Toast />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: Colors.Brown,
  },
  error: {
    color: '#ff4e39',
    fontSize: 10,
    paddingLeft: 4,
    marginTop: 1,
  },
  mt4: {
    marginTop: 18,
  },
  mb5: {
    marginBottom: 22,
  },
});
