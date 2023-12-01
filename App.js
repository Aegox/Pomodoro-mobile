import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View , Image, TouchableOpacity, Alert} from 'react-native';
import { useFonts } from 'expo-font';
import { useCallback , useState, useEffect} from 'react';
import * as SplashScreen from 'expo-splash-screen';
import Play from './assets/play-solid.svg'
import Pause from './assets/pause-solid.svg'
import Reset from './assets/rotate-right-solid.svg'
import Config from './assets/gear-solid.svg'

export default function App() {
  const widthSvg = 35;
  const [time , setTime] = useState({
    mode: "working",
    work_minutes: 30,
    work_seconds: 60,
    rest_minutes:10,
    rest_seconds: 0,
    minutes: 3,
    seconds: 0,
    interval: undefined
  })

  const [fontsLoaded] = useFonts({
    'Bebas-neue-ultrabold': require('./assets/fonts/BebasNeue-ultrabold.otf')
  });
  
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }


  const clock = () => {
    setTime(prevState => {
      let newSeconds = prevState.seconds;
      let newMinutes = prevState.minutes;
      if (newMinutes > 0 ) {
          if (newSeconds == 0 ) {newMinutes = newMinutes - 1}

          if (newSeconds == 0) {
            if (newMinutes !== 0) {
              newSeconds = prevState.work_seconds - 1;
            }
          } else { 
            newSeconds = newSeconds - 1;
          }
      }
      return {
        ...prevState,
        seconds: newSeconds,
        minutes: newMinutes
      };
    })
  };

  const play = () => {
    setTime((prevState) => ({
      ...prevState,
      interval: setInterval(clock, 1000)
    }))
  }
  
  const reset  = () => {
    clearInterval(time.interval);
    setTime((prevState) => ({
      ...prevState,
      minutes: prevState.work_minutes,
      seconds: 0,
      interval: undefined
    }))
  }
  
  const pause  = () => {
    clearInterval(time.interval);
    setTime((prevState) => ({
      ...prevState,
      interval: undefined
    }))
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.clock} onLayout={onLayoutRootView}>
        <View style={styles.time}>
          <View style={styles.line}></View>
          <Text style={styles.text}>{time.minutes < 10 ? "0" + time.minutes : time.minutes}</Text>
          <Text style={styles.sub}>m</Text>
        </View>
        <View style={styles.time}>
          <View style={styles.line}></View>
          <Text style={styles.text}>{time.seconds < 10 ? "0" + time.seconds : time.seconds}</Text>
          <Text style={styles.sub}>s</Text>
        </View>
        <View style={styles.controls}>
          <TouchableOpacity onPress={play}>
            <Play width={widthSvg} height={widthSvg}/>
          </TouchableOpacity>         
          <TouchableOpacity  onPress={pause}>         
            <Pause width={widthSvg} height={widthSvg}/>
          </TouchableOpacity>         
          <TouchableOpacity onPress={reset}>
            <Reset width={widthSvg} height={widthSvg}/>
          </TouchableOpacity>         
          <TouchableOpacity>
            <Config width={widthSvg} height={widthSvg}/>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#060606',
},
  title: {
    color: 'white',
    alignSelf: 'center',
    fontSize: 35,
    marginTop: 20
  },
  clock: {
    flex: 1,
    width: '100%',
    height: '60%',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5
  },
  time: {
    height: '37%',
    width: '52%',
    backgroundColor: '#222',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    zIndex: 0,
    margin: 5
  },
  text: {
    color: '#dfdfdf',
    fontSize: 200,
    fontFamily: 'Bebas-neue-ultrabold',
    fontWeight: '600'
  },
  sub: {
    color: '#dfdfdf',
    fontSize: 25,
    fontFamily: 'Bebas-neue-ultrabold',
    fontWeight: '600',
    position: 'absolute',
    bottom: 10,
    right: 10
  },
  line: {
    width: '100%',
    height: 4,
    position: 'absolute',
    top: '48%',
    backgroundColor: 'black',
    zIndex: 1
  },
  controls: {
    flexDirection: "row",
    marginTop: 40,
    gap: 10
  },
});
