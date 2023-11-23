import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>The Pomodoro Clock</Text>
      <StatusBar style="auto" />
      <View style={styles.clock}>
        <View style={styles.time}>
          <Text style={styles.text}>30</Text>
        </View>
        <View style={styles.time}>
          <Text style={styles.text}>00</Text>
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
    gap: '1%'
  },
  time: {
    height: '45%',
    width: '50%',
    backgroundColor: '#222',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontSize: 150,
    fontFamily: 'BebasNeueBold'
    }
});
