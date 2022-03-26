import React from 'react';
import {
  Text,
  View,
  StyleSheet
} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import IoniconsHeader from '../../components/IoniconsHeader';

const ExportTableScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Inside the ExportTableScreen</Text>
    </View>
  )
}

export const exportTableScreenOptions = navData => {
  return {
    headerTitle: 'Export Table',
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={IoniconsHeader}>
        <Item
          title='menu'
          iconName={
            Platform.OS === 'ios'
              ? 'ios-menu'
              : 'md-menu'
          }
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default ExportTableScreen;
