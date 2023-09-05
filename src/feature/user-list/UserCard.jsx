import React from 'react';
import { List } from 'react-native-paper';

const UserCard = ({ data, onPress }) => {
  return (
    <List.Item
      onPress={onPress}
      title={data.username}
      description={data.email}
      left={(props) => <List.Icon {...props} icon="account" />}
    />
  );
};

export default UserCard;
