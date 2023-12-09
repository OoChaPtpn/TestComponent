import React, { useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import uuid from 'react-native-uuid';
// import { getUniqueId, syncUniqueId, getDeviceName, getDeviceToken, getCarrier} from 'react-native-device-info';
import DeviceInfo from 'react-native-device-info'
import AsyncStorage from '@react-native-async-storage/async-storage';

const MyComponent2 = ({ route, navigation }) => {

    console.log(uuid.v4())// ⇨ '11edc52b-2918-4d71-9058-f7285e29d894')

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
    const setDataLocal = () => {
        AsyncStorage.setItem('getdeviceID', getdeviceID);
        console.log('getdeviceID_setDataLocal: ', getdeviceID)
    }
    const showDataLocal = async () => {
        let user = await AsyncStorage.getItem('getdeviceID');
        console.log(user)
    }


    React.useEffect(() => {
        if (route.params?.post) {
            // Post updated, do something with `route.params.post`
            // For example, send the post to the server
            console.log("route.params?.post = ", route.params?.post)
        }
        console.log("route.params", route.params?.post)
    }, [route.params?.post]);

    return (
        <SafeAreaView >
            <View >
                {setDataLocal}
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