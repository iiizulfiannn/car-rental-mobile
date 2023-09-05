import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Image, View } from 'react-native';
import { Text, TouchableRipple } from 'react-native-paper';
import RNFetchBlob from 'react-native-blob-util';

const OrderCard = ({ data, onPress }) => {
  const [imageUri, setImageUri] = useState(null);

  useEffect(() => {
    data.car?.image && downloadImage();
  }, [data]);

  const downloadImage = async () => {
    try {
      const response = await RNFetchBlob.config({
        fileCache: true,
      }).fetch('GET', data.car?.image);

      if (response.respInfo.status === 200) {
        const imagePath = response.path();
        setImageUri('file://' + imagePath); // Display the downloaded image
      } else {
        console.error('Failed to download image');
      }
    } catch (error) {
      console.error('Error downloading image:', error);
    }
  };

  return (
    <TouchableRipple onPress={onPress}>
      <View
        style={{
          backgroundColor: 'white',
          elevation: 2,
          flexDirection: 'row',
          alignItems: 'center',
          margin: 8,
          borderRadius: 5,
          padding: 8,
        }}>
        <View style={{ width: 150, height: 100 }}>
          {imageUri && (
            <Image
              source={{ uri: data.car.image }}
              style={{ width: 150, height: 100, resizeMode: 'contain' }}
            />
          )}
        </View>
        <View>
          <Text variant="bodyLarge" style={{ fontWeight: 'bold' }}>
            {data.user.username}
          </Text>
          <Text variant="bodyMedium">Pick Location {data.pickUpLoc}</Text>
          <Text variant="bodyMedium">
            Pick Up date {moment(data.pickUpDate).format('DD-MM-YYYY')},
            {moment(data.pickUpTime, 'HH:mm:ss').format('HH:mm')}
          </Text>
        </View>
      </View>
    </TouchableRipple>
  );
};

export default OrderCard;
