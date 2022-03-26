import React, { useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Platform,
  useWindowDimensions,
  Button,
  FlatList,
  Pressable,
  Animated,
  Alert,
} from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';

import { useSelector, useDispatch } from 'react-redux';

import * as logsActions from '../../store/actions/logs';
import * as deleteDataActions from '../../store/actions/deleteData';

import { List } from 'react-native-paper';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import IconHeader from '../../components/IconHeader';
import FloatingActionButton from '../../components/FloatingActionButton';

import Colors from '../../constants/Colors.js';

import TextButton from '../../components/TextButton';

import XLSX from 'xlsx';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

const LogDetailsScreen = ({ navigation, route }) => {
  const screenWidth = useWindowDimensions().width;
  const logs = useSelector(state => state.logs.logs);
  const settings = useSelector(state => state.settings.settings);
  const deleteLogs = useSelector(state => state.deleteData.deleteLogs);
  const isSettingChanged = useSelector(state => state.deleteData.isSettingChanged);
  const DailyEntries = [];

  const dispatch = useDispatch();

  const {
    passedYear,
    passedMonth,
    passedDay,
    logId,
  } = route.params ? route.params : '';

  const currentLog = logs.length > 0 ? logs.find(log => log.id === logId) : '';
  const logName = currentLog ? currentLog.name : '';

  const date = new Date();
  const year = passedYear || date.getFullYear();
  const month = passedMonth || date.getMonth() + 1;
  const day = passedDay || date.getDate();
  const currentDate = `${year}-${month < 10 ? `0${(month).toString()}` : month}-${day < 10 ? `0${(day).toString()}` : day}`;

  //  These variables are for the swipeables to close when the user
  //  clicks anywhere on the screen

  let row = [];
  let previousOpenedRow;
  let itemIndex;

  //  -------------------------------------------------------------

  //  logs.length > 0 && ... prevents the app from exploding if
  //  there are no logs and when the user clicks anywhere on the screen
  logs.length > 0 && currentLog ?
    currentLog.entries.map(entry => {
      if(entry.date === currentDate) {
        DailyEntries.push(entry)
      }
    })
  :
    '';

  //  This insert DateTime key and value to the DailyEntries object
  //  to sort all entries by the time the daily entry occurred
  DailyEntries.map(entry => {
    const entryDate = entry.date;

    let currentStringHour = '';
    let currentNumberHour = Number(entry.startTime.substring(0, 2));
    const currentMinute = entry.startTime.substring(3, 5);
    const currentSecond = '00';
    const currentMeridiem = entry.startTime.slice(-2);

    if(currentMeridiem === 'PM' && currentNumberHour !== 12) {
      currentNumberHour += 12;
    }

    if(currentMeridiem === 'AM' && currentNumberHour === 12) {
      currentNumberHour = 0;
    }

    currentStringHour = currentNumberHour < 10 ? `0${currentNumberHour.toString()}` : currentNumberHour.toString();

    const entryTime = `${currentStringHour}:${currentMinute}:${currentSecond}`;
    const currentStringDateTime = `${entryDate}T${entryTime}`;
    const currentDateTime = new Date(currentStringDateTime);

    entry[`DateTime`] = currentDateTime;
  })

  //  Sort all the daily entries by start time
  DailyEntries.sort((a, b) => {
    return a.DateTime - b.DateTime;
  })

  let monthName = '';
  let englishMonth = '';

  switch(month) {
    case 1:
      if(settings.language === 'Español') {
        monthName = 'Enero';
      }
      else {
        monthName = 'January';
      };

      englishMonth = 'January';
      
      break;
    case 2:
      if(settings.language === 'Español') {
        monthName = 'Febrero';
      }
      else {
        monthName = 'February';
      };

      englishMonth = 'February';

      break;
    case 3:
      if(settings.language === 'Español') {
        monthName = 'Marzo';
      }
      else {
        monthName = 'March';
      };

      englishMonth = 'March';

      break;
    case 4:
      if(settings.language === 'Español') {
        monthName = 'Abril';
      }
      else {
        monthName = 'April';
      };

      englishMonth = 'April';

      break;
    case 5:
      if(settings.language === 'Español') {
        monthName = 'Mayo';
      }
      else {
        monthName = 'May';
      };

      englishMonth = 'May';
      
      break;
    case 6:
      if(settings.language === 'Español') {
        monthName = 'Junio';
      }
      else {
        monthName = 'June';
      };

      englishMonth = 'June';

      break;
    case 7:
      if(settings.language === 'Español') {
        monthName = 'Julio';
      }
      else {
        monthName = 'July';
      };

      englishMonth = 'July';

      break;
    case 8:
      if(settings.language === 'Español') {
        monthName = 'Agosto';
      }
      else {
        monthName = 'August';
      };

      englishMonth = 'August';

      break;
    case 9:
      if(settings.language === 'Español') {
        monthName = 'Septiembre';
      }
      else {
        monthName = 'September';
      };

      englishMonth = 'September';

      break;
    case 10:
      if(settings.language === 'Español') {
        monthName = 'Octubre';
      }
      else {
        monthName = 'October';
      };

      englishMonth = 'October';

      break;
    case 11:
      if(settings.language === 'Español') {
        monthName = 'Noviembre';
      }
      else {
        monthName = 'November';
      };

      englishMonth = 'November';

      break;
    case 12:
      if(settings.language === 'Español') {
        monthName = 'Diciembre';
      }
      else {
        monthName = 'December';
      };

      englishMonth = 'December';

      break;
  }

  const englishDayToday = `${englishMonth} ${day}, ${year}`;
  const dateToday = new Date(englishDayToday);

  const today = `${monthName} ${day}, ${year}`;

  let weekday = '';

  switch(dateToday.getDay()) {
    case 0:
      if(settings.language === 'Español') {
        weekday = 'Domingo';
      }
      else {
        weekday = 'Sunday';
      };

      break;
    case 1:
      if(settings.language === 'Español') {
        weekday = 'Lunes';
      }
      else {
        weekday = 'Monday';
      };

      break;
    case 2:
      if(settings.language === 'Español') {
        weekday = 'Martes';
      }
      else {
        weekday = 'Tuesday';
      };

      break;
    case 3:
      if(settings.language === 'Español') {
        weekday = 'Miércoles';
      }
      else {
        weekday = 'Wednesday';
      };

      break;
    case 4:
      if(settings.language === 'Español') {
        weekday = 'Jueves';
      }
      else {
        weekday = 'Thursday';
      };

      break;
    case 5:
      if(settings.language === 'Español') {
        weekday = 'Viernes';
      }
      else {
        weekday = 'Friday';
      };

      break;
    case 6:
      if(settings.language === 'Español') {
        weekday = 'Sábado';
      }
      else {
        weekday = 'Saturday';
      };

      break;
  }

  const titleToday = `${weekday}, ${today}`;

  let noDiaryEntriesText = 'No diary entries to display';
  let addLogEntryText = 'Add Log Entry';
  let deleteLogText = 'Delete log entry';
  let confirmDeleteText = 'Are you sure you want to delete this log entry?';
  let yesText = 'Yes';
  let noText = 'No';
  let deleteText = 'Delete';
  let sortingPreferenceTitle = 'Sorting Preference';
  let sortingPreferencePrompt = 'Would you like to sort your log entries by the date they occured or by the date they were created?';
  let dateOccurredText = 'Sort by date occurred';
  let dateCreatedText = 'Sort by date created';
  let noExportText = 'Don\'t export data';

  switch(settings.language) {
    case 'Español':
      noDiaryEntriesText = 'No hay entradas para disponer';
      addLogEntryText = 'Añadir Nueva Entrada';
      deleteLogText = 'Borrar entrada de registro';
      confirmDeleteText = 'Borrar esta entrada de registro seguramente?'
      yesText = 'Sí';
      noText = 'No';
      deleteText = 'Borrar';
      sortingPreferenceTitle = 'Preferencia de Clasificación';
      sortingPreferencePrompt = 'Prefiere ordenar sus entradas de registro por la fecha en que ocurrieron o por la fecha en que fueron creadas?';
      dateOccurredText = 'Ordenar por fecha ocurrió';
      dateCreatedText = 'Ordenar por fecha creada';
      noExportText = 'No exportar mis datos';

      break;
    default:
      noDiaryEntriesText = 'No diary entries to display';
      addLogEntryText = 'Add Log Entry';
      deleteLogText = 'Delete log entry';
      confirmDeleteText = 'Are you sure you want to delete this log entry?';
      yesText = 'Yes';
      noText = 'No';
      deleteText = 'Delete';
      sortingPreferenceTitle = 'Sorting Preference';
      sortingPreferencePrompt = 'Would you like to sort your log entries by the date they occured or by the date they were created?';
      dateOccurredText = 'Sort by date occurred';
      dateCreatedText = 'Sort by date created';
      noExportText = 'Don\'t export data';
  }

  let headerButtonsColor = Colors.CalaGreen;
  let lineColor = Colors.EasyPurple;
  let listItemColor = Colors.CalaGreen;

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
      headerButtonsColor = Platform.OS === 'ios' ?
        settings.isDarkMode ?
          Colors.AlmightyGold
        :
          Colors.PurpleSky
      :
        Colors.AlmightyGold;
      
      lineColor = Colors.DarkGold;

      listItemColor = Colors.PowerPurple;

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
      headerButtonsColor = Platform.OS === 'ios' ?
        settings.isDarkMode ?
          Colors.PowerPurple
        :
          Colors.Pink
      :
        Colors.PinkPressed;

      lineColor = Colors.EasyPink;

      listItemColor = Colors.Pink;

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
      headerButtonsColor = Platform.OS === 'ios' ?
        settings.isDarkMode ?
          Colors.PurpleBlue
        :
          Colors.RiverGreen
      :
        Colors.PurpleBlue;

      lineColor = Colors.OceanTide;

      listItemColor = Colors.OceanBlue;

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
      headerButtonsColor = Platform.OS === 'ios' ?
        settings.isDarkMode ?
          Colors.Soldier
        :
          Colors.LimeGreen
      :
        Colors.Soldier;

      lineColor = Colors.GrayStone;

      listItemColor = Colors.LemonYellow;

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
      headerButtonsColor = Platform.OS === 'ios' ?
        settings.isDarkMode ?
          Colors.ArrowtipSilver
        :
          Colors.NightBlue
      :
        Colors.StoneBlue;

      lineColor = Colors.PurpleMoon;

      listItemColor = Colors.Moon;

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
      headerButtonsColor = Platform.OS === 'ios' ?
        settings.isDarkMode ?
          Colors.LightMaroon
        :
          Colors.DarkMaroon
      :
        Colors.BlueFire;

      lineColor = Colors.LightMaroon;

      listItemColor = Colors.BlueFire;

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
      headerButtonsColor = Colors.CalaGreen;

      lineColor = Colors.EasyPurple;

      listItemColor = Colors.CalaGreen;

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

  //  Forces to the navigation to go to the ViewLogsScreen so that the
  //  store can properly delete all logs without errors.
  useEffect(() => {
    if(deleteLogs === true) {
      navigation.goBack();
    }
  }, [deleteLogs]);

  useEffect(() => {
    if(isSettingChanged) {
      dispatch(deleteDataActions.setSettingChanged(false));
    }
  }, [settings])

  useEffect(() => {
    navigation.setOptions({
      headerTitle: `${logName}`,
      headerLeft: () => (
        <HeaderButtons HeaderButtonComponent={IconHeader}>
          <Item
            title='go-back'
            component='MaterialIcons'
            iconName='arrow-back'
            onPress={() => navigation.goBack()}
            size={32}
            color={headerButtonsColor}
          />
        </HeaderButtons>
      ),
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={IconHeader}>
          <Item
            title='export-log'
            component='AntDesign'
            iconName='export'
            onPress={showSortPreferenceAlert}
            size={28}
            color={headerButtonsColor}
          />
          <Item
            title='add-log-entry'
            component='MaterialIcons'
            iconName='playlist-add'
            onPress={() => {
              itemIndex && closeCurrentRow(itemIndex);
              navigation.navigate('AddEntryModal', {
                year: year,
                month: month,
                day: day,
                today: today,
                logId: currentLog.id,
              })
            }}
            size={32}
            color={headerButtonsColor}
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

  //  These functions are to close the swipeables whenever the user
  //  swipes another item or presses on anywhere else on the screen

  const closePreviousRow = (index) => {
    if(previousOpenedRow && previousOpenedRow !== row[index]) {
      previousOpenedRow.close();
    }
    previousOpenedRow = row[index];
  }

  const closeCurrentRow = (index) => {
    const currentRow = row[index];
    currentRow.close();
  }

  //  -------------------------------------------------------------

  const showSortPreferenceAlert = () => (
    Alert.alert(
      sortingPreferenceTitle,
      sortingPreferencePrompt,
      [
        {
          text: dateOccurredText,
          onPress: () => {
            const sortedLogEntries = sortLogs('occured');
            handleLogExport(sortedLogEntries);
          },
        },
        {
          text: dateCreatedText,
          onPress: () => {
            const sortedLogEntries = sortLogs('created');
            handleLogExport(sortedLogEntries);
          },
        },
        {
          text: noExportText,
          onPress: () => {
            return;
          },
        }
      ]
    )
  )

  const sortLogs = sortingPreference => {
    let sortedLogEntries = [];

    currentLog.entries.map(entry => {
      const entryDate = entry.date;
      let dayOfWeek;

      let currentNumberHour = Number(entry.startTime.substring(0, 2));
      const currentMinute = entry.startTime.substring(3, 5);
      const currentSecond = '00';
      const currentMeridiem = entry.startTime.slice(-2);

      if(currentMeridiem === 'PM' && currentNumberHour !== 12) {
        currentNumberHour += 12;
      }

      if(currentMeridiem === 'AM' && currentNumberHour === 12) {
        currentNumberHour = 0;
      }

      const currentStringHour = currentNumberHour < 10 ? `0${currentNumberHour.toString()}` : currentNumberHour.toString();

      const entryTime = `${currentStringHour}:${currentMinute}:${currentSecond}`;
      const currentStringDateTime = `${entryDate}T${entryTime}`;
      const currentDateTime = new Date(currentStringDateTime);
      const weekday = currentDateTime.getDay();
      
      if(settings.language === 'Español') {
        switch(weekday) {
          case 1:
            dayOfWeek = 'Lunes'
            break;
          case 2:
            dayOfWeek = 'Martes';
            break;
          case 3:
            dayOfWeek = 'Miércoles';
            break;
          case 4:
            dayOfWeek = 'Jueves';
            break;
          case 5:
            dayOfWeek = 'Viernes';
            break;
          case 6:
            dayOfWeek = 'Sábado';
            break;
          default:
            dayOfWeek = 'Domingo';
        }
      }
      else {
        switch(weekday) {
          case 1:
            dayOfWeek = 'Monday'
            break;
          case 2:
            dayOfWeek = 'Tuesday';
            break;
          case 3:
            dayOfWeek = 'Wednesday';
            break;
          case 4:
            dayOfWeek = 'Thursday';
            break;
          case 5:
            dayOfWeek = 'Friday';
            break;
          case 6:
            dayOfWeek = 'Saturday';
            break;
          default:
            dayOfWeek = 'Sunday';
        }
      }

      const currentEntry = {
        date_occurred: entry.date,
        day_of_week: dayOfWeek,
        start_time: entry.startTime,
        end_time: entry.endTime,
        entry: entry.entry,
        index: entry.entryIndex,
        date_created: entry.created,
        currentDateTime: currentDateTime,
      };

      sortedLogEntries.push(currentEntry);
    })

    if(sortingPreference === 'occured') {
      sortedLogEntries.sort((a, b) => {
        return Date.parse(a.currentDateTime) - Date.parse(b.currentDateTime);
      })
    }
    else if(sortingPreference === 'created') {
      sortedLogEntries.sort((a, b) => {
        return Date.parse(a.date_created) - Date.parse(b.date_created);
      })
    }

    //  This reassigns all the entryIndex values after the log entries
    //  are sorted out to their respective sortingPreference
    for(let index = 0; index < sortedLogEntries.length; index++) {
      sortedLogEntries[index].index = index;
    }

    return sortedLogEntries;
  }

  const handleLogExport = async sortedLogEntries => {
    const outputLogEntries = [
      ...sortedLogEntries.map(entry => {
        if(settings.language === 'Español') {
          return {
            fecha_occurrió: entry.date_occurred,
            día_de_semana: entry.day_of_week,
            hora_de_empiezo: entry.start_time,
            hora_de_fin: entry.end_time,
            entrada: entry.entry,
            índice: entry.index,
            fecha_creada: entry.date_created,
          }
        }
        else {
          return {
            date_occurred: entry.date_occurred,
            day_of_week: entry.day_of_week,
            start_time: entry.start_time,
            end_time: entry.end_time,
            entry: entry.entry,
            index: entry.index,
            date_created: entry.date_created,
          }
        }
        
      })
    ]

    const ws = XLSX.utils.json_to_sheet(outputLogEntries);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, currentLog.name);
    const wbout = XLSX.write(wb, {
      type: 'base64',
      bookType: "xlsx",
    })

    let logFileName = currentLog.name + '.xlsx';
    const dialogTitle = currentLog.name + ' data';

    logFileName = logFileName.split(' ').join('_');

    const uri = FileSystem.cacheDirectory + logFileName

    try {
      await FileSystem.writeAsStringAsync(uri, wbout, {
        encoding: FileSystem.EncodingType.Base64,
      });
      console.log('\n\nDone writing to the file system\n\n');
    }
    catch(error) {
      console.log('\nUnable to write to the file system\n');
      console.log(error);
    }

    try {
      await Sharing.shareAsync(uri, {
        mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        dialogTitle: dialogTitle,
        UTI: 'com.microsoft.excel.xlsx',
      })
      await console.log('\nDone sharing the file\n');
    }
    catch(error) {
      console.log('\n\nUnable to share the file\n\n');
      console.log(error);
    }
  }

  const emptyDataContainer = (
    <View
      style={[
        styles.emptyContainer,
        {
          backgroundColor: settings.isDarkMode ?
              Colors.PitchBlack
            :
              '#fff',
        }
      ]}
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
        {titleToday}
      </Text>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 40,
        }}
      >
        <Text
          style={{
            color: settings.isDarkMode ?
                '#fff'
              :
                '#000',
          }}
        >
          {noDiaryEntriesText}
        </Text>
        {
          Platform.OS === 'ios' ?
            <Button
              title={addLogEntryText}
              onPress={() => {
                //  This closes the current swipeable row before
                //  navigating to the next designated screen
                itemIndex && closeCurrentRow(itemIndex);
                //  --------------------------------------------
                navigation.navigate('AddEntryModal', {
                  year: year,
                  month: month,
                  day: day,
                  today: today,
                  logId: currentLog.id,
                })
              }}
            />
          :
            <TextButton
              title={addLogEntryText}
              onPress={() => {
                //  This closes the current swipeable row before
                //  navigating to the next designated screen
                itemIndex && closeCurrentRow(itemIndex);
                //  --------------------------------------------
                navigation.navigate('AddEntryModal', {
                  year: year,
                  month: month,
                  day: day,
                  today: today,
                  logId: currentLog.id,
                })
              }}
            />
        }
      </View>
      <FloatingActionButton
        IconSource='FontAwesome'
        iconName='calendar'
        iconSize={35}
        onPress={() => navigation.navigate('LogCalendarModal', {
          logId: logId,
          calendarLanguage: settings.language,
        })}
        style={styles.floatingAction}
        shaded={true}
        buttonColor={fabColor}
        buttonColorPressed={fabColorPressed}
      />
    </View>
  )

  const listItemTheme = {
    colors: {
      text: settings.isDarkMode ? listItemColor : '#000'
    }
  }

  const logContainer = (
    <Pressable
      style={[
        styles.logContainer,
        {
          backgroundColor: settings.isDarkMode ?
              Colors.PitchBlack
            :
              '#fff',
        }
      ]}
      onPress={() => {
        //  itemIndex && ... prevents the app from blowing up
        //  if there are no entries
        itemIndex && (
          closeCurrentRow(itemIndex),
          itemIndex = null
        )
      }}
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
        {titleToday}
      </Text>
      <FlatList
        data={DailyEntries}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => {
          return (
            <Swipeable
              ref={ref => row[item.id] = ref}
              renderRightActions={(progress, dragX) => {
                const scale = dragX.interpolate({
                  inputRange: [-100, 0],
                  outputRange: [1, 0],
                  extrapolate: 'clamp'
                })

                return (
                  <Pressable
                    style={styles.rightAction}
                    onPress={() => {
                      Alert.alert(
                        deleteLogText,
                        confirmDeleteText,
                        [
                          {
                            text: yesText,
                            onPress: () => (
                              dispatch(logsActions.deleteLogEntry(
                                currentLog.id,
                                item.id
                              )
                            ))
                          },
                          {
                            text: noText,
                            onPress: () => closeCurrentRow(item.id)
                          }
                        ]
                      )
                    }}
                  >
                    <Animated.Text
                      style={[
                        styles.actionText,
                        {
                          transform: [{ scale }],
                          fontSize: settings.language === 'Español' ? 19 : 18,
                        }
                      ]}
                    >
                      {deleteText}
                    </Animated.Text>
                  </Pressable>
                )
              }}
              onSwipeableWillOpen={() => {
                itemIndex = item.id;
                closePreviousRow(item.id)
              }}
            >
              <Pressable
                onPress={() => {
                  if(itemIndex) {
                    closePreviousRow(item.id);
                    return itemIndex = null;
                  }
                  navigation.navigate('EntryDetails', {
                    id: item.id,
                    date: item.date,
                    startTime: item.startTime,
                    endTime: item.endTime,
                    entry: item.entry,
                    today: today,
                    logId: item.logId,
                  })
                }}
                style={{
                  backgroundColor: settings.isDarkMode ?
                      Colors.PitchBlack
                    :
                      '#fff',
                }}
              >
                <List.Item
                  title={`${item.startTime} - ${item.endTime}`}
                  description={item.entry}
                  theme={listItemTheme}
                />
              </Pressable>
            </Swipeable>
          )
        }}
        ItemSeparatorComponent={() => {
          return (
            <View
              style={[
                styles.separator,
                {
                  backgroundColor: settings.isDarkMode ?
                      lineColor
                    :
                      Colors.GrayLine
                }
              ]}
            />
          )
        }}
        style={{
          width: screenWidth / 1,
        }}
      />
      <FloatingActionButton
        IconSource='FontAwesome'
        iconName='calendar'
        iconSize={35}
        onPress={() => navigation.navigate('LogCalendarModal', {
          logId: logId,
          calendarLanguage: settings.language,
        })}
        style={styles.floatingAction}
        shaded={true}
        buttonColor={fabColor}
        buttonColorPressed={fabColorPressed}
      />
    </Pressable>
  )

  return DailyEntries.length !== 0 ? logContainer : emptyDataContainer;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionText: {
    color: 'white',
    fontWeight: '600',
    padding: 15,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  floatingAction: {
    position: 'absolute',
    bottom: 35,
    right: 30,
  },
  dateContainer: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 15
  },
  logContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  floatingActionButton: {
    position: 'absolute',
    bottom: 35,
    right: 30,
  },
  leftAction: {
    flex: 1,
    backgroundColor: 'green',
    justifyContent: 'center',
  },
  rightAction: {
    backgroundColor: 'red',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  separator: {
    flex: 1,
    height: 1,
    marginLeft: 10,
    marginRight: 10,
  },
})

export default LogDetailsScreen;
