import React from 'react';
import { BackHandler, ScrollView } from 'react-native';
import { Appbar } from 'react-native-paper';

import LoginForm from '../feature/login-form';

const LoginScreen = ({ navigation }) => {
  return (
    <>
      <Appbar.Header mode="large">
        <Appbar.BackAction onPress={() => BackHandler.exitApp()} />
        <Appbar.Content title="Login Car Rental" />
      </Appbar.Header>
      <ScrollView style={{ backgroundColor: 'white' }}>
        <LoginForm onNavigateTo={() => navigation.replace('BottomTabNav')} />
      </ScrollView>
    </>
  );
};

export default LoginScreen;
