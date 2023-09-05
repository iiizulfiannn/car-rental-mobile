import React from 'react';
import { Appbar } from 'react-native-paper';

import UserList from '../../feature/user-list';

const UserScreen = ({ navigation }) => {
  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Users" />
      </Appbar.Header>

      <UserList />
    </>
  );
};

export default UserScreen;
