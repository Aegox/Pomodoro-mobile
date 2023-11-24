import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View , Image} from 'react-native';
import { useFonts } from 'expo-font';
import { useCallback } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import PLay from './assets/play-solid.svg'

export default function App() {
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
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.clock} onLayout={onLayoutRootView}>
        <View style={styles.time}>
          <View style={styles.line}></View>
          <Text style={styles.text}>30</Text>
          <Text style={styles.sub}>m</Text>
        </View>
        <View style={styles.time}>
          <View style={styles.line}></View>
          <Text style={styles.text}>00</Text>
          <Text style={styles.sub}>s</Text>
        </View>
        <Play size={30}/>
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
  }
});
