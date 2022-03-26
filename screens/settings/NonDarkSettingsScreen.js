import React, { useState, useEffect, useCallback } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  Platform,
  useWindowDimensions,
} from 'react-native';

import { Divider } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';

import { useDispatch, useSelector } from 'react-redux';
import * as settingsActions from '../../store/actions/settings';
import Colors from '../../constants/Colors.js';

import AsyncStorage from '@react-native-async-storage/async-storage';

const NonDarkSettingsScreen = ({ navigation }) => {
  const settings = useSelector(state => state.settings.settings);
  const dispatch = useDispatch();
  const screenHeight = useWindowDimensions().height;
  
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [colorTheme, setColorTheme] = useState('Default');
  const [sortLogsMode, setSortLogsMode] = useState(settings.sortLogsMode);
  const [sortTablesMode, setSortTablesMode] = useState(settings.sortTablesMode);
  const [language, setLanguage] = useState('English');

  console.log(`\nSettingsScreen recently initiated isDarkMode: ${isDarkMode}\n`);

  let headerTitle = 'Settings';
  let darkModeItem = 'Dark Mode';
  let colorThemeItem = 'Color Theme';
  let languagesItem = 'Language';
  let sortLogsItem = 'Sort Logs';
  let sortTablesItem = 'Sort Tables';
  let deleteDataItem = 'Delete Logs and Tables';

  let sortLogsModeText = sortLogsMode === 'last_created' ?
    'Last Created'
  : 
    sortLogsMode === 'first_created' ?
      'First Created'
    :
      sortLogsMode === 'alphabetical_ascending' ?
        'Alphabetical Ascending'
      :
        sortLogsMode === 'alphabetical_descending' &&
          'Alphabetical Descending';

  let sortTablesModeText = sortTablesMode === 'last_created' ?
    'Last Created'
  : 
    sortTablesMode === 'first_created' ?
      'First Created'
    :
      sortTablesMode === 'alphabetical_ascending' ?
        'Alphabetical Ascending'
      :
        sortTablesMode === 'alphabetical_descending' &&
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

      sortLogsModeText = sortLogsMode === 'last_created' ?
        'Última Creación'
      : 
        sortLogsMode === 'first_created' ?
          'Primera Creación'
        :
          sortLogsMode === 'alphabetical_ascending' ?
            'Alfabética Ascendente'
          :
            sortLogsMode === 'alphabetical_descending' &&
              'Alfabética Descendente';

      sortTablesModeText = sortTablesMode === 'last_created' ?
        'Última Creación'
      : 
        sortTablesMode === 'first_created' ?
          'Primera Creación'
        :
          sortTablesMode === 'alphabetical_ascending' ?
            'Alfabética Ascendente'
          :
            sortTablesMode === 'alphabetical_descending' &&
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
      
      sortLogsModeText = sortLogsMode === 'last_created' ?
        'Last Created'
      : 
        sortLogsMode === 'first_created' ?
          'First Created'
        :
          sortLogsMode === 'alphabetical_ascending' ?
            'Alphabetical Ascending'
          :
            sortLogsMode === 'alphabetical_descending' &&
              'Alphabetical Descending';

      sortTablesModeText = sortTablesMode === 'last_created' ?
        'Last Created'
      : 
        sortTablesMode === 'first_created' ?
          'First Created'
        :
          sortTablesMode === 'alphabetical_ascending' ?
            'Alphabetical Ascending'
          :
            sortTablesMode === 'alphabetical_descending' &&
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

  // const fetchIsDarkMode = async () => {
  //   try {
  //     const isDarkModeValue = await AsyncStorage.getItem('isDarkMode') === 'true';

  //     if(isDarkModeValue !== null) {
  //       setIsDarkMode(isDarkModeValue);
  //     }
  //     else {
  //       setIsDarkMode(true);
  //     }
  //   }
  //   catch(error) {
  //     console.log('Unable to fetch isDarkMode from AsyncStorage');
  //     console.log(error);
  //   }
  // }

  const fetchStoredValues = async () => {
    try {
      // const isDarkModeValue = await AsyncStorage.getItem('isDarkMode') === 'true';
      const colorThemeValue = await AsyncStorage.getItem('colorTheme');
      const sortLogsModeValue = await AsyncStorage.getItem('sortLogsMode');
      const sortTablesModeValue = await AsyncStorage.getItem('sortTablesMode');
      const languageValue = await AsyncStorage.getItem('language');

      // if(isDarkModeValue !== null) {
      //   setIsDarkMode(isDarkModeValue);
      // }
      // else {
      //   setIsDarkMode(true);
      // }

      if(colorThemeValue !== null) {
        setColorTheme(colorThemeValue);
        console.log(`\n----------\nSettingsScreen colorTheme: ${colorTheme}\n----------\n`);
      }
      else {
        setColorTheme('Default');
      }

      if(sortLogsModeValue !== null) {
        setSortLogsMode(sortLogsModeValue);
      }
      else {
        setSortLogsMode('last_created');
      }

      if(sortTablesModeValue !== null) {
        setSortTablesMode(sortTablesModeValue);
      }
      else {
        setSortTablesMode('last_created');
      }

      if(languageValue !== null) {
        setLanguage(languageValue);
      }
      else {
        setLanguage('English');
      }
    }
    catch(error) {
      console.log('Unable to fetch stored values from AsyncStorage');
      console.log(error);
    }
  }

  // //  fetchIsDarkMode() is created separately to prevent infinite toggle
  // //  between isDarkMode === true and isDarkMode === false
  // useEffect(() => {
  //   fetchIsDarkMode();
  // }, [settings.isDarkMode]) //   <-- loads once the screen is loaded.

  // useEffect(() => {
  //   fetchStoredValues();
  // }) //  <-- loads all other values to be dynamic with AsyncStorage values

  useEffect(() => {
    console.log(`\nSettingsScreen isDarkMode (useEffect): ${isDarkMode}`);
    console.log(`SettingsScreen typeof(isDarkMode) (useEffect): ${typeof(isDarkMode)}\n`);

    // dispatch(settingsActions.setDarkMode(isDarkMode));
    
    // if(isDarkMode !== null) {
    //   try {
    //     AsyncStorage.setItem(isDarkMode.toString());
    //     console.log('useEffect isDarkMode set');
    //   }
    //   catch(error) {
    //     console.log('Unable to set dark mode inside useEffect');
    //     console.log(error);
    //   }
    // }
    

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
    })
  }, [
    settings.isDarkMode,
    settings.language,
    androidHeaderColor,
  ])

  // const toggleDarkMode = () => setIsDarkMode(currentState => !currentState);
  const toggleDarkMode = () => {
    setIsDarkMode(currentState => !currentState);
    try {
      AsyncStorage.setItem('isDarkMode', isDarkMode.toString());
      console.log('isDarkMode overwritten')
      console.log(`isDarkMode overwrite: ${isDarkMode}`);
    }
    catch(error) {
      console.log('Unable to set isDarkMode:');
      console.log(error);
    }
  }

  //  These variables are for the swipeables to close when the user
  //  clicks anywhere on the screen

  const settingsBackground = {
    backgroundColor: settings.isDarkMode ? Colors.MatteBlack : '#eee',
    color: settings.isDarkMode ? '#fff' : '#000',
  }

  const settingsText = {
    paddingTop: '5%',
    color: settings.isDarkMode ? '#fff' : '#000',
  }

  //  -------------------------------------------------------------

  let screenDimensions = Math.floor(screenHeight);
  let iosGapHeight = '38.8%';
  let androidGapHeight = '26%';

  switch(screenDimensions) {
    case 667:
      iosGapHeight = '34%';
      break;
    case 737:
      androidGapHeight = '34%';
      break;
    case 752:
      androidGapHeight = '35%';
      break;
    case 800:
      androidGapHeight = '34%';
      break;
    case 812:
      iosGapHeight = '38%';
      break;
    case 854:
      androidGapHeight = '36%';
      break;
    case 926:
      iosGapHeight = '40.7%';
      break;
    default:
      iosGapHeight = '38.8%';
      androidGapHeight = '26%';
  }

  return (
    //  TODO: Switch back the Pressable to View component and delete
    //        the onPress action when you're done with it.
    <Pressable 
      style={[
        styles.container,
        {
          backgroundColor: settings.isDarkMode ?
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
        <View
          style={{
            height: Platform.OS === 'ios' ?
              iosGapHeight
            :
              androidGapHeight,
          }}
        />
        <Divider />
        <Pressable
          onPress={() => {
            navigation.navigate('DeleteDataScreen');
          }}
        >
          <View 
            style={[
              styles.blockItem,
              settingsBackground
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

export default NonDarkSettingsScreen;
