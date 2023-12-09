import { Text, View } from 'react-native'
import React, { Component } from 'react'
import { PaperProvider } from 'react-native-paper';
import MyComponent from './src/testTextInput';
import TestScanner from './src/TestScanner';
import TestCameraMask from './src/TestCameraMask';

import { NavigationContainer } from '@react-navigation/native';
import MyStackNavigator from './src/StackNavigator';
import Async_LocalStorage from './src/StorageLocal';


export class App extends Component {
  render() {
    return (
      <NavigationContainer>
        <PaperProvider>
          {/* TextInput */}
          {/* <MyComponent /> */}
          {/* <TestCameraMask /> */}
          {/* <TestMoti /> */}
          {/* <MyStackNavigator /> */}
          <Async_LocalStorage/>

        </PaperProvider>
      </NavigationContainer>

    )
  }
}

export default App