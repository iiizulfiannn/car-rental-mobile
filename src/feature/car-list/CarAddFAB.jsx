import React from 'react';
import { StyleSheet } from 'react-native';
import { AnimatedFAB } from 'react-native-paper';

const CarAddFAB = ({ isExtended, onPress }) => {
  return (
    <AnimatedFAB
      icon="plus"
      uppercase
      variant="tertiary"
      label="Add Car"
      extended={isExtended}
      onPress={onPress}
      visible
      animateFrom="right"
      iconMode="dynamic"
      style={[styles.fabStyle, {}]}
    />
  );
};

export default CarAddFAB;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  fabStyle: {
    bottom: 16,
    right: 16,
    position: 'absolute',
  },
});
