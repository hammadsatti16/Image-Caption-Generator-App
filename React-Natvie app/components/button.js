import {Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';

export default function Button(props) {
  return (
    <TouchableOpacity style={styles.HealthButton} onPress={props.onPress}>
      <Text style={styles.ButtonText}>{props.text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  HealthButton: {
    backgroundColor: '#520f54',
    borderRadius: 25,
    marginVertical: 10,
    paddingVertical: 10,
    alignSelf: 'center',
  },
  ButtonText: {
    fontSize: 20,
    fontWeight: '500',
    color: 'rgba(255,255,255,0.9)',
    textAlign: 'center',
    paddingHorizontal: 20,
    paddingBottom: 5,
  },
});
