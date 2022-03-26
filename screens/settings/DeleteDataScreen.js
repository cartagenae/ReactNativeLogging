import React, { useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Platform,
  Pressable,
  Alert,
  useWindowDimensions,
} from 'react-native';

import { useDispatch, useSelector } from 'react-redux';

import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import IconHeader from '../../components/IconHeader';

import { Divider } from 'react-native-paper';
import Colors from '../../constants/Colors.js';

import * as deleteDataActions from '../../store/actions/deleteData.js';

const DeleteDataScreen = ({ navigation }) => {
  const settings = useSelector(state => state.settings.settings);
  const logs = useSelector(state => state.logs.logs);
  const tables = useSelector(state => state.tables.tables);
  const dispatch = useDispatch();
  const screenHeight = Math.floor(useWindowDimensions().height);

  //  styles dynamic to settings.isDarkMode -----------------------------

  const blockContainerBackground = {
    backgroundColor: settings.isDarkMode ? Colors.MatteBlack : '#eee', //353935
    color: settings.isDarkMode ? '#fff' : '#000',
  }

  const blockItemText = {
    paddingTop: '5%',
    color: settings.isDarkMode ? '#fff' : '#000',
  }
  
  //  -------------------------------------------------------------------

  let headerTitle = 'Delete Logs and Tables';
  let everyLogText = 'Delete All Logs';
  let everyTableText = 'Delete All Tables';
  let everythingText = 'Delete All Logs and All Tables';
  let deleteLogPrompt = 'Are you sure you want to delete all your logs?';
  let deleteLogConfirm = 'Please confirm you want to delete all your logs';
  let deleteTablePrompt = 'Are you sure you want to delete all your tables?';
  let deleteTableConfirm = 'Please confirm you want to delete all your tables';
  let deleteEverythingPrompt = 'Are you sure you want to delete all your logs and all your tables?';
  let deleteEverythingConfirmText = 'Please confirm you want to delete all your logs and all your tables';
  let yesText = 'Yes';
  let noText = 'No';
  let confirmText = 'Confirm';
  let cancelText = 'Cancel';
  let successTitleText = 'Success';
  let deleteLogsSuccessText = 'All logs deleted successfully';
  let deleteTablesSuccessText = 'All tables deleted successfully';
  let deleteEverythingSucessText = 'All tables and all logs deleted successfully';
  let noLogsTitle = 'No Logs';
  let noLogsText = 'There are no logs to delete';
  let noTablesTitle = 'No Tables';
  let noTablesText = 'There are no tables to delete';
  let nothingTitle = 'Nothing';
  let nothingText = 'There is nothing to delete';

  switch(settings.language) {
    case 'Español':
      headerTitle = 'Eliminar Registros y Tablas';
      everyLogText = 'Eliminar Todos Los Registros';
      everyTableText = 'Eliminar Todas Las Tablas';
      everythingText = 'Eliminar Todos Los Registros y Todas Las Tablas';
      deleteLogPrompt = 'Está seguro(a) que desea eliminar todos sus registros?';
      deleteLogConfirm = 'Por favor confirme que quiere eliminar todos sus registros';
      deleteTablePrompt = 'Está seguro(a) que desea elminar todas sus tablas?';
      deleteTableConfirm = 'Por favor confirme que quiere eliminar todas sus tablas';
      deleteEverythingPrompt = 'Está seguro(a) que desea eliminar todos sus registros y todas sus tablas?';
      deleteEverythingConfirmText = 'Por favor confirme que quiere eliminar todos sus registros y todas sus tablas';
      yesText = 'Sí';
      noText = 'No';
      confirmText = 'Confirmar';
      cancelText = 'Cancelar';
      successTitleText = 'Eliminación Exitosa';
      deleteLogsSuccessText = 'Todos sus registros fueron eliminados exitosamente';
      deleteTablesSuccessText = 'Todas sus tablas fueron eliminadas exitosamente';
      deleteEverythingSucessText = 'Todos sus registros y todas sus tablas fueron eliminados exitosamente';
      noLogsTitle = 'No Registros';
      noLogsText = 'No hay registros para eliminar';
      noTablesTitle = 'No Tablas'
      noTablesText = 'No hay tablas para eliminar';
      nothingTitle = 'Nada';
      nothingText = 'No hay nada para eliminar';

      break;
    default:
      headerTitle = 'Delete Logs and Tables';
      everyLogText = 'Delete All Logs';
      everyTableText = 'Delete All Tables';
      everythingText = 'Delete All Logs and All Tables';
      deleteLogPrompt = 'Are you sure you want to delete all your logs?';
      deleteLogConfirm = 'Please confirm you want to delete all your logs';
      deleteTablePrompt = 'Are you sure you want to delete all your tables?';
      deleteTableConfirm = 'Please confirm you want to delete all your tables';
      deleteEverythingPrompt = 'Are you sure you want to delete all your logs and all your tables?';
      deleteEverythingConfirmText = 'Please confirm you want to delete all your logs and all your tables';
      yesText = 'Yes';
      noText = 'No';
      confirmText = 'Confirm';
      cancelText = 'Cancel';
      successTitleText = 'Success';
      deleteLogsSuccessText = 'All logs deleted successfully';
      deleteTablesSuccessText = 'All tables deleted successfully';
      deleteEverythingSucessText = 'All tables and all logs deleted successfully';
      noLogsTitle = 'No Logs';
      noLogsText = 'There are no logs to delete';
      noTablesTitle = 'No Tables';
      noTablesText = 'There are no tables to delete';
      nothingTitle = 'Nothing';
      nothingText = 'There is nothing to delete';
  }

  let headerLeftColor = Colors.CalaGreen;
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

      androidHeaderColor = Colors.MatteBlack;
        
      break;
    default:
      headerLeftColor = Colors.CalaGreen;
      androidHeaderColor = Colors.PurpleFog;
  }
  
  useEffect(() => {
    navigation.setOptions({
      headerTitle: headerTitle,
      headerLeft: () => (
        <HeaderButtons HeaderButtonComponent={IconHeader}>
          <Item
            title='GoBack'
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
        )
      }
    })
  }, [
    settings.isDarkMode,
    settings.colorTheme,
    settings.language
  ]);

  const deleteLogsAlert = () => {
    if(logs.length === 0) {
      Alert.alert(
        noLogsTitle,
        noLogsText,
        [
          {
            text: 'OK',
            onPress: () => {
              if(tables.length === 0) {
                navigation.goBack();
              }
            }
          }
        ]
      )
      return;
    }

    Alert.alert(
      everyLogText,
      deleteLogPrompt,
      [
        {
          text: yesText,
          onPress: deleteLogsConfirm,
        },
        {
          text: noText,
        },
      ]
    )
  };
  
  const deleteLogsConfirm = () => {
    Alert.alert(
      everyLogText,
      deleteLogConfirm,
      [
        {
          text: confirmText,
          onPress: deleteLogsHandler,
        },
        {
          text: cancelText,
        },
      ]
    )
  }

  const deleteLogsHandler = () => {
    dispatch(deleteDataActions.setDeleteLogsTrue());

    Alert.alert(
      successTitleText,
      deleteLogsSuccessText,
      [
        {
          title: 'OK',
        }
      ]
    )
  }

  const deleteTablesAlert = () => {
    if(tables.length === 0) {
      Alert.alert(
        noTablesTitle,
        noTablesText,
        [
          {
            text: 'OK',
            onPress: () => {
              if(logs.length === 0) {
                navigation.goBack();
              }
            }
          }
        ]
      )
      return;
    }

    Alert.alert(
      everyTableText,
      deleteTablePrompt,
      [
        {
          text: yesText,
          onPress: deleteTablesConfirm,
        },
        {
          text: noText,
        },
      ]
    )
  };

  const deleteTablesConfirm = () => {
    Alert.alert(
      everyTableText,
      deleteTableConfirm,
      [
        {
          text: confirmText,
          onPress: deleteTablesHandler,
        },
        {
          text: cancelText,
        },
      ]
    )
  }

  const deleteTablesHandler = () => {
    dispatch(deleteDataActions.setDeleteTablesTrue());

    Alert.alert(
      successTitleText,
      deleteTablesSuccessText,
      [
        {
          text: 'OK',
        }
      ]
    )
  }

  const deleteEverythingAlert = () => {
    if(logs.length === 0 && tables.length === 0) {
      Alert.alert(
        nothingTitle,
        nothingText,
        [
          {
            text: 'OK',
            onPress: () => navigation.goBack(),
          }
        ]
      )
      return;
    }

    Alert.alert(
      everythingText,
      deleteEverythingPrompt,
      [
        {
          text: yesText,
          onPress: deleteEverythingConfirm,
        },
        {
          text: noText,
        },
      ]
    )
  }

  const deleteEverythingConfirm = () => {
    Alert.alert(
      everythingText,
      deleteEverythingConfirmText,
      [
        {
          text: confirmText,
          onPress: () => {
            dispatch(deleteDataActions.setDeleteLogsTrue());
            dispatch(deleteDataActions.setDeleteTablesTrue());

            Alert.alert(
              successTitleText,
              deleteEverythingSucessText,
              [
                {
                  text: 'OK',
                  onPress: () => {
                    navigation.goBack()
                  }
                }
              ]
            )
          },
        },
        {
          text: cancelText,
        },
      ]
    )
  }

  let iosGapHeight = '62%';
  let androidGapHeight = '60%';

  switch(screenHeight) {
    case 533:
      androidGapHeight = '49.75%';
    case 812:
      iosGapHeight = '62%';
      break;
    case 926:
      iosGapHeight = '62%';
      break;
    case 1152:
      androidGapHeight = '72.5%';
      break;
    default:
      iosGapHeight = '62%';
      androidGapHeight = '60%';
  }

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: settings.isDarkMode ?
            Colors.PitchBlack
          :
            '#fff',
        },
      ]}
    >
      <View style={styles.blockContainer}>
        <View style={styles.space} />
        <Divider />
        <Pressable
          onPress={deleteLogsAlert}
        >
          <View
            style={[
              styles.blockItem,
              blockContainerBackground,
            ]}
          >
            <Text style={blockItemText}>{everyLogText}</Text>
          </View>
        </Pressable>
        <Divider />
        <Pressable
          onPress={deleteTablesAlert}
        >
          <View
            style={[
              styles.blockItem,
              blockContainerBackground,
            ]}
          >
            <Text style={blockItemText}>{everyTableText}</Text>
          </View>
        </Pressable>
        <Divider />
        <View style={styles.space} />
        <Divider />
        <Pressable
          onPress={deleteEverythingAlert}
        >
          <View
            style={[
              styles.blockItem,
              blockContainerBackground,
            ]}
          >
            <Text
              style={[
                blockItemText,
                {
                  color: 'red',
                  fontWeight: '600',
                }
              ]}
            >
              {everythingText}
            </Text>
          </View>
        </Pressable>
        <Divider />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  blockContainer: {
    flex: 1,
    width: '100%',
  },
  blockItem: {
    height: 50,
    paddingHorizontal: '5%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  space: {
    marginTop: '7%',
  },
  gap: {
    marginTop: '113%',
  },
  separator: {
    flex: 1,
    height: 1,
    backgroundColor: '#e4e4e4',
    marginLeft: 10,
    marginRight: 10,
  },
})

export default DeleteDataScreen;
