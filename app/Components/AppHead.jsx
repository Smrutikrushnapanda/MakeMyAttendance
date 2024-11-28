import React, { useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, BackHandler } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';


const AppHead = (props) => {
  const navigation = useNavigation(); // Get navigation object

  // useEffect(() => {
  //   const backAction = () => {
  //     navigation.goBack(); // Handle back navigation
  //     return true;
  //   };
  //   const backHandler = BackHandler.addEventListener(
  //     'hardwareBackPress',
  //     backAction
  //   );
  
  //   return () => {
  //     backHandler.remove(); // Cleanup
  //   };
  // }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.dutyHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon
            name="arrow-back"
            size={30}
            color="#fff"
            style={styles.backicon}
          />
        </TouchableOpacity>
        <Text style={styles.dutyName}>{props.headerName}</Text>
      </View>
    </SafeAreaView>
  );
};

export default AppHead;

const styles = StyleSheet.create({
  dutyHeader: {
    height: 60,
    width: '100%',
    backgroundColor: '#007ab3',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  backicon: {
    marginRight: 10,
  },
  dutyName: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});
