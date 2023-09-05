import { useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, View } from 'react-native';
import { Button, Dialog, Portal, RadioButton, Text, TouchableRipple } from 'react-native-paper';

const FuelDialog = ({ visible, close, value, onChangeValue }) => {
  const [checked, setChecked] = useState(value);

  const closeModal = () => {
    setChecked(value);
    close();
  };

  const submit = () => {
    onChangeValue(checked);
    close();
  };

  return (
    <Portal>
      <Dialog onDismiss={closeModal} visible={visible}>
        <Dialog.Title>Choose an option</Dialog.Title>
        <Dialog.ScrollArea style={styles.container}>
          <ScrollView>
            <View>
              <TouchableRipple onPress={() => setChecked('Gas Online')}>
                <View style={styles.row}>
                  <View pointerEvents="none">
                    <RadioButton
                      value="Gas Online"
                      status={checked === 'Gas Online' ? 'checked' : 'unchecked'}
                    />
                  </View>
                  <Text variant="bodyLarge">Gas Online</Text>
                </View>
              </TouchableRipple>
              <TouchableRipple onPress={() => setChecked('Solar')}>
                <View style={styles.row}>
                  <View pointerEvents="none">
                    <RadioButton
                      value="Solar"
                      status={checked === 'Solar' ? 'checked' : 'unchecked'}
                    />
                  </View>
                  <Text variant="bodyLarge">Solar</Text>
                </View>
              </TouchableRipple>
              <TouchableRipple onPress={() => setChecked('Eletric')}>
                <View style={styles.row}>
                  <View pointerEvents="none">
                    <RadioButton
                      value="Eletric"
                      status={checked === 'Eletric' ? 'checked' : 'unchecked'}
                    />
                  </View>
                  <Text variant="bodyLarge">Eletric</Text>
                </View>
              </TouchableRipple>
            </View>
          </ScrollView>
        </Dialog.ScrollArea>
        <Dialog.Actions>
          <Button onPress={closeModal}>Cancel</Button>
          <Button onPress={submit}>Ok</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default FuelDialog;

const styles = StyleSheet.create({
  container: {
    maxHeight: Dimensions.get('screen').height * 0.8,
    paddingHorizontal: 0,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  text: {
    paddingLeft: 8,
  },
});
