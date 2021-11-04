import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, SafeAreaView, Button, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.banner}>
        <Text style={styles.headerText}>ENTRAR</Text>
      </SafeAreaView>
      <View style={styles.buttonChoose}>
        <Button title="ELEGIR ALUMNO" color="#faff6d">
        </Button>
      </View>
      <View style={styles.buttonView}>
        <Button title="ENTRAR" color="#faff6d" style={styles.enterButton}>
        </Button>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
  banner: {
    backgroundColor: '#248aff',
    width: '100%',
    height: '15%',
    alignItems: 'center',
    justifyContent: 'center',

  },
  headerText: {
    fontSize: 70,
    fontWeight: 'bold'
  },
  enterButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonView: {
    width: '20%'
  },
  buttonChoose: {
    width: '20%'
  },
});
