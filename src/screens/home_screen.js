import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  Alert,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import ProgressCircle from 'react-native-progress-circle';
import colors from '../config/colors';
import messaging from '@react-native-firebase/messaging';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {BASE_URL, getKey} from '../helpers/user';
import base64 from 'react-native-base64';

const HomeScreen = ({route, navigation}) => {
  const [ShopId, setShopId] = useState('');
  const [doorName, setDoorName] = useState('');
  const [limit, setLimit] = useState('');
  const [currentLimit, setCurrentLimit] = useState('');
  const [perVal, setPerVal] = useState(0);
  const [circleColor, setCircleColor] = useState('#32a852');

  useEffect(() => {
    const fetchData = async () => {
      let key = await getKey();
      if (!key) {
        navigation.navigate('Home');
      } else {
        getDetails();
        const token = await messaging().getToken();
        console.log('key :' + key);
        let headers = new Headers();
        headers.append(
          'Authorization',
          'Basic ' + base64.encode('apiuser:a22323212'),
        );
        headers.append('Content-Type', 'application/json');
        fetch(`${BASE_URL}/addOrUpdateGuardNotifications`, {
          method: 'POST',
          headers: headers,
          body: JSON.stringify({
            deviceToken: token.toString(),
            deviceType: 'string',
            guardKey: key.toString(),
            notify: true,
          }),
        })
          .then((response) => response.json())
          .then(async (json) => {
            console.log('Notification response =======', json);
            console.log('Token =============', token);
          });

        const unsubscribe = messaging().onMessage(async (remoteMessage) => {
          console.log(remoteMessage);
          message_body = JSON.stringify(remoteMessage.notification.body);
          Alert.alert('A new FCM message arrived!', message_body);
        });

        messaging().setBackgroundMessageHandler(async (remoteMessage) => {
          console.log('Message handled in the background!', remoteMessage);
        });

        return unsubscribe;
      }
    };
    fetchData();
  }, []);

  const getDetails = async () => {
    let headers = new Headers();
    headers.append(
      'Authorization',
      'Basic ' + base64.encode('apiuser:a22323212'),
    );
    if (!key) {
      navigation.navigate('Home');
    }
    let key = await getKey();

    headers.append('Content-Type', 'application/json');
    fetch(`${BASE_URL}/findDetails/${key}`, {
      method: 'GET',
      headers: headers,
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.error) {
          navigation.navigate('Home');
        }
        console.log(json.guard);
        setCurrentLimit(json.depotCurrentLimit);
        setLimit(json.depotLimit);
        setDoorName(json.guard.name);
        setShopId(route.params.ShopId);
        calculatePercent(json.depotCurrentLimit, json.depotLimit);
      });
  };

  const addOne = async () => {
    console.log('Add one');
    let headers = new Headers();
    headers.append(
      'Authorization',
      'Basic ' + base64.encode('apiuser:a22323212'),
    );
    headers.append('Content-Type', 'application/json');
    let key = await getKey();
    console.log('MY KEY =============', key);
    fetch(`${BASE_URL}/plusOne/${key}`, {
      method: 'GET',
      headers: headers,
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        // setMessage('Person was let in, recorded successfully');
        setCurrentLimit(json.depotCurrentLimit);
        setLimit(json.depotLimit);
        calculatePercent(json.depotCurrentLimit, json.depotLimit);
        // if (!json.allowPerson) {
        //   setMessage(json.notAllowReason);
        // }
      });
  };

  const minusOne = async () => {
    console.log('minus one');
    let headers = new Headers();
    headers.append(
      'Authorization',
      'Basic ' + base64.encode('apiuser:a22323212'),
    );
    headers.append('Content-Type', 'application/json');
    let key = await getKey();
    fetch(`${BASE_URL}/minusOne/${key}`, {
      method: 'GET',
      headers: headers,
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        // setMessage('Person was let out, recorded successfully');
        setCurrentLimit(json.depotCurrentLimit);
        setLimit(json.depotLimit);
        calculatePercent(json.depotCurrentLimit, json.depotLimit);
      });
  };

  const calculatePercent = (currentLimit, limit) => {
    percentage_val = (currentLimit * 100) / limit;
    setPerVal(percentage_val);
    if (percentage_val >= 33 && percentage_val < 66) {
      setCircleColor('#d6d306');
    } else if (percentage_val >= 66 && percentage_val <= 100) {
      setCircleColor('#d61706');
    } else {
      setCircleColor('#32a852');
    }
  };

  return (
    <LinearGradient
      colors={['#A5FECB', '#20BDFF', '#5433FF']}
      style={styles.container}>
      <ScrollView
        contentContainerStyle={{paddingBottom: 20}}
        showsVerticalScrollIndicator={false}>
        <View style={[styles.cardContainer, {marginTop: 70}]}>
          <Text style={styles.cardText}>Door Name : {doorName}</Text>
        </View>

        <View style={[styles.cardContainer, {marginTop: 20}]}>
          <Text style={styles.cardText}>Shop ID : {ShopId}</Text>
        </View>

        <View style={styles.progressBarContainer}>
          <ProgressCircle
            percent={perVal}
            radius={100}
            borderWidth={8}
            color="#0B3684"
            shadowColor="#e6e1f0"
            bgColor={circleColor}>
            <View style={styles.progressTextContainer}>
              <Text style={styles.progressText}>
                {currentLimit}/{limit}
              </Text>
            </View>
          </ProgressCircle>
        </View>

        <View style={styles.buttonContainer}>
          <Pressable
            style={[
              styles.functionButton,
              {
                marginRight: 2,
                borderTopLeftRadius: 15,
                borderBottomLeftRadius: 15,
              },
            ]}
            android_ripple={{color: 'rgba(0,0,0,0.1)'}}
            onPress={() => minusOne()}>
            <MaterialCommunityIcons
              name="minus"
              size={40}
              color={colors.primary}
            />
          </Pressable>

          <Pressable
            style={[
              styles.functionButton,
              {
                marginLeft: 2,
                borderTopRightRadius: 15,
                borderBottomRightRadius: 15,
              },
            ]}
            android_ripple={{color: 'rgba(0,0,0,0.1)'}}
            onPress={() => addOne()}>
            <MaterialIcons name="add" size={40} color={colors.primary} />
          </Pressable>
        </View>
      </ScrollView>
      <View style={styles.settingsButtonContainer}>
        <MaterialIcons
          name="settings"
          size={30}
          color={colors.secondary}
          onPress={() => navigation.navigate('Settings', {ShopId: ShopId})}
        />
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  cardContainer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    borderRadius: 5,
    borderColor: colors.primary,
  },
  cardText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.primary,
  },
  progressBarContainer: {
    alignItems: 'center',
    marginVertical: 80,
  },
  progressTextContainer: {
    backgroundColor: '#274099',
    height: 130,
    width: 130,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 130 / 2,
  },
  progressText: {
    fontSize: 25,
    color: colors.primary,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  functionButton: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    paddingVertical: 50,
    alignItems: 'center',
  },
  settingsButtonContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
});

