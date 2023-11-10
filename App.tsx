/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import 'react-native-gesture-handler';

import React, {useEffect} from 'react';

import {
  StatusBar,
  SafeAreaView,
  Platform,
  PermissionsAndroid,
} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';

import AuthStack from './src/navigation/AuthStack';
import UserStack from './src/navigation/UserStack';
import GuardStack from './src/navigation/GuardStack';
import {Alert} from 'react-native';
import messaging from '@react-native-firebase/messaging';

import {useAppContext, AppProvider} from './src/store/AppContext';
import {notificationListner} from './src/utils/firebase';
import {getToken} from './src/utils/firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserStackNavigationProp } from './src/lib/types';

// Register background handler
// messaging().setBackgroundMessageHandler(async remoteMessage => {
//   console.log('Message handled in the background!', remoteMessage);
// });

function App({navigation}:{navigation:UserStackNavigationProp}): JSX.Element {
  if (Platform.OS === 'android') {
    PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    );
  }

  // Define your screens or components
  async function requestUserPermission() {
    const authorizationStatus = await messaging().requestPermission();
    if (authorizationStatus) {
      console.log('Permission status:', authorizationStatus);
    }
  }

  useEffect(() => {
    // Check for the chatMessage flag or data when the app is brought to the foreground.
    AsyncStorage.getItem('chatMessage').then(chatMessageData => {
      if (chatMessageData) {
        // Perform the navigation to the chat message page based on the data.
        // Example using React Navigation:
        const {jobId, type} = JSON.parse(chatMessageData);
        // navigation.navigate('ChatMessage', { chatRoomId, messageId });
        console.log(jobId, 'jobId*************************************');
        console.log(type, 'type*************************************');
        // navigation.navigate("chat")
        // Clear the flag or data to prevent further unintentional navigation.
        AsyncStorage.removeItem('chatMessage');
      }
    });

    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log(remoteMessage, 'msg....');
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });
    requestUserPermission().then(() => {
      getToken();
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    // Check if permission has been previously requested and granted
    messaging()
      .hasPermission()
      .then(status => {
        if (status === messaging.AuthorizationStatus.NOT_DETERMINED) {
          // If permission hasn't been requested before (first app launch), request it
          // if (Platform.OS === 'android') {
          requestUserPermission();
          console.log('asdajdl kjsd askjd');
          // }
        }
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    // requestUserPermission();
    // notificationListner();
  }, []);

  return (
    <AppProvider>
      <SafeAreaView style={{backgroundColor: '#000027'}}>
        <StatusBar backgroundColor="#000027" barStyle="light-content" />
      </SafeAreaView>
      <AppContent />
    </AppProvider>
  );
}

function AppContent(): JSX.Element {
  const {state} = useAppContext();
  const userType = state.userType;
  console.log(state.storedData, 'App.tsx');
  return (
    <NavigationContainer>
      <>
        {state.isLoggedIn ? (
          userType === 'individual' || userType === 'business' ? (
            <UserStack />
          ) : (
            <GuardStack />
          )
        ) : (
          <AuthStack />
        )}
      </>
    </NavigationContainer>
  );
}

export default App;
