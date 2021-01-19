import * as React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Booking from './BookingTab';
import BookingList from './BookingListTab';
import {Header} from 'react-native/Libraries/NewAppScreen';

const Tab = createMaterialTopTabNavigator();
const MainTab = () => (
  <Tab.Navigator
    initialRouteName="Booking"
    tabBarOptions={{
      indicatorStyle: {backgroundColor: 'black'},
    }}>
    <Tab.Screen name="Booking" component={Booking} />
    <Tab.Screen name="Booking List" component={BookingList} />
  </Tab.Navigator>
);
export default MainTab;
