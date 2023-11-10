/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';

import firebase from '@react-native-firebase/app';
import AsyncStorage from '@react-native-async-storage/async-storage';

// firebase.initializeApp({
//   projectId: 'selest-security',
//   databaseURL: '',
//   appId: '1:341467558479:android:cca8abd329abe9e403f03a',
//   clientId: '',
//   apiKey: 'AIzaSyAMnCr9yLPHekNsJVDiwaj6pFqKVvN1XWo',
//   messagingSenderId: '341467558479',
//   storageBucket: '',
// });
console.log(firebase.app.length, 'firebase length...//');
console.log(firebase.app, 'app');

if (!firebase.apps.length) {
  firebase.initializeApp({
    projectId: 'selest-security',
    databaseURL: '',
    appId: '1:341467558479:android:cca8abd329abe9e403f03a',
    clientId: '',
    apiKey: 'AIzaSyAMnCr9yLPHekNsJVDiwaj6pFqKVvN1XWo',
    messagingSenderId: '341467558479',
    storageBucket: '',
  });
}
// else {
// Register background handler
if (firebase.apps.length) {
  messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
    if (remoteMessage?.data?.type == "chatMessage") {
      AsyncStorage.setItem('chatMessage', JSON.stringify(remoteMessage.data));
    }
  });
  
  console.log('else Message handled in the background!');
}
// }

AppRegistry.registerComponent(appName, () => App);
