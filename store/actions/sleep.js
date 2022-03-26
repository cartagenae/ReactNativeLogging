import {
  ADD_SLEEP,
  UPDATE_SLEEP,
  DELETE_SLEEP,
} from '../types';

import { v4 as uuidv4 } from 'uuid';

export const addSleep = (date, startTime, endTime, entry) => {
  return {
    type: ADD_SLEEP,
    sleep: {
      id: uuidv4(),
      date: date,
      startTime: startTime,
      endTime: endTime,
      entry: entry,
    }
  }
}

export const updateSleep = (id, date, startTime, endTime, entry) => {
  return {
    type: UPDATE_SLEEP,
    sleep: {
      id: id,
      date: date,
      startTime: startTime,
      endTime: endTime,
      entry: entry,
    }
  }
}

export const deleteSleep = id => {
  return {
    type: DELETE_SLEEP,
    sleep: {
      id: id
    }
  }
}
