import * as ImagePicker from 'expo-image-picker';
import React, { useEffect, useState } from 'react';
import { Image, View } from 'react-native';
import { Button } from 'react-native-paper';

const CarImagePicker = ({ imageUri, setImageUri, setLocalImageUri }) => {
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      const localUri = result.assets[0].uri;
      setLocalImageUri(localUri); // Store the local image URI
      setImageUri(localUri); // Display the selected image
    }
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <View style={{ width: 250, height: 150 }}>
        {imageUri && (
          <Image
            source={{ uri: imageUri }}
            style={{ width: 250, height: 150, resizeMode: 'contain' }}
          />
        )}
      </View>
      <Button onPress={pickImage}>Pick an image from camera roll</Button>
    </View>
  );
};

export default CarImagePicker;
