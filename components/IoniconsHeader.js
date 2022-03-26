import React from 'react';
import { Platform } from 'react-native';
import { HeaderButton } from 'react-navigation-header-buttons';
import { Ionicons } from '@expo/vector-icons';

import Colors from '../constants/Colors';

const IoniconsHeader = props => {
  const {
    component,
    size,
    color
  } = props;

  return (
    <HeaderButton
      IconComponent={component ? component : Ionicons}
      iconSize={size ? size : 40}
      color={color ? color : Colors.CalaGreen}
      {...props}
    />
  )
}

export default IoniconsHeader;
