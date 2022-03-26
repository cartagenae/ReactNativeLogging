import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  useWindowDimensions,
  Pressable,
  Keyboard,
  Button,
  Alert,
  Platform,
} from 'react-native';

import { TextInput } from 'react-native-paper';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import IconHeader from '../../components/IconHeader';

import { useDispatch, useSelector } from 'react-redux';
import * as logsActions from '../../store/actions/logs.js';
import Colors from '../../constants/Colors';

import FloatingActionButton from '../../components/FloatingActionButton';

import TextButton from '../../components/TextButton';

const EntryDetailsScreen = ({ navigation, route }) => {
  const {
    id,
    date,
    startTime,
    endTime,
    entry,
    today,
    logId,
  } = route.params;
  const screenWidth = useWindowDimensions().width;

  const [currentEntry, setCurrentEntry] = useState(entry);

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const [startTimeState, setStartTimeState] = useState(startTime);
  const [endTimeState, setEndTimeState] = useState(endTime);
  const [isStartTimePickerVisible, setStartTimePickerVisible] = useState(false);
  const [isEndTimePickerVisible, setEndTimePickerVisible] = useState(false);

  const dispatch = useDispatch();
  const settings = useSelector(state => state.settings.settings);
  const deleteLogs = useSelector(state => state.deleteData.deleteLogs);

  let headerTitle = 'Edit Entry';
  let startTimeText = 'Start Time:';
  let endTimeText = 'End Time:';
  let placeholderText = 'Entry';
  let confirmTextIOS = 'Confirm';
  let cancelTextIOS = 'Cancel';

  switch(settings.language) {
    case 'Español':
      headerTitle = 'Editar Entrada';
      startTimeText = 'Hora de Inicio:';
      endTimeText = 'Hora de Fin:';
      placeholderText = 'Entrada';
      confirmTextIOS = 'Confirmar';
      cancelTextIOS = 'Cancelar';

      break;
    default:
      headerTitle = 'Edit Entry';
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

  let androidHeaderColor = Colors.PurpleFog;

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

      androidHeaderColor = Colors.PurpleSky;

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

      androidHeaderColor = Colors.PurpleThunder;

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

      androidHeaderColor = Colors.LightOcean;

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

      androidHeaderColor = Colors.DarkGrayStone;

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

      androidHeaderColor = Colors.DeepPurple;

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

      androidHeaderColor = Colors.MatteBlack;
      
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

      androidHeaderColor = Colors.PurpleFog;
  }

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
    
    setStartTimeState(startTimeFinal);

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
    
    setEndTimeState(endTimeFinal);
    
    hideEndTimePicker();
  }

  const handleLogUpdate = () => {
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

    const startDateString = today.concat(` ${startTimeString}`);
    const endDateString = today.concat(` ${endTimeString}`);
    
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
      if(currentEntry.trim() === '') {
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

      if(currentEntry.trim() !== '') {
        dispatch(logsActions.updateLogEntry(
          id,
          logId,
          date,
          startTimeString,
          endTimeString,
          currentEntry
        ));
        navigation.goBack();
      }
    }
  }

  //  This displays the Start Time and End Time on their respective
  //  time pickers when the screen loads
  useEffect(() => {
    let startHour = Number(startTimeState.substr(0, 2)) === 12 && startTimeState.endsWith('AM') ? 0 : Number(startTimeState.substr(0, 2));
    let endHour = Number(endTimeState.substr(0, 2)) === 12 && endTimeState.endsWith('AM') ? 0 : Number(endTimeState.substr(0, 2));

    startHour = startTimeState.endsWith('PM') && startHour !== 12 ? startHour + 12 : startHour;
    endHour = endTimeState.endsWith('PM') && endHour !== 12 ? endHour + 12 : endHour;

    const startHourString = startHour < 10 ? '0'.concat(startHour.toString()) : startHour.toString();
    const endHourString = endHour < 10 ? '0'.concat(endHour.toString()) : endHour.toString();

    const startTimeStateString = startHourString.concat(startTimeState.slice(2, 5));
    const endTimeStateString = endHourString.concat(endTimeState.slice(2, 5));

    const startDateString = today.concat(` ${startTimeStateString}`);
    const endDateString = today.concat(` ${endTimeStateString}`);

    setStartDate(new Date(startDateString));
    setEndDate(new Date(endDateString));
  }, [startTimeState, endTimeState]);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: headerTitle,
      headerLeft: () => (
        <HeaderButtons HeaderButtonComponent={IconHeader}>
          <Item
            title='calendar'
            component='MaterialIcons'
            iconName='arrow-back'
            onPress={() => navigation.goBack()}
            size={32}
            color={headerLeftColor}
          />
        </HeaderButtons>
      ),
      headerTintColor: (
        Platform.OS === 'ios' ?
          settings.isDarkMode ? '#fff' : '#000'
        :
          '#fff'
      ),
      headerStyle: {
        backgroundColor: (
          Platform.OS === 'ios' ?
            settings.isDarkMode ? Colors.MatteBlack : '#fff'
          :
            androidHeaderColor
        ),
      },
    })
  })

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
      onPress={() => Keyboard.dismiss()}
    >
      <Text
        style={[
          styles.dateContainer,
          {
            color: settings.isDarkMode ?
                '#fff'
              :
                '#000',
          }
        ]}
      >
        {today}
      </Text>
      <View
        style={{
          width: screenWidth / 1.1
        }}
      >
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
                title={startTimeState}
                onPress={showStartTimePicker}
              />
            :
              <TextButton
                title={startTimeState}
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
                    '#000'
              }
            ]}
          >
            {endTimeText}
          </Text>
          {
            Platform.OS === 'ios' ?
              <Button
                title={endTimeState}
                onPress={showEndTimePicker}
              />
            :
              <TextButton
                title={endTimeState}
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
          value={currentEntry}
          onChangeText={text => setCurrentEntry(text)}
          multiline={true}
          style={[
            styles.vertical,
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
        onPress={handleLogUpdate}
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
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  dateContainer: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 15
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
  vertical: {
    marginTop: 25,
    marginBottom: 20,
  },
})

export default EntryDetailsScreen;
