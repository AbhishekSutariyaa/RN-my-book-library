import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Share,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {APP_COLOR} from '../Utils/Theme';

const BooksDetails = ({navigation, route}) => {
  const {Item} = route.params;
  const [favData, setData] = useState([]);

  navigation.setOptions({
    headerTitle: Item.nameOfBook,
  });

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', isDataFav);
    // setImages(Item.image);
    return unsubscribe;
  }, [navigation]);

  const isDataFav = async () => {
    let jsonArray = await AsyncStorage.getItem('favData');
    jsonArray = jsonArray ? JSON.parse(jsonArray) : [];
    let checkItem = jsonArray.filter((item) => item.id == Item.id);
    setData(checkItem);
  };

  const addToFav = async (data) => {
    try {
      let jsonArray = await AsyncStorage.getItem('favData');
      jsonArray = jsonArray ? JSON.parse(jsonArray) : [];
      jsonArray.push(data);
      const jsonValue = JSON.stringify(jsonArray);
      await AsyncStorage.setItem('favData', jsonValue).then((i) =>
        console.log('response---->'),
      );
      isDataFav();
    } catch (e) {
      console.log('e----->>>>', e);
    }
  };

  const handleOnShare = async () => {
    try {
      const result = await Share.share({
        message: `Share`,
        url: Item.bookDes,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const removeFromFav = async (data) => {
    try {
      let jsonArray = await AsyncStorage.getItem('favData');

      jsonArray = jsonArray ? JSON.parse(jsonArray) : [];
      let filterArray = jsonArray.filter((i) => i.id !== data.id);
      const jsonValue = JSON.stringify(filterArray);
      await AsyncStorage.setItem('favData', jsonValue);
      isDataFav();
    } catch (e) {
      console.log('e--', e);
    }
  };

  return (
    <ScrollView style={{flex: 1}}>
      <TouchableOpacity
        activeOpacity={1}
        style={{justifyContent: 'center', alignItems: 'center'}}
        onPress={() => {
          navigation.navigate('OpenImages', {itemImage: Item.bookImage});
        }}>
        <Image
          style={styles.mobileImage}
          source={{url: Item.bookImage}}
          resizeMode="stretch"
        />
      </TouchableOpacity>

      <View
        style={{
          borderBottomWidth: 1,
          borderBottomColor: APP_COLOR.appColor,
          marginHorizontal: 20,
          marginVertical: 20,
        }}></View>

      <Text
        style={{
          fontSize: 20,
          fontWeight: 'bold',
          textAlign: 'center',
          color: APP_COLOR.appColor,
        }}>
        {Item.nameOfBook}
      </Text>
      <Text style={{textAlign: 'center', paddingTop: 10}}>{Item.by}</Text>
      <View
        style={{
          borderBottomWidth: 1,
          borderBottomColor: APP_COLOR.appColor,
          marginHorizontal: 20,
          marginVertical: 20,
        }}></View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginHorizontal: 40,
        }}>
        <TouchableOpacity
          style={{alignItems: 'center', justifyContent: 'center'}}
          onPress={
            !favData.length ? () => addToFav(Item) : () => removeFromFav(Item)
          }>
          <Text style={{color: APP_COLOR.appColor, fontSize: 18}}>
            {!favData.length ? '+ Add To Read' : '- Remove From Read'}
          </Text>
        </TouchableOpacity>
        <View>
          <Text style={{textAlign: 'center'}}>
            {'Review By:  ' + Item.reviewBy}
          </Text>
          <Text style={{textAlign: 'center'}}>{'Pages:  ' + Item.pages}</Text>
        </View>
      </View>
      <View
        style={{
          borderBottomWidth: 1,
          borderBottomColor: APP_COLOR.appColor,
          marginHorizontal: 20,
          marginVertical: 20,
        }}></View>

      <FlatList
        keyExtractor={(item, index) => index.toString()}
        data={Item.bookDes}
        extraData={Item.bookDes}
        renderItem={({item, index}) => {
          return (
            <View key={index} style={styles.detailItemcontainer}>
              <Text
                style={{
                  fontSize: 16,
                  color: APP_COLOR.black,
                  textAlign: 'justify',
                }}>
                {item}
              </Text>
            </View>
          );
        }}
      />
      <TouchableOpacity style={styles.shareButton} onPress={handleOnShare}>
        <Text style={{color: APP_COLOR.appColor, fontSize: 18}}>{'Share'}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = {
  mobileImage: {width: '90%', height: 260},
  detailItemcontainer: {
    justifyContent: 'center',
    borderRadius: 4,
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  shareButton: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
    borderRadius: 10,
    borderWidth: 3,
    alignSelf: 'center',
    padding: 10,
  },
};

export default BooksDetails;
