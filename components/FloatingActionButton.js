import React, { useState } from 'react';
import {
  StyleSheet,
  Pressable,
} from 'react-native';
import {
  AntDesign,
  Entypo,
  EvilIcons,
  Feather,
  FontAwesome,
  FontAwesome5,
  Fontisto,
  Foundation,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
  Octicons,
  SimpleLineIcons,
  Zocial
} from '@expo/vector-icons';

const FloatingActionButton = (props) => {
  const {
    buttonColor,
    buttonColorPressed,
    buttonSize,
    IconSource, // required
    iconName, // required
    iconSize,
    iconColor,
    iconColorPressed,
    onPress,
    shaded
  } = props;
  const [pressedIn, setPressedIn] = useState(false);
  let buttonIcon = ''

  switch(IconSource) {
    case 'AntDesign':
      buttonIcon = (
        <AntDesign
          name={iconName}
          color={
            pressedIn ?
              iconColorPressed ? iconColorPressed : '#e2eafc'
            : 
              iconColor ? iconColor : '#edf6f9'
          }
          size={iconSize ? iconSize : 40}
          borderRadius={500}
        />
      )
      break;
    case 'Entypo':
      buttonIcon = (
        <Entypo
          name={iconName}
          color={
            pressedIn ?
              iconColorPressed ? iconColorPressed : '#e2eafc'
            : 
              iconColor ? iconColor : '#edf6f9'
          }
          size={iconSize ? iconSize : 40}
          borderRadius={500}
        />
      )
      break;
    case 'EvilIcons':
      buttonIcon = (
        <EvilIcons
          name={iconName}
          color={
            pressedIn ?
              iconColorPressed ? iconColorPressed : '#e2eafc'
            : 
              iconColor ? iconColor : '#edf6f9'
          }
          size={iconSize ? iconSize : 40}
          borderRadius={500}
        />
      )
      break;
    case 'Feather':
      buttonIcon = (
        <Feather
          name={iconName}
          color={
            pressedIn ?
              iconColorPressed ? iconColorPressed : '#e2eafc'
            : 
              iconColor ? iconColor : '#edf6f9'
          }
          size={iconSize ? iconSize : 40}
          borderRadius={500}
        />
      )
      break;
    case 'FontAwesome':
      buttonIcon = (
        <FontAwesome
          name={iconName}
          color={
            pressedIn ?
              iconColorPressed ? iconColorPressed : '#e2eafc'
            : 
              iconColor ? iconColor : '#edf6f9'
          }
          size={iconSize ? iconSize : 40}
          borderRadius={500}
        />
      )
      break;
    case 'FontAwesome5':
      buttonIcon = (
        <FontAwesome5
          name={iconName}
          color={
            pressedIn ?
              iconColorPressed ? iconColorPressed : '#e2eafc'
            : 
              iconColor ? iconColor : '#edf6f9'
          }
          size={iconSize ? iconSize : 40}
          borderRadius={500}
        />
      )
      break;
    case 'Fontisto':
      buttonIcon = (
        <Fontisto
          name={iconName}
          color={
            pressedIn ?
              iconColorPressed ? iconColorPressed : '#e2eafc'
            : 
              iconColor ? iconColor : '#edf6f9'
          }
          size={iconSize ? iconSize : 40}
          borderRadius={500}
        />
      )
      break;
    case 'Foundation':
      buttonIcon = (
        <Foundation
          name={iconName}
          color={
            pressedIn ?
              iconColorPressed ? iconColorPressed : '#e2eafc'
            : 
              iconColor ? iconColor : '#edf6f9'
          }
          size={iconSize ? iconSize : 40}
          borderRadius={500}
        />
      )
      break;
    case 'Ionicons':
      buttonIcon = (
        <Ionicons
          name={iconName}
          color={
            pressedIn ?
              iconColorPressed ? iconColorPressed : '#e2eafc'
            : 
              iconColor ? iconColor : '#edf6f9'
          }
          size={iconSize ? iconSize : 40}
          borderRadius={500}
        />
      )
      break;
    case 'MaterialCommunityIcons':
      buttonIcon = (
        <MaterialCommunityIcons
          name={iconName}
          color={
            pressedIn ?
              iconColorPressed ? iconColorPressed : '#e2eafc'
            : 
              iconColor ? iconColor : '#edf6f9'
          }
          size={iconSize ? iconSize : 40}
          borderRadius={500}
        />
      )
      break;
    case 'MaterialIcons':
      buttonIcon = (
        <MaterialIcons
          name={iconName}
          color={
            pressedIn ?
              iconColorPressed ? iconColorPressed : '#e2eafc'
            : 
              iconColor ? iconColor : '#edf6f9'
          }
          size={iconSize ? iconSize : 40}
          borderRadius={500}
        />
      )
      break;
    case 'Octicons':
      buttonIcon = (
        <Octicons
          name={iconName}
          color={
            pressedIn ?
              iconColorPressed ? iconColorPressed : '#e2eafc'
            : 
              iconColor ? iconColor : '#edf6f9'
          }
          size={iconSize ? iconSize : 40}
          borderRadius={500}
        />
      )
      break;
    case 'SimpleLineIcons':
      buttonIcon = (
        <SimpleLineIcons
          name={iconName}
          color={
            pressedIn ?
              iconColorPressed ? iconColorPressed : '#e2eafc'
            : 
              iconColor ? iconColor : '#edf6f9'
          }
          size={iconSize ? iconSize : 40}
          borderRadius={500}
        />
      )
      break;
    case 'Zocial':
      buttonIcon = (
        <Zocial
          name={iconName}
          color={
            pressedIn ?
              iconColorPressed ? iconColorPressed : '#e2eafc'
            : 
              iconColor ? iconColor : '#edf6f9'
          }
          size={iconSize ? iconSize : 40}
          borderRadius={500}
        />
      )
      break;
  }

  return (
    <Pressable 
      style={[
        props.style,
        styles.container,
        pressedIn ?
          {
            backgroundColor: buttonColorPressed ? buttonColorPressed : '#6a4c93',
            shadowOpacity: 0,
            elevation: 0,
          }
        :
          {
            backgroundColor: buttonColor ? buttonColor : '#480ca8',
            shadowOpacity: shaded === true ? 0.35 : 0,
            elevation: shaded === true ? 20 : 0,
          },
        {
          height: buttonSize ? buttonSize : 65,
          width: buttonSize ? buttonSize : 65,
        },
      ]}
      onPressIn={() => setPressedIn(true)}
      onPressOut={() => setPressedIn(false)}
      onPress={onPress}
    >
      {buttonIcon}
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    shadowColor: 'black',
    shadowOffset: {
      height: 10,
      width: 5
    },
    shadowRadius: 10,
    opacity: 100
  }
})

export default FloatingActionButton;
