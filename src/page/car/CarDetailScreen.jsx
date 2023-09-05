import { useIsFocused } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Image, ScrollView, View } from 'react-native';
import RNFetchBlob from 'react-native-blob-util';
import { ActivityIndicator, Appbar, List } from 'react-native-paper';

import { useLazyGetCarByIdQuery } from '../../entity/car/carService';
import DeleteCar from '../../feature/delete-car';
import Star from '../../shared/component/Star';

const CarDetailScreen = ({ navigation, route }) => {
  const carId = route.params?.car.carId;
  const [getCarById, { isLoading, data, isFetching }] = useLazyGetCarByIdQuery();

  const isFocus = useIsFocused();

  useEffect(() => {
    console.log('hit isFocus');
    getCarById(carId);
  }, [isFocus]);

  const [imageUri, setImageUri] = useState(null);

  useEffect(() => {
    data?.image && downloadImage();
  }, [data, isFocus]);

  const downloadImage = async () => {
    try {
      const response = await RNFetchBlob.config({
        fileCache: true,
      }).fetch('GET', data?.image);

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
        <Appbar.Content title="Detail Car" />
        <Appbar.Action
          icon="file-edit-outline"
          onPress={() => navigation.navigate('CarEditScreen', { car: data })}
          color="#0d6efd"
        />
        <DeleteCar carId={carId} />
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
                title={data.name}
                titleStyle={{ fontSize: 24 }}
                right={() => <Star count={data.rating} />}
              />
              <List.Item title="Type" description={data.carType} />
              <List.Item title="Fuel" description={data.fuel} />
              <List.Item title="Hour Rate" description={data.hourRate} />
              <List.Item title="Day Rate" description={data.dayRate} />
              <List.Item title="Month Rate" description={data.monthRate} />
            </List.Section>
          </View>
        </ScrollView>
      ) : null}
    </>
  );
};

export default CarDetailScreen;
