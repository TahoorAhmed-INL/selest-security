/* eslint-disable react/no-unstable-nested-components */
import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {GuardStackParamList} from '../lib/types';

import {
  Chat,
  Dashboard as UserDashboard,
  Feedback,
  JobDetails,
  OrderDetail,
  UserDetail,
  UserProfile,
  EditProfile,
  CurrentOrder,
  PreviousOrder,
  SupportScreen,
  TermsAndConditions,
} from '../screens/app/user-screens';

import {Headphones, Home, LogOut, User} from 'lucide-react-native';

import {NewJobs, MyHours, Map} from '../screens/app/guard-screens';

import Header from '../components/ui/Header';
import {Colors} from '../styles/custom';

const Stack = createNativeStackNavigator<GuardStackParamList>();
const Tab = createBottomTabNavigator();

const GuardScreens = () => {
  return (
    <Stack.Navigator
      screenOptions={({route}) => ({
        headerTransparent: false,
        headerMode: 'screen',
        header: props => {
          if (route.name !== 'user-dashboard') {
            return <Header title={props.options.title} />;
          }
          return null; // dashboard has a header with drawer
        },
      })}
      initialRouteName="user-dashboard">
      <Stack.Screen name="user-dashboard" component={UserDashboard} />
      <Stack.Screen
        name="new-jobs"
        options={{title: 'New Jobs'}}
        component={NewJobs}
      />
      <Stack.Screen
        name="my-hours"
        options={{title: 'My Hours'}}
        component={MyHours}
      />
      <Stack.Screen
        name="user-detail"
        options={{title: 'User profile'}}
        component={UserDetail}
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

const GuardStack = () => {
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
        component={GuardScreens}
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

export default GuardStack;
