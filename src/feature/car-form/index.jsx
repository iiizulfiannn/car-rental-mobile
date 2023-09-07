import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { Pressable, View } from 'react-native';
import { Button, HelperText, Text, TextInput } from 'react-native-paper';
import RNFetchBlob from 'react-native-blob-util';

import CarTypeDialog from './CarTypeDialog';
import FuelDialog from './FuelDialog';
import RatingDialog from './RatingDialog';
import CarImagePicker from './CarImagePicker';

const CarForm = ({ submit, initialValues }) => {
  const [imageUri, setImageUri] = useState(null);
  const [localImageUri, setLocalImageUri] = useState(null);

  const { values, handleChange, setFieldValue, handleSubmit, errors, isValid, handleBlur } =
    useFormik({
      validateOnMount: true,
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
      validate: (values) => {
        const errors = {};
        if (
          parseInt(values.hourRate) > parseInt(values.dayRate) ||
          parseInt(values.hourRate) > parseInt(values.monthRate)
        ) {
          errors.hourRate = 'Hour rate must less than Day / Month Rate';
        }

        if (parseInt(values.dayRate) > parseInt(values.monthRate)) {
          errors.dayRate = 'DayRate rate must less than Month Rate';
        }
        if (parseInt(values.dayRate) < parseInt(values.hourRate)) {
          errors.dayRate = 'DayRate rate must greater than Hour Rate';
        }

        if (parseInt(values.monthRate) < parseInt(values.hourRate)) {
          errors.monthRate = 'Month Rate rate must greater than Hour Rate';
        }
        if (parseInt(values.monthRate) < parseInt(values.dayRate)) {
          errors.monthRate = 'Month Rate rate must greater than Day Rate';
        }

        return errors;
      },
    });

  console.log({ errors });

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
          <View>
            <TextInput
              label="Hour Rate"
              mode="outlined"
              value={values.hourRate}
              onChangeText={handleChange('hourRate')}
              onBlur={handleBlur('hourRate')}
              keyboardType="numeric"
              error={errors?.hourRate}
            />
            {errors?.hourRate && (
              <HelperText type="error" visible={errors?.hourRate}>
                {errors.hourRate}
              </HelperText>
            )}
          </View>
          <View>
            <TextInput
              label="Day Rate"
              mode="outlined"
              value={values.dayRate}
              onChangeText={handleChange('dayRate')}
              onBlur={handleBlur('dayRate')}
              keyboardType="numeric"
              error={errors?.dayRate}
            />
            {errors?.dayRate && (
              <HelperText type="error" visible={errors?.dayRate}>
                {errors.dayRate}
              </HelperText>
            )}
          </View>
          <View>
            <TextInput
              label="Month Rate"
              mode="outlined"
              value={values.monthRate}
              onChangeText={handleChange('monthRate')}
              onBlur={handleBlur('monthRate')}
              keyboardType="numeric"
              error={errors?.monthRate}
            />
            {errors?.monthRate && (
              <HelperText type="error" visible={errors?.monthRate}>
                {errors.monthRate}
              </HelperText>
            )}
          </View>
          <Button
            mode="contained"
            onPress={handleSubmit}
            style={{ marginTop: 32 }}
            disabled={!isValid}>
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
