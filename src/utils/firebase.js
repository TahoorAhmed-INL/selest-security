// import AsyncStorage from '@react-native-async-storage/async-storage';
// import messaging from '@react-native-firebase/messaging';

// export async function requestUserPermission() {
//   try {
//     const authStatus = await messaging().requestPermission();
//     const enabled =
//       authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
//       authStatus === messaging.AuthorizationStatus.PROVISIONAL;
//     console.log(enabled, 'enabled');
//     if (enabled) {
//       console.log('Authorization status:', authStatus);
//       await getFcmToken();
//     }
//   } catch (err) {
//     console.log(err);
//   }
// }

// const getFcmToken = async () => {
//   let fcmToken = await AsyncStorage.getItem('fcmToken');
//   console.log(fcmToken, 'the old fctoken****');
//   if (!fcmToken) {
//     try {
//       const fcmToken = await messaging().getToken();
//       if (fcmToken) {
//         console.log(fcmToken, 'the new generated fcm token &&&&');
//         await AsyncStorage.setItem('fcmToken', fcmToken);
//       }
//     } catch (err) {
//       console.log(err, 'getFcmToken catch error *****');
//     }
//   }
// };

// export const notificationListner = async () => {
//   messaging().onNotificationOpenedApp(remoteMessage => {
//     console.log(
//       'Notification caused app to open from background state:',
//       remoteMessage.notification,
//     );
//     // navigation.navigate(remoteMessage.data.type);
//   });

//   // // Register background handler
//   messaging().onMessage(async remoteMessage => {
//     console.log('Recieved in foreground!', remoteMessage);
//   });

//   messaging()
//     .getInitialNotification()
//     .then(remoteMessage => {
//       if (remoteMessage) {
//         console.log(
//           'Notification caused app to open from quit state:',
//           remoteMessage.notification,
//         );
//         // setInitialRoute(remoteMessage.data.type); // e.g. "Settings"
//       }
//       // setLoading(false);
//     });
// };

import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';

export const notificationListner = () => {
  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log(
      'Notification caused app to open from background state:',
      remoteMessage.notification,
    );
    // navigation.navigate(remoteMessage.data.type);
  });
  // // Register background handler
  messaging().onMessage(async remoteMessage => {
    console.log('Recieved in foreground!', remoteMessage);
  });
  // Check whether an initial notification is available
  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log(
          'Notification caused app to open from quit state:',
          remoteMessage.notification,
        );
      }
    });
};

export const getToken = async () => {
  let fcmToken = await AsyncStorage.getItem('fcmToken');
  console.log(fcmToken, 'the old fctoken****');
  if (!fcmToken) {
    try {
      const fcmToken = await messaging().getToken();
      if (fcmToken) {
        console.log(fcmToken, 'the new generated fcm token &&&&');
        await AsyncStorage.setItem('fcmToken', JSON.stringify(fcmToken));
      }
    } catch (err) {
      console.log(err, 'getFcmToken catch error *****');
    }
  }


  //     // await messaging().registerDeviceForRemoteMessages();
  // const deviceId = await messaging().getToken();
  // console.log('==================================12');

  // await AsyncStorage.setItem('deviceId', deviceId);
  // console.log(deviceId);
  // console.log('==================================*');

};
