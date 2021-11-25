import React, { Component } from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, SafeAreaView, TouchableOpacity, View, ScrollView} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as ScreenOrientation from 'expo-screen-orientation';
import { Button, Input, Divider, Text } from 'react-native-elements';
import styles from './Styles';


// Boceto 4: Pantalla principal del administrador
// Para la navegacion, reemplazar adminMenu en navigation

// Cambiar orientación de la pantalla
async function changeScreenOrientation() {
  await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.DEFAULT);
}

function AddStockTask({navigation}) {
  changeScreenOrientation();

  return (
    <View style={styles.container}>
      
      {/* Accessibility rol  */}
      <SafeAreaView style={styles.banner}>
        <Text value="PANTALLA PRINCIPAL ADMIN" accessibilityRole="header"></Text>
      </SafeAreaView> 

      <View style={styles.goBackView}>
        {/* Volver a la pantalla anterior */}
        <TouchableOpacity onPress={() => this.props.navigation.navigate('')}>
          <Button
          title="Volver"
          type="clear"
          accessibilityLabel="Submenú tareas"
          accessibilityRole="button"
          accessibilityHint="Vuelve al submenú de tareas"
          />
        </TouchableOpacity>
      </View>

        {/* Poner titulo a una tarea */}
        <View style={styles.Input}>
            <TouchableOpacity onFocus={() => placeholder=''}>
            <Input
                label='Título tarea'
                placeholder='Introduce una tarea'
                accessibilityLabel="Introduce una tarea"
                accessibilityRole="input"
                accessibilityHint="Introducir el título de una tarea"
            />
            </TouchableOpacity>
        </View>

        {/* Añadir descripción de una tarea */}
        

        <View style={styles.Input}>
            <Input
                label='Descripción texto'
                placeholder='Introduce una descripción'
                accessibilityLabel="descripción de tarea"
                accessibilityRole="input"
                accessibilityHint="Describir la tarea a realizar"
            />
        </View>
        
        {/* Añadir título al pictograma: va con un icono + */}
        <View style={styles.Input}>
            <Input
                label='Título pictograma'
                placeholder='Introduce un título'
                accessibilityLabel="título de pictograma"
                accessibilityRole="input"
                accessibilityHint="Introduce un título para el pictograma"
            />
        </View>
        {/* Descripción de los pictogramas: va con una imagen y el icono + */}
        <View style={styles.Input}>
            <Input
                label='Descripción pictograma'
                // placeholder='Introduce un título'
                accessibilityLabel="título de pictograma"
                accessibilityRole="input"
                accessibilityHint="Introduce un título para el pictograma"
            />
        </View>

        {/* Botón para enviar el formulario */}
        <View>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('') }>
            <Button
              title="Añadir comanda stock"
              type="outline"
              accessibilityLabel="Aádir comanda"
              accessibilityRole="button"
              accessibilityHint="Añade la comanda stock a la lista"
            />
          </TouchableOpacity>
        </View>

    </View>

  )
}

export default AddStockTask;