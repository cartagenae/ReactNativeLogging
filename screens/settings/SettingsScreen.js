import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  Switch,
  Platform,
  useWindowDimensions,
} from 'react-native';

import { Divider } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';

import { useDispatch, useSelector } from 'react-redux';
import * as settingsActions from '../../store/actions/settings';
import * as deleteDataActions from '../../store/actions/deleteData';
import Colors from '../../constants/Colors.js';

const SettingsScreen = ({ navigation }) => {
  const settings = useSelector(state => state.settings.settings);
  const deleteData = useSelector(state => state.deleteData);
  const dispatch = useDispatch();
  const screenHeight = useWindowDimensions().height;

  const [isDarkMode, setIsDarkMode] = useState(settings.isDarkMode);

  let headerTitle = 'Settings';
  let darkModeItem = 'Dark Mode';
  let colorThemeItem = 'Color Theme';
  let languagesItem = 'Language';
  let sortLogsItem = 'Sort Logs';
  let sortTablesItem = 'Sort Tables';
  let deleteDataItem = 'Delete Logs and Tables';

  let sortLogsModeText = settings.sortLogsMode === 'last_created' ?
    'Last Created'
  : 
    settings.sortLogsMode === 'first_created' ?
      'First Created'
    :
      settings.sortLogsMode === 'alphabetical_ascending' ?
        'Alphabetical Ascending'
      :
        settings.sortLogsMode === 'alphabetical_descending' &&
          'Alphabetical Descending';

  let sortTablesModeText = settings.sortTablesMode === 'last_created' ?
    'Last Created'
  : 
    settings.sortTablesMode === 'first_created' ?
      'First Created'
    :
      settings.sortTablesMode === 'alphabetical_ascending' ?
        'Alphabetical Ascending'
      :
        settings.sortTablesMode === 'alphabetical_descending' &&
          'Alphabetical Descending';

  switch(settings.language) {
    case 'Español':
      headerTitle = 'Ajustes';
      darkModeItem = 'Modo Oscuro';
      colorThemeItem = 'Tema de Color';
      languagesItem = 'Idioma';
      sortLogsItem = 'Ordenar Registros';
      sortTablesItem = 'Ordenar Tablas';
      deleteDataItem = 'Eliminar Registros y Tablas';

      sortLogsModeText = settings.sortLogsMode === 'last_created' ?
        'Última Creación'
      : 
        settings.sortLogsMode === 'first_created' ?
          'Primera Creación'
        :
          settings.sortLogsMode === 'alphabetical_ascending' ?
            'Alfabética Ascendente'
          :
            settings.sortLogsMode === 'alphabetical_descending' &&
              'Alfabética Descendente';

      sortTablesModeText = settings.sortTablesMode === 'last_created' ?
        'Última Creación'
      : 
        settings.sortTablesMode === 'first_created' ?
          'Primera Creación'
        :
          settings.sortTablesMode === 'alphabetical_ascending' ?
            'Alfabética Ascendente'
          :
            settings.sortTablesMode === 'alphabetical_descending' &&
              'Alfabética Descendente';

      break;
    default:
      headerTitle = 'Settings';
      darkModeItem = 'Dark Mode';
      colorThemeItem = 'Color Theme';
      languagesItem = 'Language';
      sortLogsItem = 'Sort Logs';
      sortTablesItem = 'Sort Tables';
      deleteDataItem = 'Delete Logs and Tables';
      
      sortLogsModeText = settings.sortLogsMode === 'last_created' ?
        'Last Created'
      : 
        settings.sortLogsMode === 'first_created' ?
          'First Created'
        :
          settings.sortLogsMode === 'alphabetical_ascending' ?
            'Alphabetical Ascending'
          :
            settings.sortLogsMode === 'alphabetical_descending' &&
              'Alphabetical Descending';

      sortTablesModeText = settings.sortTablesMode === 'last_created' ?
        'Last Created'
      : 
        settings.sortTablesMode === 'first_created' ?
          'First Created'
        :
          settings.sortTablesMode === 'alphabetical_ascending' ?
            'Alphabetical Ascending'
          :
            settings.sortTablesMode === 'alphabetical_descending' &&
              'Alphabetical Descending';
  }

  let androidHeaderColor = Colors.PurpleFog;

  switch(settings.colorTheme) {
    case 'Zeus':
      androidHeaderColor = Colors.PurpleSky;
      break;
    case 'Hera':
      androidHeaderColor = Colors.PurpleThunder;
      break;
    case 'Poseidon':
      androidHeaderColor = Colors.LightOcean;
      break;
    case 'Apollo':
      androidHeaderColor = Colors.DarkGrayStone;
      break;
    case 'Artemis':
      androidHeaderColor = Colors.DeepPurple;
      break;
    case 'Hades':
      androidHeaderColor = Colors.MatteBlack;
      break;
    default:
      androidHeaderColor = Colors.PurpleFog;
  }

  useEffect(() => {
    navigation.setOptions({
      headerTitle: headerTitle,
      headerTintColor: (
        Platform.OS === 'ios' ?
          isDarkMode ? '#fff' : '#000'
        :
          '#fff'
      ),
      headerStyle: {
        backgroundColor: (
          Platform.OS === 'ios' ?
            isDarkMode ? Colors.MatteBlack : '#fff'
          :
            androidHeaderColor
        ),
      },
    })
  }, [
    isDarkMode,
    settings.language,
    androidHeaderColor,
  ])

  const toggleDarkMode = () => {
    setIsDarkMode(!settings.isDarkMode);
    dispatch(deleteDataActions.setSettingChanged(true));
    dispatch(settingsActions.setDarkMode(!settings.isDarkMode));
  };

  //  These variables are for the swipeables to close when the user
  //  clicks anywhere on the screen

  const settingsBackground = {
    backgroundColor: isDarkMode ? Colors.MatteBlack : '#eee',
    color: isDarkMode ? '#fff' : '#000',
  }

  const settingsText = {
    paddingTop: '5%',
    color: isDarkMode ? '#fff' : '#000',
  }

  //  -------------------------------------------------------------

  let screenDimensions = Math.floor(screenHeight);
  let iosGapHeight = '31.5%';
  let androidGapHeight = '26%';

  switch(screenDimensions) {
    case 533:
      androidGapHeight = '0%';
      break;
    case 592:
      androidGapHeight = '16%';
      break;
    case 667:
      iosGapHeight = '25%';
      break;
    case 737:
      androidGapHeight = '26%';
      break;
    case 752:
      androidGapHeight = '27.25%';
      break;
    case 800:
      androidGapHeight = '26.5%';
      break;
    case 812:
      iosGapHeight = '30%';
      break;
    case 854:
      androidGapHeight = '29%'
      break;
    case 926:
      iosGapHeight = '34%';
      break;
    case 1152:
      androidGapHeight = '50%';
      break;
    default:
      iosGapHeight = '31.5%';
      androidGapHeight = '26%';
  }

  return (
    //  TODO: Switch back the Pressable to View component and delete
    //        the onPress action when you're done with it.
    <Pressable 
      style={[
        styles.container,
        {
          backgroundColor: isDarkMode ?
              Colors.PitchBlack
            :
              '#fff',
        },
      ]}
      onPress={() => {
        console.log(`\n\nscreenHeight: ${screenHeight}\n\n`);
      }}
    >
      <View style={styles.blockContainer}>
        <View style={styles.space} />
        <Divider />
        <View
          style={[
            styles.blockItem,
            settingsBackground,
          ]}
        >
          <Text style={settingsText}>{darkModeItem}</Text>
          <Switch
            style={{
              marginTop: '3%'
            }}
            onValueChange={toggleDarkMode}
            value={isDarkMode}
          />
        </View>
        <Divider />
        <Pressable
          onPress={() => {
            navigation.navigate('ColorThemesScreen')
          }}
        >
          <View
            style={[
              styles.blockItem,
              settingsBackground,
            ]}
          >
            <Text style={settingsText}>{colorThemeItem}</Text>
            <View 
              style={{
                flexDirection: 'row',
              }}
            >
              <Text
                style={settingsText}
              >
                {settings.colorTheme}
              </Text>
              <MaterialIcons
                name='keyboard-arrow-right'
                style={settingsText}
                size={20}
              />
            </View>
          </View>
        </Pressable>
        <Divider />
        <View style={styles.space} />
        <Divider />
        <Pressable
          onPress={() => {
            navigation.navigate('SortLogsScreen');
          }}
        >
          <View 
            style={[
              styles.blockItem,
              settingsBackground
            ]}
          >
            <Text
              style={settingsText}
            >
              {sortLogsItem}
            </Text>
            <View 
              style={{
                flexDirection: 'row',
              }}
            >
              <Text
                style={settingsText}
              >
                {sortLogsModeText}
              </Text>
              <MaterialIcons
                name='keyboard-arrow-right'
                size={20}
                style={[
                  settingsBackground,
                  {
                    paddingTop: '5%'
                  }
                ]}
              />
            </View>
          </View>
        </Pressable>
        <Divider />
        <Pressable
          onPress={() => {
            navigation.navigate('SortTablesScreen');
          }}
        >
          <View 
            style={[
              styles.blockItem,
              settingsBackground
            ]}
          >
            <Text
              style={settingsText}
            >
              {sortTablesItem}
            </Text>
            <View 
              style={{
                flexDirection: 'row',
              }}
            >
              <Text
                style={settingsText}
              >
                {sortTablesModeText}
              </Text>
              <MaterialIcons
                name='keyboard-arrow-right'
                size={20}
                style={[
                  settingsBackground,
                  {
                    paddingTop: '5%'
                  }
                ]}
              />
            </View>
          </View>
        </Pressable>
        <Divider />
        <View style={styles.space} />
        <Divider />
        <Pressable
          onPress={() => {
            navigation.navigate('LanguagesScreen');
          }}
        >
          <View 
            style={[
              styles.blockItem,
              settingsBackground
            ]}
          >
            <Text style={settingsText}>{languagesItem}</Text>
            <View 
              style={{
                flexDirection: 'row',
              }}
            >
              <Text
                style={settingsText}
              >
                {settings.language}
              </Text>
              <MaterialIcons
                name='keyboard-arrow-right'
                size={20}
                style={[
                  settingsBackground,
                  {
                    paddingTop: '5%'
                  }
                ]}
              />
            </View>
          </View>
        </Pressable>
        <Divider />
        <View style={styles.space} />
        <Divider />
        <Pressable
          onPress={() => {
            navigation.navigate('DeleteDataScreen');
          }}
          // style={styles.bottom}
        >
          <View 
            style={[
              styles.blockItem,
              settingsBackground,
            ]}
          >
            <Text style={settingsText}>{deleteDataItem}</Text>
            <MaterialIcons
              name='keyboard-arrow-right'
              size={20}
              style={[
                settingsBackground,
                {
                  paddingTop: '5%'
                }
              ]}
            />
          </View>
        </Pressable>
        <Divider />
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  bottom: {
    position: 'absolute',
    bottom: 0,
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
  gap: {
    marginTop: '60%',
  },
  separator: {
    flex: 1,
    height: 1,
    backgroundColor: '#e4e4e4',
    marginLeft: 10,
    marginRight: 10,
  },
})

export default SettingsScreen;
