import React from 'react';
import {Image, Text, View} from 'react-native';
import {APP_COLOR} from '../Utils/Theme';

const SplashScreen = (props) => {
  React.useEffect(() => {
    setTimeout(() => {
      props.navigation.replace('Dashboard');
    }, 1000);
  }, []);
  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        backgroundColor: APP_COLOR.background,
      }}>
      <Image
        style={{width: 200, height: 200}}
        source={require('../Utils/assets/appIcon.png')}></Image>
      <Text style={{fontSize: 18, color: APP_COLOR.appColor}}>
        {'My Book Library'}
      </Text>
    </View>
  );
};

export default SplashScreen;
