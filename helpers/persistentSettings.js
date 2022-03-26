import AsyncStorage from '@react-native-async-storage/async-storage';

export const setIsDarkMode = async isDarkMode => {
  try {
    AsyncStorage.setItem('isDarkMode', isDarkMode.toString());
  }
  catch(error) {
    console.log('Unable to toggle isDarkMode:');
    console.log(error);
  }
}

export const fetchIsDarkMode = async () => {
  try {
    const value = await AsyncStorage.getItem('isDarkMode');
    if(value !== null) {
      return value;
    }
  }
  catch(error) {
    console.log(error);
  }
}
