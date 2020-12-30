import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  Switch,
  ImageBackground,
  Image,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {APP_COLOR} from '../Utils/Theme';

const BookFilter = ({navigation}) => {
  const [isFirst, setFirstFilter] = useState(false);
  const [isSecond, setSecondFilter] = useState(false);
  const [isThird, setThirdFilter] = useState(false);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', getDataArray);

    return unsubscribe;
  }, [navigation]);

  const getDataArray = async () => {
    let filterData = await AsyncStorage.getItem('filter');
    filterData = filterData ? JSON.parse(filterData) : [];

    if (filterData.length) {
      if (filterData.includes(1)) setFirstFilter(true);
      if (filterData.includes(2)) setSecondFilter(true);
      if (filterData.includes(3)) setThirdFilter(true);
    }
  };

  const onSave = async () => {
    try {
      let data = [];
      if (isFirst) {
        data.push(1);
      }
      if (isSecond) {
        data.push(2);
      }
      if (isThird) {
        data.push(3);
      }
      data = JSON.stringify(data);
      await AsyncStorage.setItem('filter', data).then((i) =>
        alert('Filter Applied Successfully'),
      );
    } catch (e) {
      console.log('e----->>>>', e);
    }
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <View style={styles.switchContainer}>
        <View style={{flex: 0.7, color: APP_COLOR.background}}>
          <Text style={styles.textStyle}>{'Pages between 0- 300'}</Text>
        </View>
        {/* <View style={{flex: 0.3}}> */}
        <Switch
          trackColor={{false: '#000000', true: '#fff'}}
          thumbColor={isFirst ? APP_COLOR.appColor : '#f4f3f4'}
          ios_backgroundColor="#000000"
          onValueChange={(newValue) => {
            setFirstFilter(newValue);
          }}
          value={isFirst}
        />
        {/* </View> */}
      </View>
      <View style={styles.switchContainer}>
        <View style={{flex: 0.7}}>
          <Text style={styles.textStyle}>{'Pages between 300 - 600'}</Text>
        </View>
        <Switch
          trackColor={{false: '#000000', true: '#fff'}}
          thumbColor={isSecond ? APP_COLOR.appColor : '#f4f3f4'}
          ios_backgroundColor="#000000"
          onValueChange={(newValue) => {
            setSecondFilter(newValue);
          }}
          value={isSecond}
        />
      </View>
      <View style={styles.switchContainer}>
        <View style={{flex: 0.7}}>
          <Text style={styles.textStyle}>{'Pages are > 600'}</Text>
        </View>
        <Switch
          trackColor={{false: '#000000', true: '#fff'}}
          thumbColor={isThird ? APP_COLOR.appColor : '#f4f3f4'}
          ios_backgroundColor="#000000"
          onValueChange={(newValue) => {
            setThirdFilter(newValue);
          }}
          value={isThird}
        />
      </View>
      <TouchableOpacity
        style={{
          borderWidth: 2,
          alignSelf: 'center',
          padding: 10,
          marginTop: 10,
          borderColor: APP_COLOR.background,
          borderRadius: 14,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
        onPress={() => onSave()}>
        <Text
          style={[
            styles.textStyle,
            {margin: 5, color: APP_COLOR.appColor, fontSize: 20},
          ]}>
          {'Apply'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = {
  textContainer: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 30,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'center',
    margin: 20,
  },
  textStyle: {
    fontSize: 16,
    color: APP_COLOR.black,
    fontWeight: 'bold',
  },
};

export default BookFilter;
