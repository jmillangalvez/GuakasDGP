import React, { Component } from "react";
import { Text, SafeAreaView, TouchableOpacity, View, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as ScreenOrientation from 'expo-screen-orientation';
import styles from './Styles';

// Cambiar orientación de la pantalla
async function changeScreenOrientation() {
  await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT);
}


function subMenu({ navigation }) {
  changeScreenOrientation();
  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.banner}
        accessibilityLabel="SUBMENU DE TAREAS FIJAS"
        accessibilityRole="header"
        accessibilityHint="submenu para añadir o modificar tareas fijas">
        <Text style={styles.headerText}>SUBMENU DE TAREAS FIJAS</Text>
      </SafeAreaView>
      <View style={styles.goBackView}>
        <TouchableOpacity
          accessibilityLabel="Volver"
          accessibilityRole="button"
          accessibilityHint="Vuelve al menú del administrador"
          onPress={() => navigation.navigate('submenu')}>
          <Text style={styles.goBackText}>Volver</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        accessibilityLabel="Añadir tarea fija"
        accessibilityRole="button"
        accessibilityHint="Añade un tipo de tarea fija"
        style={styles.taskButtonTouch} 
        onPress={() => navigation.navigate('submenu')}>
        <Text style={styles.taskButtonText}>Añadir tarea fija</Text>
      </TouchableOpacity>
      <TouchableOpacity
        accessibilityLabel="Añadir comanda comedor"
        accessibilityRole="button"
        accessibilityHint="Añade una comanda comedor"
        style={styles.taskButtonTouch} 
        onPress={() => navigation.navigate('submenu')}>
        <Text style={styles.taskButtonText}>Añadir comanda comedor</Text>
      </TouchableOpacity>
      <TouchableOpacity
        accessibilityLabel="Añadir comanda stock"
        accessibilityRole="button"
        accessibilityHint="Añade una tarea de stock"
        style={styles.taskButtonTouch} 
        onPress={() => navigation.navigate('submenu')}>
        <Text style={styles.taskButtonText}>Añadir comanda stock</Text>
      </TouchableOpacity>
      <TouchableOpacity
        accessibilityLabel="Modificar tarea fija"
        accessibilityRole="button"
        accessibilityHint="Selecciona una tarea fija para modificarla"
        style={styles.taskButtonTouch} 
        onPress={() => navigation.navigate('submenu')}>
        <Text style={styles.taskButtonText}>Modificar tarea fija</Text>
      </TouchableOpacity>
      <TouchableOpacity
        accessibilityLabel="Modificar comanda comedor"
        accessibilityRole="button"
        accessibilityHint="Selecciona una comanda comedor para modificarla"
        style={styles.taskButtonTouch} 
        onPress={() => navigation.navigate('submenu')}>
        <Text style={styles.taskButtonText}>Modificar comanda comedor</Text>
      </TouchableOpacity>
      <TouchableOpacity
        accessibilityLabel="Modificar comanda stock"
        accessibilityRole="button"
        accessibilityHint="Selecciona una comanda stock para modificarla"
        style={styles.taskButtonTouch} 
        onPress={() => navigation.navigate('submenu')}>
        <Text style={styles.taskButtonText}>Modificar comanda stock</Text>
      </TouchableOpacity>
    </View>
  );
}

export default subMenu;
