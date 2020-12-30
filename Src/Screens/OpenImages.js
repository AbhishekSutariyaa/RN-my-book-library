import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import CameraRoll from '@react-native-community/cameraroll';

const OpenImages = ({route, navigation}) => {
  const {itemImage} = route.params;

  navigation.setOptions({
    headerRight: () => (
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity
          onPress={handleDownload}
          style={{right: 20, borderWidth: 1}}>
          <Text style={{fontSize: 16, padding: 5}}>{'Download'}</Text>
        </TouchableOpacity>
      </View>
    ),
  });

  const handleDownload = async () => {
    RNFetchBlob.config({
      fileCache: true,
      appendExt: 'png',
    })
      .fetch('GET', itemImage)
      .then((res) => {
        CameraRoll.save(res.data, 'photo')
          .then((res) => {
            alert('Save Image Successfully');
          })
          .catch((err) => console.log('err--->>', err));
      })
      .catch((error) => console.log('error---------', error));
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000',
      }}
      //   enableCenterFocus
      //   useNativeDriver
      //   pinchToZoom
      //   enableDoubleClickZoom
      //   cropWidth={Dimensions.get('window').width}
      //   cropHeight={Dimensions.get('window').height}
      //   imageWidth={Dimensions.get('window').width}
      //   imageHeight={Dimensions.get('window').height}
    >
      <Image
        resizeMode={'contain'}
        style={{width: '100%', height: '100%'}}
        source={{uri: itemImage}}
      />
    </View>
  );
};

export default OpenImages;
