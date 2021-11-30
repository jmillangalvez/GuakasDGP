import React, { Component } from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Button, Text, SafeAreaView, TouchableOpacity, View, ScrollView } from 'react-native';
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


class AdminMain extends Component {
  constructor(props) {
    super(props);
    const data = require('./data/tasks.json');
    const allTasks = data.tasks;
    this.state = { tasks: {}, currentTask: 0, currentName: "" };
    this.state.tasks = allTasks.filter(function (task) {
      if (!task.completed) return task;
    });
    this.state.currentName = this.state.tasks[0].name;
  };

  render() {
    changeScreenOrientation();
    return (
      <View style={styles.mainView}>

        <SafeAreaView style={styles.banner}>
          <Text style={styles.headerText} value="AdminMenu" accessibilityRole="header">Menu administrador</Text>
        </SafeAreaView>

        <View style={styles.goBackView}>
          <Button
            title="Volver"
            accessibilityLabel="Volver"
            accessibilityRole="button"
            accessibilityHint="Vuelve al inicio de sesión"
            color="#bcbcbc"
            onPress={() => this.props.navigation.navigate('Login')}
          />
        </View>

        <View style={styles.container}>

          {/* Ir al menu de estudiantes (Boceto 5) */}

          <TouchableOpacity
            style={styles.buttonTouch}
            onPress={() => this.props.navigation.navigate('StudentSubmenu')}>
            <Text style={styles.buttonText}>Usuarios</Text>
          </TouchableOpacity>

          {/* Ir al menu de tareas (Boceto 11)*/}
          <TouchableOpacity
            style={styles.buttonTouch}
            onPress={() => this.props.navigation.navigate('TaskSubmenu')}>
            <Text style={styles.buttonText}>Tareas</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.buttonTouch}
            onPress={() => this.props.navigation.navigate('DocumentSubmenu')}>
            <Text style={styles.buttonText}>Documentos</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

export default AdminMain;