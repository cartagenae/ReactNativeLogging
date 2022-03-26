import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  useWindowDimensions,
  Keyboard,
  Alert,
  Button,
  Platform,
} from 'react-native';

import { TextInput } from 'react-native-paper';

import { AntDesign, Entypo } from '@expo/vector-icons';
import Colors from '../../constants/Colors';

import FloatingActionButton from '../../components/FloatingActionButton';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import { useSelector, useDispatch } from 'react-redux';
import * as logsActions from '../../store/actions/logs.js';

import TextButton from '../../components/TextButton';

import { v4 as uuidv4 } from 'uuid';

const AddEntryScreen = ({ navigation, route }) => {
  const screenWidth = useWindowDimensions().width;
  const screenHeight = useWindowDimensions().height;
  const dispatch = useDispatch();

  const [logEntry, setLogEntry] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [isStartTimePickerVisible, setStartTimePickerVisible] = useState(false);
  const [isEndTimePickerVisible, setEndTimePickerVisible] = useState(false);

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const {
    year,
    month,
    day,
    today,
    logId,
  } = route.params;

  const logs = useSelector(state => state.logs.logs);
  const settings = useSelector(state => state.settings.settings);
  const deleteLogs = useSelector(state => state.deleteData.deleteLogs);
  const currentLog = logs.length > 0 && logs.find(log => log.id === logId);

  //  styles to keep dynamic to the screenHeight and windowWidth hooks

  const title = {
    fontSize: 30,
    fontWeight: '700',
    textAlign: 'center',
    marginTop: screenHeight / 10.80,
    marginBottom: screenHeight / 50.15,
  }
  
  const vertical = {
    marginTop: screenHeight / 50.75,
    marginBottom: screenHeight / 40.70,
  }

  //  ----------------------------------------------------------------

  let headerTitle = 'Add Log Entry';
  let startTimeText = 'Start Time:';
  let endTimeText = 'End Time:';
  let placeholderText = 'Entry';
  let confirmTextIOS = 'Confirm';
  let cancelTextIOS = 'Cancel';

  switch(settings.language) {
    case 'Español':
      headerTitle = 'Añadir Entrada';
      startTimeText = 'Hora de Inicio:';
      endTimeText = 'Hora de Fin:';
      placeholderText = 'Entrada';
      confirmTextIOS = 'Confirmar';
      cancelTextIOS = 'Cancelar';

      break;
    default:
      headerTitle = 'Add Log Entry';
      startTimeText = 'Start Time:';
      endTimeText = 'End Time:';
      placeholderText = 'Entry';
      confirmTextIOS = 'Confirm';
      cancelTextIOS =  'Cancel';
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
    const currentStartTime = startDate.toString().substr(16, 5);
    const currentEndTime = endDate.toString().substr(16, 5);

    let startHour = Number(currentStartTime.substr(0, 2)) % 12;
    let endHour = Number(currentEndTime.substr(0, 2)) % 12;

    startHour = startHour === 0 ? 12 : startHour;
    endHour = endHour === 0 ? 12 : endHour;

    const startMeridiem = Number(currentStartTime.substr(0, 2)) > 11 ? 'PM' : 'AM';
    const endMeridiem = Number(currentEndTime.substr(0, 2)) > 11 ? 'PM' : 'AM';

    let startTimeSliced = currentStartTime.slice(2, 5);
    let endTimeSliced = currentEndTime.slice(2, 5);

    const startHourString = startHour < 10 ?
        '0'.concat(startHour.toString())
      :
        startHour.toString()

    const endHourString = endHour < 10 ?
        '0'.concat(endHour.toString())
      :
        endHour.toString()
    
    const startTimeFinal = startHourString
      .concat(startTimeSliced)
      .concat(` ${startMeridiem}`);
    
    const startDateString = today.concat(` ${startTimeFinal}`);

    const endTimeFinal = endHourString
      .concat(endTimeSliced)
      .concat(` ${endMeridiem}`);

    const endDateString = today.concat(` ${endTimeFinal}`);

    setStartTime(startTimeFinal);
    setStartDate(new Date(startDateString));

    setEndTime(endTimeFinal);
    setEndDate(new Date(endDateString));
  }, [])

  useEffect(() => {
    if(deleteLogs === true) {
      navigation.goBack();
    }
  }, [deleteLogs])

  const showStartTimePicker = () => {
    setStartTimePickerVisible(true);
  }

  const showEndTimePicker = () => {
    setEndTimePickerVisible(true);
  }

  const hideStartTimePicker = () => {
    setStartTimePickerVisible(false);
  }

  const hideEndTimePicker = () => {
    setEndTimePickerVisible(false);
  }

  const handleStartConfirm = (date) => {
    const currentStartTime = date.toString().substr(16, 5);
    let startHour = Number(currentStartTime.substr(0, 2)) % 12;
    startHour = startHour === 0 ? 12 : startHour;
    const startMeridiem = Number(currentStartTime.substr(0, 2)) > 11 ? 'PM' : 'AM';
    let startTimeSliced = currentStartTime.slice(2, 5);

    const startHourString = startHour < 10 ?
        '0'.concat(startHour.toString())
      :
        startHour.toString()

    const startTimeFinal = startHourString
      .concat(startTimeSliced)
      .concat(` ${startMeridiem}`);
    
    const startDateString = today.concat(` ${startTimeFinal}`);
    
    setStartTime(startTimeFinal);
    setStartDate(new Date(startDateString));

    hideStartTimePicker();
  }

  const handleEndConfirm = (endDate) => {
    const currentEndTime = endDate.toString().substr(16, 5);
    let endHour = Number(currentEndTime.substr(0, 2)) % 12;
    endHour = endHour === 0 ? 12 : endHour;
    const endMeridiem = Number(currentEndTime.substr(0, 2)) > 11 ? 'PM' : 'AM';
    let endTimeSliced = currentEndTime.slice(2, 5);

    const endHourString = endHour < 10 ?
        '0'.concat(endHour.toString())
      :
        endHour.toString()

    const endTimeFinal = endHourString
      .concat(endTimeSliced)
      .concat(` ${endMeridiem}`);

    const endDateString = today.concat(` ${endTimeFinal}`);
    
    setEndTime(endTimeFinal);
    setEndDate(new Date(endDateString));
    
    hideEndTimePicker();
  }

  const handleLogPress = () => {
    const entryDate = `${year}-${month < 10 ? `0${(month).toString()}` : month}-${day < 10 ? `0${(day).toString()}` : day}`;

    let startHour = startDate.getHours() % 12;
    let endHour = endDate.getHours() % 12;

    const startMinutes = startDate.getMinutes();
    const endMinutes = endDate.getMinutes();

    const startSeconds = startDate.getSeconds();
    const endSeconds = endDate.getSeconds();

    const startMeridiem = startDate.getHours() < 12 ? 'AM' : 'PM';
    const endMeridiem = endDate.getHours() < 12 ? 'AM' : 'PM';

    startHour = startHour === 0 ? startHour + 12 : startHour;
    endHour = endHour === 0 ? endHour + 12 : endHour;

    const startHourString = startHour < 10 ? '0'.concat(startHour.toString()) : startHour.toString();
    const endHourString = endHour < 10 ? '0'.concat(endHour.toString()) : endHour.toString();

    const startMinutesString = startMinutes < 10 ? '0'.concat(startMinutes.toString()) : startMinutes.toString();
    const endMinutesString = endMinutes < 10 ? '0'.concat(endMinutes.toString()) : endMinutes.toString();

    const startSecondsString = startSeconds < 10 ? '0'.concat(startSeconds.toString()) : startSeconds.toString();
    const endSecondsString = endSeconds < 10 ? '0'.concat(endSeconds.toString()) : endSeconds.toString();

    let startMinutesSeconds = `:${startMinutesString}:${startSecondsString} ${startMeridiem}`;
    let endMinutesSeconds = `:${endMinutesString}:${endSecondsString} ${endMeridiem}`;

    let startMinutesMeridiem = `:${startMinutesString} ${startMeridiem}`;
    let endMinutesMeridiem = `:${endMinutesString} ${endMeridiem}`;

    const startTimeString = startHourString.concat(startMinutesMeridiem);
    const endTimeString = endHourString.concat(endMinutesMeridiem);

    let timeTitle = 'Start time cannot be greater than end time';
    let timeMessage = `start time: ${startTimeString}\nend time: ${endTimeString}`;
    let emptyEntryTitle = 'Empty Log Entry';
    let emptyEntryMessage = 'Unable to insert empty event';

    switch(settings.language) {
      case 'Español':
        timeTitle = 'La hora de inicio no puede ser mayor que la hora de finalización';
        timeMessage = `hora de inicio: ${startTimeString}\nhora de fin: ${endTimeString}`;
        emptyEntryTitle = 'Entrada de Registro Vacía';
        emptyEntryMessage = 'No se puede añadir un evento vacío';

        break;
      default:
        timeTitle = 'Start time cannot be greater than end time';
        timeMessage = `start time: ${startTimeString}\nend time: ${endTimeString}`;
        emptyEntryTitle = 'Empty Log Entry';
        emptyEntryMessage = 'Unable to insert empty event';
    }

    if(startDate > endDate) {
      Alert.alert(
        timeTitle,
        timeMessage,
        [
          {
            text: 'OK'
          }
        ]
      )
    }
    else {
      if(logEntry.trim() === '') {
        Alert.alert(
          emptyEntryTitle,
          emptyEntryMessage,
          [
            {
              text: 'OK',
            }
          ]
        )
      }
      
      if(logEntry.trim() !== '') {
        const id = uuidv4();
        const entryIndex = currentLog.entries.length;
        const created = new Date();

        console.log(`entryIndex: ${entryIndex}`);
        console.log(`\nAddEntryScreen startTime: ${startTime}`);
        console.log(`AddEntryScreen typeof(startTime): ${typeof(startTime)}\n`);
        console.log(`AddEntryScreen endTime: ${endTime}`);
        console.log(`AddEntryScreen typeof(endTime): ${typeof(endTime)}\n`);
        console.log(`AddEntryScreen created: ${created}`);
        console.log(`AddEntryScreen typeof(created): ${typeof(created)}`);

        dispatch(logsActions.insertLogEntry(
          id,
          logId,
          entryDate,
          startTime,
          endTime,
          logEntry.trim(),
          entryIndex,
          created,
        ));
        navigation.goBack();
      }
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
        hideStartTimePicker();
        hideEndTimePicker();
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
          }
        ]}
      >
        {headerTitle}
      </Text>
      <View style={{ width: screenWidth / 1.1 }}>
        <View style={styles.timeContainer}>
          <Text
            style={[
              styles.timeLabel,
              {
                color: settings.isDarkMode ?
                    '#fff'
                  :
                    '#000',
              }
            ]}
          >
            {startTimeText}
          </Text>
          {
            Platform.OS === 'ios' ?
              <Button
                title={startTime}
                onPress={showStartTimePicker}
              />
            :
              <TextButton
                title={startTime}
                onPress={showStartTimePicker}
              />
          }
          <DateTimePickerModal
            isVisible={isStartTimePickerVisible}
            mode='time'
            onConfirm={handleStartConfirm}
            onCancel={hideStartTimePicker}
            textColor='black'
            confirmTextIOS={confirmTextIOS}
            cancelTextIOS={cancelTextIOS}
          />
        </View>
        <View style={styles.timeContainer}>
          <Text
            style={[
              styles.timeLabel,
              {
                color: settings.isDarkMode ?
                    '#fff'
                  :
                    '#000',
              }
            ]}
          >
            {endTimeText}
          </Text>
          {
            Platform.OS === 'ios' ?
              <Button
                title={endTime}
                onPress={showEndTimePicker}
              />
            :
              <TextButton
                title={endTime}
                onPress={showEndTimePicker}
              />
          }
          <DateTimePickerModal
            isVisible={isEndTimePickerVisible}
            mode='time'
            onConfirm={handleEndConfirm}
            onCancel={hideEndTimePicker}
            textColor='black'
            confirmTextIOS={confirmTextIOS}
            cancelTextIOS={cancelTextIOS}
          />
        </View>
        <TextInput
          label={placeholderText}
          value={logEntry}
          onChangeText={setLogEntry}
          multiline={true}
          style={[
            vertical,
            {
              backgroundColor: settings.isDarkMode ?
                  Colors.MatteBlack
                :
                  Colors.DefaultGray,
            }
          ]}
          theme={textInputTheme}
          keyboardAppearance={settings.isDarkMode ? 'dark' : 'light'}
        />
      </View>
      <FloatingActionButton
        IconSource='FontAwesome5'
        iconName='feather-alt'
        iconSize={35}
        onPress={handleLogPress}
        style={styles.floatingActionButton}
        shaded={true}
        buttonColor={fabColor}
        buttonColorPressed={fabColorPressed}
      />
    </Pressable>
  )
}

export const addEntryScreenOptions = {
  headerTitle: 'Add Log Entry',
}

const styles = StyleSheet.create({
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
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    color: 'black',
  },
  floatingActionButton: {
    position: 'absolute',
    bottom: 35,
    right: 30,
  },
  timeContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  timeLabel: {
    fontSize: 16,
    marginTop: 10,
    fontWeight: 'bold'
  },
  timePicker: {
    position: 'absolute',
    bottom: 150,
  },
  title: {
    fontSize: 30,
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 80,
    marginBottom: 15,
  },
  vertical: {
    marginTop: 25,
    marginBottom: 20,
  },
})

export default AddEntryScreen;
