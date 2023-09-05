import React, { useEffect } from 'react';
import { Appbar } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import messaging from '@react-native-firebase/messaging';

import { logout } from '../../entity/auth/authSlice';
import OrderList from '../../feature/order-list';
import { removeData } from '../../shared/helper/storage';
import { PermissionsAndroid } from 'react-native';
import { useRegisterTokenMutation } from '../../entity/admin/adminService';
import { DisplayNotification } from '../../feature/display-notification';

const OrderScreen = () => {
  const dipatch = useDispatch();
  const [registerNotif, { isSuccess, error }] = useRegisterTokenMutation();
  const account = useSelector((state) => state.auth.account);
  const isAdmin = account.role === 1;

  // console.log('\nregisterNotif ', isSuccess);
  // console.log('\nregisterNotiferror ', error);

  useEffect(() => {
    if (isAdmin) {
      const listenerMessaging = () => {
        // Handle notifications when the app is in the foreground
        messaging().onMessage(async (remoteMessage) => {
          console.log('Message handled in the foreground!', remoteMessage);
          // alert(JSON.stringify(remoteMessage));
          DisplayNotification(remoteMessage);
        });

        // Handle notifications when the app is terminated
        messaging()
          .getInitialNotification()
          .then((remoteMessage) => {
            if (remoteMessage) {
              DisplayNotification(remoteMessage);
              console.log('Message handled on app startup!', remoteMessage);
            }
          });
      };

      const getFCMToken = async () => {
        try {
          const token = await messaging().getToken();
          if (token) {
            console.log('FCM Token:', token);
            // You can now send this token to your server for targeting push notifications.
            registerNotif({ adminId: account.adminId, tokenNotif: token });
            listenerMessaging();
          } else {
            console.error('FCM Token not available');
          }
        } catch (error) {
          console.error('Error getting FCM token:', error);
        }
      };

      // request permission
      const requestUserPermission = async () => {
        try {
          // Request permission for notifications
          await messaging().requestPermission();
          const granted = await messaging().hasPermission();

          if (granted) {
            console.log('Notification permissions granted.');
            // You can now get the FCM token or handle notifications.
            getFCMToken();
          } else {
            console.log('Notification permissions denied.');
          }
        } catch (error) {
          console.error('Error requesting notification permission:', error);
        }
      };

      // Check for existing permission status
      // const initMessage = () =>
      //   messaging()
      //     .hasPermission()
      //     .then((enabled) => {
      //       if (enabled) {
      //         console.log('Notification permissions are already granted.');
      //         // Function to get the FCM token
      //         getFCMToken();
      //       } else {
      //         console.log('Notification permissions need to be requested.');
      //         requestUserPermission();
      //       }
      //     })
      //     .catch((error) => {
      //       console.error('Error checking notification permission:', error);
      //     });
      PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
      requestUserPermission();
    }
  }, []);

  return (
    <>
      <Appbar.Header>
        <Appbar.Content title="Car Rental" />
        <Appbar.Action
          icon="logout"
          color="red"
          onPress={async () => {
            dipatch(logout());
            await removeData('account');
          }}
        />
      </Appbar.Header>
      <OrderList />
    </>
  );
};

export default OrderScreen;
