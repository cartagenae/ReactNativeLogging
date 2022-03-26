import {
  ADD_DIARY,
  UPDATE_DIARY,
  DELETE_DIARY,
} from '../types';

import { v4 as uuidv4 } from 'uuid';

export const addDiary = (date, startTime, endTime, entry) => {

  console.log('\n----- diary action -----');
  console.log(`date: ${date}`);
  console.log(`startTime: ${startTime}`);
  console.log(`endTime: ${endTime}`);
  console.log(`entry: ${entry}`);
  console.log('------------------------\n');

  return {
    type: ADD_DIARY,
    diary: {
      id: uuidv4(),
      date: date,
      startTime: startTime,
      endTime: endTime,
      entry: entry,
    }
  }
}

export const updateDiary = (id, date, startTime, endTime, entry) => {
  return {
    type: UPDATE_DIARY,
    diary: {
      id: id,
      date: date,
      startTime: startTime,
      endTime: endTime,
      entry: entry,
    }
  }
}

export const deleteDiary = id => {
  return {
    type: DELETE_DIARY,
    diary: {
      id: id
    }
  }
}
