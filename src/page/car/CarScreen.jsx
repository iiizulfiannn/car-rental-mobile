import React from 'react';
import { Appbar } from 'react-native-paper';

import CarList from '../../feature/car-list';

const CarScreen = ({ navigation, route }) => {
  const goToBackGetTheCar = route.params?.fromScreen === 'order';

  return (
    <>
      <Appbar.Header>
        {goToBackGetTheCar && <Appbar.BackAction onPress={() => navigation.goBack()} />}
        <Appbar.Content title="Cars" />
      </Appbar.Header>
      <CarList />
    </>
  );
};

export default CarScreen;
