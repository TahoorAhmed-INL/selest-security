import {PermissionsAndroid, Platform} from 'react-native';
import {request, PERMISSIONS} from 'react-native-permissions';

export async function requestLocationPermission(
  onPermissionGranted?: () => void,
  onPermissionDenied?: () => void,
) {
  if (Platform.OS === 'ios') {
    try {
      const status = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
      if (status === 'granted') {
        if (onPermissionGranted) {
          onPermissionGranted();
        }
      } else {
        console.log('Permission Denied'); // TODO: Remove this
        if (onPermissionDenied) {
          onPermissionDenied();
        }
      }
    } catch (error) {
      console.error(error);
    }
  } else if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message: 'This app needs access to your location.',
          buttonPositive: 'Allow',
          buttonNegative: 'Deny',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        if (onPermissionGranted) {
          onPermissionGranted();
        }
      } else {
        console.log('Permission Denied'); // TODO: Remove this
        if (onPermissionDenied) {
          onPermissionDenied();
        }
      }
    } catch (error) {
      console.error(error);
    }
  }
}
