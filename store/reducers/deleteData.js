import {
  DELETE_LOGS_TRUE,
  DELETE_LOGS_FALSE,
  DELETE_TABLES_TRUE,
  DELETE_TABLES_FALSE,
  SETTING_CHANGED,
} from '../types.js';

const initialState = {
  deleteLogs: false,
  deleteTables: false,
  isDarkModeToggled: false,
  isSettingChanged: false,
}

const deleteDataReducer = (state = initialState, action) => {
  switch(action.type) {
    case DELETE_LOGS_TRUE:
      return {
        deleteLogs: true,
        deleteTables: state.deleteTables,
        isDarkModeToggled: state.isDarkModeToggled,
        isSettingChanged: state.isSettingChanged,
      };
    case DELETE_LOGS_FALSE:
      return {
        deleteLogs: false,
        deleteTables: state.deleteTables,
        isDarkModeToggled: state.isDarkModeToggled,
        isSettingChanged: state.isSettingChanged,
      };
    case DELETE_TABLES_TRUE:
      return {
        deleteLogs: state.deleteLogs,
        deleteTables: true,
        isDarkModeToggled: state.isDarkModeToggled,
        isSettingChanged: state.isSettingChanged,
      };
    case DELETE_TABLES_FALSE:
      return {
        deleteLogs: state.deleteLogs,
        deleteTables: false,
        isDarkModeToggled: state.isDarkModeToggled,
        isSettingChanged: state.isSettingChanged,
      };
    case SETTING_CHANGED:
      return {
        deleteLogs: state.deleteLogs,
        deleteTables: state.deleteTables,
        isDarkModeToggled: state.isDarkModeToggled,
        isSettingChanged: action.isSettingChanged,
      }
    default:
      return state;
  }
}

export default deleteDataReducer;
