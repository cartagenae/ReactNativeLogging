import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Pressable,
} from 'react-native';

import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import IconHeader from '../../components/IconHeader';
import { Divider } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

import Colors from '../../constants/Colors.js';
import { useDispatch, useSelector } from 'react-redux';

import * as settingsActions from '../../store/actions/settings';
import * as deleteDataActions from '../../store/actions/deleteData';

const LanguagesScreen = ({ navigation }) => {
  const settings = useSelector(state => state.settings.settings);
  const dispatch = useDispatch();

  const [language, setLanguage] = useState(settings.language);

  //  styles dynamic to settings.isDarkMode -----------------------------

  const languagesBackground = {
    backgroundColor: settings.isDarkMode ? Colors.MatteBlack : '#eee',
    color: settings.isDarkMode ? '#fff' : '#000',
  }

  const languagesText = {
    paddingTop: '5%',
    color: settings.isDarkMode ? '#fff' : '#000',
  }

  //  -------------------------------------------------------------------

  let headerTitle = 'Languages';

  switch(language) {
    case 'Español':
      headerTitle = 'Idiomas';
      break;
    default:
      headerTitle = 'Languages';
  }
  
  let headerLeftColor = Colors.CalaGreen;
  let checkmarkColor = Colors.CalaGreen;
  let androidHeaderColor = Colors.PurpleFog;

  switch(settings.colorTheme) {
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
        Colors.PowerPurple
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
        Colors.PurpleBlue
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
        Colors.Soldier
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
        Colors.ArrowtipSilver
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
            setLanguage('English');
            dispatch(settingsActions.setLanguage('English'));
            dispatch(dispatch(deleteDataActions.setSettingChanged(true)));
          }}
        >
          <View
            style={[
              styles.blockItem,
              languagesBackground,
            ]}
          >
            <Text style={languagesText}>English</Text>
            {
              language === 'English' &&
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
            setLanguage('Español');
            dispatch(settingsActions.setLanguage('Español'));
            dispatch(dispatch(deleteDataActions.setSettingChanged(true)));
          }}
        >
          <View
            style={[
              styles.blockItem,
              languagesBackground,
            ]}
          >
            <Text style={languagesText}>Español</Text>
            {
              language === 'Español' &&
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

export default LanguagesScreen;
