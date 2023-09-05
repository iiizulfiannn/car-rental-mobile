import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { PaperProvider } from 'react-native-paper';
import { Provider, useDispatch, useSelector } from 'react-redux';

import { store } from './store';
import LocationScreen from '../page/LocationScreen';
import LoginScreen from '../page/LoginScreen';
import SplashScreen from '../page/SplashScreen';
import CarAddScreen from '../page/car/CarAddScreen';
import CarScreen from '../page/car/CarScreen';
import OrderAddScreen from '../page/order/OrderAddScreen';
import OrderDetailScreen from '../page/order/OrderDetailScreen';
import OrderScreen from '../page/order/OrderScreen';
import UserScreen from '../page/user/UserScreen';
import colors from '../shared/theme/colors';
import { logout, setAccount, setToken } from '../entity/auth/authSlice';
import { getData } from '../shared/helper/storage';
import CarDetailScreen from '../page/car/CarDetailScreen';
import CarEditScreen from '../page/car/CarEditScreen';
import OrderEditScreen from '../page/order/OrderEditScreen';

const Stack = createNativeStackNavigator();
const BottomTab = createMaterialBottomTabNavigator();

const MainApp = () => {
  return (
    <Provider store={store}>
      <PaperProvider theme={{ colors: colors }}>
        <StatusBar style="dark" />
        <Nav />
      </PaperProvider>
    </Provider>
  );
};

const Nav = () => {
  const { account } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => handleGetAccount(), 1000);
    return () => {};
  }, []);

  const handleGetAccount = async () => {
    try {
      const account = await getData('account');
      if (account) {
        dispatch(setToken(account.accessToken));
        dispatch(setAccount(account));
        setLoading(false);
      } else {
        dispatch(logout());
        setLoading(false);
      }
    } catch (error) {
      console.log({ error });
    }
  };

  if (loading) {
    return <SplashScreen />;
  }

  // console.log({ account });

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen" screenOptions={{ headerShown: false }}>
        {!account ? (
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
        ) : (
          <>
            <Stack.Screen name="BottomTabNav" component={BottomTabNav} />
            <Stack.Screen name="OrderDetailScreen" component={OrderDetailScreen} />
            <Stack.Screen name="CarDetailScreen" component={CarDetailScreen} />

            <Stack.Screen
              name="OrderAddScreen"
              component={OrderAddScreen}
              options={{
                animation: 'slide_from_bottom',
              }}
            />
            <Stack.Screen
              name="OrderEditScreen"
              component={OrderEditScreen}
              options={{
                animation: 'slide_from_bottom',
              }}
            />
            <Stack.Screen
              name="CarScreen"
              component={CarScreen}
              options={{
                animation: 'slide_from_bottom',
              }}
            />
            <Stack.Screen
              name="CarAddScreen"
              component={CarAddScreen}
              options={{
                animation: 'slide_from_bottom',
              }}
            />
            <Stack.Screen
              name="CarEditScreen"
              component={CarEditScreen}
              options={{
                animation: 'slide_from_bottom',
              }}
            />
            <Stack.Screen
              name="UserScreen"
              component={UserScreen}
              options={{
                animation: 'slide_from_bottom',
              }}
            />
            <Stack.Screen
              name="LocationScreen"
              component={LocationScreen}
              options={{
                animation: 'slide_from_bottom',
              }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const BottomTabNav = () => {
  const { account } = useSelector((state) => state.auth);
  return (
    <BottomTab.Navigator screenOptions={{ headerShown: false }}>
      <BottomTab.Screen
        name="OrderScreen"
        component={OrderScreen}
        options={{
          tabBarLabel: 'Orders',
          tabBarIcon: 'history',
        }}
      />
      {account.role === 1 && (
        <BottomTab.Screen
          name="CarScreen"
          component={CarScreen}
          options={{
            tabBarLabel: 'Cars',
            tabBarIcon: 'car',
          }}
        />
      )}
    </BottomTab.Navigator>
  );
};

export default MainApp;
