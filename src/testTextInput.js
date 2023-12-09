import * as React from 'react';
import { SafeAreaView, View, Text, StyleSheet, Alert } from 'react-native';
import { TextInput, Icon, MD3Colors, Button } from 'react-native-paper';





const MyComponent = ({ route, navigation }) => {


    const str_scan = route.params?.str_scanner;




    const [text, setText] = React.useState("");
    const showFullName = () => {
        Alert.alert(`Hello ${text}`);
    };



    return (
        <SafeAreaView >
            <View >
                <Text variant="headlineSmall">Headline Small</Text>
                <TextInput

                    label="Email"
                    value={text}
                    onChangeText={text}
                // onChangeText={JSON.stringify(str_scanner)}

                />
                <TextInput

                    label="text"
                    value={str_scan}
                    onChangeText={str_scan}
                // onChangeText={JSON.stringify(str_scanner)}

                />
                <Text>Scan text : {JSON.stringify(str_scan)}</Text>
                <Button
                    style={[styles.formItem,]}
                    title='OK'
                    onPress={showFullName}
                    disabled={!text}>
                </Button>
                <Icon
                    source="camera"
                    color={MD3Colors.error50}
                    size={20}
                />
                <Button icon="camera" mode="contained" onPress={() => navigation.navigate("TestScanner")}>
                    Press me
                </Button>
            </View>
        </SafeAreaView>
    );
};

export default MyComponent;

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