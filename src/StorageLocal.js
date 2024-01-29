import { View, Text, Button } from 'react-native';
import React, { useState, useEffect } from 'react';
import DeviceInfo from 'react-native-device-info'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Async_LocalStorage() {
  const [name, setName] = useState(null);

  const [deviceID, setDeviceID] = useState('uuid v')

  let uniqueId = {};
  const getdeviceID = async () => {
    // uniqueId.getUniqueId = await DeviceInfo.getUniqueId();
    // uniqueId.syncUniqueId = await DeviceInfo.syncUniqueId();
    uniDeviceName = await DeviceInfo.getDeviceName();
    console.log("uniDeviceName : " + JSON.stringify(uniDeviceName));

    uni_InstanceId = await DeviceInfo.getInstanceId();
    console.log("getInstanceId(): ", uni_InstanceId);
    setDeviceID(uni_InstanceId);

  };

  // setDataLocal
  const setDataLocal = async () => {
    let setUniInsId = AsyncStorage.setItem("name", deviceID);
    console.log('setDataLocal: ', setUniInsId);
    console.log("getdeviceID: %s , %s", getdeviceID, deviceID);
  }
  // showDataLocal
  const showDataLocal = async () => {
    name = await AsyncStorage.getItem("name");
    setName(name);
    console.log("name: ", name);
  }
  // console.log('deviceID: ', deviceID);

  const clearData = async () => {
    const clearName = await AsyncStorage.removeItem("name");
    setName(clearName);
    console.log('Remove Done: %s , %s', clearName, clearName);
  }

  useEffect(() => {
    getdeviceID();
    setDataLocal();
    // return function cleanup() {
    //   // ทำการ cleanup ที่นี่
    //   setName(null);
    //   console.log("clear count เป็น 0 : ", name);
    // };
  }, []);

  return (
    <View>
      <View style={{ margin: 20 }}>
        <Button title="Set" onPress={getdeviceID} />
        {/* <Button title="Set Data" onPress={setData} /> */}

      </View>

      {/* <View style={{ margin: 20 }}>
        <Button title="Show Data" onPress={showData} />
      </View>

      <View style={{ margin: 20 }}>
        <Button title="Clear Data" onPress={clearData} />
      </View> */}

      {name ? (
        <Text style={{ fontSize: 19, color: 'black', margin: 20 }}>
          {name}
        </Text>
      ) : null}
    </View>
  );
}