export default HomeScreen;

// import React from 'react';
// import {View, Text, StyleSheet} from 'react-native';
// import LinearGradient from 'react-native-linear-gradient';
// import ProgressCircle from 'react-native-progress-circle';

// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

// const HomeScreen = ({navigation}) => {
//   return (
//     <View style={styles.container}>
//       <LinearGradient
//         start={{x: 0, y: 0}}
//         end={{x: 1, y: 0}}
//         colors={['#FC466B', '#3F5EFB']}
//         style={styles.sideBarContainer}>
//         <Text style={styles.sideBarText}>Door Name :</Text>
//         <Text style={styles.sideBarText}>Shop ID :</Text>
//       </LinearGradient>

//       <View style={styles.progressContainer}>
//         <ProgressCircle
//           percent={20}
//           radius={100}
//           borderWidth={8}
//           color="#0B3684"
//           shadowColor="#e6e1f0"
//           bgColor="#fff">
//           <View style={styles.progressTextContainer}>
//             <Text style={styles.progressText}>12/50</Text>
//           </View>
//         </ProgressCircle>
//       </View>

//       <View style={styles.buttonContainer}>
//         <MaterialIcons
//           name="settings"
//           size={30}
//           color="#B2BCC6"
//           onPress={() => navigation.navigate('Settings')}
//         />
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#E3EDF7',
//   },
//   sideBarContainer: {
//     height: 150,
//     backgroundColor: 'blue',
//     marginTop: 80,
//     marginRight: 40,
//     borderTopRightRadius: 30,
//     borderBottomRightRadius: 30,
//     justifyContent: 'center',
//   },
//   sideBarText: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginVertical: 10,
//     paddingHorizontal: 20,
//     letterSpacing: 1,
//   },
//   progressText: {
//     fontSize: 25,
//     color: 'black',
//   },
//   progressContainer: {
//     alignItems: 'center',
//     marginTop: 50,
//     shadowColor: '#fff',
//     shadowOffset: {
//       width: 0,
//       height: 0,
//     },
//     shadowOpacity: 0.9,
//     shadowRadius: 10,

//     elevation: 24,
//   },
//   buttonContainer: {
//     position: 'absolute',
//     top: 10,
//     right: 10,
//     padding: 8,
//     backgroundColor: '#E3EDF7',
//     borderRadius: 50,
//     shadowColor: '#fff',
//     shadowOffset: {
//       width: 0,
//       height: 0,
//     },
//     shadowOpacity: 0.9,
//     shadowRadius: 10,

//     elevation: 10,
//   },
// });

// export default HomeScreen;
