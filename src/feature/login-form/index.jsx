import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { Pressable, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { useDispatch } from 'react-redux';

import RoleDialog from './RoleDialog';
import { useSigninMutation } from '../../entity/auth/authService';
import { setAccount, setToken } from '../../entity/auth/authSlice';
import { storeData } from '../../shared/helper/storage';

const LoginForm = ({ onNavigateTo }) => {
  const dispatch = useDispatch();
  const [signIn, { isLoading, isSuccess, data }] = useSigninMutation();
  const formik = useFormik({
    initialValues: {
      email: 'zuladmin@gmail.com',
      password: 'admin123',
      role: 'admin',
    },
    onSubmit: (values) => {
      signIn({
        body: {
          email: values.email,
          password: values.password,
          role: values.role === 'admin' ? 1 : 2,
        },
      });
    },
  });

  useEffect(() => {
    if (isSuccess) {
      handleSuccess();
    }
  }, [isSuccess]);

  const handleSuccess = async () => {
    try {
      dispatch(setToken(data.accessToken));
      dispatch(setAccount(data));
      await storeData('account', { ...data });
      onNavigateTo();
    } catch (error) {
      console.log({ error });
    }
  };

  const { values, handleChange, setFieldValue, handleSubmit } = formik;

  const [visibleRoleModal, setVisibleRoleModal] = useState(false);
  const openRoleModal = () => setVisibleRoleModal(true);
  const closeRoleModal = () => setVisibleRoleModal(false);

  return (
    <View style={{ rowGap: 32, padding: 16 }}>
      <View
        style={{
          flex: 1,
          rowGap: 16,
        }}>
        <TextInput label="Email" value={values.email} onChangeText={handleChange('email')} />
        <TextInput
          label="Password"
          value={values.password}
          onChangeText={handleChange('password')}
          secureTextEntry
          right={<TextInput.Icon icon="eye" />}
        />
        <Pressable onPress={openRoleModal}>
          <TextInput
            label="Role"
            value={values.role}
            pointerEvents="none"
            editable={false}
            onChangeText={handleChange('role')}
            contentStyle={{ textTransform: 'capitalize' }}
            right={<TextInput.Icon icon="chevron-down" />}
          />
        </Pressable>
      </View>
      <Button
        mode="contained"
        icon="login"
        onPress={handleSubmit}
        disabled={isLoading}
        loading={isLoading}>
        Login
      </Button>
      <RoleDialog
        visible={visibleRoleModal}
        close={closeRoleModal}
        value={values.role}
        onChangeValue={(role) => setFieldValue('role', role)}
      />
    </View>
  );
};

export default LoginForm;
