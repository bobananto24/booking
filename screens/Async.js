import React, {Component} from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';

class Async extends Component {
  state = {bob: 'bob'};
  render() {
    if (this.state.bob == 'bb') {
      return (
        <View style={[styles.container, styles.horizontal]}>
          <ActivityIndicator color="black" />
          <ActivityIndicator size="large" color="black" />
          <ActivityIndicator size="small" color="#0000ff" />
          <ActivityIndicator size="large" color="#00ff00" />
        </View>
      );
    } else {
      return (
        <View>
          <Text>boban</Text>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});

export default Async;
