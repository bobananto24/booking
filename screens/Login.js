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
  ActivityIndicator,
  TextInput,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {Formik} from 'formik';
import * as yup from 'yup';
const signUpValidationSchema = yup.object().shape({
  username: yup
    .string()
    // .matches(/(\w.+\s).+/, 'Enter at least 2 names')
    .required('Full name is required'),
  password: yup
    .string()
    // .matches(/(\w.+\s).+/, 'Enter at least 2 names')
    .required('Password is required'),
});
export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }

  componentDidMount() {
    AsyncStorage.getItem('Token').then((Token) => {
      if (Token == 'token') {
        this.props.navigation.navigate('AppName');
      }
    });
  }

  handleUserName = (text) => {
    this.setState({username: text});
  };
  handlePassword = (text) => {
    this.setState({password: text});
  };
  onLogin = () => {
    const {username, password} = this.state;
    if (username == 'B' && password == 'b') {
      AsyncStorage.setItem('Token', 'token');
      this.props.navigation.navigate('AppName');
    } else {
      alert('Incorrect username and password');
    }
  };

  render() {
    return (
      <View style={styles.Container}>
        <Formik
          validationSchema={signUpValidationSchema}
          initialValues={{username: '', password: ''}}
          onSubmit={this.onLogin}>
          {/* username */}
          {({handleChange, handleSubmit, errors, values, isValid}) => (
            <>
              <TextInput
                style={styles.textInput}
                name="username"
                value={values.username}
                placeholder="Enter your Full Name"
                onChangeText={handleChange('username')}
                onChange={(e) => this.handleUserName(e.nativeEvent.text)}
              />

              {errors.username && (
                <Text style={{fontSize: 10, color: 'red'}}>
                  {errors.username}
                </Text>
              )}
              <TextInput
                style={styles.textInput}
                name="password"
                secureTextEntry
                value={values.password}
                placeholder="Enter your Password"
                onChangeText={handleChange('password')}
                onChange={(e) => this.handlePassword(e.nativeEvent.text)}
              />

              {errors.password && (
                <Text style={{fontSize: 10, color: 'red'}}>
                  {errors.password}
                </Text>
              )}

              <View style={{marginTop: 50}}>
                <TouchableOpacity style={styles.payment} onPress={handleSubmit}>
                  <Text style={styles.paymentText}>Login</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </Formik>
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
