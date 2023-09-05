import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { FlatList, RefreshControl, View } from 'react-native';
import { ActivityIndicator, IconButton, Text } from 'react-native-paper';

import { useLazyGetAllOrderQuery } from '../../entity/order/orderService';
import OrderAddFAB from './OrderAddFAB';
import OrderCard from './OrderCard';

const OrderList = () => {
  const { navigate } = useNavigation();
  const [getAllOrder, { isLoading, data, isFetching, error }] = useLazyGetAllOrderQuery();

  const [isExtended, setIsExtended] = useState(true);

  const onScroll = ({ nativeEvent }) => {
    const currentScrollPosition = Math.floor(nativeEvent?.contentOffset?.y) ?? 0;
    setIsExtended(currentScrollPosition <= 0);
  };

  useEffect(() => {
    getAllOrder();
  }, []);

  const renderItem = ({ item }) => (
    <OrderCard
      data={item}
      onPress={() => navigate('OrderDetailScreen', { orderId: item.orderId })}
    />
  );

  const emptyList = (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 48,
      }}>
      <IconButton icon="file-find-outline" size={96} />
      <Text variant="bodyLarge">Empty Orders</Text>
    </View>
  );

  console.log({ data });
  console.log({ error });

  return (
    <>
      {isLoading || isFetching ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <FlatList
          data={data}
          refreshControl={<RefreshControl refreshing={isLoading} onRefresh={getAllOrder} />}
          keyExtractor={({ orderId }) => orderId.toString()}
          renderItem={renderItem}
          ListEmptyComponent={emptyList}
          onScroll={onScroll}
          style={{ backgroundColor: 'white' }}
        />
      )}
      <OrderAddFAB isExtended={isExtended} onPress={() => navigate('OrderAddScreen')} />
    </>
  );
};

export default OrderList;
