import { View, Text, Button } from 'react-native';
import React, { useState } from 'react';
import DeviceInfo from 'react-native-device-info'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Async_LocalStorage() {
  const [name, setName] = useState(null);
  const [age, setAge] = useState(null);
  const user_details = {
    name: 'S.G.',
    age: 24,
  };

  const [deviceID, setDeviceID] = useState('uuid v')
  let uniqueId = {};
  const getdeviceID = async () => {
      uniqueId.getUniqueId = await DeviceInfo.getUniqueId();
      uniqueId.syncUniqueId = await DeviceInfo.syncUniqueId();

      uniqueId.getDeviceName = await DeviceInfo.getDeviceName();
      console.log("uniqueId : " + JSON.stringify(uniqueId));

      uniqueId.getInstanceId = await DeviceInfo.getInstanceId();
      console.log("getInstanceId(): ", uniqueId.getInstanceId);

      setDeviceID(uniqueId.getInstanceId);
      //setDataLocal
      // AsyncStorage.setItem('getdeviceID', getdeviceID);
  }

  console.log("deviceID: ", deviceID)

  const setData = () => {
    // AsyncStorage.setItem("name", "S.G.");
    // AsyncStorage.setItem("age", JSON.stringify(24))
    // AsyncStorage.setItem('user_details', JSON.stringify(user_details));
    // AsyncStorage.setItem('user_details', JSON.stringify(getdeviceID));
    
    AsyncStorage.setItem("name", deviceID);
    console.log("getdeviceID: %s , %s", getdeviceID , deviceID);
  };

  const showData = async () => {
    // let user = await AsyncStorage.getItem('user_details');
    // user = JSON.parse(user);
    // console.log(typeof user, user);
    // setName(user.name);
    // setAge(user.age);

    // const name = await AsyncStorage.getItem("name");
    // const age = await AsyncStorage.getItem("age");
    // console.log(name);
    // console.log(typeof(age), age)
    

    const name = await AsyncStorage.getItem("name");
    setName(name);
    console.log("name: ",name);

  };

  const clearData = () => {
    AsyncStorage.clear();
  }

  return (
    <View>
      <View style={{ margin: 20 }}>
        <Button title="Set" onPress={getdeviceID} />
        <Button title="Set Data" onPress={setData} />

      </View>

      <View style={{ margin: 20 }}>
        <Button title="Show Data" onPress={showData} />
      </View>

      <View style={{ margin: 20 }}>
        <Button title="Clear Data" onPress={clearData} />
      </View>

      {name ? (
        <Text style={{ fontSize: 19, color: 'black', margin: 20 }}>
          {name}
        </Text>
      ) : null}
    </View>
  );
}