import {
  DELETE_LOGS_TRUE,
  DELETE_LOGS_FALSE,
  DELETE_TABLES_TRUE,
  DELETE_TABLES_FALSE,
  SETTING_CHANGED,
} from '../types.js';

export const setDeleteLogsTrue = () => {
  return {
    type: DELETE_LOGS_TRUE,
  }
}

export const setDeleteLogsFalse = () => {
  return {
    type: DELETE_LOGS_FALSE,
  }
}

export const setDeleteTablesTrue = () => {
  return {
    type: DELETE_TABLES_TRUE,
  }
}

export const setDeleteTablesFalse = () => {
  return {
    type: DELETE_TABLES_FALSE,
  }
}

//  This action is to pop the CalendarScreen from the main stack navigator
//  after either dark mode, color theme, or language has been changed
export const setSettingChanged = isSettingChanged => {
  return {
    type: SETTING_CHANGED,
    isSettingChanged: isSettingChanged,
  }
}
