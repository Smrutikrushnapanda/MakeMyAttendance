import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Spinner from 'react-native-animated-spinkit';

const Loader = () => {
  return (
    <View style={styles.container}>
      <Spinner type="Circle" size={100} color="#4fa94d" />
    </View>
  );
};

export default Loader;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});