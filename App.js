import * as React from 'react';
import {
  View,
  Text,
  Button,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Booking from './screens/BookingTab';
import BookingList from './screens/BookingListTab';
import User1 from './screens/User1';
import MainTab from './screens/MainTab';
import User2 from './screens/User2';
import User3 from './screens/User3';

import {LogBox} from 'react-native';
import Login from './screens/Login';
import Async from './screens/Async';

LogBox.ignoreAllLogs(true);

const Stack = createStackNavigator();

export default class App extends React.Component {
  state = {loading: false};
  componentDidMount() {
    setTimeout(() => {
      SplashScreen.hide();
    }, 220);
  }
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          {/* <Stack.Screen name="Async" component={Async} /> */}

          <Stack.Screen name="Login Page" component={Login} />
          <Stack.Screen name="Booking" component={Booking} />
          <Stack.Screen
            name="AppName"
            component={MainTab}
            options={{header: () => null}}
          />
          <Stack.Screen name="User2" component={User2} />
          <Stack.Screen name="User1" component={User1} />
          <Stack.Screen name="User3" component={User3} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
