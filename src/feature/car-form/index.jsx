import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { Pressable, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import RNFetchBlob from 'react-native-blob-util';

import CarTypeDialog from './CarTypeDialog';
import FuelDialog from './FuelDialog';
import RatingDialog from './RatingDialog';
import CarImagePicker from './CarImagePicker';

const CarForm = ({ submit, initialValues }) => {
  const [imageUri, setImageUri] = useState(null);
  const [localImageUri, setLocalImageUri] = useState(null);

  const { values, handleChange, setFieldValue, handleSubmit } = useFormik({
    initialValues: initialValues
      ? {
          ...initialValues,
          rating: initialValues.rating.toString(),
          hourRate: initialValues.hourRate.toString(),
          dayRate: initialValues.dayRate.toString(),
          monthRate: initialValues.monthRate.toString(),
        }
      : {
          name: 'Toyota 425',
          carType: 'Crossover',
          rating: '4',
          fuel: 'Eletric',
          image: null,
          hourRate: '544',
          dayRate: '222',
          monthRate: '66',
        },
    onSubmit: async (form) => {
      const request = {
        ...form,
        image: {
          uri: localImageUri || imageUri,
          name: `${form.name}.png`,
          type: 'image/png',
          mimetype: 'image/png',
        },
        rating: parseInt(form.rating),
        hourRate: parseInt(form.hourRate),
        dayRate: parseInt(form.dayRate),
        monthRate: parseInt(form.monthRate),
      };

      const data = new FormData();

      for (const [key, value] of Object.entries(request)) {
        data.append(key, value);
      }

      submit(data);
    },
  });

  const [visibleCarType, setVisibleCarType] = useState(false);
  const openCarType = () => setVisibleCarType(true);
  const closeCarType = () => setVisibleCarType(false);

  const [visibleRating, setVisibleRating] = useState(false);
  const openRating = () => setVisibleRating(true);
  const closeRating = () => setVisibleRating(false);

  const [visibleFuel, setVisibleFuel] = useState(false);
  const openFuel = () => setVisibleFuel(true);
  const closeFuel = () => setVisibleFuel(false);

  useEffect(() => {
    initialValues && downloadImage();
  }, []);

  const downloadImage = async () => {
    try {
      const response = await RNFetchBlob.config({
        fileCache: true,
      }).fetch('GET', initialValues.image);

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
    <>
      <View style={{ rowGap: 32, padding: 16 }}>
        <View
          style={{
            flex: 1,
            rowGap: 16,
          }}>
          <CarImagePicker
            imageUri={imageUri}
            setImageUri={setImageUri}
            setLocalImageUri={setLocalImageUri}
          />
          <TextInput
            mode="outlined"
            label="Name"
            value={values.name}
            onChangeText={handleChange('name')}
          />
          <View style={{ flexDirection: 'row', columnGap: 16 }}>
            <Pressable onPress={openCarType} style={{ flex: 1 }}>
              <TextInput
                label="Type"
                mode="outlined"
                value={values.carType}
                editable={false}
                pointerEvents="none"
                onChangeText={handleChange('carType')}
                // right={<TextInput.Icon icon="chevron-down" />}
              />
            </Pressable>
            <Pressable onPress={openRating} style={{ flex: 1 }}>
              <TextInput
                label="Rating"
                mode="outlined"
                value={values.rating}
                editable={false}
                pointerEvents="none"
                onChangeText={handleChange('rating')}
                // right={<TextInput.Icon icon="chevron-down" />}
              />
            </Pressable>
            <Pressable onPress={openFuel} style={{ flex: 1 }}>
              <TextInput
                label="Fuel"
                mode="outlined"
                value={values.fuel}
                editable={false}
                pointerEvents="none"
                onChangeText={handleChange('fuel')}
                // right={<TextInput.Icon icon="chevron-down" />}
              />
            </Pressable>
          </View>
          <TextInput
            label="Hour Rate"
            mode="outlined"
            value={values.hourRate}
            onChangeText={handleChange('hourRate')}
            keyboardType="numeric"
          />
          <TextInput
            label="Day Rate"
            mode="outlined"
            value={values.dayRate}
            onChangeText={handleChange('dayRate')}
            keyboardType="numeric"
          />
          <TextInput
            label="Month Rate"
            mode="outlined"
            value={values.monthRate}
            onChangeText={handleChange('monthRate')}
            keyboardType="numeric"
          />

          <Button mode="contained" onPress={handleSubmit} style={{ marginTop: 32 }}>
            Save
          </Button>
        </View>

        <CarTypeDialog
          visible={visibleCarType}
          close={closeCarType}
          value={values.carType}
          onChangeValue={(type) => setFieldValue('carType', type)}
        />

        <RatingDialog
          visible={visibleRating}
          close={closeRating}
          value={values.rating}
          onChangeValue={(type) => setFieldValue('rating', type)}
        />

        <FuelDialog
          visible={visibleFuel}
          close={closeFuel}
          value={values.fuel}
          onChangeValue={(type) => setFieldValue('fuel', type)}
        />
      </View>
    </>
  );
};

export default CarForm;
