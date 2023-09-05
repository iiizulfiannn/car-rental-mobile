import notifee, { AndroidImportance } from '@notifee/react-native';

export const DisplayNotification = async (remoteMessage) => {
  const {
    notification: { title, body },
  } = remoteMessage;

  const channelId = await notifee.createChannel({
    id: 'default',
    name: 'Default channel',
    importance: AndroidImportance.HIGH,
  });

  await notifee.displayNotification({
    title,
    body,
    android: { channelId },
  });
};
