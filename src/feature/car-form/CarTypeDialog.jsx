import { useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, View } from 'react-native';
import { Button, Dialog, Portal, RadioButton, Text, TouchableRipple } from 'react-native-paper';

const CarTypeDialog = ({ visible, close, value, onChangeValue }) => {
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
              <TouchableRipple onPress={() => setChecked('Sedan')}>
                <View style={styles.row}>
                  <View pointerEvents="none">
                    <RadioButton
                      value="Sedan"
                      status={checked === 'Sedan' ? 'checked' : 'unchecked'}
                    />
                  </View>
                  <Text variant="bodyLarge">Sedan</Text>
                </View>
              </TouchableRipple>
              <TouchableRipple onPress={() => setChecked('SUV')}>
                <View style={styles.row}>
                  <View pointerEvents="none">
                    <RadioButton value="SUV" status={checked === 'SUV' ? 'checked' : 'unchecked'} />
                  </View>
                  <Text variant="bodyLarge">SUV</Text>
                </View>
              </TouchableRipple>
              <TouchableRipple onPress={() => setChecked('Mini Van')}>
                <View style={styles.row}>
                  <View pointerEvents="none">
                    <RadioButton
                      value="Mini Van"
                      status={checked === 'Mini Van' ? 'checked' : 'unchecked'}
                    />
                  </View>
                  <Text variant="bodyLarge">Mini Van</Text>
                </View>
              </TouchableRipple>
              <TouchableRipple onPress={() => setChecked('Crossover')}>
                <View style={styles.row}>
                  <View pointerEvents="none">
                    <RadioButton
                      value="Crossover"
                      status={checked === 'Crossover' ? 'checked' : 'unchecked'}
                    />
                  </View>
                  <Text variant="bodyLarge">Crossover</Text>
                </View>
              </TouchableRipple>
              <TouchableRipple onPress={() => setChecked('Pickup')}>
                <View style={styles.row}>
                  <View pointerEvents="none">
                    <RadioButton
                      value="Pickup"
                      status={checked === 'Pickup' ? 'checked' : 'unchecked'}
                    />
                  </View>
                  <Text variant="bodyLarge">Pickup</Text>
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

export default CarTypeDialog;

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
