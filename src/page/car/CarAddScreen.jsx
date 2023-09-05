import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import { Appbar, Snackbar } from 'react-native-paper';

import { useAddCarMutation } from '../../entity/car/carService';
import CarForm from '../../feature/car-form';
import LoadingDialog from '../../shared/component/LoadingDialog';

const CarAddScreen = ({ navigation }) => {
  const [addCar, { isLoading, isSuccess, error }] = useAddCarMutation();

  const [visibleSnackbar, setVisibleSnackbar] = useState(false);

  useEffect(() => {
    if (isSuccess) {
      setVisibleSnackbar(true);
    }
  }, [isSuccess]);

  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Add Car" />
      </Appbar.Header>
      <ScrollView style={{ backgroundColor: 'white' }}>
        <CarForm
          submit={(data) => {
            console.log('\nData ', JSON.stringify(data));
            addCar(data);
          }}
        />
      </ScrollView>
      <LoadingDialog visible={isLoading} />
      <Snackbar
        visible={visibleSnackbar}
        onDismiss={() => setVisibleSnackbar(false)}
        duration={3000}
        style={{ backgroundColor: '#5cb85c' }}>
        Success add car
      </Snackbar>
    </>
  );
};

export default CarAddScreen;
