import React, {useState, useEffect} from 'react';
import {BOOK_LIST} from '../Utils/BookLibraryData';
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import {APP_COLOR} from '../Utils/Theme';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Books = ({navigation}) => {
  const [listData, setFilterData] = useState([]);
  const [value, onChangeText] = useState('');

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', getDataArray);
    if (value) {
      const FilteredData = BOOK_LIST.filter((item) =>
        item.nameOfBook.includes(value),
      );
      setFilterData(FilteredData);
    } else {
      setFilterData(BOOK_LIST);
    }
    return unsubscribe;
  }, [navigation, value]);

  const getDataArray = async () => {
    let filterArray = [];
    let filterData = await AsyncStorage.getItem('filter');
    filterData = filterData ? JSON.parse(filterData) : [];
    if (filterData.length) {
      if (filterData.includes(1)) {
        BOOK_LIST.map((item) => {
          if (item.pages < 300) {
            filterArray.push(item);
          }
        });
      }
      if (filterData.includes(2)) {
        BOOK_LIST.map((item) => {
          if (item.pages > 300 && item.pages < 600) {
            filterArray.push(item);
          }
        });
      }
      if (filterData.includes(3)) {
        BOOK_LIST.map((item) => {
          if (item.pages > 600) {
            filterArray.push(item);
          }
        });
      }
    } else {
      filterArray = BOOK_LIST;
    }

    setFilterData(filterArray);
  };

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <TextInput
        placeholder={'Search your books'}
        style={{
          borderWidth: 2,
          margin: 10,
          paddingVertical: 5,
          borderColor: APP_COLOR.appColor,
          paddingLeft: 5,
        }}
        onChangeText={(value) => onChangeText(value)}
        value={value}
      />
      <FlatList
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'center',
        }}
        extraData={listData}
        data={listData}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity
              key={index}
              activeOpacity={0.8}
              onPress={() =>
                navigation.navigate('BooksDetails', {
                  Item: item,
                })
              }
              style={[styles.touchContainer]}>
              <View style={{flex: 0.4}}>
                <Image
                  style={{height: 200, width: '100%'}}
                  source={{uri: item.bookImage}}
                />
              </View>
              <View
                style={{
                  flex: 0.6,
                  justifyContent: 'space-between',
                  padding: 10,
                }}>
                <Text style={{fontSize: 24, fontWeight: 'bold'}}>
                  {item.nameOfBook}
                </Text>
                <Text style={{fontSize: 18}}>{'Author ' + item.by}</Text>
                <Text style={{fontSize: 16}}>{'Pages : ' + item.pages}</Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

const styles = {
  touchContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 14,
    shadowColor: APP_COLOR.black,
    marginHorizontal: 8,
    marginVertical: 10,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: APP_COLOR.background,
  },
};

export default Books;
