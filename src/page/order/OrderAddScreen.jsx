import React, { useEffect } from 'react';
import { ScrollView } from 'react-native';
import { Appbar } from 'react-native-paper';

import OrderForm from '../../feature/order-form';
import { useAddOrderMutation } from '../../entity/order/orderService';
import LoadingDialog from '../../shared/component/LoadingDialog';

const OrderAddScreen = ({ navigation }) => {
  const [addOrder, { isLoading, isSuccess, error }] = useAddOrderMutation();
  useEffect(() => {
    if (isSuccess) {
      navigation.goBack();
    }
  }, [isSuccess]);
  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Add Order" />
      </Appbar.Header>
      <ScrollView style={{ backgroundColor: 'white' }}>
        <OrderForm
          submit={(data) => {
            console.log('\nData ', JSON.stringify(data));
            addOrder(data);
          }}
        />
      </ScrollView>
      <LoadingDialog visible={isLoading} />
    </>
  );
};

export default OrderAddScreen;
