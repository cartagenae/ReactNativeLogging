import {
  ADD_SPIKE,
  UPDATE_SPIKE,
  DELETE_SPIKE,
} from '../types';

import { v4 as uuidv4 } from 'uuid';

export const addSpike = (date, startTime, endTime, entry) => {
  return {
    type: ADD_SPIKE,
    spike: {
      id: uuidv4(),
      date: date,
      startTime: startTime,
      endTime: endTime,
      entry: entry,
    }
  }
}

export const updateSpike = (id, date, startTime, endTime, entry) => {
  return {
    type: UPDATE_SPIKE,
    spike: {
      id: id,
      date: date,
      startTime: startTime,
      endTime: endTime,
      entry: entry,
    }
  }
}

export const deleteSpike = id => {
  return {
    type: DELETE_SPIKE,
    spike: {
      id: id
    }
  }
}
