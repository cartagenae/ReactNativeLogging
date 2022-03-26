import React from 'react';
import {
  Text,
  View,
  StyleSheet,
} from 'react-native';

import Colors from '../constants/Colors.js';

const MaterialButton = (props) => {
  return (
    <View style={styles.materialButton}>
      <Text
        style={{
          color: Colors.CalaGreen
        }}
      >
        MaterialButton to press
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  materialButton: {
    backgroundColor: Colors.LightPurple,
    color: Colors.CalaGreen,
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    width: 125,
    borderRadius: 10,
  }
})

export default MaterialButton;
