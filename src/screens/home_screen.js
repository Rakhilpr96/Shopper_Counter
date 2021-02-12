import React from 'react';
import {View, Text, StyleSheet, Pressable, ScrollView} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import ProgressCircle from 'react-native-progress-circle';
import colors from '../config/colors';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {BASE_URL, getKey} from '../helpers/user';
import base64 from 'react-native-base64';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = ({route, navigation}) => {
  const ShopId = route.params.ShopId;
  return (
    <LinearGradient
      colors={['#A5FECB', '#20BDFF', '#5433FF']}
      style={styles.container}>
      <ScrollView
        contentContainerStyle={{paddingBottom: 20}}
        showsVerticalScrollIndicator={false}>
        <View style={[styles.cardContainer, {marginTop: 70}]}>
          <Text style={styles.cardText}>Door Name :</Text>
        </View>

        <View style={[styles.cardContainer, {marginTop: 20}]}>
          <Text style={styles.cardText}>Shop ID : {ShopId}</Text>
        </View>

        <View style={styles.progressBarContainer}>
          <ProgressCircle
            percent={20}
            radius={100}
            borderWidth={8}
            color="#0B3684"
            shadowColor="#e6e1f0"
            bgColor={colors.primary}>
            <View style={styles.progressTextContainer}>
              <Text style={styles.progressText}>12/50</Text>
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
            android_ripple={{color: 'rgba(0,0,0,0.1)'}}>
            <MaterialCommunityIcons
              name="minus"
              size={40}
              color={colors.primary}
              onPress={() => null}
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
            android_ripple={{color: 'rgba(0,0,0,0.1)'}}>
            <MaterialIcons
              name="add"
              size={40}
              color={colors.primary}
              onPress={() => null}
            />
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
