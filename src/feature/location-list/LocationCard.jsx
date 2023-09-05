import React from 'react';
import { List } from 'react-native-paper';

const LocationCard = ({ data, onPress }) => {
  return (
    <List.Item
      onPress={onPress}
      title={data}
      left={(props) => <List.Icon {...props} icon="map-marker" />}
    />
  );
};

export default LocationCard;
