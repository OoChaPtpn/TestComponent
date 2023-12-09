import React from 'react';
import {
  Animated,
  Text,
  View,
  StyleSheet,
} from 'react-native';
import { Svg, Defs, Rect, Mask } from 'react-native-svg'
import { Camera, useCameraDevice, useCodeScanner } from 'react-native-vision-camera';

const TestCameraMask = () => {
  const device = useCameraDevice('back')


  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13'],
    onCodeScanned: (codes) => {
      console.log(`Scanned ${codes.length} codes!`)
      console.log(codes[0].value)
      const scannedText = codes[0].value
      // setTitleText(scannedText)
      // เซ็ตค่าให้กับ state ด้วย setTitleText
      if (scannedText !== undefined) {
        setTitleText(scannedText);
        console.log(`Scanned_ `, titleText)
      }
    }
  })


  function CameraFrame() {
    return (
      < Svg
        height="100%"
        width="100%" >
        <Defs>
          <Mask
            id='mask'
            x="0"
            y="0"
            height="100%"
            width="100%" >
            <Rect height="100%" width="100%" fill="#fff" />
            <Rect x="15%" y="30%" width="250" height="250" fill="black" />
          </Mask>
        </Defs>
        <Rect height="100%" width="100%" fill="rgba(8, 4, 36,0.8)" mask='url(#mask)' />

        {/* Frame Border */}
        <Rect
          x="15%" y="30%" width="250" height="250" strokeWidth="5" stroke="#fff" fill="#ffffff00"
        />


      </Svg >
    )
  }

  return (
    <View style={styles.container}>
      <View style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      }}>
        <Camera
          style={StyleSheet.absoluteFill}
          device={device}
          isActive={true}
          codeScanner={codeScanner}
          enableZoomGesture

        />
        <CameraFrame />

      </View>


      {/* Label 1 */}
      <View style={{ position:'absolute', top:'15%', left:'0', right:'0', alignItems:'center' }}>
        <Text style={{fontSize:30,color:'white',fontWeight:700}}>
          Scan...
        </Text>
      </View>

      {/* Label  */}
      <View style={{ position:'absolute', top:'68%', left:'0', right:'0', alignItems:'center' }}>
        <Text style={{fontSize:13,color:'white',textAlign:'center'}}>
          วาง QR Code หรือ Bar Code ภายในกรอบ {"\n"} เพื่อเข้าถึงข้อมูล
        </Text>
      </View>


    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fadingContainer: {
    height: 500,
    padding: 50,
    backgroundColor: 'rgba(25, 25, 112, 0.8)',
  },
  fadingText: {
    fontSize: 28,
  },
  buttonRow: {
    flexBasis: 100,
    justifyContent: 'space-evenly',
    marginVertical: 16,
  },
});


export default TestCameraMask
