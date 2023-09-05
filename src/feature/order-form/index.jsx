import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useFormik } from 'formik';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Pressable, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { useSelector } from 'react-redux';

const OrderForm = ({ submit, initialValues }) => {
  const { navigate } = useNavigation();
  const { params } = useRoute();
  const account = useSelector((state) => state.auth.account);
  const isAdmin = useSelector((state) => state.auth.isAdmin);

  const formik = useFormik({
    initialValues: initialValues
      ? {
          ...initialValues,
          pickUpDate: new Date(initialValues.pickUpDate),
          dropOffDate: new Date(initialValues.dropOffDate),
          pickUpTime: new Date(moment(initialValues.pickUpTime, 'HH:mm:ss')),
        }
      : {
          pickUpLoc: '',
          dropOffLoc: '',
          pickUpDate: '',
          dropOffDate: '',
          pickUpTime: '',
          car: {
            carId: '',
            name: '',
          },
          user: {
            userId: '',
            username: '',
          },
        },
    onSubmit: (values) => {
      const request = {
        pickUpLoc: values.pickUpLoc,
        dropOffLoc: values.dropOffLoc,
        pickUpDate: moment(values.pickUpDate).format('YYYY-MM-DD'),
        pickUpTime: moment(values.pickUpTime).format('HH:mm:ss'),
        dropOffDate: moment(values.dropOffDate).format('YYYY-MM-DD'),
        carId: values.car.carId,
        userId: values.user.userId,
        adminId: account?.adminId || 3,
      };

      submit(request);
      // onNavigateTo();
    },
  });

  const { values, handleChange, setFieldValue, handleSubmit } = formik;

  useEffect(() => {
    if (params?.selectedPickUpLoc) {
      setFieldValue('pickUpLoc', params.selectedPickUpLoc);
    }
    if (params?.selectedDropOffLoc) {
      setFieldValue('dropOffLoc', params.selectedDropOffLoc);
    }
    if (params?.selectedCar) {
      setFieldValue('car', params.selectedCar);
    }
    if (params?.selectedUser) {
      setFieldValue('user', params.selectedUser);
    }
  }, [params]);

  const [visiblePickUpDate, setVisiblePickUpDate] = useState(false);
  const openPickUpDate = () => setVisiblePickUpDate(true);
  const closePickUpDate = () => setVisiblePickUpDate(false);

  const [visiblePickUpTime, setVisiblePickUpTime] = useState(false);
  const openPickUpTime = () => setVisiblePickUpTime(true);
  const closePickUpTime = () => setVisiblePickUpTime(false);

  const [visibleDropOffDate, setVisibleDropOffDate] = useState(false);
  const openDropOffDate = () => setVisibleDropOffDate(true);
  const closeDropOffDate = () => setVisibleDropOffDate(false);

  const openPickUpLocation = () =>
    navigate('LocationScreen', { type: 'pickUp', isEdit: initialValues });

  const openDropOffLocation = () =>
    navigate('LocationScreen', { type: 'dropOff', isEdit: initialValues });

  const openListCar = () => navigate('CarScreen', { fromScreen: 'order', isEdit: initialValues });

  const openListUser = () =>
    navigate('UserScreen', {
      isEdit: initialValues,
    });

  return (
    <>
      <View style={{ rowGap: 32, padding: 16 }}>
        <View
          style={{
            flex: 1,
            rowGap: 16,
          }}>
          <Pressable onPress={openPickUpLocation}>
            <TextInput
              mode="outlined"
              label="Pick Up Location"
              value={values.pickUpLoc}
              pointerEvents="none"
              editable={false}
              onChangeText={handleChange('pickUpLoc')}
              contentStyle={{ textTransform: 'capitalize' }}
              left={<TextInput.Icon icon="map-marker" />}
              right={<TextInput.Icon icon="chevron-down" />}
            />
          </Pressable>
          <Pressable onPress={openDropOffLocation}>
            <TextInput
              mode="outlined"
              label="Drop Off Location"
              value={values.dropOffLoc}
              pointerEvents="none"
              editable={false}
              onChangeText={handleChange('dropOffLoc')}
              contentStyle={{ textTransform: 'capitalize' }}
              left={<TextInput.Icon icon="map-marker-outline" />}
              right={<TextInput.Icon icon="chevron-down" />}
            />
          </Pressable>

          <Pressable onPress={openPickUpDate}>
            <TextInput
              mode="outlined"
              label="Pick Up Date"
              value={!values.pickUpDate ? '' : moment(values.pickUpDate).format('DD MMMM YYYY')}
              pointerEvents="none"
              editable={false}
              onChangeText={handleChange('pickUpDate')}
              left={<TextInput.Icon icon="calendar" />}
              right={<TextInput.Icon icon="chevron-down" />}
            />
          </Pressable>
          <Pressable onPress={openPickUpTime}>
            <TextInput
              mode="outlined"
              label="Pick Up Time"
              value={!values.pickUpTime ? '' : moment(values.pickUpTime).format('HH:mm')}
              pointerEvents="none"
              editable={false}
              onChangeText={handleChange('pickUpTime')}
              left={<TextInput.Icon icon="clock" />}
              right={<TextInput.Icon icon="chevron-down" />}
            />
          </Pressable>
          <Pressable onPress={openDropOffDate}>
            <TextInput
              mode="outlined"
              label="Drop Off Date"
              value={!values.dropOffDate ? '' : moment(values.dropOffDate).format('DD MMMM YYYY')}
              pointerEvents="none"
              editable={false}
              onChangeText={handleChange('dropOffDate')}
              left={<TextInput.Icon icon="calendar-outline" />}
              right={<TextInput.Icon icon="chevron-down" />}
            />
          </Pressable>

          <Pressable onPress={openListCar}>
            <TextInput
              mode="outlined"
              label="Car"
              value={values.car.name}
              pointerEvents="none"
              editable={false}
              onChangeText={handleChange('car[name]')}
              left={<TextInput.Icon icon="car" />}
              right={<TextInput.Icon icon="chevron-down" />}
            />
          </Pressable>
          <Pressable onPress={openListUser}>
            <TextInput
              mode="outlined"
              label="User"
              value={values.user.username}
              pointerEvents="none"
              editable={false}
              onChangeText={handleChange('user[username]')}
              left={<TextInput.Icon icon="account" />}
              right={<TextInput.Icon icon="chevron-down" />}
            />
          </Pressable>
        </View>
        <Button mode="contained" onPress={handleSubmit}>
          Save
        </Button>
        {visiblePickUpDate && (
          <DateTimePicker
            mode="date"
            value={values.pickUpDate || new Date()}
            onChange={(event, date) => {
              closePickUpDate();
              setFieldValue('pickUpDate', date);
            }}
            is24Hour
            minimumDate={new Date()}
          />
        )}
        {visiblePickUpTime && (
          <DateTimePicker
            mode="time"
            value={values.pickUpTime || new Date()}
            onChange={(event, time) => {
              closePickUpTime();
              setFieldValue('pickUpTime', time);
            }}
            is24Hour
            minimumDate={new Date()}
          />
        )}
        {visibleDropOffDate && (
          <DateTimePicker
            mode="date"
            value={values.dropOffDate || new Date()}
            onChange={(event, date) => {
              closeDropOffDate();
              setFieldValue('dropOffDate', date);
            }}
            is24Hour
            minimumDate={values.pickUpDate || new Date()}
          />
        )}
      </View>
    </>
  );
};

export default OrderForm;
