import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { AnimatedFAB } from "react-native-paper";

const OrderAddFAB = ({ isExtended, onPress }) => {
  return (
    <AnimatedFAB
      icon={"plus"}
      uppercase
      variant="tertiary"
      label={"Add Order"}
      extended={isExtended}
      onPress={onPress}
      visible={true}
      animateFrom={"right"}
      iconMode={"dynamic"}
      style={[styles.fabStyle, {}]}
    />
  );
};

export default OrderAddFAB;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  fabStyle: {
    bottom: 16,
    right: 16,
    position: "absolute",
  },
});
