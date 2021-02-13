// import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import Alert from 'react-native';
import MainNavigation from './src/navigation/main_navigation';
import messaging from '@react-native-firebase/messaging';

const App = () => {
  // useEffect(() => {
  //   const unsubscribe = messaging().onMessage(async (remoteMessage) => {
  //     Alert.alert(
  //       remoteMessage.notification.title,
  //       remoteMessage.notification.body,
  //     );
  //   });
  //   return unsubscribe;
  // }, []);
  return <MainNavigation />;
};

export default App;
