import * as React from 'react';
import { ActivityIndicator, Platform, StyleSheet, View } from 'react-native';
import { Dialog, MD2Colors, MD3Colors, Portal, Text } from 'react-native-paper';

const isIOS = Platform.OS === 'ios';

const LoadingDialog = ({ visible }) => {
  return (
    <Portal>
      <Dialog visible={visible}>
        <Dialog.Title>Progress Dialog</Dialog.Title>
        <Dialog.Content>
          <View style={styles.flexing}>
            <ActivityIndicator
              color={MD3Colors.tertiary30}
              size={isIOS ? 'large' : 48}
              style={styles.marginRight}
            />
            <Text>Loading.....</Text>
          </View>
        </Dialog.Content>
      </Dialog>
    </Portal>
  );
};

const styles = StyleSheet.create({
  flexing: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  marginRight: {
    marginRight: 16,
  },
});

export default LoadingDialog;
