import React from 'react';
import {
  Text,
  StyleSheet,
  Pressable,
} from 'react-native';

const TextButton = ({ title, onPress, fontSize }) => {
  return (
    <Text
      onPress={onPress}
      style={[
        styles.container,
        {
          fontSize: fontSize ? fontSize : 18
        }
      ]}
    >
      {title}
    </Text>
  )
};

const styles = StyleSheet.create({
  container: {
    color: '#147efb',
  }
});

export default TextButton;
