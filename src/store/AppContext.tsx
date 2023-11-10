import React, {
  createContext,
  ReactNode,
  useReducer,
  useContext,
  useEffect,
} from 'react';

import SplashScreen from 'react-native-splash-screen';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { fcmTokenApi, getUser } from '../api-clients/apiServices';

interface InitialStateTypes {
  isLoggedIn: boolean;
  userType: string;
  token: string | null;
  userId: string | null;
  storedData: Record<any, any> | null;
  userData: Record<string, any> | null;
}

interface Action {
  type: string;
  payload?: any;
}

type Reducer = (state: InitialStateTypes, action: Action) => InitialStateTypes;

interface AppContextProps {
  state: InitialStateTypes;
  getUser: () => {}
  dispatch: React.Dispatch<Action>;
}

const initialState: InitialStateTypes = {
  isLoggedIn: false,
  userId: null,
  userType: '',
  userData: null,
  storedData: null,
  token: null
};

const appReducer: Reducer = (state, action) => {
  console.log(action?.payload, "login context")
  switch (action?.type) {
    case 'LOGIN':
      // const {userType} = action.payload;
      AsyncStorage.setItem('isLoggedIn', 'true');
      AsyncStorage.setItem('userType', JSON.stringify(action?.payload?.userType));
      AsyncStorage.setItem('token', JSON.stringify(action?.payload?.token));
      AsyncStorage.setItem('user_id', JSON.stringify(action?.payload?.id));

      return {
        ...state,
        isLoggedIn: true,
        userType: action?.payload?.userType,
        token: action?.payload?.token,
        userId: action?.payload?.id,
      };

    case 'LOGOUT':
      AsyncStorage.removeItem('isLoggedIn');
      AsyncStorage.removeItem('userType');
      AsyncStorage.removeItem('token');

      return {
        ...state,
        isLoggedIn: false,
        userType: '',
        userData: null
      };

    case 'STORE_DATA':

      AsyncStorage.setItem('storedData', JSON.stringify(action.payload));

      return {
        ...state,
        isLoggedIn: true,
        userType: action?.payload?.userType,
        token: action.payload.token,
        userId: action.payload.userId,
        storedData: action.payload,
      };

    case 'RESET_DATA':
      AsyncStorage.removeItem('storedData');

      return {
        ...state,
        storedData: null,
      };

    default:
      return state;
  }
};

const AppContext = createContext<AppContextProps | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const loadState = async () => {
    try {
      const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');
      const userTypeString: string | null  = await AsyncStorage.getItem('userType');
      const userType: string | null = userTypeString ? JSON.parse(userTypeString) : null;
      const tokenString: string | null = await AsyncStorage.getItem('token');
      const token: string | null = tokenString ? JSON.parse(tokenString) : null;

      const userIdString: string | null = await AsyncStorage.getItem('user_id');
      const userId: number | null = userIdString ? JSON.parse(userIdString) : null;

      let fcmTokenString: string | null  = await AsyncStorage.getItem('fcmToken');
      const fcmToken: string | null = fcmTokenString ? JSON.parse(fcmTokenString) : null;
      console.log(fcmToken, 'after loggedin fctoken****');

      if (isLoggedIn === 'true' && userType && userId) {
        const res = await getUser('me')
        if(fcmToken){
          const resFCM = await fcmTokenApi(fcmToken)
          console.log(resFCM,"resFCM")
        }
        console.log(res, "getUseer data from api of me 28734892374924248240293840")

        dispatch({ type: 'STORE_DATA', payload: { ...res, userId: userId, token: token,userType:userType } });
      }
    } catch (error) {
      console.error('Error loading state from AsyncStorage:', error);
    } finally {
      setTimeout(() => {
        SplashScreen.hide();
      }, 500);
    }
  };
  useEffect(() => {
    loadState();
  }, [state.isLoggedIn]);

  return (
    <AppContext.Provider value={{ state, getUser: loadState, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = (): AppContextProps => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

export { AppProvider, useAppContext };
