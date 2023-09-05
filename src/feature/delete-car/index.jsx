import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Appbar } from 'react-native-paper';
import CofirmDeleteCarDialog from './CofirmDeleteCarDialog';
import LoadingDialog from '../../shared/component/LoadingDialog';
import { useDeleteCarByIdMutation } from '../../entity/car/carService';
import { useNavigation } from '@react-navigation/native';

const DeleteCar = ({ carId }) => {
  const navigation = useNavigation();
  const [deleteCarById, { isLoading, isSuccess }] = useDeleteCarByIdMutation();

  const [visible, setVisible] = useState(false);
  const openDialog = () => setVisible(true);
  const closeDialog = () => setVisible(false);

  useEffect(() => {
    if (isSuccess) {
      navigation.goBack();
    }
  }, [isSuccess]);

  return (
    <>
      <Appbar.Action icon="trash-can-outline" onPress={openDialog} color="#dc3545" />

      <CofirmDeleteCarDialog
        visible={visible}
        close={closeDialog}
        submit={() => {
          deleteCarById(carId);
          closeDialog();
        }}
      />

      <LoadingDialog visible={isLoading} />
    </>
  );
};

export default DeleteCar;
