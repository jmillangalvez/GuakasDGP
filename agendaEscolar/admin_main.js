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


class adminMenu extends Component {
  constructor(props) {
    super(props);
    const data = require('./data/tasks.json');
    const allTasks = data.tasks;
    this.state = { tasks: {}, currentTask: 0, currentName: "" };
    this.state.tasks = allTasks.filter(function(task){
        if (!task.completed) return task;
    });
    this.state.currentName = this.state.tasks[0].name;
  };
  
  render (){
    changeScreenOrientation();
    return(
      <View style={styles.mainView}>        
        <View style={styles.goBackView}>
          {/* Volver a la pantalla anterior */}
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}>
            <Text style={styles.loginAdminText}>Volver</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.fixToText}>

          {/* Ir al menu de estudiantes (Boceto 5) */}
          <View style={styles.enterButtonView}>
            <TouchableOpacity style={styles.enterButtonTouch} onPress={() => this.props.navigation.navigate('adminMenu') }>
              <Button
                title="Usuarios"
                accessibilityLabel="Volver al inicio de sesión"
              />
            </TouchableOpacity>
          </View>

          {/* Ir al menu de tareas (Boceto 11)*/}
          <View style={styles.enterButtonView}>
            <TouchableOpacity style={styles.enterButtonTouch} onPress={() => this.props.navigation.navigate('CreateNormalTask') }>
              <Text style={styles.loginAdminText}>Tareas</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }
}

export default adminMenu;