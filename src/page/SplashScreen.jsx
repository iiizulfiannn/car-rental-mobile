import React, { useEffect } from 'react';
import { Image, View } from 'react-native';
import { useDispatch } from 'react-redux';

import { setAccount, setToken } from '../entity/auth/authSlice';
import { getData } from '../shared/helper/storage';

const SplashScreen = ({ navigation }) => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#004777',
      }}>
      <Image source={require('../../assets/image/logo.png')} />
    </View>
  );
};

export default SplashScreen;
