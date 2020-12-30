import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {APP_COLOR} from '../Utils/Theme';

const AddToRead = ({navigation}) => {
  const [data, dataSet] = useState([]);
  const [index, setIndex] = useState(0);

  const getDataArray = async () => {
    let jsonArray = await AsyncStorage.getItem('favData');
    jsonArray = jsonArray ? JSON.parse(jsonArray) : [];
    dataSet(jsonArray);
    setIndex(index + 1);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', getDataArray);

    return unsubscribe;
  }, [navigation]);

  return (
    <View style={{flex: 1}}>
      <FlatList
        extraData={index}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        data={data}
        ListEmptyComponent={
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 20,
              alignSelf: 'center',
              color: APP_COLOR.black,
            }}>
            {'No Books Found'}
          </Text>
        }
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
                <Text style={{fontSize: 18}}>{item.by}</Text>
                <Text style={{fontSize: 16}}>{item.pages}</Text>
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

export default AddToRead;
