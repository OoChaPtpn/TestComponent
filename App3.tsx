import React, { useCallback, useEffect, useState } from 'react';
import type { PropsWithChildren } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TextInput,
  ActivityIndicator,

} from 'react-native';
import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { Button, IconButton, MD3Colors } from 'react-native-paper';
import { Camera, CameraRuntimeError, CodeScanner, useCameraDevice } from 'react-native-vision-camera';
import { Linking } from 'react-native-windows';
import constants from './assets/constants/constants';



type SectionProps = PropsWithChildren<{
  title: string;
}>;

function Section({ children, title }: SectionProps): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const [text, setText] = React.useState("");

  // Set Camera use front or back Camera
  const device = useCameraDevice('back')
  const devic = useCameraDevice('front')
  React.useEffect(() => {
    //Camera
    checkPermission();

  }, []);
  // const checkPermission = async () => {
  //   const newCameraPermission = await Camera.requestCameraPermission();
  //   console.warn(newCameraPermission);
  // }



  // Permission Camera
  const checkPermission = React.useCallback(async () => {
    const newCameraPermission = await Camera.requestCameraPermission();
    console.warn(newCameraPermission);
    if (newCameraPermission === 'denied') await Linking.openSettings()
  }, [])

  //const textScanner
  const [titleText, setTitleText] = useState("wait")
  function renderCamera() {
    const codeScanner: CodeScanner = {
      codeTypes: ['qr', 'ean-13'],
      onCodeScanned: (codes) => {
        console.log(`Scanned ${codes[0].value} codes!`)
        console.log(typeof codes[0].value)
        console.log(`setTitleText >> `, typeof setTitleText)

        // รับค่าจาก QR code
        const scannedText = codes[0].value;

        // เซ็ตค่าให้กับ state ด้วย setTitleText
        if (scannedText !== undefined) {
          setTitleText(scannedText);
          console.log(`Scanned ${titleText}`)
        }
      },
    };

    if (device == null) {
      return (
        <View style={{ height: 300, flex: 1 }} />
      )
    } else {
      return (
        <View style={{ height: 300, flex: 1 }}>
          <Camera
            style={{ flex: 1 }}
            device={device}
            isActive={true}
            enableZoomGesture
            codeScanner={codeScanner}
          />
        </View>
      )
    }
  }




  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <TextInput
            style={styles.input}
            value={text}
            onChangeText={text => setText(text)}
          />
          <Button mode="contained" onPress={() => console.log('Pressed')}>
            Press me
          </Button>

          {renderCamera()}
          <Text>scan:{titleText}</Text>

          <Section title="Step One">
            Edit <Text style={styles.highlight}>App.tsx</Text> to change this
            screen and then come back to see your edits.
          </Section>
          <Section title="See Your Changes">
            <ReloadInstructions />
          </Section>
          <Section title="Debug">
            <DebugInstructions />
          </Section>
          <Section title="Learn More">
            Read the docs to discover what to do next:
          </Section>
          <LearnMoreLinks />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  light: {
    color: '#000',
    backgroundColor: '#fff',
  },
  input: {
    backgroundColor: '#fff',
    color: '#000',
    borderColor: '#000',
    borderWidth: 1,
    padding: 8,
    width: 200,
    margin: 10,
  },

});

export default App;
