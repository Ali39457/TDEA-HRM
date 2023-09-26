import 'react-native-gesture-handler';
import React from 'react';
import {StyleSheet} from 'react-native'
import { StatusBar } from 'react-native'
import AppNavigator from './PJT-navigation_screens/AppNavigator';
import {enableScreens} from 'react-native-screens';
enableScreens();

// Ignore all log notifications:
//import { LogBox } from 'react-native';
//LogBox.ignoreLogs(['Warning: ...']);
//LogBox.ignoreAllLogs();

import { Provider } from 'react-redux';
import { Store } from './redux/store';


export default function App(){
  
  return (
    
    <Provider store={Store} >
     <StatusBar barStyle = "dark-content" hidden = {false} backgroundColor="transparent" translucent = {false}/>
    <AppNavigator/>
 </Provider>
  );
};
