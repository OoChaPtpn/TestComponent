import React, { useState, useRef } from 'react'
import { View, Text, Linking, SafeAreaView, Animated, StyleSheet, Button } from 'react-native'
import { Camera, useCodeScanner, useCameraDevice, useCameraFormat } from 'react-native-vision-camera';
import { IconButton, MD3Colors } from 'react-native-paper';


const TestScanner = ({ navigation, route  }) => {
  const [titleText, setTitleText] = useState(null)
  const str_scanner = ''



  // Set Camera use front or back Camera
  const device = useCameraDevice('back')
  const format = useCameraFormat(device, [
    { videoResolution: { width: 3048, height: 2160 } },
    { fps: 60 },
  ])
  const fps = format.maxFps >= 240 ? 240 : format.maxFps

  React.useEffect(() => {
    //Camera
    checkPermission();
  }, []);

  // Permission Camera
  const checkPermission = React.useCallback(async () => {
    const newCameraPermission = await Camera.requestCameraPermission();
    console.warn(newCameraPermission);
    if (newCameraPermission === 'denied') await Linking.openSettings()
  }, [])


  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13'],
    onCodeScanned: (codes) => {
      console.log(`Scanned ${codes.length} codes!`)
      console.log(codes[0].value)
      const scannedText = codes[0].value
      // setTitleText(scannedText)
      // เซ็ตค่าให้กับ state ด้วย setTitleText
      // if (scannedText !== undefined) {
      if (scannedText !== null) {
        setTitleText(scannedText);
        console.log(`Scanned_titleText : `, titleText)
        if (setTitleText !== null && titleText !== null) {
          console.log('setTitleText !== null && titleText!==null')
          // navigation.navigate("MyComponent2", { str_scanner: titleText });
          navigation.navigate({
            name: 'MyComponent2',
            params: { post: titleText },
            merge: true,
          });
          
        }

      }
    }
  })

  const fadeAnim = useRef(new Animated.Value(0)).current;

  const scan = require('../assets/icon/scan.png')
  return (
    <SafeAreaView>
      <View >
        <View style={styles.container}>

          <Camera
            style={{ height: 500, width: '100%' }}
            device={device}
            isActive={true}
            format={format}
            fps={fps}
            codeScanner={codeScanner}
          />


          {/* Loading / Searching View */}
          <Animated.View
            style={[
              styles.fadingContainer,
              {
                opacity: fadeAnim,
              },
            ]}>

            <Text style={{
              fontSize: 20,
              fontWeight: 500,
              color: "rgb(25, 25, 112)"
            }}>
              Searching
            </Text>
          </Animated.View>


          {/* Scan Button */}
          <View style={{
            width: '100%',
            height: 70,
            position: 'absolute',
            alignItems: 'center',
            justifyContent: 'center',
            top: 430,
          }}>
            <IconButton
              icon={scan}
              style={{
                height: 60,
                width: 60,
                borderRadius: 30,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: "#fff"

              }}
              iconColor={MD3Colors.error50}
              size={50}
              onPress={() => {
                setTitleText(scannedText);
                console.log(`Scanned_ `, titleText)
                Animated.timing(fadeAnim, {
                  toValue: 1,
                  useNativeDriver: true,

                }).start();
                setTimeout(() => {
                  Animated.timing(fadeAnim, {
                    toValue: 0,
                    useNativeDriver: true,
                  }).start();
                }, 2000)


              }
              }
            />
          </View>
        </View>



        <View>
          <Text style={{ fontWeight: 800 }}>TestScanner : {titleText}</Text>
        </View>

      </View>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  fadingContainer: {
    height: 500,
    width: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(49, 27, 146, 0.3)',
  },
});
export default TestScanner





{/* Loading / Searching View */ }
{/* <MotiView
            state={loaderAnimationState}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(75, 0, 130, 0.5)'
            }}>
            <Text style={{
              fontSize: 20,
              fontWeight: 500,
              color: "#9370DB"
            }}>
              Searching
            </Text>
          </MotiView> */}

{/* <IconButton
              icon={scan}
              style={{
                height: 60,
                width: 60,
                borderRadius: 30,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: "#fff"

              }}
              iconColor={MD3Colors.error50}
              size={50}
              // onPress={() => {
              //   loaderAnimationState.transitionTo('from')
              //   setTimeout(() => { loaderAnimationState.transitionTo('to') }, 2000)
              // }}
              onPress={() => {fadeIn}}
            /> */}