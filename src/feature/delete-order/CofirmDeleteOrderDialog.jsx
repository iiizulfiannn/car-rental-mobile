import { StyleSheet, View } from 'react-native';
import React from 'react';
import { Button, Dialog, MD3Colors, Portal, Text } from 'react-native-paper';

const CofirmDeleteOrderDialog = ({ visible, close, submit }) => {
  return (
    <Portal>
      <Dialog onDismiss={close} visible={visible}>
        <Dialog.Icon icon="alert" />
        <Dialog.Title style={styles.title}>Delete Order</Dialog.Title>
        <Dialog.Content>
          <Text variant="bodyLarge">Are you sure delete this order?</Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={close} color={MD3Colors.error50}>
            Disagree
          </Button>
          <Button onPress={submit}>Agree</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default CofirmDeleteOrderDialog;

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
  },
});
