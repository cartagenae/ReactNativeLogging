import React from 'react';
import { Platform } from 'react-native';
import { HeaderButton } from 'react-navigation-header-buttons';
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

import Colors from '../constants/Colors';

const IconHeader = props => {
  const {
    component,
    size,
    color
  } = props;

  let IconSource;

  switch(component) {
    case 'AntDesign':
      IconSource = AntDesign
      break;
    case 'Entypo':
      IconSource = Entypo
      break;
    case 'EvilIcons':
      IconSource = EvilIcons
      break;
    case 'Feather':
      IconSource = Feather
      break;
    case 'FontAwesome':
      IconSource = FontAwesome
      break;
    case 'FontAwesome5':
      IconSource = FontAwesome5
      break;
    case 'Fontisto':
      IconSource = Fontisto
      break;
    case 'Foundation':
      IconSource = Foundation
      break;
    case 'Ionicons':
      IconSource = Ionicons
      break;
    case 'MaterialCommunityIcons':
      IconSource = MaterialCommunityIcons
      break;
    case 'MaterialIcons':
      IconSource = MaterialIcons
      break;
    case 'Octicons':
      IconSource = Octicons
      break;
    case 'SimpleLineIcons':
      IconSource = SimpleLineIcons
      break;
    case 'Zocial':
      IconSource = Zocial
      break;
  }

  return (
    <HeaderButton
      IconComponent={IconSource}
      iconSize={size ? size : 30}
      color={color ? color : Colors.CalaGreen}
      {...props}
    />
  )
}

export default IconHeader;
