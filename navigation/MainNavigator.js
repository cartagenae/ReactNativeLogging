import React, { useEffect } from 'react';
import { Platform } from 'react-native';

import { useSelector } from 'react-redux';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import { Ionicons } from '@expo/vector-icons';

// Tables Tab
import ViewTablesScreen, { viewTablesScreenOptions } from '../screens/tables/ViewTablesScreen';
import CreateTableScreen, { createTableScreenOptions } from '../screens/tables/CreateTableScreen';
import DataTableScreen, { dataTableScreenOptions } from '../screens/tables/DataTableScreen';
import InsertRowScreen, { insertRowScreenOptions } from '../screens/tables/InsertRowScreen';
import RowDetailsScreen, { rowDetailsScreenOptions } from '../screens/tables/RowDetailsScreen';
import RenameTableScreen, { renameTableScreenOptions } from '../screens/tables/RenameTableScreen';

// Logs Tab
import ViewLogsScreen, { viewLogsScreenOptions } from '../screens/logs/ViewLogsScreen';
import CreateLogScreen, { createLogScreenOptions } from '../screens/logs/CreateLogScreen';
import LogDetailsScreen, { logDetailScreenOptions } from '../screens/logs/LogDetailsScreen';
import LogCalendarScreen, { logCalendarScreenOptions } from '../screens/logs/LogCalendarScreen';
import RenameLogScreen, { renameLogScreenOptions } from '../screens/logs/RenameLogScreen';
import AddEntryScreen, { addEntryScreenOptions } from '../screens/logs/AddEntryScreen';
import EntryDetailsScreen, { entryDetailsScreenOptions } from '../screens/logs/EntryDetailsScreen';

// Settings Tab
import SettingsScreen, { settingsScreenOptions } from '../screens/settings/SettingsScreen';
import LanguagesScreen, { languagesScreenOptions } from '../screens/settings/LanguagesScreen';
import ColorThemesScreen, { colorThemesScreenOptions } from '../screens/settings/ColorThemesScreen';
import SortLogsScreen, { sortLogsScreenOptions } from '../screens/settings/SortLogsScreen';
import SortTablesScreen, { sortTablesScreenOptions } from '../screens/settings/SortTablesScreen';
import DeleteDataScreen, { deleteDataScreenOptions } from '../screens/settings/DeleteDataScreen';

import Colors from '../constants/Colors';

import * as settingsActions from '../store/actions/settings';

// Logs Tab ******************************************

// ViewLogs Stack ------------------------------------

const ViewLogsStack = createStackNavigator();

const ViewLogsStackScreen = () => {
  return (
    <ViewLogsStack.Navigator>
      <ViewLogsStack.Screen
        name='Logs'
        component={ViewLogsScreen}
        options={viewLogsScreenOptions}
      />
      <ViewLogsStack.Screen
        name='LogDetails'
        component={LogDetailsScreen}
        options={logDetailScreenOptions}
      />
      <ViewLogsStack.Screen
        name='EntryDetails'
        component={EntryDetailsScreen}
        options={entryDetailsScreenOptions}
      />
    </ViewLogsStack.Navigator>
  )
}

// The CreateLogsModalStack enables the CreateLogsScreen
// to be displayed as a modal

const CreateLogsModalStack = createStackNavigator();

const CreateLogsModalStackScreen = () => {
  return (
    <CreateLogsModalStack.Navigator mode='modal'>
      <CreateLogsModalStack.Screen
        name='ViewLogs'
        component={ViewLogsStackScreen}
        options={{ headerShown: false }}
      />
      <CreateLogsModalStack.Screen
        name='CreateLogModal'
        component={CreateLogScreen}
        options={{ headerShown: false }}
      />
      <CreateLogsModalStack.Screen
        name='LogCalendarModal'
        component={LogCalendarScreen}
        options={{ headerShown: false }}
      />
      <CreateLogsModalStack.Screen
        name='RenameLogModal'
        component={RenameLogScreen}
        options={{ headerShown: false }}
      />
      <CreateLogsModalStack.Screen
        name='AddEntryModal'
        component={AddEntryScreen}
        options={{ headerShown: false }}
      />
    </CreateLogsModalStack.Navigator>
  )
}

