import {
  SET_DARK_MODE,
  SET_COLOR_THEME,
  SET_SORT_LOGS_MODE,
  SET_SORT_TABLES_MODE,
  SET_LANGUAGE,
  LOAD_SETTINGS,
} from '../types';

import AsyncStorage from '@react-native-async-storage/async-storage';

export const setDarkMode = isDarkMode => {
  return async dispatch => {
    try {
      await AsyncStorage.setItem('isDarkMode', isDarkMode.toString());

      dispatch({
        type: SET_DARK_MODE,
        isDarkMode: isDarkMode,
      })
    }
    catch(error) {
      console.log('Unable to toggle dark mode');
      console.log(error);
    }
  }
}

export const setColorTheme = colorTheme => {
  return async dispatch => {
    try {
      await AsyncStorage.setItem('colorTheme', colorTheme);

      dispatch({ 
        type: SET_COLOR_THEME,
        colorTheme: colorTheme,
      })
    }
    catch(error) {
      console.log('Unable to set color theme');
      console.log(error);
    }
  }
}

export const setSortLogsMode = sortLogsMode => {
  return async dispatch => {
    try {
      await AsyncStorage.setItem('sortLogsMode', sortLogsMode);

      dispatch({
        type: SET_SORT_LOGS_MODE,
        sortLogsMode: sortLogsMode,
      })
    }
    catch(error) {
      console.log('Unable to sort your logs');
      console.log(error);
    }
  }
}

export const setSortTablesMode = sortTablesMode => {
  return async dispatch => {
    try {
      await AsyncStorage.setItem('sortTablesMode', sortTablesMode);
      
      dispatch({
        type: SET_SORT_TABLES_MODE,
        sortTablesMode: sortTablesMode,
      })
    }
    catch(error) {
      console.log('Unable to sort your tables');
      console.log(error);
    }
  }
}

export const setLanguage = language => {
  return async dispatch => {
    try {
      await AsyncStorage.setItem('language', language);

      dispatch({
        type: SET_LANGUAGE,
        language: language,
      })
    }
    catch(error) {
      console.log('Unable to set language');
      console.log(error);
    }
  }
}

export const loadSettings = () => {
  return async dispatch => {
    try {
      const isDarkModeValue = await AsyncStorage.getItem('isDarkMode') || true;
      const colorThemeValue = await AsyncStorage.getItem('colorTheme') || 'Default';
      const sortLogsModeValue = await AsyncStorage.getItem('sortLogsMode') || 'last_created';
      const sortTablesModeValue = await AsyncStorage.getItem('sortTablesMode') || 'last_created';
      const languageValue = await AsyncStorage.getItem('language') || 'English';
      const isDarkModeString = await AsyncStorage.getItem('isDarkMode');

      const loadedSettings = {
        isDarkMode: isDarkModeValue == 'true',
        colorTheme: colorThemeValue,
        sortLogsMode: sortLogsModeValue,
        sortTablesMode: sortTablesModeValue,
        language: languageValue,
        isDarkModeString: isDarkModeString,
        isDarkModeToggled: false,
      }

      dispatch({
        type: LOAD_SETTINGS,
        settings: loadedSettings
      })
    }
    catch(error) {
      console.log('Unable to load your settings');
      console.log(error);
    }
  }
}
