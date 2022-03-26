import {
  SET_DARK_MODE,
  SET_COLOR_THEME,
  SET_SORT_LOGS_MODE,
  SET_SORT_TABLES_MODE,
  SET_LANGUAGE,
  LOAD_SETTINGS,
} from '../types';

const initialState = {
  settings: {
    isDarkMode: null,
    colorTheme: null,
    sortLogsMode: null,
    sortTablesMode: null,
    language: null,
    isDarkModeToggled: false,
  }
}

const settingsReducer = (state = initialState, action) => {
  switch(action.type) {
    case SET_DARK_MODE:
      const updatedDarkMode = action.isDarkMode;

      const updatedDarkSetting = {
        isDarkMode: updatedDarkMode,
        colorTheme: state.settings.colorTheme,
        sortLogsMode: state.settings.sortLogsMode,
        sortTablesMode: state.settings.sortTablesMode,
        language: state.settings.language,
        isDarkModeToggled: state.settings.isDarkModeToggled,
      };

      return {
        settings: updatedDarkSetting,
      };
    case SET_COLOR_THEME:
      const updatedColorTheme = action.colorTheme;

      const updatedColorThemeSetting = {
        isDarkMode: state.settings.isDarkMode,
        colorTheme: updatedColorTheme,
        sortLogsMode: state.settings.sortLogsMode,
        sortTablesMode: state.settings.sortTablesMode,
        language: state.settings.language,
        isDarkModeToggled: state.settings.isDarkModeToggled,
      };
      
      return {
        settings: updatedColorThemeSetting,
      };
    case SET_SORT_LOGS_MODE:
      const updatedSortLogsMode = action.sortLogsMode;

      const updatedSortLogsModeSetting = {
        isDarkMode: state.settings.isDarkMode,
        colorTheme: state.settings.colorTheme,
        sortLogsMode: updatedSortLogsMode,
        sortTablesMode: state.settings.sortTablesMode,
        language: state.settings.language,
        isDarkModeToggled: state.settings.isDarkModeToggled,
      };

      return {
        settings: updatedSortLogsModeSetting,
      };
    case SET_SORT_TABLES_MODE:
      const updatedSortTablesMode = action.sortTablesMode;

      const updatedSortTablesModeSetting = {
        isDarkMode: state.settings.isDarkMode,
        colorTheme: state.settings.colorTheme,
        sortLogsMode: state.settings.sortLogsMode,
        sortTablesMode: updatedSortTablesMode,
        language: state.settings.language,
        isDarkModeToggled: state.settings.isDarkModeToggled,
      };
      
      return {
        settings: updatedSortTablesModeSetting,
      };
    case SET_LANGUAGE:
      const updatedLanguage = action.language;

      const updatedLanguageSetting = {
        isDarkMode: state.settings.isDarkMode,
        colorTheme: state.settings.colorTheme,
        sortLogsMode: state.settings.sortLogsMode,
        sortTablesMode: state.settings.sortTablesMode,
        language: updatedLanguage,
        isDarkModeToggled: state.settings.isDarkModeToggled,
      };

      return {
        settings: updatedLanguageSetting,
      };
    case LOAD_SETTINGS:
      return {
        settings: action.settings,
      };
    default:
      return state;
  }
}

export default settingsReducer;
