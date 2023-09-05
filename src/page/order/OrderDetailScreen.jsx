import React, { useEffect, useState } from 'react';
import { Image, ScrollView, View } from 'react-native';
import RNFetchBlob from 'react-native-blob-util';
import { ActivityIndicator, Appbar, List, Text } from 'react-native-paper';

import moment from 'moment';
import { useLazyGetOrderByIdQuery } from '../../entity/order/orderService';
import DeleteOrder from '../../feature/delete-order';
import Star from '../../shared/component/Star';
import { useIsFocused } from '@react-navigation/native';

const OrderDetailScreen = ({ navigation, route }) => {
  const orderId = route.params.orderId;

  const [getOrderById, { isLoading, isFetching, isError, data }] = useLazyGetOrderByIdQuery();

  const isFocus = useIsFocused();

  useEffect(() => {
    getOrderById(orderId);
  }, [isFocus]);

  const [imageUri, setImageUri] = useState(null);

  useEffect(() => {
    data?.car.image && downloadImage();
  }, [data, isFocus]);

  const downloadImage = async () => {
    try {
      const response = await RNFetchBlob.config({
        fileCache: true,
      }).fetch('GET', data?.car.image);

      if (response.respInfo.status === 200) {
        const imagePath = response.path();
        setImageUri('file://' + imagePath); // Display the downloaded image
      } else {
        console.error('Failed to download image');
      }
    } catch (error) {
      console.error('Error downloading image:', error);
    }
  };

  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Detail Order" />
        <Appbar.Action
          icon="file-edit-outline"
          onPress={() => navigation.navigate('OrderEditScreen', { order: data })}
          disabled={!data}
          color="#0d6efd"
        />
        <DeleteOrder orderId={orderId} disabled={!data} />
      </Appbar.Header>
      {isLoading || isFetching ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" />
        </View>
      ) : data ? (
        <ScrollView style={{ backgroundColor: 'white' }}>
          <View style={{ flex: 1 }}>
            <View style={{ width: 250, height: 150, alignSelf: 'center' }}>
              {imageUri && (
                <Image
                  source={{ uri: imageUri }}
                  style={{ width: 250, height: 150, resizeMode: 'contain' }}
                />
              )}
            </View>
            <List.Section>
              <List.Item
                title="Pick Up Location"
                description={data.pickUpLoc}
                left={(props) => <List.Icon {...props} icon="map-marker" />}
              />
              <List.Item
                title="Drop Off Location"
                description={data.dropOffLoc}
                left={(props) => <List.Icon {...props} icon="map-marker-outline" />}
              />
              <List.Item
                title="Pick Up Date"
                description={moment(new Date(data.pickUpDate)).format('DD MMMM YYYY')}
                left={(props) => <List.Icon {...props} icon="calendar" />}
              />
              <List.Item
                title="Pick Up Time"
                description={moment(moment(data.pickUpTime, 'HH:mm:ss')).format('HH:mm')}
                left={(props) => <List.Icon {...props} icon="clock" />}
              />
              <List.Item
                title="Drop Off Date"
                description={moment(new Date(data.dropOffDate)).format('DD MMMM YYYY')}
                left={(props) => <List.Icon {...props} icon="calendar-outline" />}
              />
            </List.Section>
            <List.Section>
              <List.Item
                title={data.user.username}
                titleStyle={{ fontSize: 24 }}
                right={() => <Text>{data.user.email}</Text>}
              />
              <List.Item title="Message" description={data.user.message} />
              <List.Item title="Phone Number" description={data.user.phoneNumber} />
            </List.Section>
            <List.Section>
              <List.Item
                title={data.car.name}
                titleStyle={{ fontSize: 24 }}
                right={() => <Star count={data.car.rating} />}
              />
              <List.Item title="Type" description={data.car.carType} />
              <List.Item title="Fuel" description={data.car.fuel} />
              <List.Item title="Hour Rate" description={data.car.hourRate} />
              <List.Item title="Day Rate" description={data.car.dayRate} />
              <List.Item title="Month Rate" description={data.car.monthRate} />
            </List.Section>
          </View>
        </ScrollView>
      ) : null}
    </>
  );
};

export default OrderDetailScreen;
