import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Platform,
  Pressable,
} from 'react-native';
import Colors from '../../constants/Colors.js';

import { useDispatch, useSelector } from 'react-redux';
import * as settingsActions from '../../store/actions/settings';
import * as tablesActions from '../../store/actions/tables';

import { Ionicons } from '@expo/vector-icons';
import { Divider } from 'react-native-paper';

import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import IconHeader from '../../components/IconHeader';

const SortTablesScreen = ({ navigation }) => {
  const settings = useSelector(state => state.settings.settings);
  const dispatch = useDispatch();

  const [sortTablesMode, setSortTablesMode] = useState(settings.sortTablesMode);

  let headerTitle = 'Sort Tables';
  let alphabeticalAscendingItem = 'Alphabetical Ascending';
  let alphabeticalDescendingItem = 'Alphabetical Descending';
  let firstCreatedItem = 'First Created';
  let lastCreatedItem = 'Last Created';

  switch(settings.language) {
    case 'Español':
      headerTitle = 'Ordenar Tablas';
      alphabeticalAscendingItem = 'Alfabética Ascendente';
      alphabeticalDescendingItem = 'Alfabética Descendente';
      firstCreatedItem = 'Primera Creación';
      lastCreatedItem = 'Última Creación';
    
      break;
    default:
      headerTitle = 'Sort Tables';
      alphabeticalAscendingItem = 'Alphabetical Ascending';
      alphabeticalDescendingItem = 'Alphabetical Descending';
      firstCreatedItem = 'First Created';
      lastCreatedItem = 'Last Created';
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

  //  styles dynamic to settings.isDarkMode -----------------------------

  const sortTablesBackground = {
    backgroundColor: settings.isDarkMode ? Colors.MatteBlack : '#eee', //353935
    color: settings.isDarkMode ? '#fff' : '#000',
  }

  const sortTablesText = {
    paddingTop: '5%',
    color: settings.isDarkMode ? '#fff' : '#000',
  }

  //  -------------------------------------------------------------------

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
        )
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
        }
      ]}
    >
      <View style={styles.blockContainer}>
        <View style={styles.space} />
        <Divider />
        <Pressable
          onPress={() => {
            setSortTablesMode('alphabetical_ascending');
            dispatch(settingsActions.setSortTablesMode('alphabetical_ascending'));
            dispatch(tablesActions.sortByAlphabeticalAscending());
          }}
        >
          <View
            style={[
              styles.blockItem,
              sortTablesBackground,
            ]}
          >
            <Text style={sortTablesText}>{alphabeticalAscendingItem}</Text>
            {
              sortTablesMode === 'alphabetical_ascending' &&
                <Ionicons
                  name='checkmark'
                  style={[
                    sortTablesText,
                    {
                      marginTop: '0%',
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
            setSortTablesMode('alphabetical_descending');
            dispatch(settingsActions.setSortTablesMode('alphabetical_descending'));
            dispatch(tablesActions.sortByAlphabeticalDescending());
          }}
        >
          <View
            style={[
              styles.blockItem,
              sortTablesBackground,
            ]}
          >
            <Text style={sortTablesText}>{alphabeticalDescendingItem}</Text>
            {
              sortTablesMode === 'alphabetical_descending' &&
                <Ionicons
                  name='checkmark'
                  style={[
                    sortTablesText,
                    {
                      marginTop: '0%',
                      color: checkmarkColor,
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
            setSortTablesMode('first_created');
            dispatch(settingsActions.setSortTablesMode('first_created'));
            dispatch(tablesActions.sortByDateFirst());
          }}
        >
          <View
            style={[
              styles.blockItem,
              sortTablesBackground,
            ]}
          >
            <Text style={sortTablesText}>{firstCreatedItem}</Text>
            {
              sortTablesMode === 'first_created' &&
                <Ionicons
                  name='checkmark'
                  style={[
                    sortTablesText,
                    {
                      marginTop: '0%',
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
            setSortTablesMode('last_created');
            dispatch(settingsActions.setSortTablesMode('last_created'));
            dispatch(tablesActions.sortByDateLast());
          }}
        >
          <View
            style={[
              styles.blockItem,
              sortTablesBackground,
            ]}
          >
            <Text style={sortTablesText}>{lastCreatedItem}</Text>
            {
              sortTablesMode === 'last_created' &&
                <Ionicons
                  name='checkmark'
                  style={[
                    sortTablesText,
                    {
                      marginTop: '0%',
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

export default SortTablesScreen;
