import React from 'react';
import { Platform } from 'react-native';
import { HeaderButton } from 'react-navigation-header-buttons';
import { Entypo } from '@expo/vector-icons';

import Colors from '../constants/Colors';

const IoniconsHeader = props => {
  return (
    <HeaderButton
      IconComponent={Entypo}
      iconSize={30}
      color={Colors.CalaGreen}
      {...props}
    />
  )
}

export default IoniconsHeader;
