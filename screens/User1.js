import * as React from 'react';
import {
  View,
  Text,
  Button,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
export default class User1 extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.topText}>NAME : BOBAN</Text>
        <Text style={styles.bottomText}>ID : 0001</Text>
        <Text style={styles.bottomText}>TIME : 15:00</Text>
        <Text style={styles.bottomText}>DATE : 02/01/2021</Text>
        <View style={styles.buttonView}>
          <View style={styles.ButtonView}>
            <TouchableOpacity style={styles.Button}>
              <Text style={styles.ButtonText}>
                Your Appointment is Accepted
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
  },
  topText: {fontWeight: 'bold', fontSize: 30},
  bottomText: {fontWeight: 'bold', fontSize: 20},
  buttonView: {flexDirection: 'row', paddingTop: 20},
  ButtonView: {paddingRight: 10},
  Button: {backgroundColor: 'black', padding: 15, borderRadius: 10},
  ButtonText: {color: 'white', fontWeight: 'bold', fontSize: 15},
});
