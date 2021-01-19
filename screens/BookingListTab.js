import React, {Component} from 'react';
import {
  View,
  Text,
  Button,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

export default class BookingList extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('User1')}
          style={styles.card}>
          <Text style={styles.text}>1) Boban </Text>
        </TouchableOpacity>
        <View style={styles.cardBreak}></View>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('User2')}
          style={styles.card}>
          <Text style={styles.text}>2) Anto</Text>
        </TouchableOpacity>
        <View style={styles.cardBreak}></View>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('User3')}
          style={styles.card}>
          <Text style={styles.text}>boban</Text>
        </TouchableOpacity>
        <View style={styles.cardBreak}></View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {padding: 25},
  text: {fontWeight: 'bold', fontSize: 20},
  cardBreak: {padding: 0.2, backgroundColor: 'grey'},
});
