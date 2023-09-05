import MainApp from './src/app';
import messaging from '@react-native-firebase/messaging';

// Initialize Firebase
messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  console.log('Message handled in the background!', remoteMessage);
});
export default function App() {
  return <MainApp />;
}
