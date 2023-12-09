import { createStackNavigator } from '@react-navigation/stack';

import MyComponent from './testTextInput';
import TestScanner from './TestScanner';
import TestCameraMask from './TestCameraMask';
import MyComponent2 from './testTextInputScan';

const Stack = createStackNavigator();

const MyStackNavigator = () => {
    return (
    <Stack.Navigator screenOptions={{
        // headerShown: false 
        // headerStyle: {
        //   backgroundColor: COLORS.primary
        // },
        // tabBarHideOnKeyboard: true,  
      }}
      initialRouteName={"MyComponent2"}>

      <Stack.Screen name="MyComponent" component={MyComponent} />
      <Stack.Screen name="MyComponent2" component={MyComponent2} />
      <Stack.Screen name="TestScanner" component={TestScanner} />
      <Stack.Screen name="TestCameraMask" component={TestCameraMask} />
    </Stack.Navigator>
  );
}

export default MyStackNavigator