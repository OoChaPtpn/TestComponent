import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, StyleSheet } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import DeviceInfo from 'react-native-device-info'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Dropdown } from 'react-native-element-dropdown';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const data = [
    { label: 'Item 1', value: '1' },
    { label: 'Item 2', value: '2' },
    { label: 'Item 3', value: '3' },
    { label: 'Item 4', value: '4' },
    { label: 'Item 5', value: '5' },
    { label: 'Item 6', value: '6' },
    { label: 'Item 7', value: '7' },
    { label: 'Item 8', value: '8' },
  ];


const MyComponent2 = ({ route, navigation }) => {

    // const [deviceID, setDeviceID] = useState(null);
    // const [deviceName, setDeviceName] = useState(null);
    // const [localDeviceID, setLoDeviceID] = useState(null);
    // const [localDeviceName, setLoDeviceName] = useState(null);
    let str_deviceID = "deviceID";
    let str_deviceName = "deviceName";
    let str_localDeviceID = "localDeviceID";
    let str_localDeviceName = "localDeviceID";

    // console.log('deviceID: %s, deviceName: %s', deviceID,deviceName);
    const getdeviceID = async () => {
        let uniDeviceName = await DeviceInfo.getDeviceName();
        // str_deviceName = JSON.stringify(uniDeviceName);
        console.log("uniDeviceName : " + JSON.stringify(uniDeviceName));

        let uniInstanceId = await DeviceInfo.getInstanceId();
        // str_deviceID=JSON.stringify(uniInstanceId);
        console.log("getInstanceId(): " + JSON.stringify(uniDeviceName));
        return { 'UnitDName': uniDeviceName, 'UnitID': uniInstanceId }
    }


    const setDataLocal = async (UnitDName, UnitID) => {
        // เช็ค deviceName ระหว่างเครื่องกับ DB ว่า
        if (UnitID != null && UnitDName != null) {
            console.log("setDataLocal deviceID: %s ,deviceName: %s ", UnitID, UnitDName);
            await AsyncStorage.setItem("set_UniInsId", UnitID);
            await AsyncStorage.setItem("set_UniDeviceName", UnitDName);

            let getLoUniInsId = await AsyncStorage.getItem("set_UniInsId");
            let getLoDevName = await AsyncStorage.getItem("set_UniDeviceName");

            // js_LoUniInsId = JSON.parse(getLoUniInsId);
            // js_LoDevName = JSON.parse(getLoDevName);
            // console.log(typeof js_LoUniInsId,typeof js_LoDevName , "js_LoUniInsId: %s,js_LoDevName:%s", js_LoUniInsId,js_LoDevName);

            console.log('showDataLocal getLolUniInsId: %s, getLoDevName: %s', typeof getLoUniInsId, getLoDevName);
            str_localDeviceID = getLoUniInsId;
            str_localDeviceName = getLoDevName;
            console.log('useState localDeviceID: %s, localDeviceName: %s', str_localDeviceID, str_localDeviceName);

        } else {
            console.log("else setDataLocal deviceID: %s ,deviceName: %s " + UnitID, UnitDName);
        }
    }

    const clearDataLocal = async () => {
        const clearUniInsId = await AsyncStorage.removeItem("set_UniInsId");
        const clearUniDevName = await AsyncStorage.removeItem("set_UniDeviceName");
        setName(clearUniInsId);
        console.log("clearDataLocal: %s , deviceID: %s", clearUniInsId, clearUniDevName);

    }

    React.useEffect(() => {
        if (route.params?.post) {
            // Post updated, do something with `route.params.post`
            // For example, send the post to the server

            console.log("route.params?.post = ", route.params?.post);
        }
        console.log("route.params", route.params?.post);

        getdeviceID().then((value) => {
            setDataLocal(value.UnitDName, value.UnitID);
        });

        // return function cleanup() {
        //     // ทำการ cleanup ที่นี่
        //     setDeviceID(null);
        //     console.log("clear count เป็น 0 : ", deviceID);
        // };

    }, [route.params?.post]);

    const [value, setValue] = useState(null);

    return (
        <SafeAreaView >
            <View >
            <Dropdown
                    style={styles.dropdown}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    data={data}
                    search
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder="Select item"
                    searchPlaceholder="Search..."
                    value={value}
                    onChange={item => {
                    setValue(item.value);
                    }}
                    renderLeftIcon={() => (
                    <Icon style={styles.icon} color="black" name="account-search-outline" size={20} />
                    )}
                />
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
                    onPress={() => { }}>
                    {/*  onPress={showDataLocal}> */}
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

                {/* {deviceID ? ( */}
                {/* <Text style={{ fontSize: 19, color: 'black', margin: 20 }}> */}
                {/* {deviceID} */}
                {/* hi
                    </Text>
                ) : null} */}


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
    },
    dropdown: {
        margin: 16,
        height: 50,
        borderBottomColor: 'gray',
        borderBottomWidth: 0.5,
      },
      icon: {
        marginRight: 5,
      },
      placeholderStyle: {
        fontSize: 16,
      },
      selectedTextStyle: {
        fontSize: 16,
      },
      iconStyle: {
        width: 20,
        height: 20,
      },
      inputSearchStyle: {
        height: 40,
        fontSize: 16,
      },
});