// Tables Tab ***************************************

// ViewTables Stack ---------------------------------
const ViewTablesStack = createStackNavigator();

const ViewTablesStackScreen = () => {
  return (
    <ViewTablesStack.Navigator>
      <ViewTablesStack.Screen
        name='Tables'
        component={ViewTablesScreen}
        options={viewTablesScreenOptions}
      />
      <RootTableModalStack.Screen
        name='DataTable'
        component={DataTableScreen}
        options={dataTableScreenOptions}
      />
      <RootTableModalStack.Screen
        name='RowDetailsScreen'
        component={RowDetailsScreen}
        options={rowDetailsScreenOptions}
      />
    </ViewTablesStack.Navigator>
  )
}

// The RootTableModalStack enables the CreateTableScreen
// and RenameTableScreen to be displayed as a modal

const RootTableModalStack = createStackNavigator();

const RootTableModalStackScreen = () => {
  return (
    <RootTableModalStack.Navigator mode='modal'>
      <RootTableModalStack.Screen
        name='ViewTables'
        component={ViewTablesStackScreen}
        options={{ headerShown: false }}
      />
      <RootTableModalStack.Screen
        name='InsertRow'
        component={InsertRowScreen}
        options={{ headerShown: false }}
      />
      <RootTableModalStack.Screen
        name='CreateTableModal'
        component={CreateTableScreen}
        options={{ headerShown: false }}
      />
      <RootTableModalStack.Screen
        name='RenameTableModal'
        component={RenameTableScreen}
        options={{ headerShown: false }}
      />
    </RootTableModalStack.Navigator>
  )
}

// Settings Tab and Stack ****************************

const SettingsStack = createStackNavigator();

const SettingsStackScreen = () => {
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen
        name='Settings'
        component={SettingsScreen}
        options={settingsScreenOptions}
      />
      <SettingsStack.Screen
        name='LanguagesScreen'
        component={LanguagesScreen}
        options={languagesScreenOptions}
      />
      <SettingsStack.Screen
        name='ColorThemesScreen'
        component={ColorThemesScreen}
        options={colorThemesScreenOptions}
      />
      <SettingsStack.Screen
        name='SortLogsScreen'
        component={SortLogsScreen}
        options={sortLogsScreenOptions}
      />
      <SettingsStack.Screen
        name='SortTablesScreen'
        component={SortTablesScreen}
        options={sortTablesScreenOptions}
      />
      <SettingsStack.Screen
        name='DeleteDataScreen'
        component={DeleteDataScreen}
        options={deleteDataScreenOptions}
      />
    </SettingsStack.Navigator>
  )
}

// The Main Bottom Tab Navigator ---------------------
const Tab = createBottomTabNavigator();
const AndroidTab = createMaterialBottomTabNavigator();

