import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { FlatList, RefreshControl, View } from 'react-native';
import { ActivityIndicator, IconButton, Text } from 'react-native-paper';

import CarAddFAB from './CarAddFAB';
import CarCard from './CarCard';
import { useLazyGetAllCarsQuery } from '../../entity/car/carService';

const CarList = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const goToBackGetTheCar = route.params?.fromScreen === 'order';
  const isEdit = route.params?.isEdit;

  const [getAllCars, { isLoading, data, isFetching }] = useLazyGetAllCarsQuery();

  const [isExtended, setIsExtended] = useState(true);

  useEffect(() => {
    getAllCars();
  }, []);

  const onScroll = ({ nativeEvent }) => {
    const currentScrollPosition = Math.floor(nativeEvent?.contentOffset?.y) ?? 0;
    setIsExtended(currentScrollPosition <= 0);
  };

  const onAddFAB = !goToBackGetTheCar ? () => navigation.navigate('CarAddScreen') : undefined;

  return (
    <>
      {isLoading || isFetching ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <FlatList
          data={data}
          refreshControl={<RefreshControl refreshing={isLoading} onRefresh={getAllCars} />}
          keyExtractor={({ carId }) => carId.toString()}
          renderItem={({ item }) => (
            <CarCard
              data={item}
              onPress={(item) => {
                if (goToBackGetTheCar) {
                  return navigation.navigate(isEdit ? 'OrderEditScreen' : 'OrderAddScreen', {
                    selectedCar: item,
                  });
                }

                navigation.navigate('CarDetailScreen', { car: item });
              }}
            />
          )}
          onScroll={onAddFAB && onScroll}
          ListEmptyComponent={
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                paddingTop: 48,
              }}>
              <IconButton icon="file-find-outline" size={96} />
              <Text variant="bodyLarge">Empty Car</Text>
            </View>
          }
          style={{ backgroundColor: 'white' }}
        />
      )}
      {onAddFAB && <CarAddFAB isExtended={isExtended} onPress={onAddFAB} />}
    </>
  );
};

export default CarList;
