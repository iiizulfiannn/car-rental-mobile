import React from 'react';
import { Appbar } from 'react-native-paper';

import LocationList from '../feature/location-list';
import LOCATIONS from '../shared/dummy/LOCATIONS';

const LocationScreen = ({ navigation, route }) => {
  const type = route.params.type;
  const isEdit = route.params?.isEdit;

  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Location" />
      </Appbar.Header>
      <LocationList
        data={LOCATIONS}
        onItem={(item) => {
          let data;

          if (type === 'pickUp') {
            data = { selectedPickUpLoc: item };
          }
          if (type === 'dropOff') {
            data = { selectedDropOffLoc: item };
          }

          return navigation.navigate(isEdit ? 'OrderEditScreen' : 'OrderAddScreen', data);
        }}
      />
    </>
  );
};

export default LocationScreen;