const MainBottomTabNavigatorScreenOptions = ({ route }) => {
  const settings = useSelector(state => state.settings.settings);

  let iosColorFocusedDark = Colors.CalaGreen;
  let iosColorFocusedLight = Colors.LightPurple;
  let androidColorFocused = Colors.CalaGreen;
  let iosColorNotFocusedDark = Colors.EasyPurple;
  let iosColorNotFocusedLight = Colors.CalaGreen;
  let androidColorNotFocused = Colors.White;
  
  switch(settings.colorTheme) {
    case 'Zeus':
      iosColorFocusedDark = Colors.PurpleBlue;

      iosColorFocusedLight = Colors.PurpleSky;

      androidColorFocused = Colors.AlmightyGold;

      iosColorNotFocusedDark = Colors.AlmightyGold;

      iosColorNotFocusedLight = Colors.OrangeGold;

      androidColorNotFocused = Colors.White;

      break;
    case 'Hera':
      iosColorFocusedDark = Colors.Pink;

      iosColorFocusedLight = Colors.PowerPurple;

      androidColorFocused = Colors.PinkPressed;

      iosColorNotFocusedDark = Colors.PowerPurple;

      iosColorNotFocusedLight = Colors.Pink;

      androidColorNotFocused = Colors.White;

      break;
    case 'Poseidon':
      iosColorFocusedDark = Colors.ClearOcean;

      iosColorFocusedLight = Colors.PurpleBlue;

      androidColorFocused = Colors.PurpleBlue;

      iosColorNotFocusedDark = Colors.OceanBlue;

      iosColorNotFocusedLight = Colors.RiverGreen;

      androidColorNotFocused = Colors.White;

      break;
    case 'Apollo':
      iosColorFocusedDark = Colors.Marble;

      iosColorFocusedLight = Colors.LimeGreen;

      androidColorFocused = Colors.Soldier;

      iosColorNotFocusedDark = Colors.Soldier;

      iosColorNotFocusedLight = Colors.DarkGrayStone;

      androidColorNotFocused = Colors.White;

      break;
    case 'Artemis':
      iosColorFocusedDark = Colors.Moon;

      iosColorFocusedLight = Colors.BloodRed;

      androidColorFocused = Colors.StoneBlue;

      iosColorNotFocusedDark = Colors.ArrowtipSilver;

      iosColorNotFocusedLight = Colors.NightBlue;

      androidColorNotFocused = Colors.White;

      break;
    case 'Hades':
      iosColorFocusedDark = Colors.StoneBlue;

      iosColorFocusedLight = Colors.LightMaroon;

      androidColorFocused = Colors.BlueFire;

      iosColorNotFocusedDark = Colors.LightMaroon;

      iosColorNotFocusedLight = Colors.DeathGray;

      androidColorNotFocused = Colors.White;

      break;
    default:
      iosColorFocusedDark = Colors.CalaGreen;

      iosColorFocusedLight = Colors.LightPurple;

      androidColorFocused = Colors.CalaGreen;

      iosColorNotFocusedDark = Colors.EasyPurple;

      iosColorNotFocusedLight = Colors.CalaGreen;

      androidColorNotFocused = Colors.White;
  };

  return {
    tabBarIcon: ({ focused, color, size }) => {
      let iconName;
      size = 24

      switch(route.name) {
        case 'Diaries':
          iconName = Platform.OS === 'ios' ?
            'ios-calendar'
          :
            'md-calendar'

          color = focused ?
            Platform.OS === 'ios' ?
              settings.isDarkMode ? iosColorFocusedDark : iosColorFocusedLight
            : 
              androidColorFocused
          :
            Platform.OS === 'ios' ?
              settings.isDarkMode ? iosColorNotFocusedDark : iosColorNotFocusedLight
            :
              androidColorNotFocused

          break;
        case 'Logs':
          iconName = Platform.OS === 'ios' ?
            'ios-calendar'
          :
            'md-calendar'

          color = focused ?
            Platform.OS === 'ios' ?
              settings.isDarkMode ?
                iosColorFocusedDark
              :
                iosColorFocusedLight
            : 
              androidColorFocused
          :
            Platform.OS === 'ios' ?
              settings.isDarkMode ?
                iosColorNotFocusedDark
              :
                iosColorNotFocusedLight
            :
              androidColorNotFocused

          break;
        case 'Tables':
          iconName = Platform.OS === 'ios' ? 
            'ios-grid' 
          :
            'md-grid'

          color = focused ?
            Platform.OS === 'ios' ?
              settings.isDarkMode ? iosColorFocusedDark : iosColorFocusedLight
            : 
              androidColorFocused
          :
            Platform.OS === 'ios' ?
              settings.isDarkMode ? iosColorNotFocusedDark : iosColorNotFocusedLight
            :
              androidColorNotFocused

          break;
        case 'Settings':
          iconName = Platform.OS === 'ios' ?
            'ios-settings'
          :
            'md-settings'

          color = focused ?
            Platform.OS === 'ios' ?
              settings.isDarkMode ? iosColorFocusedDark : iosColorFocusedLight
            : 
              androidColorFocused
          :
            Platform.OS === 'ios' ?
              settings.isDarkMode ? iosColorNotFocusedDark : iosColorNotFocusedLight
            :
              androidColorNotFocused

          break;
      }

      return (
        <Ionicons
          name={iconName}
          size={size}
          color={color}
        />
      );
    }
  }
}

