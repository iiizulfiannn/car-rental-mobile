import { useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, View } from 'react-native';
import { Button, Dialog, Portal, RadioButton, Text, TouchableRipple } from 'react-native-paper';

const RatingDialog = ({ visible, close, value, onChangeValue }) => {
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
              <TouchableRipple onPress={() => setChecked('1')}>
                <View style={styles.row}>
                  <View pointerEvents="none">
                    <RadioButton value="1" status={checked === '1' ? 'checked' : 'unchecked'} />
                  </View>
                  <Text variant="bodyLarge">1</Text>
                </View>
              </TouchableRipple>
              <TouchableRipple onPress={() => setChecked('2')}>
                <View style={styles.row}>
                  <View pointerEvents="none">
                    <RadioButton value="2" status={checked === '2' ? 'checked' : 'unchecked'} />
                  </View>
                  <Text variant="bodyLarge">2</Text>
                </View>
              </TouchableRipple>
              <TouchableRipple onPress={() => setChecked('3')}>
                <View style={styles.row}>
                  <View pointerEvents="none">
                    <RadioButton value="3" status={checked === '3' ? 'checked' : 'unchecked'} />
                  </View>
                  <Text variant="bodyLarge">3</Text>
                </View>
              </TouchableRipple>
              <TouchableRipple onPress={() => setChecked('4')}>
                <View style={styles.row}>
                  <View pointerEvents="none">
                    <RadioButton value="4" status={checked === '4' ? 'checked' : 'unchecked'} />
                  </View>
                  <Text variant="bodyLarge">4</Text>
                </View>
              </TouchableRipple>
              <TouchableRipple onPress={() => setChecked('5')}>
                <View style={styles.row}>
                  <View pointerEvents="none">
                    <RadioButton value="5" status={checked === '5' ? 'checked' : 'unchecked'} />
                  </View>
                  <Text variant="bodyLarge">5</Text>
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

export default RatingDialog;

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
