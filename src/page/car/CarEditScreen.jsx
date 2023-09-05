import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import { Appbar, Snackbar } from 'react-native-paper';

import { useUpdateCarMutation } from '../../entity/car/carService';
import CarForm from '../../feature/car-form';
import LoadingDialog from '../../shared/component/LoadingDialog';

const CarEditScreen = ({ navigation, route }) => {
  const car = route.params?.car;
  const [updateCar, { isLoading, isSuccess, error, data }] = useUpdateCarMutation();

  const [visibleSnackbar, setVisibleSnackbar] = useState(false);

  useEffect(() => {
    if (isSuccess) {
      setVisibleSnackbar(true);
      setTimeout(() => {
        navigation.goBack();
      }, 2000);
    }
  }, [isSuccess]);

  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Edit Car" />
      </Appbar.Header>
      <ScrollView style={{ backgroundColor: 'white' }}>
        <CarForm
          initialValues={{ ...car }}
          submit={(data) => {
            // console.log('\nData ', JSON.stringify(data));
            updateCar({ carId: car.carId, body: data });
          }}
        />
      </ScrollView>
      <LoadingDialog visible={isLoading} />
      <Snackbar
        visible={visibleSnackbar}
        onDismiss={() => setVisibleSnackbar(false)}
        duration={3000}
        style={{ backgroundColor: '#5cb85c' }}>
        Success update car
      </Snackbar>
    </>
  );
};

export default CarEditScreen;
