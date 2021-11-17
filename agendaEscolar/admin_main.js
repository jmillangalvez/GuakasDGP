import React, { Component } from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Button, Text, SafeAreaView, TouchableOpacity, View, ScrollView} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as ScreenOrientation from 'expo-screen-orientation';
import styles from './Styles';


// Boceto 4: Pantalla principal del administrador
// Para la navegacion, reemplazar adminMenu en navigation

// Cambiar orientación de la pantalla
async function changeScreenOrientation() {
  await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT);
}


function adminMenu({navigation}) {
  changeScreenOrientation();
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        
      <View style={styles.goBackView}>
        {/* Volver a la pantalla anterior */}
        <TouchableOpacity onPress={() => this.props.navigation.navigate('adminMenu')}>
          <Button
          title="Salir"
          accessibilityLabel="Inicio de sesión"
          accessibilityRole="button"
          accessibilityHint="Vuelve al inicio de sesión"
          />
        </TouchableOpacity>
      </View>

      <View style={styles.fixToText}>

        {/* Ir al menu de estudiantes (Boceto 5) */}
        <View style={styles.enterButtonView}>
          <TouchableOpacity style={styles.enterButtonTouch} onPress={() => this.props.navigation.navigate('adminMenu') }>
            <Button
              title="Usuarios"
              accessibilityLabel="Menú de estudiantes"
              accessibilityRole="button"
              accessibilityHint="Ir al menú de estudiantes"
            />
          </TouchableOpacity>
        </View>

        {/* Ir al menu de tareas (Boceto 11)*/}
        <View style={styles.enterButtonView}>
          <TouchableOpacity style={styles.enterButtonTouch} onPress={() => this.props.navigation.navigate('adminMenu') }>
            <Button
              title="Tareas"
              accessibilityLabel="Gestionar las tareas"
              accessibilityRole="button"
              accessibilityHint="Ir al menu de tareas"
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.enterButtonView}>
        {/* Ir al menu de docs (Boceto 10) */}
        <TouchableOpacity style={styles.enterButtonTouch} onPress={() => this.props.navigation.navigate('adminMenu') }>
          <Button
            title="Documentos"
            accessibilityLabel="Menu de documentos"
            accessibilityRole="button"
            accessibilityHint="Ir al menu de documentos"
          />
        </TouchableOpacity>
      </View>
      </ScrollView>
    </View>

  )
}

export default adminMenu;