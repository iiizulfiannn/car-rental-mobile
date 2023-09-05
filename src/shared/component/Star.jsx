import { View, Text } from 'react-native';
import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Star = ({ count }) => {
  return (
    <View style={{ flexDirection: 'row', paddingTop: 8 }}>
      {Array.from(Array(count), (_, i) => (
        <MaterialCommunityIcons
          key={i}
          name="star"
          size={12}
          color="orange"
          style={{ marginRight: 4 }}
        />
      ))}
    </View>
  );
};

export default Star;
