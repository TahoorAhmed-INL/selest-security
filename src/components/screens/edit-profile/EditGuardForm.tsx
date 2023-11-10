import React, {useState, useEffect} from 'react';

import {
  View,
  useWindowDimensions,
  StyleSheet,
  ImageSourcePropType,
  Image,
  TouchableOpacity,
  Text,
  Platform,
  ActivityIndicator,
  ImageURISource,
} from 'react-native';

import {useForm} from 'react-hook-form';

import {Colors, UI} from '../../../styles/custom';
import {Edit, PenBox} from 'lucide-react-native';
import {
  GuardStackNavigationProp,
  UserStackNavigationProp,
  editProfileGuard,
} from '../../../lib/types';
import EditProfileRow from '../../general/EditProfileRow';
import Input from '../../ui/Input';
import {
  defaultRules,
  emailRules,
  numericOnlyRules,
  passwordRules,
  phoneRules,
} from '../../../lib/rules';
import Geolocation from 'react-native-geolocation-service';
import Button from '../../ui/Button';
import {useAppContext} from '../../../store/AppContext';
import {capitalizeFirstLetter, getCityName} from '../../../lib/helpers';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {BASE_URL, axiosInstance} from '../../../api';
import {GreenMarker, SecurityGuard} from '../../../assets/images';
import {launchImageLibrary} from 'react-native-image-picker';
import {updatePassword, updateUser} from '../../../api-clients/apiServices';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import {requestLocationPermission} from '../../../lib/permissionHelpers';
import GooglePlacesInput from '../../general/GooglePlacesInput';
interface Location {
  latitude: number;
  longitude: number;
}
export default function EditGuardForm({
  navigation,
}: {
  navigation: UserStackNavigationProp;
}) {
  const {width, height} = useWindowDimensions();
  const textScaleFactor = width / 350;

  const {state, getUser} = useAppContext();

  const userInfo = state?.storedData;
  const [isSelected, setSelection] = useState(true);
  const [isPassMatched, setIsPassMatched] = useState(false);
  const [newImage, setNewImage] = useState<any>(null);
  const [isImageUpload, setImageUpload] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [city, setCity] = useState<string | undefined>('');
  const [servorError, setServorError] = useState<any>();
  const [userLocation, setUserLocation] = useState<Location | null>(null);
  const [updateLocation, setUpdateLOcation] = useState(false);
  const [selectedGender, setSelectedGender] = useState<string>(
    userInfo?.guardDetails?.gender ? userInfo?.guardDetails?.gender : '',
  );

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<editProfileGuard>({
    defaultValues: {
      name: userInfo?.name,
      phone: userInfo?.contact,
      email: userInfo?.email,
      address: userInfo?.address,
      // city: '',
      licenseNumber: userInfo?.guardDetails?.licenseNumber
        ? userInfo?.guardDetails?.licenseNumber
        : '',
      qualification: userInfo?.guardDetails?.qualification
        ? userInfo?.guardDetails?.qualification
        : '',
      previousExperience: userInfo?.guardDetails?.previousExperience
        ? userInfo?.guardDetails?.previousExperience
        : '',
      yearsOfExperience: userInfo?.guardDetails?.yearsOfExperience
        ? userInfo?.guardDetails?.yearsOfExperience
        : 0,
      password: '',
      confirmPassword: '',
    },
  });

  const options = {
    mediaType: 'photo',
  };

  // const openGeller = async () => {
  //   try {
  //     const result = await launchImageLibrary(options);
  //     if (result?.didCancel) {
  //     } else {
  //       setNewImage(result);
  //     }
  //   } catch (error) {
  //     setNewImage(null);
  //     console.log(error);
  //   }
  // };

  // const updateProfileImage = async () => {
  //   if (newImage) {
  //     try {
  //       setImageUpload(true);
  //       const form = new FormData();
  //       const image = newImage?.assets[0].uri;
  //       let splittedUri = image.split('.');
  //       let _image;
  //       let imageName =
  //         Platform.OS == 'android'
  //           ? image.split('/cache/')[1]
  //           : image.split('/image/')[1];
  //       _image = {
  //         uri: image,
  //         type: `image/${splittedUri[splittedUri.length - 1]}`,
  //         name: imageName,
  //       };
  //       form.append(state?.userType, _image);
  //       console.log(_image, 'image 1323');
  //       const res = await axiosInstance.patch('/api/users/picture', form, {
  //         headers: {
  //           Accept: 'application/json',
  //           'Content-Type': 'multipart/form-data',
  //           Authorization: state?.token,
  //         },
  //       });
  //       getUser();
  //       console.log(res.data.message, 'asdas******');
  //     } catch (err) {
  //       console.log(err, 'asdasdasd');
  //       const error = err as Error; // Type assertion
  //       console.log(error.message, 'upload errorororor****************');
  //       // setServorError(err);
  //     } finally {
  //       setImageUpload(false);
  //     }
  //   }
  // };

  const onSubmit = async (data: editProfileGuard) => {
    // console.log(data, "update user profile");
    const updateUserInfo = {
      name: data?.name,
      address: data?.address,
      city:city,
      gender: selectedGender,
      qualification: data?.qualification,
      previousExperience: data?.previousExperience,
      yearsOfExperience: data?.yearsOfExperience,
      licenseNumber: data?.licenseNumber,
      homeCoordinates:`${userLocation?.latitude},${userLocation?.longitude}`
    };
    const updateUserPassword = {
      oldPassword: data?.oldPassword,
      newPassword: data?.password,
    };
    if (!selectedGender) {
      setServorError('Please select gender');
    } else if (!isSelected) {
      setIsLoading(true);
      if (data.password !== data.confirmPassword) {
        setIsPassMatched(true);
        setTimeout(() => {
          setIsPassMatched(false);
        }, 3000);
        setIsLoading(false);
        return;
      } else {
        try {
          const resUpdatePassword = await updatePassword(updateUserPassword);
          if (resUpdatePassword == null) {
            const res = await updateUser(state?.userType, updateUserInfo);
            console.log(navigation);
            getUser();
            navigation.navigate('user-profile');
          }
        } catch (err) {
          const error = err as Error; // Type assertion
          setServorError(error.message);
          console.log(error.message, 'error');
        } finally {
          setIsLoading(false);
        }
      }
    } else {
      setIsLoading(true);
      try {
        const res = await updateUser(state?.userType, updateUserInfo);
        console.log(navigation);
        getUser();
        navigation.navigate('user-profile');
      } catch (err) {
        const error = err as Error; // Type assertion
        setServorError(error.message);
      } finally {
        setIsLoading(false);
      }
    }
  };

  // map functionality start
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

  const getCityNameHandler = async () => {
    const cityName = await getCityName(userLocation);
    if (cityName) {
      setCity(cityName);
    }
  };

  useEffect(() => {
    if (userLocation) {
      getCityNameHandler();
    }
  }, [userLocation]);

  // map functionality end

  // useEffect(() => {
  //   if (newImage) {
  //     updateProfileImage();
  //   }
  // }, [newImage]);

  useEffect(() => {
    setServorError('');
  }, [selectedGender]);
  // console.log(userInfo?.guardDetails?.yearsOfExperience, 'city information ');
  console.log(city, 'city information ');
  console.log(userLocation?.latitude, 'userLocation information ');
  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginVertical: 13,
          // paddingHorizontal: 13,
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
      <View style={UI.relative}>
        {/* {newImage !== null ? (
          <View style={{position: 'relative'}}>
            {newImage.assets && newImage.assets.length > 0 && (
              <Image
                source={{uri: newImage.assets[0].uri}}
                style={{height: 270, borderRadius: 13, marginTop: 12}}
              />
            )}
            <View style={{position: 'absolute', top: '50%', left: '50%'}}>
              {isImageUpload && (
                <ActivityIndicator color={Colors?.DarkBlue} size={24} />
              )}
            </View>
          </View>
        ) : state?.storedData?.picture !== null ? (
          <Image
            source={{uri: BASE_URL + '/' + state?.storedData?.picture}}
            style={{height: 270, borderRadius: 13, marginTop: 12}}
          />
        ) : (
          <Image
            source={SecurityGuard as ImageSourcePropType}
            style={{width: 'auto', borderRadius: 13, marginTop: 12}}
          />
        )}
        <TouchableOpacity
          style={styles.icon}
          activeOpacity={0.6}
          onPress={openGeller}>
          <PenBox color={Colors.Brown} size={30} />
        </TouchableOpacity> */}
        <View style={{flex: 1, height: '100%'}}>
          {userLocation !== null && (
            <View style={{flex: 1, position: 'relative', height: '100%'}}>
              <MapView
                scrollEnabled={updateLocation}
                showsUserLocation={true}
                provider={PROVIDER_GOOGLE}
                style={{
                  flex: 1,
                  height: updateLocation ? height - 300 : 130,
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
            <View style={[{paddingHorizontal: 12,marginTop:13}]}>
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
      </View>
      {!updateLocation && (
        <>
          <EditProfileRow textScaleFactor={textScaleFactor} label="Name">
            <Input
              editable
              eyeBg
              defaultMargin={false}
              inputStyles={{
                fontSize: 10 * textScaleFactor,
                color: Colors.DarkGray,
                padding: 0,
                paddingVertical: 7.5 * textScaleFactor,
                paddingLeft: 14,
                backgroundColor: '#fff',
              }}
              name="name"
              style={styles.input}
              rules={defaultRules({fieldName: 'name', length: 3})}
              errors={errors}
              control={control}
              placeholder="Name"
            />
          </EditProfileRow>
          <EditProfileRow textScaleFactor={textScaleFactor} label="Phone No">
            <Input
              defaultMargin={false}
              editable={false}
              eyeBg
              inputStyles={{
                fontSize: 10 * textScaleFactor,
                color: Colors.DarkGray,
                padding: 0,
                paddingVertical: 7.5 * textScaleFactor,
                paddingLeft: 14,
                backgroundColor: Colors.LightGray,
              }}
              name="phone"
              style={styles.input}
              rules={phoneRules}
              errors={errors}
              control={control}
              placeholder="Phone no"
            />
          </EditProfileRow>
          <EditProfileRow textScaleFactor={textScaleFactor} label="Email">
            <Input
              defaultMargin={false}
              editable={false}
              eyeBg
              inputStyles={{
                fontSize: 10 * textScaleFactor,
                color: Colors.DarkGray,
                padding: 0,
                paddingVertical: 7.5 * textScaleFactor,
                paddingLeft: 14,
                backgroundColor: Colors.LightGray,
              }}
              name="email"
              style={styles.input}
              rules={emailRules}
              errors={errors}
              control={control}
              placeholder="Email address"
            />
          </EditProfileRow>
          <EditProfileRow textScaleFactor={textScaleFactor} label="City">
            <Input
              editable={false}
              eyeBg
              defaultValue={city}
              defaultMargin={false}
              inputStyles={{
                fontSize: 10 * textScaleFactor,
                color: Colors.DarkGray,
                padding: 0,
                paddingVertical: 7.5 * textScaleFactor,
                paddingLeft: 14,
                backgroundColor: Colors.LightGray,
              }}
              name="city"
              style={styles.input}
              // rules={defaultRules({fieldName: 'city', length: 6})}
              errors={errors}
              control={control}
              placeholder="City"
            />
          </EditProfileRow>
          <EditProfileRow textScaleFactor={textScaleFactor} label="Address">
            <Input
              editable
              eyeBg
              defaultMargin={false}
              inputStyles={{
                fontSize: 10 * textScaleFactor,
                color: Colors.DarkGray,
                padding: 0,
                paddingVertical: 7.5 * textScaleFactor,
                paddingLeft: 14,
                backgroundColor: '#fff',
              }}
              name="address"
              style={styles.input}
              rules={defaultRules({fieldName: 'address', length: 6})}
              errors={errors}
              control={control}
              placeholder="Address"
            />
          </EditProfileRow>

          <EditProfileRow
            textScaleFactor={textScaleFactor}
            label="Qualification">
            <Input
              editable
              eyeBg
              defaultMargin={false}
              inputStyles={{
                fontSize: 10 * textScaleFactor,
                color: Colors.DarkGray,
                padding: 0,
                paddingVertical: 7.5 * textScaleFactor,
                paddingLeft: 14,
                backgroundColor: '#fff',
              }}
              name="qualification"
              style={styles.input}
              rules={defaultRules({fieldName: 'qualification', length: 4})}
              errors={errors}
              control={control}
              placeholder="Qualification"
            />
          </EditProfileRow>
          <EditProfileRow
            textScaleFactor={textScaleFactor}
            label="Prev. Experience">
            <Input
              editable
              eyeBg
              defaultMargin={false}
              inputStyles={{
                fontSize: 10 * textScaleFactor,
                color: Colors.DarkGray,
                padding: 0,
                paddingVertical: 7.5 * textScaleFactor,
                paddingLeft: 14,
                backgroundColor: '#fff',
              }}
              name="previousExperience"
              style={styles.input}
              rules={defaultRules({fieldName: 'previousExperience'})}
              errors={errors}
              control={control}
              placeholder="Previous Experience"
            />
          </EditProfileRow>
          <EditProfileRow textScaleFactor={textScaleFactor} label="Experience">
            <Input
              editable
              eyeBg
              defaultMargin={false}
              inputStyles={{
                fontSize: 10 * textScaleFactor,
                color: Colors.DarkGray,
                padding: 0,
                paddingVertical: 7.5 * textScaleFactor,
                paddingLeft: 14,
                backgroundColor: '#fff',
              }}
              name="yearsOfExperience"
              style={styles.input}
              rules={numericOnlyRules}
              errors={errors}
              control={control}
              placeholder="Years Of Experience"
            />
          </EditProfileRow>
          <EditProfileRow
            textScaleFactor={textScaleFactor}
            label="license Number">
            <Input
              editable
              eyeBg
              defaultMargin={false}
              inputStyles={{
                fontSize: 10 * textScaleFactor,
                color: Colors.DarkGray,
                padding: 0,
                paddingVertical: 7.5 * textScaleFactor,
                paddingLeft: 14,
                backgroundColor: '#fff',
              }}
              name="licenseNumber"
              style={styles.input}
              rules={defaultRules({fieldName: 'license Number'})}
              errors={errors}
              control={control}
              placeholder="license Number"
            />
          </EditProfileRow>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              marginTop: 12,
              justifyContent: 'space-between',
            }}>
            <View style={{flex: 0.2, paddingLeft: 14}}>
              <Text style={{color: Colors?.DarkBlue}}>Gender</Text>
            </View>
            <View
              style={{
                flex: 0.8,
                flexDirection: 'row',
                justifyContent: 'flex-end',
                paddingRight: 4,
                gap: 20,
                paddingLeft: 14,
              }}>
              <TouchableOpacity onPress={() => setSelectedGender('male')}>
                <View style={styles.wrapper}>
                  <View style={styles.radio}>
                    {selectedGender == 'male' ? (
                      <View style={styles.radioBg}></View>
                    ) : null}
                  </View>
                  <Text>Male</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setSelectedGender('female')}>
                <View style={styles.wrapper}>
                  <View style={styles.radio}>
                    {selectedGender == 'female' ? (
                      <View style={styles.radioBg}></View>
                    ) : null}
                  </View>
                  <Text>Female</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setSelectedGender('other')}>
                <View style={styles.wrapper}>
                  <View style={styles.radio}>
                    {selectedGender == 'other' ? (
                      <View style={styles.radioBg}></View>
                    ) : null}
                  </View>
                  <Text>Other</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{marginTop: 9, width: '50%'}}>
            <BouncyCheckbox
              size={18}
              fillColor={Colors.DarkBlue}
              unfillColor={Colors.Silver}
              text="Change Password"
              textStyle={{textDecorationLine: 'none'}}
              iconStyle={{borderColor: ''}}
              innerIconStyle={{borderWidth: 2}}
              onPress={(isSelected: boolean) => {
                setSelection(!isSelected);
              }}
            />
          </View>
          {!isSelected && (
            <>
              <EditProfileRow
                textScaleFactor={textScaleFactor}
                label="Old Password">
                <Input
                  rules={passwordRules}
                  defaultMargin={false}
                  secureTextEntry={true}
                  inputStyles={{
                    fontSize: 10 * textScaleFactor,
                    color: '#fff',
                    padding: 5 * textScaleFactor,
                    paddingVertical: 9 * textScaleFactor,
                    paddingLeft: 14,
                    backgroundColor: Colors.DarkBlue,
                  }}
                  editable={!isSelected}
                  eyeBg={true}
                  name="oldPassword"
                  type="password"
                  style={styles.input}
                  errors={errors}
                  control={control}
                  placeholder="Old password"
                  placeholderTextColor="#fff"
                />
              </EditProfileRow>
              <EditProfileRow
                textScaleFactor={textScaleFactor}
                label="Password">
                <Input
                  rules={passwordRules}
                  defaultMargin={false}
                  secureTextEntry={true}
                  inputStyles={{
                    fontSize: 10 * textScaleFactor,
                    color: '#fff',
                    padding: 5 * textScaleFactor,
                    paddingVertical: 9 * textScaleFactor,
                    paddingLeft: 14,
                    backgroundColor: Colors.DarkBlue,
                  }}
                  editable={!isSelected}
                  eyeBg={true}
                  name="password"
                  type="password"
                  style={styles.input}
                  errors={errors}
                  control={control}
                  placeholder="New password"
                  placeholderTextColor="#fff"
                />
              </EditProfileRow>
              <EditProfileRow
                textScaleFactor={textScaleFactor}
                label="Confirm Password">
                <Input
                  rules={passwordRules}
                  defaultMargin={false}
                  secureTextEntry={true}
                  inputStyles={{
                    fontSize: 10 * textScaleFactor,
                    color: '#fff',
                    padding: 0,
                    paddingVertical: 8 * textScaleFactor,
                    paddingLeft: 14,
                    backgroundColor: Colors.DarkBlue,
                  }}
                  editable={!isSelected}
                  eyeBg={true}
                  name="confirmPassword"
                  type="password"
                  style={styles.input}
                  errors={errors}
                  control={control}
                  placeholder="Confirm password"
                  placeholderTextColor="#fff"
                />
                {isPassMatched && (
                  <Text style={styles.error}>
                    {capitalizeFirstLetter('Password do not match.')}
                  </Text>
                )}
              </EditProfileRow>
            </>
          )}
        </>
      )}
      <View style={{marginTop: 4}}>
        {servorError && <Text style={styles.error}>{servorError}</Text>}
      </View>
      {!updateLocation &&
      <View style={[{marginTop: 20}]}>
        <Button roundedFull onPress={handleSubmit(onSubmit)} text="Update" />
      </View>
}
    </>
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    paddingHorizontal: 0,
    overflow: 'hidden',
    borderRadius: 0,
    borderTopRightRadius: 9,
    borderBottomRightRadius: 9,
    borderColor: Colors.Brown,
  },
  icon: {
    position: 'absolute',
    right: 10,
    top: 22,
  },
  wrapper: {flex: 1, flexDirection: 'row', gap: 6, alignItems: 'center'},
  radio: {
    width: 14,
    height: 14,
    borderColor: Colors.DarkBlue,
    borderRadius: 100,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioBg: {
    backgroundColor: Colors?.DarkBlue,
    width: 7,
    height: 7,
    borderRadius: 100,
  },
  error: {
    color: '#ff4e39',
    fontSize: 10,
    paddingLeft: 4,
    marginBottom: 4,
  },
});
