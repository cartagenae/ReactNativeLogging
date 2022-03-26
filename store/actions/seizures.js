import {
  ADD_SEIZURE,
  UPDATE_SEIZURE,
  DELETE_SEIZURE,
} from '../types';

import { v4 as uuidv4 } from 'uuid';

export const addSeizure = (date, startTime, endTime, entry) => {
  return {
    type: ADD_SEIZURE,
    seizure: {
      id: uuidv4(),
      date: date,
      startTime: startTime,
      endTime: endTime,
      entry: entry,
    }
  }
}

export const updateSeizure = (id, date, startTime, endTime, entry) => {
  return {
    type: UPDATE_SEIZURE,
    seizure: {
      id: id,
      date: date,
      startTime: startTime,
      endTime: endTime,
      entry: entry,
    }
  }
}

export const deleteSeizure = id => {
  return {
    type: DELETE_SEIZURE,
    seizure: {
      id: id
    }
  }
}
