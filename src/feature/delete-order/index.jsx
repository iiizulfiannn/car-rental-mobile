import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Appbar } from 'react-native-paper';

import { useDeleteOrderByIdMutation } from '../../entity/order/orderService';
import LoadingDialog from '../../shared/component/LoadingDialog';
import CofirmDeleteOrderDialog from './CofirmDeleteOrderDialog';

const DeleteOrder = ({ orderId, disabled }) => {
  const navigation = useNavigation();
  const [deleteOrderById, { isLoading, isSuccess }] = useDeleteOrderByIdMutation();

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
      <Appbar.Action
        icon="trash-can-outline"
        onPress={openDialog}
        color="#dc3545"
        disabled={disabled}
      />

      <CofirmDeleteOrderDialog
        visible={visible}
        close={closeDialog}
        submit={() => {
          deleteOrderById(orderId);
          closeDialog();
        }}
      />

      <LoadingDialog visible={isLoading} />
    </>
  );
};

export default DeleteOrder;
