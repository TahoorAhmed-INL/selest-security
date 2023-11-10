/* eslint-disable react/no-unstable-nested-components */
import React from 'react';

import {SafeAreaView} from 'react-native';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {UserStackParamList} from '../lib/types';

import {
  Chat,
  Dashboard as UserDashboard,
  Feedback,
  YourGuards,
  JobDetails,
  HireAGuard,
  OrderDetail,
  UserDetail,
  UserProfile,
  EditProfile,
  CurrentOrder,
  PreviousOrder,
  SupportScreen,
  TermsAndConditions,
  PaymentInformation,
  EditJobDescription,
} from '../screens/app/user-screens';

import Header from '../components/ui/Header';
import {Headphones, Home, LogOut, User} from 'lucide-react-native';
import {Colors} from '../styles/custom';
import { Map } from '../screens/app/guard-screens';


const Stack = createNativeStackNavigator<UserStackParamList>();
const Tab = createBottomTabNavigator();

const UserScreens = () => {
  return (
    <Stack.Navigator
      screenOptions={({route}) => ({
        headerTransparent: false,
        headerMode: 'screen',
        header: props => {
          if (route.name !== 'user-dashboard') {
            return (
              <SafeAreaView>
                <Header title={props.options.title} />
              </SafeAreaView>
            );
          }
          return null;
        },
      })}
      initialRouteName="user-dashboard">
      <Stack.Screen name="user-dashboard" component={UserDashboard} />
      <Stack.Screen
        name="hire-guard"
        options={{title: 'Hire a Guard'}}
        component={HireAGuard}
      />
      <Stack.Screen
        name="payment-info"
        options={{title: 'Payment Page'}}
        component={PaymentInformation}
      />
      <Stack.Screen
        name="your-guards"
        options={{title: 'Your Guards'}}
        component={YourGuards}
      />
      <Stack.Screen
        name="current-order"
        options={{title: 'Current Orders'}}
        component={CurrentOrder}
      />
      <Stack.Screen
        name="previous-order"
        options={{title: 'Previous Orders'}}
        component={PreviousOrder}
      />
      <Stack.Screen
        name="order-detail"
        options={{title: 'Order detail'}}
        component={OrderDetail}
      />
      <Stack.Screen
        name="job-description"
        options={{title: 'Job Description'}}
        component={JobDetails}
      />
      <Stack.Screen
        name="guard-profile"
        options={{title: 'Guard Profile'}}
        component={UserDetail}
      />
      <Stack.Screen
        name="user-profile"
        options={{title: 'User Profile'}}
        component={UserProfile}
      />
      <Stack.Screen
        name="edit-profile"
        options={{title: 'Edit Profile'}}
        component={EditProfile}
      />
      <Stack.Screen
        name="edit-job"
        options={{title: 'Edit Job Description'}}
        component={EditJobDescription}
      />
      <Stack.Screen
        name="feedback"
        options={{title: 'Feedback'}}
        component={Feedback}
      />
      <Stack.Screen
        name="support"
        options={{title: 'Support'}}
        component={SupportScreen}
      />
      <Stack.Screen
        options={{title: 'Terms and conditions'}}
        name="terms-and-conditions"
        component={TermsAndConditions}
      />
      <Stack.Screen
        options={{title: 'Group Chat'}}
        name="chat"
        component={Chat}
      />
       <Stack.Screen options={{title: 'Map'}} name="map" component={Map} />
    </Stack.Navigator>
  );
};

const UserStack = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.DarkBlue,
        tabBarInactiveTintColor: Colors.Brown,
        tabBarActiveBackgroundColor: Colors.Brown,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          height: 55,
          backgroundColor: Colors.DarkBlue,
        },
        tabBarIconStyle: {
          marginTop: 5,
        },
        tabBarLabelStyle: {
          marginBottom: 5,
        },
      }}>
      <Tab.Screen
        name="Home"
        component={UserScreens}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color, size}) => <Home color={color} size={size - 4} />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={UserProfile}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({color, size}) => <User color={color} size={size - 4} />,
        }}
      />
      <Tab.Screen
        name="Support"
        component={SupportScreen}
        options={{
          tabBarLabel: 'Support',
          tabBarIcon: ({color, size}) => (
            <Headphones color={color} size={size - 4} />
          ),
        }}
      />
      <Tab.Screen
        name="Home-logout"
        component={UserDashboard}
        options={{
          tabBarLabel: 'Logout',
          tabBarIcon: ({color, size}) => (
            <LogOut color={color} size={size - 4} />
          ),
          title: 'Home-logout',
        }}
      />
    </Tab.Navigator>
  );
};

export default UserStack;
