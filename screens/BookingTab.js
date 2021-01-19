import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Button,
  KeyboardAvoidingView,
  Alert,
  TextInput,
} from 'react-native';
import BookingList from './BookingListTab';

import DatePicker from 'react-native-datepicker';
import * as Animatable from 'react-native-animatable';
import moment from 'moment';
import TimePicker from 'react-native-24h-timepicker';
import {Picker} from '@react-native-picker/picker';
import DeviceInfo from 'react-native-device-info';
import Icon from 'react-native-vector-icons/FontAwesome';

import stripe from 'tipsi-stripe';
import {Formik, Field} from 'formik';
import * as yup from 'yup';
import AsyncStorage from '@react-native-async-storage/async-storage';
const signUpValidationSchema = yup.object().shape({
  name: yup
    .string()
    .matches(/(\w.+\s).+/, 'Enter at least 2 names')
    .required('Full name is required'),
});
stripe.setOptions({
  publishableKey:
    'pk_test_51HGQNmLDiUwxUe9qDHPBuRCMtsnTj8MH3IOLEM28BFkIzDoNbz8MxlK0fTl0B8KuOu4tsiXqcFkH9UhjWQMeEzZO00AQmdhOHr',
});

export default class Booking extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: null,
      time: moment().format('HH:mm'),
      doctor: 'doctor1',
      service: 'fever',
      name: '',
      date: moment().format('DD-MM-YYYY'),
      androidId: DeviceInfo.getUniqueId(),
    };
  }
  handleName = (text) => {
    this.setState({name: text});
  };

  onCancel() {
    this.TimePicker.close();
  }

  onConfirm(hour, minute) {
    this.setState({time: `${hour}:${minute}`});
    this.TimePicker.close();
  }

  handleCardPayPress = async () => {
    try {
      this.setState({token: null});
      const token = await stripe.paymentRequestWithCardForm();

      this.setState({token});

      if (token) {
        console.log(this.state);
      } else {
        Alert.alert('Payment Failed');
      }
    } catch (error) {
      Alert.alert('Payment failed');
    }
  };
  clearAsyncStorage = async () => {
    AsyncStorage.removeItem('Token');
  };
  navigate = () => {
    AsyncStorage.removeItem('Token');
    this.props.navigation.navigate('Login Page');
  };

  render() {
    const {navigation} = this.props;
    const {token, time, doctor, service, name, date, androidId} = this.state;
    return (
      <View style={styles.Container}>
        <Formik
          validationSchema={signUpValidationSchema}
          initialValues={{name: ''}}
          onSubmit={this.handleCardPayPress}>
          {/* Name */}
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            errors,
            values,
            isValid,
          }) => (
            <>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  padding: 10,
                }}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 20,
                    paddingRight: 24,
                  }}>
                  Name
                </Text>
                <TextInput
                  style={styles.textInput}
                  name="name"
                  value={values.name}
                  placeholder="Enter your Full Name"
                  onChangeText={handleChange('name')}
                  onChange={(e) => this.handleName(e.nativeEvent.text)}
                />
              </View>
              {errors.name && (
                <Text style={{fontSize: 10, color: 'red'}}>{errors.name}</Text>
              )}

              {/* Date */}

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  padding: 10,
                }}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 20,
                    paddingRight: 35,
                  }}>
                  Date
                </Text>

                <View style={styles.view}>
                  <DatePicker
                    style={styles.datePickerStyle}
                    date={this.state.date}
                    format="DD-MM-YYYY"
                    customStyles={{
                      dateIcon: {
                        position: 'relative',
                      },
                      dateInput: {
                        borderWidth: 0,
                        alignItems: 'flex-start',
                        padding: 3,
                        paddingTop: 9,
                      },
                    }}
                    onDateChange={(date) => this.setState({date: date})}
                  />
                </View>
              </View>

              {/* Time */}

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingVertical: 20,
                  paddingRight: 14,
                  paddingLeft: 3,
                }}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 20,
                    paddingRight: 40,
                    paddingLeft: 1,
                  }}>
                  Time
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    flex: 1,
                    borderColor: 'black',
                    borderBottomWidth: 2.5,
                    justifyContent: 'space-between',
                    paddingRight: 8,
                  }}>
                  <TextInput
                    style={{
                      backgroundColor: 'white',
                    }}
                    value={this.state.time}
                  />

                  <TouchableOpacity onPress={() => this.TimePicker.open()}>
                    <Icon name="clock-o" size={30} color="#900" />
                  </TouchableOpacity>
                </View>

                <TimePicker
                  ref={(ref) => {
                    this.TimePicker = ref;
                  }}
                  onCancel={() => this.onCancel()}
                  onConfirm={(hour, minute) => this.onConfirm(hour, minute)}
                />
              </View>

              {/* Doctor */}

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingVertical: 20,
                  paddingRight: 10,
                }}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 20,
                    paddingRight: 25,
                  }}>
                  Doctor
                </Text>

                <View style={{borderColor: 'black', borderBottomWidth: 2.5}}>
                  <Picker
                    selectedValue={this.state.doctor}
                    mode={'dropdown'}
                    style={{height: 50, width: 335, flexDirection: 'row'}}
                    onValueChange={(doctor) => {
                      this.setState({doctor: doctor});
                    }}>
                    {doctorList.map((i) => (
                      <Picker.Item label={i} value={i} />
                    ))}
                  </Picker>
                </View>
              </View>

              {/* Service */}

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingVertical: 20,
                  paddingHorizontal: 15,
                  paddingRight: 28,
                }}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 20,
                    paddingRight: 20,
                  }}>
                  Service
                </Text>

                <View style={{borderColor: 'black', borderBottomWidth: 2.5}}>
                  <Picker
                    selectedValue={this.state.service}
                    mode={'dropdown'}
                    style={{height: 50, width: 335, flexDirection: 'row'}}
                    onValueChange={(service, index) => {
                      this.setState({service: service});
                    }}>
                    {serviceList.map((i) => (
                      <Picker.Item label={i} value={i} />
                    ))}
                  </Picker>
                </View>
              </View>

              {/* Button */}

              <View style={{marginTop: 50}}>
                <TouchableOpacity
                  style={styles.payment}
                  onPress={handleSubmit}
                  disabled={!isValid}>
                  <Text style={styles.paymentText}>Proceed to payment ➮</Text>
                </TouchableOpacity>
                <View style={styles.token}>
                  {token && (
                    <Text>
                      Token: {token.tokenId}
                      {'\n'}
                      name:{name}
                      {'\n'}
                      date:{date}
                      {'\n'}
                      time:{time}
                      {'\n'}
                      doctor:{doctor}
                      {'\n'}
                      service:{service}
                      {'\n'}
                      Device_Id:{androidId}
                    </Text>
                  )}
                </View>
              </View>
            </>
          )}
        </Formik>

        <View style={{marginTop: 50}}>
          <TouchableOpacity onPress={this.navigate}>
            <Text>Log out</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',

    padding: 10,

    backgroundColor: 'white',
  },
  paymentText: {color: 'white', fontSize: 20, fontWeight: 'bold'},
  payment: {backgroundColor: 'black', padding: 25, borderRadius: 10},
  textInput: {
    width: '80%',
    margin: 10,
    backgroundColor: 'white',
    borderColor: 'black',
    borderBottomWidth: 2.5,
  },
  view: {
    width: '80%',
    margin: 10,
    height: 50,
    backgroundColor: 'white',
    borderColor: 'black',
    borderBottomWidth: 2.5,
  },
  datePickerStyle: {
    width: '100%',
  },
});
const doctorList = ['doctor1', 'doctor2', 'doctor3'];
const serviceList = ['service1', 'service2', 'service3'];
