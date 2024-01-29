import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, StyleSheet } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import uuid from 'react-native-uuid';
import { getUniqueId, getDeviceName } from 'react-native-device-info';
import DeviceInfo, { getUniqueId } from 'react-native-device-info'
import AsyncStorage from '@react-native-async-storage/async-storage';

const MyComponent2 = ({ route, navigation }) => {

    console.log(uuid.v4())// ⇨ '11edc52b-2918-4d71-9058-f7285e29d894')

    const [deviceID, setDeviceID] = useState('uuid v')

    const getdeviceID = async () => {
        uniDeviceName = await DeviceInfo.getDeviceName();
        console.log("uniDeviceName : " + JSON.stringify(uniDeviceName));

        getUniInsId = await DeviceInfo.getInstanceId();
        console.log("getdeviceID: ", getUniInsId);
        setDeviceID(getUniInsId);
    }

    const setDataLocal = async () => {
        setUniInsId = await AsyncStorage.setItem("set_UniInsId", deviceID);
        console.log('setDataLocal: ', setUniInsId)
    }

    const clearDataLocal = async () => {
        const clearUniInsId = await AsyncStorage.removeItem("set_UniInsId");
        setName(clearUniInsId);
        console.log("clearDataLocal: %s , deviceID: %s", clearUniInsId, deviceID);

    }

    React.useEffect(() => {
        if (route.params?.post) {
            // Post updated, do something with `route.params.post`
            // For example, send the post to the server
            console.log("route.params?.post = ", route.params?.post)
        }
        console.log("route.params", route.params?.post);

        // return function cleanup() {
        //     // ทำการ cleanup ที่นี่
        //     setDeviceID(null);
        //     console.log("clear count เป็น 0 : ", deviceID);
        // };

    }, [route.params?.post]);

    return (
        <SafeAreaView >
            <View >
                {getdeviceID}
                {/* {setDataLocal} */}
                <TextInput
                    label="Email"
                    onChangeText={route.params?.post}
                    value={route.params?.post}
                />
                <Text>Scan text : {route.params?.post}</Text>
                <Button icon="camera" mode="contained" onPress={() => navigation.navigate("TestScanner")}>
                    Press me
                </Button>

                <Button style={{ margin: 10 }}
                    icon="camera"
                    mode="contained"
                    // onPress={getdeviceID}>
                    onPress={showDataLocal}>
                    uuid
                </Button>
                {/* <Text style={{
                    fontSize: 24,
                    fontWeight: 500,
                    justifyContent: 'center',
                }}>
                    // {JSON.stringify(uniqueId)} 
                    // {JSON.stringify(deviceID)} 
                    {deviceID}
                </Text> */}

                {deviceID ? (
                    <Text style={{ fontSize: 19, color: 'black', margin: 20 }}>
                        {deviceID}
                    </Text>
                ) : null}


            </View>
        </SafeAreaView>
    );
};

export default MyComponent2;

const styles = StyleSheet.create({
    dark: {
        color: '#fff',
        backgroundColor: '#000',

    },
    light: {
        color: '#000',
        backgroundColor: '#fff',
        flex: 1,

    },
    formItem: {
        backgroundColor: '#f0d500',
        marginBottom: 6,
        height: 30,
        width: 50,
    }
});