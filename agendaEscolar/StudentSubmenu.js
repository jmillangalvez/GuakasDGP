import { StatusBar } from 'expo-status-bar';
import React, { Component } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { Text, SafeAreaView, TouchableOpacity, View, Image } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import styles from './Styles';

async function changeScreenOrientation() {
  await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT);
}

export default function studentSubmenu({navigation}) {
    changeScreenOrientation();
    return (
        <View style={styles.container}>
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
        </View>
    );
}