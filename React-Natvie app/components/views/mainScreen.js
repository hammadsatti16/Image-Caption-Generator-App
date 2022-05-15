import React from 'react';
import {StyleSheet, View, StatusBar} from 'react-native';
import {NavigationService} from '../../services/navigationServices';
import Button from './../button';

export default function MainView() {
  return (
    <View style={styles.container}>
      <Button
        text="Upload an Image from Camera or Gallery"
        onPress={() => NavigationService.navigate('Image Caption Generator')}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
