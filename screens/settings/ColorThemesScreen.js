import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  Platform,
} from 'react-native';

import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import IconHeader from '../../components/IconHeader';
import { Divider } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

import Colors from '../../constants/Colors.js';
import { useDispatch, useSelector } from 'react-redux';

import * as settingsActions from '../../store/actions/settings';
import * as deleteDataActions from '../../store/actions/deleteData';

const ColorThemesScreen = ({ navigation }) => {
  const settings = useSelector(state => state.settings.settings);
  const dispatch = useDispatch();

  const [colorTheme, setColorTheme] = useState(settings.colorTheme);

  let headerTitle = 'Color Themes';

  switch(settings.language) {
    case 'Español':
      headerTitle = 'Temas de Colores';
      break;
    default:
      headerTitle = 'Color Themes'
  }

  //  styles dynamic to settings.isDarkMode -----------------------------

  const languagesBackground = {
    backgroundColor: settings.isDarkMode ? Colors.MatteBlack : '#eee', //353935
    color: settings.isDarkMode ? '#fff' : '#000',
  }

  const languagesText = {
    paddingTop: '5%',
    color: settings.isDarkMode ? '#fff' : '#000',
  }

  //  -------------------------------------------------------------------

  let headerLeftColor = Colors.CalaGreen;
  let checkmarkColor = Colors.CalaGreen;
  let androidHeaderColor = Colors.PurpleFog;

  switch(colorTheme) {
    case 'Zeus':
      headerLeftColor = Platform.OS === 'ios' ?
        settings.isDarkMode ?
          Colors.AlmightyGold
        :
          Colors.PurpleSky
      :
        Colors.AlmightyGold;

      checkmarkColor = settings.isDarkMode ?
        Colors.AlmightyGold
      :
        Colors.PurpleSky;

      androidHeaderColor = Colors.PurpleSky;

      break;
    case 'Hera':
      headerLeftColor = Platform.OS === 'ios' ?
        settings.isDarkMode ?
          Colors.PowerPurple
        :
          Colors.Pink
      :
        Colors.PinkPressed;

      checkmarkColor = settings.isDarkMode ?
        Colors.Pink
      :
        Colors.Pink;

      androidHeaderColor = Colors.PurpleThunder;

      break;
    case 'Poseidon':
      headerLeftColor = Platform.OS === 'ios' ?
        settings.isDarkMode ?
          Colors.PurpleBlue
        :
          Colors.RiverGreen
      :
        Colors.PurpleBlue;

      checkmarkColor = settings.isDarkMode ?
        Colors.ClearOcean
      :
        Colors.RiverGreen;

      androidHeaderColor = Colors.LightOcean;

      break;
    case 'Apollo':
      headerLeftColor = Platform.OS === 'ios' ?
        settings.isDarkMode ?
          Colors.Soldier
        :
          Colors.LimeGreen
      :
        Colors.Soldier;

      checkmarkColor = settings.isDarkMode ?
        Colors.LemonYellow
      :
        Colors.LimeGreen;

      androidHeaderColor = Colors.DarkGrayStone;

      break;
    case 'Artemis':
      headerLeftColor = Platform.OS === 'ios' ?
        settings.isDarkMode ?
          Colors.ArrowtipSilver
        :
          Colors.NightBlue
      :
        Colors.StoneBlue;

      checkmarkColor = settings.isDarkMode ?
        Colors.Moon
      :
        Colors.NightBlue;

      androidHeaderColor = Colors.DeepPurple;

      break;
    case 'Hades':
      headerLeftColor = Platform.OS === 'ios' ?
        settings.isDarkMode ?
          Colors.LightMaroon
        :
          Colors.DarkMaroon
      :
        Colors.BlueFire;

      checkmarkColor = settings.isDarkMode ?
        Colors.Crimson
      :
        Colors.LightMaroon;

      androidHeaderColor = Colors.MatteBlack;

      break;
    default:
      headerLeftColor = Colors.CalaGreen;
      checkmarkColor = Colors.CalaGreen;
      androidHeaderColor = Colors.PurpleFog;
  }

  useEffect(() => {
    navigation.setOptions({
      headerTitle: headerTitle,
      headerTintColor: (
        Platform.OS === 'ios' ?
          settings.isDarkMode ? '#fff' : '#000'
        :
          '#fff'
      ),
      headerStyle: {
        backgroundColor: (
          Platform.OS === 'ios' ?
            settings.isDarkMode ? Colors.MatteBlack : '#fff'
          :
            androidHeaderColor
        ),
      },
      headerLeft: () => (
        <HeaderButtons HeaderButtonComponent={IconHeader}>
          <Item
            title='GoBack'
            component='MaterialIcons'
            iconName='arrow-back'
            onPress={() => navigation.goBack()}
            size={32}
            color={headerLeftColor}
          />
        </HeaderButtons>
      ),
    })
  })

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: settings.isDarkMode ?
              Colors.PitchBlack
            :
              '#fff',
        },
      ]}
    >
      <View style={styles.blockContainer}>
        <View style={styles.space} />
        <Divider />
        <Pressable
          onPress={() => {
            setColorTheme('Default');
            dispatch(settingsActions.setColorTheme('Default'));
            dispatch(dispatch(deleteDataActions.setSettingChanged(true)));
          }}
        >
          <View
            style={[
              styles.blockItem,
              languagesBackground,
            ]}
          >
            <Text style={languagesText}>Default</Text>
            {
              colorTheme === 'Default' &&
                <Ionicons
                  name='checkmark'
                  style={[
                    styles.languagesText,
                    {
                      marginTop: '4%',
                      color: Colors.CalaGreen,
                    }
                  ]}
                  size={20}
                />
            }
          </View>
        </Pressable>
        <Divider />
        <View style={styles.space} />
        <Divider />
        <Pressable
          onPress={() => {
            setColorTheme('Zeus');
            dispatch(settingsActions.setColorTheme('Zeus'));
            dispatch(dispatch(deleteDataActions.setSettingChanged(true)));
          }}
        >
          <View
            style={[
              styles.blockItem,
              languagesBackground,
            ]}
          >
            <Text style={languagesText}>Zeus</Text>
            {
              colorTheme === 'Zeus' &&
                <Ionicons
                  name='checkmark'
                  style={[
                    styles.languagesText,
                    {
                      marginTop: '4%',
                      color: checkmarkColor,
                    }
                  ]}
                  size={20}
                />
            }
          </View>
        </Pressable>
        <Divider />
        <Pressable
          onPress={() => {
            setColorTheme('Hera');
            dispatch(settingsActions.setColorTheme('Hera'));
            dispatch(dispatch(deleteDataActions.setSettingChanged(true)));
          }}
        >
          <View
            style={[
              styles.blockItem,
              languagesBackground,
            ]}
          >
            <Text style={languagesText}>Hera</Text>
            {
              colorTheme === 'Hera' &&
                <Ionicons
                  name='checkmark'
                  style={[
                    styles.languagesText,
                    {
                      marginTop: '4%',
                      color: checkmarkColor,
                    }
                  ]}
                  size={20}
                />
            }
          </View>
        </Pressable>
        <Divider />
        <Pressable
          onPress={() => {
            setColorTheme('Poseidon');
            dispatch(settingsActions.setColorTheme('Poseidon'));
            dispatch(dispatch(deleteDataActions.setSettingChanged(true)));
          }}
        >
          <View
            style={[
              styles.blockItem,
              languagesBackground,
            ]}
          >
            <Text style={languagesText}>Poseidon</Text>
            {
              colorTheme === 'Poseidon' &&
                <Ionicons
                  name='checkmark'
                  style={[
                    styles.languagesText,
                    {
                      marginTop: '4%',
                      color: checkmarkColor,
                    }
                  ]}
                  size={20}
                />
            }
          </View>
        </Pressable>
        <Divider />
        <Pressable
          onPress={() => {
            setColorTheme('Apollo');
            dispatch(settingsActions.setColorTheme('Apollo'));
            dispatch(dispatch(deleteDataActions.setSettingChanged(true)));
          }}
        >
          <View
            style={[
              styles.blockItem,
              languagesBackground,
            ]}
          >
            <Text style={languagesText}>Apollo</Text>
            {
              colorTheme === 'Apollo' &&
                <Ionicons
                  name='checkmark'
                  style={[
                    styles.languagesText,
                    {
                      marginTop: '4%',
                      color: checkmarkColor,
                    }
                  ]}
                  size={20}
                />
            }
          </View>
        </Pressable>
        <Divider />
        <Pressable
          onPress={() => {
            setColorTheme('Artemis');
            dispatch(settingsActions.setColorTheme('Artemis'));
            dispatch(dispatch(deleteDataActions.setSettingChanged(true)));
          }}
        >
          <View
            style={[
              styles.blockItem,
              languagesBackground,
            ]}
          >
            <Text style={languagesText}>Artemis</Text>
            {
              colorTheme === 'Artemis' &&
                <Ionicons
                  name='checkmark'
                  style={[
                    styles.languagesText,
                    {
                      marginTop: '4%',
                      color: checkmarkColor,
                    }
                  ]}
                  size={20}
                />
            }
          </View>
        </Pressable>
        <Divider />
        <Pressable
          onPress={() => {
            setColorTheme('Hades');
            dispatch(settingsActions.setColorTheme('Hades'));
            dispatch(dispatch(deleteDataActions.setSettingChanged(true)));
          }}
        >
          <View
            style={[
              styles.blockItem,
              languagesBackground,
            ]}
          >
            <Text style={languagesText}>Hades</Text>
            {
              colorTheme === 'Hades' &&
                <Ionicons
                  name='checkmark'
                  style={[
                    styles.languagesText,
                    {
                      marginTop: '4%',
                      color: checkmarkColor,
                    }
                  ]}
                  size={20}
                />
            }
          </View>
        </Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  blockContainer: {
    flex: 1,
    width: '100%',
  },
  blockItem: {
    height: 50,
    paddingHorizontal: '5%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  space: {
    marginTop: '7%',
  },
  separator: {
    flex: 1,
    height: 1,
    backgroundColor: '#e4e4e4',
    marginLeft: 10,
    marginRight: 10,
  },
})

export default ColorThemesScreen;
