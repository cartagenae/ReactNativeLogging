import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Alert,
  useWindowDimensions,
  Pressable,
  Keyboard,
  Platform,
} from 'react-native';
import { TextInput } from 'react-native-paper';
import Colors from '../../constants/Colors';
import { AntDesign, Entypo } from '@expo/vector-icons';
import FloatingActionButton from '../../components/FloatingActionButton';

import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import * as logsActions from '../../store/actions/logs.js';

import {
  fetchLogs,
  clearAllLogs,
  insertLog,
} from '../../helpers/logsDb';

const CreateLogScreen = ({ navigation }) => {
  const windowWidth = useWindowDimensions().width;
  const windowHeight = useWindowDimensions().height;

  const [logName, setLogName] = useState('');
  const [logDescription, setLogDescription] = useState('');

  const logs = useSelector(state => state.logs.logs);
  const settings = useSelector(state => state.settings.settings);
  const deleteLogs = useSelector(state => state.deleteData.deleteLogs);
  const dispatch = useDispatch();

  //  styles to keep dynamic to the windowHeight and windowWidth hooks

  const title = {
    fontSize: 30,
    fontWeight: '700',
    textAlign: 'center',
    marginTop: windowHeight / 10.80,
    marginBottom: windowHeight / 50.15,
  }
  
  const vertical = {
    marginTop: windowHeight / 50.75,
    marginBottom: windowHeight / 40.70,
  }

  //  ----------------------------------------------------------------

  let headerTitle = 'Create Log'
  let logNameText = 'Log Name';
  let optionalText = 'Optional';
  let logDescriptionText = 'Description';
  let noLogNameText = 'No Log Name';
  let enterLogNameText = 'Please enter a log name';
  let anotherLogTitle = `There is another log named ${logName}`;
  let continueText = 'Would you like to continue?';

  switch(settings.language) {
    case 'Español':
      headerTitle = 'Crear Registro';
      logNameText = 'Nombre de Registro';
      optionalText = 'Opcional'
      logDescriptionText = 'Descripción';
      noLogNameText = 'Registro Sin Nombre';
      enterLogNameText = 'Por favor nombre su registro';
      anotherLogTitle = `Hay otro registro nombrado ${logName}`;
      continueText = 'Quisiera continuar?';
      
      break;
    default:
      headerTitle = 'Create Log';
      logNameText = 'Log Name';
      optionalText = 'Optional';
      logDescriptionText = 'Description';
      noLogNameText = 'No Log Name';
      enterLogNameText = 'Please enter a log name';
      anotherLogTitle = `There is another log named ${logName}`;
      continueText = 'Would you like to continue?';
  }

  let headerLeftColor = Colors.CalaGreen;
  let placeholderColor = Colors.EasyPurple;
  let placeholderFocused = Colors.CalaGreen;
  let textColor = Colors.CalaGreen;

  let fabColor = settings.isDarkMode ?
    Colors.FloatingPurple
  :
    Colors.RoyalPurple;

  let fabColorPressed = settings.isDarkMode ?
    Colors.CalaGreen
  :
    Colors.FloatingPurple;

  switch(settings.colorTheme) {
    case 'Zeus':
      headerLeftColor = Platform.OS === 'ios' ?
        settings.isDarkMode ?
          Colors.AlmightyGold
        :
          Colors.PurpleSky
      :
        Colors.AlmightyGold;

      placeholderColor = settings.isDarkMode ?
        Colors.DarkGold
      :
        Colors.OrangeGold;

      placeholderFocused = settings.isDarkMode ?
        Colors.DarkGold
      :
        Colors.Black;

      textColor = settings.isDarkMode ?
        Colors.PurpleBlue
      :
        Colors.OrangeGold;
      
      fabColor = settings.isDarkMode ?
        Colors.OrangeGold
      :
        Colors.PurpleSky;
      
      fabColorPressed  = settings.isDarkMode ?
        Colors.LightningOrange
      :
        Colors.PurpleCloud;

      break;
    case 'Hera':
      headerLeftColor = Platform.OS === 'ios' ?
        settings.isDarkMode ?
          Colors.PowerPurple
        :
          Colors.Pink
      :
        Colors.PinkPressed;

      placeholderColor = settings.isDarkMode ?
        Colors.PurpleLove
      :
        Colors.NeutralPink;

      placeholderFocused = settings.isDarkMode ?
        Colors.PurpleLove
      :
        Colors.FloatingPurple;
      
      textColor = settings.isDarkMode ?
        Colors.NeutralPink
      :
        Colors.FloatingPurple;

      fabColor = settings.isDarkMode ?
        Colors.EasyPurple
      :
        Colors.PurpleCharm;
      
      fabColorPressed = settings.isDarkMode ?
        Colors.PurpleThunder
      :
        Colors.PurpleThunder;

      break;
    case 'Poseidon':
      headerLeftColor = Platform.OS === 'ios' ?
        settings.isDarkMode ?
          Colors.PurpleBlue
        :
          Colors.RiverGreen
      :
        Colors.PurpleBlue;

      placeholderColor = settings.isDarkMode ?
        Colors.OceanTide
      :
        Colors.LightOcean;
      
      placeholderFocused = settings.isDarkMode ?
        Colors.CalaGreen
      :
        Colors.Black;

      textColor = settings.isDarkMode ?
        Colors.PurpleBlue
      :
        Colors.OceanTide;

      fabColor = settings.isDarkMode ?
        Colors.OceanTide
      :
        Colors.LightOcean;

      fabColorPressed = settings.isDarkMode ?
        Colors.CoolBlue
      :
        Colors.OceanTide;

      break;
    case 'Apollo':
      headerLeftColor = Platform.OS === 'ios' ?
        settings.isDarkMode ?
          Colors.Soldier
        :
          Colors.LimeGreen
      :
        Colors.Soldier;

      placeholderColor = settings.isDarkMode ?
        Colors.Marble
      :
        Colors.DarkGrayStone;

      placeholderFocused = settings.isDarkMode ?
        Colors.GrayStone
      :
        Colors.Soldier;
      
      textColor = settings.isDarkMode ?
        Colors.Soldier
      :
        Colors.DarkGrayStone;

      fabColor = settings.isDarkMode ?
        Colors.LimeGreen
      :
        Colors.DarkGrayStone;

      fabColorPressed = settings.isDarkMode ?
        Colors.Soldier
      :
        Colors.GrayStonePressed;

      break;
    case 'Artemis':
      headerLeftColor = Platform.OS === 'ios' ?
        settings.isDarkMode ?
          Colors.ArrowtipSilver
        :
          Colors.NightBlue
      :
        Colors.StoneBlue;

      placeholderColor = settings.isDarkMode ?
        Colors.PurpleMoon
      :
        Colors.NightBlue;

      placeholderFocused = settings.isDarkMode ?
        Colors.PurpleMoon
      :
        Colors.DeepPurple;

      textColor = settings.isDarkMode ?
        Colors.Moon
      :
        Colors.PurpleShadow;

      fabColor = settings.isDarkMode ?
        Colors.PurpleShadow
      :
        Colors.NightPurple;

      fabColorPressed = settings.isDarkMode ?
        Colors.DeepPurple
      :
        Colors.PurpleShadow;

      break;
    case 'Hades':
      headerLeftColor = Platform.OS === 'ios' ?
        settings.isDarkMode ?
          Colors.LightMaroon
        :
          Colors.DarkMaroon
      :
        Colors.BlueFire;

      placeholderColor = settings.isDarkMode ?
        Colors.Crimson
      :
        Colors.DarkMaroon;  
      
      placeholderFocused = settings.isDarkMode ?
        Colors.BlueFire
      :
        Colors.FireRed;

      fabColor = settings.isDarkMode ?
        Colors.StoneBlue
      :
        Colors.LightMaroon;

      fabColorPressed = settings.isDarkMode ?
        Colors.BlueFire
      :
        Colors.DarkMaroon;
      
      break;
    default:
      headerLeftColor = Colors.CalaGreen;
      placeholderColor = Colors.EasyPurple;
      placeholderFocused = Colors.CalaGreen;
      textColor = Colors.CalaGreen;

      fabColor = settings.isDarkMode ?
        Colors.FloatingPurple
      :
        Colors.RoyalPurple;
      
      fabColorPressed = settings.isDarkMode ?
        Colors.CalaGreen
      :
        Colors.FloatingPurple;
  }
  
  useEffect(() => {
    if(deleteLogs === true) {
      navigation.goBack();
    }
  }, [deleteLogs])

  //  This function asynchronously fetches all the unsorted data
  //  from the file system - sorts it according to the
  //  settings.sortLogsMode variable, reassigns all the logIndex
  //  values, clears the whole logs table and inserts all the
  //  values of the sortedLogs array back into the logs table
  const reorderLogs = async () => {
    const dbResult = await fetchLogs();
    let unsortedLogs = dbResult.rows._array;
    let sortedLogs = []

    switch(settings.sortLogsMode) {
      case 'alphabetical_ascending':
        sortedLogs = [
          ...unsortedLogs.sort((a, b) => {
            if(a.name < b.name) {
              return -1;
            }
            if(a.name > b.name) {
              return 1;
            }
            return 0;
          })
        ];  

        break;
      case 'alphabetical_descending':
        sortedLogs = [
          ...unsortedLogs.sort((a, b) => {
            if(a.name < b.name) {
              return 1;
            }
            if(a.name > b.name) {
              return -1;
            }
            return 0;
          })
        ]

        break;
      case 'first_created':
        sortedLogs = [
          ...unsortedLogs.sort((a, b) => (
            Date.parse(b.created) - Date.parse(a.created)
          ))
        ];

        break;
      default:
        sortedLogs = [
          ...unsortedLogs.sort((a, b) => (
            Date.parse(a.created) - Date.parse(b.created)
          ))
        ];
    }

    //  reassign all the logIndex values
    for(let index = 0; index < sortedLogs.length; index++) {
      sortedLogs[index].logIndex = index;
    }

    clearAllLogs();

    for(let index = 0; index < sortedLogs.length; index++) {
      insertLog(
        sortedLogs[index].id,
        sortedLogs[index].name,
        sortedLogs[index].description,
        sortedLogs[index].logIndex,
        sortedLogs[index].created,
      )
    }

    //  reload the logs state in the reducer to the sortedLogs array
    dispatch(logsActions.setLogs());
  }

  const submitButtonHandler = () => {
    if(logName === '') {
      Alert.alert(
        noLogNameText,
        enterLogNameText,
        [
          {
            text: 'Okay'
          }
        ]
      )
      return;
    }
    setLogName(logName.trim());
    setLogDescription(logDescription.trim());

    if(logs.find(log => log.name === logName.trim())) {
      Alert.alert(
        anotherLogTitle,
        continueText,
        [
          {
            text: 'Yes',
            onPress: () => {
              const logId = uuidv4();
              const logIndex = logs.length;
              const created = new Date();

              dispatch(logsActions.createLog(
                logId,
                logName,
                logDescription,
                logIndex,
                created,
              ));

              if(settings.sortLogsMode === 'alphabetical_ascending') {
                dispatch(logsActions.sortByAlphabeticalAscending());

                try {
                  reorderLogs();
                }
                catch(error) {
                  console.log('Unable to sort logs by alphabetical ascending');
                  console.log(error);
                }
              };
        
              if(settings.sortLogsMode === 'alphabetical_descending') {
                dispatch(logsActions.sortByAlphabeticalDescending());

                try {
                  reorderLogs();
                }
                catch(error) {
                  console.log('Unable to sort logs by alphabetical descending');
                  console.log(error);
                }
              };
        
              if(settings.sortLogsMode === 'first_created') {
                dispatch(logsActions.sortByDateFirst());

                try {
                  reorderLogs();
                }
                catch(error) {
                  console.log('Unable to sort logs by first created');
                  console.log(error);
                }
              };
          
              navigation.navigate('LogDetails', {
                logId,
                logName,
              });
            }
          },
          {
            text: 'No',
          }
        ]
      )
    }
    else {
      const logId = uuidv4();
      const logIndex = logs.length;
      const created = new Date();
      
      dispatch(logsActions.createLog(
        logId,
        logName,
        logDescription,
        logIndex,
        created,
      ));

      if(settings.sortLogsMode === 'alphabetical_ascending') {
        dispatch(logsActions.sortByAlphabeticalAscending());

        try {
          reorderLogs();
        }
        catch(error) {
          console.log('Unable to sort logs by alphabetical ascending');
          console.log(error);
        }
      };

      if(settings.sortLogsMode === 'alphabetical_descending') {
        dispatch(logsActions.sortByAlphabeticalDescending());

        try {
          reorderLogs();
        }
        catch(error) {
          console.log('Unable to sort logs by alphabetical descending');
          console.log(error);
        }
      };

      if(settings.sortLogsMode === 'first_created') {
        dispatch(logsActions.sortByDateFirst());

        try {
          reorderLogs();
        }
        catch(error) {
          console.log('Unable to sort logs by first created');
          console.log(error);
        }
      };

      navigation.navigate('LogDetails', {
        logId,
      });
    }
  }

  const textInputTheme = {
    colors: {
      primary: placeholderFocused,
      text: settings.isDarkMode ? textColor : '#000',
      placeholder: settings.isDarkMode ? placeholderColor : 'gray',
    },
  }

  return (
    <Pressable
      style={[
        styles.container,
        {
          backgroundColor: settings.isDarkMode ?
              Colors.PitchBlack
            :
              '#fff',
        }
      ]}
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <Pressable
        style={
          Platform.OS === 'ios' ?
            styles.chevron
          :
            styles.close
        }
      >
        {
          Platform.OS === 'ios' ?
            <Entypo
              name='chevron-down'
              onPress={() => navigation.goBack()}
              size={32}
              color={headerLeftColor}
            />
          :
            <AntDesign
              name='close'
              onPress={() => navigation.goBack()}
              size={32}
              color={headerLeftColor}
            />
        }
      </Pressable>
      <Text
        style={[
          title,
          {
            color: settings.isDarkMode ?
                '#fff'
              :
                '#000',
          },
        ]}
      >
        {headerTitle}
      </Text>
      <View
        style={{
          width: windowWidth / 1.05
        }}
      >
        <View style={styles.formBodyContainer}>
          <TextInput
            value={logName}
            onChangeText={setLogName}
            style={[
              vertical,
              {
                backgroundColor: settings.isDarkMode ?
                    Colors.MatteBlack
                  :
                    Colors.DefaultGray,
                color: '#fff'
              }
            ]}
            label={logNameText}
            theme={textInputTheme}
            selectionColor={settings.isDarkMode ?
              Colors.CalaGreen
            :
              Colors.LightPurple
            }
            keyboardAppearance={settings.isDarkMode ? 'dark' : 'light'}
          />
          <TextInput
            value={logDescription}
            onChangeText={setLogDescription}
            placeholder={optionalText}
            style={[
              vertical,
              {
                backgroundColor: settings.isDarkMode ?
                  Colors.MatteBlack
                :
                  Colors.DefaultGray,
              }
            ]}
            label={logDescriptionText}
            theme={textInputTheme}
            selectionColor={settings.isDarkMode ?
              Colors.CalaGreen
            :
              Colors.LightPurple
            }
            keyboardAppearance={settings.isDarkMode ? 'dark' : 'light'}
          />
        </View>
      </View>
      <FloatingActionButton
        IconSource='FontAwesome5'
        iconName='feather-alt'
        iconSize={35}
        onPress={submitButtonHandler}
        style={styles.floatingActionButton}
        shaded={true}
        buttonColor={fabColor}
        buttonColorPressed={fabColorPressed}
      />
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  chevron: {
    position: 'absolute',
    top: '6%',
    left: '4%',
  },
  close: {
    position: 'absolute',
    top: '5%',
    left: '4%',
  },
  title: {
    fontSize: 30,
    fontWeight: '700',
    textAlign: 'center',
    marginTop: Platform.OS === 'ios' ? 80 : 50,
    marginBottom: 15
  },
  formBodyContainer: {
    width: '95%',
    alignSelf: 'center'
  },
  columnsText: {
    fontSize: 22,
    fontWeight: '500',
    marginTop: '3%',
  },
  button: {
    alignSelf: 'center',
    marginBottom: 5,
    marginHorizontal: 10,
  },
  buttonContainer: {
    position: 'relative',
    bottom: 0,
    flexDirection: 'row',
    height: 50,
  },
  vertical: {
    marginTop: Platform.OS === 'ios' ? 25 : 15,
    marginBottom: Platform.OS === 'ios' ? 20 : 10,
  },
  floatingActionButton: {
    position: 'absolute',
    bottom: 35,
    right: 30
  },
  buttonIndex: {
    position: 'absolute',
    bottom: 35,
    left: 30,
  },
  keyboardContainer: {
    flex: 1,
  },
  rightAction: {
    backgroundColor: '#fff',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  actionText: {
    color: 'red',
    fontWeight: '700',
    fontSize: '700',
    paddingLeft: 25,
    paddingRight: 0,
    fontSize: 18,
  },
})

export default CreateLogScreen;
