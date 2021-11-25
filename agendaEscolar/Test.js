import React, { Component } from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, SafeAreaView, TouchableOpacity, View, ScrollView} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as ScreenOrientation from 'expo-screen-orientation';
import { Button, ThemeProvider, Header } from 'react-native-elements';

// Cambiar orientación de la pantalla
async function changeScreenOrientation() {
    await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT);
  }
  
  
  function adminMenu({navigation}) {
    changeScreenOrientation();
    return (
      <View>
        <Header
          leftComponent={{ icon: 'menu', color: '#fff', iconStyle: { color: '#fff' } }}
          centerComponent={{ text: 'HOLA GUAKAS', style: { color: '#fff' } }}
          rightComponent={{ icon: 'home', color: '#fff' }}
        />
        {/* Accessibility rol  */}
        <SafeAreaView>
          <Text value="PANTALLA PRINCIPAL ADMIN" accessibilityRole="header"></Text>
        </SafeAreaView>

        {/* Main block*/}
        <ThemeProvider>
            <Button title="Hey!"/>
        </ThemeProvider>
      </View>
  
    )
  }
  
  export default adminMenu;