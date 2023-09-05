import React, { useEffect, useState } from 'react';
import { Image, View } from 'react-native';
import { Text, TouchableRipple } from 'react-native-paper';
import RNFetchBlob from 'react-native-blob-util';

import Star from '../../shared/component/Star';

const CarCard = ({ data, onPress }) => {
  const [imageUri, setImageUri] = useState(null);

  useEffect(() => {
    data.image && downloadImage();
  }, [data]);

  const downloadImage = async () => {
    try {
      const response = await RNFetchBlob.config({
        fileCache: true,
      }).fetch('GET', data.image);

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
    <TouchableRipple onPress={() => onPress(data)}>
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
              source={{ uri: imageUri }}
              style={{ width: 150, height: 100, resizeMode: 'contain' }}
            />
          )}
        </View>
        <View>
          <Text variant="bodyLarge" style={{ fontWeight: 'bold' }}>
            {data.name}
          </Text>
          <Text variant="bodyMedium">Type {data.carType}</Text>
          <Text variant="bodyMedium">Fuel {data.fuel}</Text>
          <Star count={data.rating} />
        </View>
      </View>
    </TouchableRipple>
  );
};

export default CarCard;
