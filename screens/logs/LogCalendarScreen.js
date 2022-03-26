import React, { useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  useWindowDimensions,
} from 'react-native';

import Colors from '../../constants/Colors';
import { AntDesign, Entypo } from '@expo/vector-icons';

import { CalendarList, LocaleConfig } from 'react-native-calendars';
import { useSelector } from 'react-redux';

const LogCalendarScreen = ({ navigation, route }) => {
  const { logId } = route.params;

  const screenWidth = useWindowDimensions().width;
  const logs = useSelector(state => state.logs.logs);
  const settings = useSelector(state => state.settings.settings);
  const deleteLogs = useSelector(state => state.deleteData.deleteLogs);
  const isSettingChanged = useSelector(state => state.deleteData.isSettingChanged);
  let DailyEntries = Object.create({});
  
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const currentDate = `${year}-${month < 10 ? `0${(month).toString()}` : month}-${day < 10 ? `0${(day).toString()}` : day}`;

  const currentLog = logs.length > 0 && logs.find(log => log.id === logId);
  const logName = currentLog.name;

  let headerTitle = '';

  switch(settings.language) {
    case 'Español':
      headerTitle = `Calendario: ${logName}`;
      LocaleConfig.locales['es'] = {
        monthNames: [
          'Enero',
          'Febrero',
          'Marzo',
          'Abril',
          'Mayo',
          'Junio',
          'Julio',
          'Agosto',
          'Septiembre',
          'Octubre',
          'Noviembre',
          'Diciembre',
        ],
        monthNamesShort: [
          'Enero',
          'Feb.',
          'Marzo',
          'Abr.',
          'Mayo',
          'Jun.',
          'Jul.',
          'Agosto',
          'Sept.',
          'Oct.',
          'Nov.',
          'Dic.',
        ],
        dayNames: [
          'Domingo',
          'Lunes',
          'Martes',
          'Miércoles',
          'Jueves',
          'Viernes',
          'Sábado',
        ],
        dayNamesShort: [
          'Dom.',
          'Lun.',
          'Mar.',
          'Mié.',
          'Jue.',
          'Vie.',
          'Sáb.',
        ],
        today: 'Hoy',
      };
      LocaleConfig.defaultLocale = 'es';

      break;
    default:
      headerTitle = `${logName} Calendar`;
      LocaleConfig.locales['en'] = LocaleConfig.locales[''];
      LocaleConfig.defaultLocale = 'en';
  }

  let headerLeftColor = Colors.CalaGreen;

  let monthTextColor = settings.isDarkMode ?
    Colors.EasyPurple
  :
    Colors.Midnight;

  let dayTextColor = settings.isDarkMode ?
    Colors.CalaGreen
  :
    'black';

  let textDisabledColor = settings.isDarkMode ?
    Colors.PurpleFog
  :
    'lightgray';

  let todayTextColor = settings.isDarkMode ?
    Colors.Magenta
  :
    Colors.SkyBlue;

  let selectedColor = Colors.RoyalPurple;

  let selectedDayTextColor = Colors.White;

  switch(settings.colorTheme) {
    case 'Zeus':
      headerLeftColor = Platform.OS === 'ios' ?
        settings.isDarkMode ?
          Colors.AlmightyGold
        :
          Colors.PurpleSky
      :
        Colors.AlmightyGold;

      monthTextColor = settings.isDarkMode ?
        Colors.PurpleBlue
      :
        Colors.Midnight;

      dayTextColor = settings.isDarkMode ?
        Colors.AlmightyGold
      :
        'black';

      textDisabledColor = settings.isDarkMode ?
        Colors.PurpleFog
      :
        'lightgray';

      todayTextColor = settings.isDarkMode ?
        Colors.OrangeGold
      :
        Colors.SkyBlue;

      selectedColor = Colors.PurpleBlue;

      selectedDayTextColor = Colors.Black;

      break;
    case 'Hera':
      headerLeftColor = Platform.OS === 'ios' ?
        settings.isDarkMode ?
          Colors.PowerPurple
        :
          Colors.Pink
      :
        Colors.PinkPressed;

      monthTextColor = settings.isDarkMode ?
        Colors.EasyPink
      :
        Colors.Midnight;

      dayTextColor = settings.isDarkMode ?
        Colors.NeutralPink
      :
        'black';

      textDisabledColor = settings.isDarkMode ?
        Colors.PurpleFog
      :
        'lightgray';

      todayTextColor = settings.isDarkMode ?
        Colors.EasyPink
      :
        Colors.SkyBlue;

      selectedColor = Colors.PurpleCharm;

      selectedDayTextColor = Colors.White;

      break;
    case 'Poseidon':
      headerLeftColor = Platform.OS === 'ios' ?
        settings.isDarkMode ?
          Colors.PurpleBlue
        :
          Colors.RiverGreen
      :
        Colors.PurpleBlue;

      monthTextColor = settings.isDarkMode ?
        Colors.OceanBlue
      :
        Colors.Midnight;

      dayTextColor = settings.isDarkMode ?
        Colors.OceanTide
      :
        'black';

      textDisabledColor = settings.isDarkMode ?
        Colors.PurpleFog
      :
        'lightgray';

      todayTextColor = settings.isDarkMode ?
        Colors.ClearOcean
      :
        Colors.SkyBlue;

      selectedColor = Colors.PurpleBlue;

      selectedDayTextColor = settings.isDarkMode ?
        Colors.Black
      :
        Colors.White;
      
      break;
    case 'Apollo':
      headerLeftColor = Platform.OS === 'ios' ?
        settings.isDarkMode ?
          Colors.Soldier
        :
          Colors.LimeGreen
      :
        Colors.Soldier;
      
      monthTextColor = settings.isDarkMode ?
        Colors.LimeGreen
      :
        Colors.Midnight;

      dayTextColor = settings.isDarkMode ?
        Colors.Soldier
      :
        'black';

      textDisabledColor = settings.isDarkMode ?
        Colors.PurpleFog
      :
        'lightgray';

      todayTextColor = settings.isDarkMode ?
        Colors.LemonYellow
      :
        Colors.SkyBlue;

      selectedColor = settings.isDarkMode ?
        Colors.GrayStone
      :
        Colors.DarkGrayStone;

      selectedDayTextColor = settings.isDarkMode ?
        Colors.Black
      :
        Colors.White;
      
      break;
    case 'Artemis':
      headerLeftColor = Platform.OS === 'ios' ?
        settings.isDarkMode ?
          Colors.ArrowtipSilver
        :
          Colors.NightBlue
      :
        Colors.StoneBlue;

      monthTextColor = settings.isDarkMode ?
        Colors.StoneBlue
      :
        Colors.Midnight;

      dayTextColor = settings.isDarkMode ?
        Colors.PurpleMoon
      :
        'black';

      textDisabledColor = settings.isDarkMode ?
        Colors.PurpleFog
      :
        'lightgray';

      todayTextColor = settings.isDarkMode ?
        Colors.Moon
      :
        Colors.SkyBlue;

      selectedColor = settings.isDarkMode ?
        Colors.BloodRed
      :
        Colors.StoneBlue;

      selectedDayTextColor = settings.isDarkMode ?
        Colors.White
      :
        Colors.Black;
      
      break;
    case 'Hades':
      headerLeftColor = Platform.OS === 'ios' ?
        settings.isDarkMode ?
          Colors.LightMaroon
        :
          Colors.DarkMaroon
      :
        Colors.BlueFire;

      monthTextColor = settings.isDarkMode ?
        Colors.Crimson
      :
        Colors.Midnight;

      dayTextColor = settings.isDarkMode ?
        Colors.BlueFire
      :
        'black';

      textDisabledColor = settings.isDarkMode ?
        Colors.PurpleFog
      :
        'lightgray';

      todayTextColor = settings.isDarkMode ?
        Colors.Crimson
      :
        Colors.SkyBlue;

      selectedColor = settings.isDarkMode ?
        Colors.LightMaroon
      :
        Colors.Charcoal;

      selectedDayTextColor = settings.isDarkMode ?
        Colors.White
      :
        Colors.White;

      break;
    default:
      headerLeftColor = Colors.CalaGreen;

      monthTextColor = settings.isDarkMode ?
        Colors.EasyPurple
      :
        Colors.Midnight;

      dayTextColor = settings.isDarkMode ?
        Colors.CalaGreen
      :
        'black';

      textDisabledColor = settings.isDarkMode ?
        Colors.PurpleFog
      :
        'lightgray';

      todayTextColor = settings.isDarkMode ?
        Colors.Magenta
      :
        Colors.SkyBlue;

      selectedColor = Colors.RoyalPurple;

      selectedDayTextColor = Colors.White;
  }

  useEffect(() => {
    if(isSettingChanged) {
      navigation.goBack();
    }
  }, [settings])

  useEffect(() => {
    if(deleteLogs) {
      navigation.goBack();
    }
  }, [deleteLogs]);

  const calendarTheme = {
    calendarBackground: settings.isDarkMode ?
        Colors.PitchBlack
      :
        '#fff',
    monthTextColor: monthTextColor,
    dayTextColor: dayTextColor,
    textDisabledColor: textDisabledColor,
    todayTextColor: todayTextColor,
    selectedDayTextColor: selectedDayTextColor,
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: settings.isDarkMode ?
              Colors.PitchBlack
            :
              '#fff'
        }
      ]}
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
          styles.title,
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
      <CalendarList
        onDayPress={day => {
          navigation.navigate({
            name: 'LogDetails',
            params: {
              passedYear: day.year,
              passedMonth: day.month,
              passedDay: day.day,
              logName: logName,
            },
            merge: true,
          })
        }}
        markedDates={
          logs.length > 0 && currentLog.entries.map(entry => {
            DailyEntries[entry.date] = {
              marked: true,
              dotColor: selectedColor,
            }
          }),
          DailyEntries
        }
        maxDate={currentDate}
        style={{
          width: screenWidth / 1,
        }}
        theme={calendarTheme}
      />
    </View>
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
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    marginTop: '15%',
    marginBottom: 5,
  },
})

export default LogCalendarScreen;
