import React from 'react';
import { FlatList } from 'react-native';

import LocationCard from './LocationCard';

const LocationList = ({ data, onItem }) => {
  return (
    <FlatList
      data={data}
      keyExtractor={(_, index) => index.toString()}
      renderItem={({ item }) => <LocationCard data={item} onPress={() => onItem(item)} />}
      style={{ backgroundColor: 'white' }}
    />
  );
};

export default LocationList;
