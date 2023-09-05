import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import { Appbar, Snackbar } from 'react-native-paper';

import { useUpdateOrderMutation } from '../../entity/order/orderService';
import OrderForm from '../../feature/order-form';
import LoadingDialog from '../../shared/component/LoadingDialog';

const OrderEditScreen = ({ navigation, route }) => {
  const [order] = useState(route.params?.order);
  const [updateOrder, { isLoading, isSuccess, error, data }] = useUpdateOrderMutation();

  const [visibleSnackbar, setVisibleSnackbar] = useState(false);

  useEffect(() => {
    if (isSuccess) {
      setVisibleSnackbar(true);
      setTimeout(() => {
        navigation.goBack();
      }, 2000);
    }
  }, [isSuccess]);

  // console.log({ order });
  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Edit Order" />
      </Appbar.Header>
      <ScrollView style={{ backgroundColor: 'white' }}>
        <OrderForm
          initialValues={{ ...order }}
          submit={(data) => {
            console.log('\nData ', JSON.stringify(data));
            updateOrder({ orderId: order.orderId, body: data });
          }}
        />
      </ScrollView>
      <LoadingDialog visible={isLoading} />
      <Snackbar
        visible={visibleSnackbar}
        onDismiss={() => setVisibleSnackbar(false)}
        duration={3000}
        style={{ backgroundColor: '#5cb85c' }}>
        Success update order
      </Snackbar>
    </>
  );
};

export default OrderEditScreen;
