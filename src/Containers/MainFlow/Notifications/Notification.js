import React, {Component} from 'react';
import {SafeAreaView, Text, StyleSheet} from 'react-native';

class Notification extends Component {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Post Add</Text>
      </SafeAreaView>
    );
  }
}

export default Notification;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
});
