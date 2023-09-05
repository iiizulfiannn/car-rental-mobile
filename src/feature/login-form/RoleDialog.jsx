import { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import {
  Button,
  Dialog,
  Portal,
  RadioButton,
  Text,
  TouchableRipple,
} from "react-native-paper";

const RoleDialog = ({ visible, close, value, onChangeValue }) => {
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
              <TouchableRipple onPress={() => setChecked("admin")}>
                <View style={styles.row}>
                  <View pointerEvents="none">
                    <RadioButton
                      value="admin"
                      status={checked === "admin" ? "checked" : "unchecked"}
                    />
                  </View>
                  <Text variant="bodyLarge">Admin</Text>
                </View>
              </TouchableRipple>
              <TouchableRipple onPress={() => setChecked("user")}>
                <View style={styles.row}>
                  <View pointerEvents="none">
                    <RadioButton
                      value="user"
                      status={checked === "user" ? "checked" : "unchecked"}
                    />
                  </View>
                  <Text variant="bodyLarge">User</Text>
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

export default RoleDialog;

const styles = StyleSheet.create({
  container: {
    maxHeight: 170,
    paddingHorizontal: 0,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  text: {
    paddingLeft: 8,
  },
});
