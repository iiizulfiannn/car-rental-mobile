import React, { useEffect } from 'react';
import { FlatList, RefreshControl, View } from 'react-native';

import UserUserd from './UserCard';
import { ActivityIndicator, IconButton, Text } from 'react-native-paper';
import { useLazyGetAllUserQuery } from '../../entity/user/userService';
import { useNavigation, useRoute } from '@react-navigation/native';

const UserList = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const isEdit = route.params?.isEdit;

  const [getAllUser, { isLoading, isFetching, isSuccess, data }] = useLazyGetAllUserQuery();

  useEffect(() => {
    getAllUser();
  }, []);

  return (
    <>
      {isLoading || isFetching ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <FlatList
          data={data}
          refreshControl={
            <RefreshControl refreshing={isLoading || isFetching} onRefresh={getAllUser} />
          }
          keyExtractor={({ userId }) => userId.toString()}
          renderItem={({ item }) => (
            <UserUserd
              data={item}
              onPress={() =>
                navigation.navigate(isEdit ? 'OrderEditScreen' : 'OrderAddScreen', {
                  selectedUser: item,
                })
              }
            />
          )}
          ListEmptyComponent={
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                paddingTop: 48,
              }}>
              <IconButton icon="file-find-outline" size={96} />
              <Text variant="bodyLarge">Empty User</Text>
            </View>
          }
          style={{ backgroundColor: 'white' }}
        />
      )}
    </>
  );
};

export default UserList;