const AndroidBottomTabNavigatorColors = {
  activeTintColor: Colors.Midnight,
  inactiveTintColor: Colors.PurpleFog,
}

const MainBottomTabNavigator = () => {
  const settings = useSelector(state => state.settings.settings);

  //  This loads all the persisted settings as soon as the
  //  MainNavigator loads up
  useEffect(() => {
    console.log('persisted settings loaded');
    settingsActions.loadSettings();
  }, [])

  let logTitle = 'Logs';
  let tableTitle = 'Tables';
  let settingsTitle = 'Settings';

  let androidBarColor = Colors.PurpleFog;

  switch(settings.language) {
    case 'Español':
      logTitle = 'Registros';
      tableTitle = 'Tablas';
      settingsTitle = 'Ajustes';
      break;
    default:
      logTitle = 'Logs';
      tableTitle = 'Tables';
      settingsTitle = 'Settings';
  }

  switch(settings.colorTheme) {
    case 'Zeus':
      androidBarColor = Colors.PurpleSky;
      break;
    case 'Hera':
      androidBarColor = Colors.PurpleThunder;
      break;
    case 'Poseidon':
      androidBarColor = Colors.LightOcean;
      break;
    case 'Apollo':
      androidBarColor = Colors.DarkGrayStone;
      break;
    case 'Artemis':
      androidBarColor = Colors.DeepPurple;
      break;
    case 'Hades':
      androidBarColor = Colors.MatteBlack;
      break;
    default:
      androidBarColor = Colors.PurpleFog;
  }

  return Platform.OS === 'ios' ? (
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={MainBottomTabNavigatorScreenOptions}
          tabBarOptions={{
            activeTintColor: settings.isDarkMode ? '#fff' : Colors.Midnight,
            inactiveTintColor: settings.isDarkMode ? '#fff' : Colors.PurpleFog,
            style: {
              backgroundColor: Platform.OS === 'ios' ?
                settings.isDarkMode ? Colors.MatteBlack : '#fff'
              :
                '',
            }
          }}
        >
          <Tab.Screen
            name='Logs'
            component={CreateLogsModalStackScreen}
            options={{
              title: logTitle,
            }}
          />
          <Tab.Screen
            name='Tables'
            component={RootTableModalStackScreen}
            options={{
              title: tableTitle,
            }}
          />
          <Tab.Screen
            name='Settings'
            component={SettingsStackScreen}
            options={{
              title: settingsTitle,
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    )
  :
    (
      <NavigationContainer>
        <AndroidTab.Navigator
          screenOptions={MainBottomTabNavigatorScreenOptions}
          tabBarOptions={AndroidBottomTabNavigatorColors}
          barStyle={{
            backgroundColor: androidBarColor,
          }}
        >
          <AndroidTab.Screen
            name='Logs'
            component={CreateLogsModalStackScreen}
            options={{
              title: logTitle,
            }}
          />
          <AndroidTab.Screen
            name='Tables'
            component={RootTableModalStackScreen}
            options={{
              title: tableTitle,
            }}
          />
          <AndroidTab.Screen
            name='Settings'
            component={SettingsStackScreen}
            options={{
              title: settingsTitle,
            }}
          />
        </AndroidTab.Navigator>
      </NavigationContainer>
    )
}

export default MainBottomTabNavigator;
