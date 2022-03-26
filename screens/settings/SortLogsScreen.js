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
import * as logsActions from '../../store/actions/logs';

import { Ionicons } from '@expo/vector-icons';
import { Divider } from 'react-native-paper';

import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import IconHeader from '../../components/IconHeader';

import {
  clearAllLogs,
  insertLog,
} from '../../helpers/logsDb';

const SortLogsScreen = ({ navigation }) => {
  const settings = useSelector(state => state.settings.settings);
  const logs = useSelector(state => state.logs.logs);
  const dispatch = useDispatch();

  const [sortLogsMode, setSortLogsMode] = useState(settings.sortLogsMode);

  let headerTitle = 'Sort Logs';
  let alphabeticalAscendingItem = 'Alphabetical Ascending';
  let alphabeticalDescendingItem = 'Alphabetical Descending';
  let lastCreatedItem = 'Last Created';
  let firstCreatedItem = 'First Created';

  switch(settings.language) {
    case 'Español':
      headerTitle = 'Ordenar Registros';
      alphabeticalAscendingItem = 'Alfabética Ascendente';
      alphabeticalDescendingItem = 'Alfabética Descendente';
      lastCreatedItem = 'Última Creación';
      firstCreatedItem = 'Primera Creación';
    
      break;
    default:
      headerTitle = 'Sort Logs';
      alphabeticalAscendingItem = 'Alphabetical Ascending';
      alphabeticalDescendingItem = 'Alphabetical Descending';
      lastCreatedItem = 'Last Created';
      firstCreatedItem = 'First Created';
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

  //  styles dynamic to settings.isDarkMode --------------------------------------

  const sortLogsBackground = {
    backgroundColor: settings.isDarkMode ? Colors.MatteBlack : '#eee', //353935
    color: settings.isDarkMode ? '#fff' : '#000',
  }

  const sortLogsText = {
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

  const reorderLogs = () => {
    clearAllLogs();
    for(let index = 0; index < logs.length; index++) {
      insertLog(
        logs[index].id,
        logs[index].name,
        logs[index].description,
        logs[index].logIndex,
        logs[index].created,
      )
    }
  }

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: settings.isDarkMode ? Colors.PitchBlack : '#fff',
        }
      ]}
    >
      <View style={styles.blockContainer}>
        <View style={styles.space} />
        <Divider />
        <Pressable
          onPress={() => {
            setSortLogsMode('alphabetical_ascending');
            dispatch(settingsActions.setSortLogsMode('alphabetical_ascending'));
            dispatch(logsActions.sortByAlphabeticalAscending());
            try {
              reorderLogs();
            }
            catch(error) {
              console.log('Unable to sort logs in ascending order');
              console.log(error);
            }
          }}
        >
          <View
            style={[
              styles.blockItem,
              sortLogsBackground,
            ]}
          >
            <Text style={sortLogsText}>{alphabeticalAscendingItem}</Text>
            {
              sortLogsMode === 'alphabetical_ascending' &&
                <Ionicons
                  name='checkmark'
                  style={[
                    sortLogsText,
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
            setSortLogsMode('alphabetical_descending');
            dispatch(settingsActions.setSortLogsMode('alphabetical_descending'));
            dispatch(logsActions.sortByAlphabeticalDescending());
            try {
              reorderLogs();
            }
            catch(error) {
              console.log('Unable to sort logs in descending order');
              console.log(error);
            }
          }}
        >
          <View
            style={[
              styles.blockItem,
              sortLogsBackground,
            ]}
          >
            <Text style={sortLogsText}>{alphabeticalDescendingItem}</Text>
            {
              sortLogsMode === 'alphabetical_descending' &&
                <Ionicons
                  name='checkmark'
                  style={[
                    sortLogsText,
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
            setSortLogsMode('first_created');
            dispatch(settingsActions.setSortLogsMode('first_created'));
            dispatch(logsActions.sortByDateFirst());
            try {
              reorderLogs();
            }
            catch(error) {
              console.log('Unable to sort logs by date first');
              console.log(error);
            }
          }}
        >
          <View
            style={[
              styles.blockItem,
              sortLogsBackground,
            ]}
          >
            <Text style={sortLogsText}>{firstCreatedItem}</Text>
            {
              sortLogsMode === 'first_created' &&
                <Ionicons
                  name='checkmark'
                  style={[
                    sortLogsText,
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
            setSortLogsMode('last_created');
            dispatch(settingsActions.setSortLogsMode('last_created'));
            dispatch(logsActions.sortByDateLast());
            try {
              reorderLogs();
            }
            catch(error) {
              console.log('Unable to sort logs by date last');
              console.log(error);
            }
          }}
        >
          <View
            style={[
              styles.blockItem,
              sortLogsBackground,
            ]}
          >
            <Text style={sortLogsText}>{lastCreatedItem}</Text>
            {
              sortLogsMode === 'last_created' &&
                <Ionicons
                  name='checkmark'
                  style={[
                    sortLogsText,
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

export default SortLogsScreen;
